# M365 Copilot OpenAI-Compatible Worker

把 Microsoft 365 Copilot 的 Chathub 请求封装成 OpenAI 兼容 API，运行在
Cloudflare Workers 上。

This project wraps the Microsoft 365 Copilot Chathub flow as an
OpenAI-compatible API on Cloudflare Workers.

---

## 中文说明

### 当前能力

- `GET /healthz`
- `GET /v1/models`
- `POST /v1/chat/completions`
- `POST /v1/responses`
- `POST /v1/images/generations`
- `GET /v1/copilot/image`

已实现并实际测试过的部分：

- 文本对话，兼容 Chat Completions。
- Responses API 基础格式，包括 `previous_response_id` 续聊。
- 流式输出。
- 默认临时聊天模式，减少 Copilot 记忆写入。
- 图片输入上传，支持 OpenAI 风格的 `image_url` / `input_image`。
- 通过 refresh token 换取 Microsoft access token。
- 使用 Upstash Redis REST 缓存 access token 和更新后的 refresh token。
- Cloudflare Cron 每天刷新一次 token，普通请求也会按需刷新。

当前限制：

- 生图请求可以触发 Copilot 生成图片，并返回图片引用。
- 但 Microsoft Designer 图片下载需要额外的 Designer 专用授权 token。
- 目前 `/v1/copilot/image` 代理和 `response_format: "b64_json"` 在真实请求中可能因上游
  `401` 无法返回图片字节。
- 所以生图功能目前适合调试和继续研究，不建议当作稳定图片下载接口使用。
- 原生工具调用没有实现。非原生 shim 已刻意不加入。

仓库不会保存抓包里的 token、cookie、refresh token 或 API key。

### 模型

`/v1/models` 会返回：

- `copilot-5.5-fast-response`
- `copilot-5.5-deep-thinking`
- `gpt-5.5-chat`
- `gpt-5.5-reasoning`
- `copilot-chat`
- `copilot-reasoning`

映射关系：

- `copilot-5.5-fast-response` -> 上游 `Gpt_5_5_Chat`
- `copilot-5.5-deep-thinking` -> 上游 `Gpt_5_5_Reasoning`
- `gpt-5.5-chat` 是快速响应别名。
- `gpt-5.5-reasoning` 是深度思考别名。
- `copilot-chat` 和 `copilot-reasoning` 是兼容旧配置的别名。

### 环境变量

必须配置：

```bash
npx wrangler secret put OPENAI_COMPAT_API_KEY
npx wrangler secret put COPILOT_REFRESH_TOKEN
```

推荐配置 Upstash Redis：

```bash
npx wrangler secret put UPSTASH_REDIS_REST_URL
npx wrangler secret put UPSTASH_REDIS_REST_TOKEN
```

也可以使用同义变量：

- `COPILOT_REDIS_REST_URL`
- `COPILOT_REDIS_REST_TOKEN`

常用可选项：

- `DEFAULT_MODEL`，默认 `copilot-5.5-fast-response`
- `COPILOT_DISABLE_MEMORY`，默认建议 `true`
- `COPILOT_LOCALE`，默认配置为 `zh-cn`
- `COPILOT_MARKET`，默认配置为 `en-us`
- `COPILOT_TIMEZONE`，默认配置为 `Asia/Shanghai`
- `COPILOT_USER_ID` / `COPILOT_TENANT_ID`，当 access token 里没有 `oid` / `tid` 时使用
- `COPILOT_SESSION_ID` / `COPILOT_CONVERSATION_ID`，固定会话调试时使用
- `DEBUG_UPSTREAM=1`，调试上游消息摘要

本地开发可复制 `.dev.vars.example` 为 `.dev.vars`，填入同样的变量。不要提交
`.dev.vars`。

### Token 和 Redis

`COPILOT_REFRESH_TOKEN` 只是启动用的 bootstrap token。Worker 首次请求或 access token
过期时，会向 Microsoft token endpoint 交换新的 access token。

如果 Microsoft 返回新的 refresh token，Worker 会把它写入 Redis。之后请求优先使用
Redis 里的 token bundle，而不是反复使用最初的 secret。

Redis 默认键：

- token bundle: `copilot_tokens`
- refresh lock: `copilot_tokens_lock`

token bundle 内容包括：

- `accessToken`
- `accessTokenExp`
- `refreshToken`
- `updatedAt`

Worker 刷新 token 前会用 Redis `SET NX PX` 加短锁，避免多个 Worker isolate 同时刷新。

`wrangler.toml` 里配置了每天一次的 Cron：

```toml
[triggers]
crons = ["17 3 * * *"]
```

Cron 会定期刷新 token 并写回 Redis。即使 Cron 没跑成功，普通 API 请求仍会在 token
过期时按需刷新。

Refresh token 仍可能因为 Microsoft 策略、用户退出、管理员操作、改密、条件访问或长期不用而失效。
如果失效，需要重新抓取或提供新的 refresh token。

### 临时聊天和隐私

默认启用临时聊天。Worker 会添加 `disableMemory=1`，减少写入 Copilot 记忆。

行为规则：

- 默认：临时聊天。
- `store: false` 或 `temporary: true`：临时聊天。
- `COPILOT_DISABLE_MEMORY=true`：总是临时聊天。
- `store: true` 或 `temporary: false`：仅当 `COPILOT_DISABLE_MEMORY` 未设置或为 `false` 时允许记忆。

如果你想默认允许非临时聊天，可以设置：

```bash
COPILOT_DISABLE_MEMORY=false
```

### 使用示例

Chat Completions：

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

Responses：

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

Responses 续聊：

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

`resp_...` 里编码了 Copilot 的 session id 和 conversation id，因此基础续聊不依赖
KV、Redis 或 Durable Objects。

图片输入，Chat Completions：

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

图片输入，Responses：

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

生图：

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

注意：当前生图可能能返回 URL，但代理打开图片或 `b64_json` 取图可能失败，原因是
Designer 图片下载需要额外授权。

### 部署

安装依赖：

```bash
npm install
```

类型检查：

```bash
npm run typecheck
```

部署 Worker：

```bash
npm run deploy
```

部署后建议测试：

```bash
curl https://YOUR-WORKER.workers.dev/healthz
curl https://YOUR-WORKER.workers.dev/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY"
```

### 抓包结论

当前实现基于抓包观察到的这些行为：

- Chathub 使用 SignalR JSON over WebSocket：
  `wss://substrate.office.com/m365Copilot/Chathub/{oid}@{tenantId}`
- Chat invocation target 是 `chat`。
- 流式增量主要来自 `update.arguments[0].writeAtCursor`。
- 临时聊天通过查询参数 `disableMemory=1`。
- 图片输入先调用 `POST https://substrate.office.com/m365Copilot/UploadFile`，再把返回的
  `docId` 作为 `ImageFile` annotation 发给 Chathub。
- Copilot 生成图引用会出现在 `contentGenerationProgressList[*].ImageReferenceUrls` 等字段。
- Designer 图片真实下载需要 Designer 专用 5 段 Bearer token 加 `FileToken`。这条链路暂未自动化。

---

## English

### What It Does

Implemented endpoints:

- `GET /healthz`
- `GET /v1/models`
- `POST /v1/chat/completions`
- `POST /v1/responses`
- `POST /v1/images/generations`
- `GET /v1/copilot/image`

Implemented and tested behavior:

- Text chat through a Chat Completions-compatible API.
- Basic Responses API support, including continuation with `previous_response_id`.
- Streaming responses.
- Temporary chat by default to reduce Copilot memory writes.
- Image input upload through OpenAI-style `image_url` / `input_image` parts.
- Microsoft refresh-token to access-token exchange.
- Upstash Redis REST token caching, including replacement refresh tokens.
- Daily Cloudflare Cron token refresh, plus on-demand refresh during normal requests.

Known limitations:

- Image generation can ask Copilot to generate images and return image references.
- Downloading Microsoft Designer image bytes requires an additional Designer-specific auth token.
- Because of that, `/v1/copilot/image` and `response_format: "b64_json"` may fail with upstream
  `401` errors in real requests.
- Treat image generation as experimental until the Designer image auth flow is automated.
- Native tool calling is not implemented. A non-native shim is intentionally not included.

No captured token, cookie, refresh token, or API key is stored in this repository.

### Models

`/v1/models` returns:

- `copilot-5.5-fast-response`
- `copilot-5.5-deep-thinking`
- `gpt-5.5-chat`
- `gpt-5.5-reasoning`
- `copilot-chat`
- `copilot-reasoning`

Mapping:

- `copilot-5.5-fast-response` -> upstream `Gpt_5_5_Chat`
- `copilot-5.5-deep-thinking` -> upstream `Gpt_5_5_Reasoning`
- `gpt-5.5-chat` is an OpenAI-style alias for fast response.
- `gpt-5.5-reasoning` is an OpenAI-style alias for deep thinking.
- `copilot-chat` and `copilot-reasoning` are legacy aliases.

### Environment Variables

Required:

```bash
npx wrangler secret put OPENAI_COMPAT_API_KEY
npx wrangler secret put COPILOT_REFRESH_TOKEN
```

Recommended Upstash Redis settings:

```bash
npx wrangler secret put UPSTASH_REDIS_REST_URL
npx wrangler secret put UPSTASH_REDIS_REST_TOKEN
```

Equivalent names are also accepted:

- `COPILOT_REDIS_REST_URL`
- `COPILOT_REDIS_REST_TOKEN`

Common optional settings:

- `DEFAULT_MODEL`, default `copilot-5.5-fast-response`
- `COPILOT_DISABLE_MEMORY`, recommended default `true`
- `COPILOT_LOCALE`, configured default `zh-cn`
- `COPILOT_MARKET`, configured default `en-us`
- `COPILOT_TIMEZONE`, configured default `Asia/Shanghai`
- `COPILOT_USER_ID` / `COPILOT_TENANT_ID`, used when `oid` / `tid` are missing from the access token
- `COPILOT_SESSION_ID` / `COPILOT_CONVERSATION_ID`, useful for fixed-session debugging
- `DEBUG_UPSTREAM=1`, logs upstream message summaries

For local development, copy `.dev.vars.example` to `.dev.vars` and fill the same values.
Do not commit `.dev.vars`.

### Tokens And Redis

`COPILOT_REFRESH_TOKEN` is only the bootstrap token. When the first request arrives, or when the
access token expires, the Worker exchanges it at the Microsoft token endpoint for a fresh access token.

If Microsoft returns a replacement refresh token, the Worker writes it to Redis. Future requests prefer
the Redis token bundle instead of repeatedly using the original secret.

Default Redis keys:

- token bundle: `copilot_tokens`
- refresh lock: `copilot_tokens_lock`

The token bundle contains:

- `accessToken`
- `accessTokenExp`
- `refreshToken`
- `updatedAt`

Before refreshing, the Worker uses Redis `SET NX PX` as a short lock so multiple Worker isolates do not
refresh at the same time.

`wrangler.toml` includes a daily Cron trigger:

```toml
[triggers]
crons = ["17 3 * * *"]
```

Cron refreshes the token and writes it back to Redis. Normal API requests still refresh on demand if the
cached access token has expired.

Refresh tokens can still expire or be revoked by Microsoft policy, sign-out, admin action, password
changes, conditional access, or inactivity. If that happens, provide a new refresh token.

### Temporary Chat And Privacy

Temporary chat is enabled by default. The Worker adds `disableMemory=1` to reduce Copilot memory writes.

Rules:

- Default: temporary chat.
- `store: false` or `temporary: true`: temporary chat.
- `COPILOT_DISABLE_MEMORY=true`: always temporary chat.
- `store: true` or `temporary: false`: allows memory only when `COPILOT_DISABLE_MEMORY` is unset or `false`.

To allow non-temporary requests by default:

```bash
COPILOT_DISABLE_MEMORY=false
```

### Usage

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

Responses:

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

Continue a Responses session:

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

The `resp_...` id carries the Copilot session id and conversation id, so basic continuation does not
require KV, Redis, or Durable Objects.

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

Note: image generation may return a URL, but opening the proxied image or requesting `b64_json` may fail
until the Designer image download auth flow is automated.

### Deploy

Install dependencies:

```bash
npm install
```

Type-check:

```bash
npm run typecheck
```

Deploy the Worker:

```bash
npm run deploy
```

Suggested smoke tests after deploy:

```bash
curl https://YOUR-WORKER.workers.dev/healthz
curl https://YOUR-WORKER.workers.dev/v1/models \
  -H "Authorization: Bearer YOUR_OPENAI_COMPAT_API_KEY"
```

### Capture Notes

This implementation is based on these observed behaviors:

- Chathub uses SignalR JSON over WebSocket:
  `wss://substrate.office.com/m365Copilot/Chathub/{oid}@{tenantId}`
- The chat invocation target is `chat`.
- Streaming deltas mostly arrive as `update.arguments[0].writeAtCursor`.
- Temporary chat uses the `disableMemory=1` query parameter.
- Image input first calls `POST https://substrate.office.com/m365Copilot/UploadFile`, then sends the
  returned `docId` as an `ImageFile` annotation to Chathub.
- Copilot-generated image references appear in fields such as
  `contentGenerationProgressList[*].ImageReferenceUrls`.
- Real Designer image downloads require a Designer-specific 5-part Bearer token plus `FileToken`.
  This flow is not automated yet.
