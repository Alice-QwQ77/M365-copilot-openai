# M365 Copilot OpenAI-Compatible Worker

This Worker exposes the captured Microsoft 365 Copilot Chathub flow as an
OpenAI-compatible API.

Implemented endpoints:

- `GET /v1/models`
- `POST /v1/chat/completions`
- `POST /v1/responses`
- `POST /v1/images/generations`

No captured token or cookie is stored in this repo.

## What the captures show

- Chathub is SignalR JSON over WebSocket at
  `wss://substrate.office.com/m365Copilot/Chathub/{oid}@{tenantId}`.
- The chat invocation target is `chat`.
- Streaming deltas arrive as `update.arguments[0].writeAtCursor`.
- The newer capture uses temporary chat through the query parameter
  `disableMemory=1`.
- Refresh tokens can be exchanged at
  `https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token` with
  `grant_type=refresh_token`, scope
  `https://substrate.office.com/sydney/.default openid profile offline_access`,
  and redirect URI `brk-multihub://outlook.office.com`.
- Microsoft may return a replacement refresh token. This Worker persists the
  replacement token.
- Image upload uses `POST https://substrate.office.com/m365Copilot/UploadFile`
  and then sends the returned `docId` as an `ImageFile` message annotation.
- AI-generated images appear in Chathub progress payloads under fields such as
  `contentGenerationProgressList[*].ImageReferenceUrls`.

## Setup

Install dependencies:

```bash
npm install
```

Set an inbound API key:

```bash
npx wrangler secret put OPENAI_COMPAT_API_KEY
```

Set a bootstrap Microsoft refresh token:

```bash
npx wrangler secret put COPILOT_REFRESH_TOKEN
```

For local development, copy `.dev.vars.example` to `.dev.vars` and fill the
same values there. Do not commit `.dev.vars`.

## Upstash Redis

Upstash Redis REST is the default shared token store. It avoids Durable Objects
and lets different Worker isolates reuse a fresh access token instead of
refreshing on every request.

Set these as Worker secrets:

```bash
npx wrangler secret put UPSTASH_REDIS_REST_URL
npx wrangler secret put UPSTASH_REDIS_REST_TOKEN
```

Equivalent `COPILOT_REDIS_REST_URL` and `COPILOT_REDIS_REST_TOKEN` names are
also accepted.

Stored Redis value:

- Key: `COPILOT_REDIS_TOKEN_KEY`, default `copilot_tokens`
- Value: JSON containing `accessToken`, `accessTokenExp`, `refreshToken`, and
  `updatedAt`
- Refresh lock key: `COPILOT_REDIS_LOCK_KEY`, default `copilot_tokens_lock`

The Worker uses `SET lock NX PX` before refreshing. If another isolate is
already refreshing, it waits briefly for Redis to receive the new access token.

KV is still supported as a legacy backup for the refresh token through the
`COPILOT_TOKEN_KV` binding, but Redis should be the authority when Upstash is
configured.

## Token Notes

`COPILOT_REFRESH_TOKEN` is only the bootstrap secret. It can expire or be revoked
by Microsoft policy, user action, admin action, password changes, conditional
access, or inactivity. When Microsoft returns a replacement refresh token, the
Worker writes it back to Redis and uses that from then on.

The captures did not include a stable cookie-to-Chathub-token endpoint. Browser
cookie silent OAuth may work in a full browser, but it is brittle in Workers
because MFA, conditional access, redirects, and browser-only state can interrupt
it.

## Privacy Mode

Temporary chat is the default. The Worker adds `disableMemory=1` unless the
request explicitly opts into storage:

- Default: temporary chat
- `store: false` or `temporary: true`: temporary chat
- `COPILOT_DISABLE_MEMORY=true`: always temporary chat
- `store: true` or `temporary: false`: allow Copilot memory only when
  `COPILOT_DISABLE_MEMORY` is unset or `false`

Set `COPILOT_DISABLE_MEMORY=false` if you want non-temporary requests by
default while still letting callers force temporary mode with `store:false` or
`temporary:true`.

## Models

Supported model ids:

- `copilot-5.5-fast-response` maps to upstream `Gpt_5_5_Chat`
- `copilot-5.5-deep-thinking` maps to upstream `Gpt_5_5_Reasoning`
- `gpt-5.5-chat` is an OpenAI-style alias for fast response
- `gpt-5.5-reasoning` is an OpenAI-style alias for deep thinking
- Legacy aliases `copilot-chat` and `copilot-reasoning` are still accepted

## Usage

Chat Completions:

```bash
curl https://YOUR-WORKER.workers.dev/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "copilot-5.5-fast-response",
    "messages": [{"role": "user", "content": "hi"}],
    "stream": false
  }'
```

Responses API:

```bash
curl https://YOUR-WORKER.workers.dev/v1/responses \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "copilot-5.5-fast-response",
    "input": "hi",
    "stream": false
  }'
```

Continue a Responses session by passing the previous `id`:

```bash
curl https://YOUR-WORKER.workers.dev/v1/responses \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "copilot-5.5-fast-response",
    "previous_response_id": "resp_...",
    "input": "continue",
    "stream": false
  }'
```

The `resp_...` id carries the Copilot session and conversation ids, so basic
session continuation does not require KV, Redis, or Durable Objects.

Image input through Chat Completions:

```bash
curl https://YOUR-WORKER.workers.dev/v1/chat/completions \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "copilot-5.5-fast-response",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "describe this image"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
```

Image input through Responses:

```bash
curl https://YOUR-WORKER.workers.dev/v1/responses \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "copilot-5.5-fast-response",
    "input": [{
      "role": "user",
      "content": [
        {"type": "input_text", "text": "describe this image"},
        {"type": "input_image", "image_url": "data:image/png;base64,..."}
      ]
    }]
  }'
```

Image generation:

```bash
curl https://YOUR-WORKER.workers.dev/v1/images/generations \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "copilot-5.5-deep-thinking",
    "prompt": "a small robot drawing a city map",
    "response_format": "url"
  }'
```

## Deploy

```bash
npm run deploy
```

The Worker should stay protected by `OPENAI_COMPAT_API_KEY`; each request uses
your Microsoft 365 Copilot entitlement upstream.
