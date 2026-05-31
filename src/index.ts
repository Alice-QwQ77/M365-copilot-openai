const SIGNALR_RECORD_SEPARATOR = "\x1e";
const DEFAULT_UPSTREAM_ORIGIN = "https://m365.cloud.microsoft";
const DEFAULT_UPSTREAM_HOST = "substrate.office.com";
const DEFAULT_TOKEN_RESOURCE = "https://substrate.office.com/sydney";
const DEFAULT_TOKEN_SCOPE = `${DEFAULT_TOKEN_RESOURCE}/.default openid profile offline_access`;
const DEFAULT_TOKEN_REDIRECT_URI = "brk-multihub://outlook.office.com";
const DEFAULT_COPILOT_CLIENT_ID = "c0ab8ce9-e9a0-42e7-b064-33d422df41f1";
const DEFAULT_REFRESH_TOKEN_KV_KEY = "copilot_refresh_token";
const DEFAULT_REDIS_TOKEN_KEY = "copilot_tokens";
const DEFAULT_REDIS_LOCK_KEY = "copilot_tokens_lock";
const DEFAULT_REDIS_LOCK_TTL_MS = 10_000;
const UPLOAD_IMAGE_OPTIONS_SETS = [
  "cwcgptvsan",
  "flux_v3_gptv_enable_upload_multi_image_in_turn_wo_ch",
  "gptvnorm2048",
];
const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0";

const DEFAULT_VARIANTS = [
  "EnableMcpServerWidgets",
  "feature.EnableMcpServerWidgets",
  "feature.EnableLuForChatCIQ",
  "feature.enableChatCIQPlugin",
  "EnableRequestPlugins",
  "feature.EnableSensitivityLabels",
  "EnableUnsupportedUrlDetector",
  "feature.IsCustomEngineCopilotEnabled",
  "feature.bizchatfluxv3",
  "feature.enablechatpages",
  "feature.enableCodeCanvas",
  "feature.turnOnWorkTabRecommendation",
  "feature.turnOnDARecommendation",
  "feature.IsStreamingModeInChatRequestEnabled",
  "IncludeSourceAttributionsConcise",
  "SkipPublishEmptyMessage",
  "feature.EnableDeduplicatingSourceAttributions",
  "Enable3PActionProgressMessages",
  "feature.enableClientWebRtc",
  "feature.EnableMeetingRecapOfSeriesMeetingWithCiq",
  "feature.EnableReferencesListCompleteSignal",
  "feature.StorageMessageSplitDisabled",
  "feature.EnableCuaTakeControlApi",
  "SingletonEnvOn",
  "feature.cwcallowedos",
  "feature.EnableMergingPureDeltas",
  "feature.disabledisallowedmsgs",
  "feature.enableCitationsForSynthesisData",
  "feature.EnableConversationShareApis",
  "feature.enableGenerateGraphicArtOptionsSet",
  "cdximagen",
  "feature.EnableUpdatedUXForConfirmationDialog",
  "feature.EnableContentApiandDocTypeHtmlInRichAnswers",
  "cdxgrounding_api_v2_rich_web_answers_reference_bottom_force",
  "cdxenablerenderforisocomp",
  "feature.EnableClientFileURLSupportForOfficeWebPaidCopilot",
  "feature.EnableDesignEditorImageGrounding",
  "feature.EnableDesignerEditor",
  "feature.EnableSkipRehydrationForSpeCIdImages",
  "feature.EnablePersonalization",
  "feature.EnableSkipEmittingMessageOnFlush",
  "feature.EnableRemoveEmptySourceAttributions",
  "feature.EnableRemoveStreamingMode",
  "feature.OfficeWebToHelix",
  "feature.OfficeDesktopToHelix",
  "feature.M365TeamsHubToHelix",
  "feature.OwaHubToHelix",
  "feature.MonarchHubToHelix",
  "feature.Win32OutlookHubToHelix",
  "feature.MacOutlookHubToHelix",
  "Agt_bizchat_enableGpt5ForHelix",
].join(",");

const DEFAULT_OPTIONS_SETS = [
  "search_result_progress_messages_with_search_queries",
  "deepleo_networking_timeout_10minutes_canmore",
  "cwc_flux_image",
  "cwc_code_interpreter",
  "cwc_code_interpreter_amsfix",
  "cwcfluxgptv",
  "flux_v3_gptv_enable_upload_multi_image_in_turn_wo_ch",
  "gptvnorm2048",
  "cwc_code_interpreter_citation_fix",
  "code_interpreter_interactive_charts",
  "cwc_code_interpreter_interactive_charts_inline_image",
  "code_interpreter_matplotlib_patching",
  "cwc_fileupload_odb",
  "update_memory_plugin",
  "add_custom_instructions",
  "cwc_flux_v3",
  "flux_v3_progress_messages",
  "enable_batch_token_processing",
  "enable_gg_gpt",
  "cwc_table_context",
  "flux_v3_image_gen_enable_dimensions",
  "flux_v3_image_gen_enable_icon_dimensions",
  "flux_v3_image_gen_enable_system_text_with_params",
  "flux_v3_image_gen_enable_designer_dimensions_meta_prompting_in_system_prompts",
];

const DEFAULT_ALLOWED_MESSAGE_TYPES = [
  "Chat",
  "Suggestion",
  "InternalSearchQuery",
  "Disengaged",
  "InternalLoaderMessage",
  "Progress",
  "GeneratedCode",
  "RenderCardRequest",
  "AdsQuery",
  "SemanticSerp",
  "GenerateContentQuery",
  "GenerateGraphicArt",
  "SearchQuery",
  "ConfirmationCard",
  "AuthError",
  "DeveloperLogs",
  "TriggerPlugin",
  "HintInvocation",
  "MemoryUpdate",
  "EndOfRequest",
  "TriggerConfirmation",
  "ResumeInvokeAction",
  "ResumeUserInputRequest",
  "TriggerUserInputRequest",
  "EscapeHatch",
  "TriggerPluginAuth",
  "ResumePluginAuth",
  "SideBySide",
  "ReferencesListComplete",
  "SwitchRespondingEndpoint",
];

const MODEL_DEFINITIONS = [
  {
    id: "copilot-5.5-fast-response",
    tone: "Gpt_5_5_Chat",
    aliases: ["copilot-chat", "gpt-5.5", "gpt-5.5-chat", "gpt-5.5-fast", "gpt-5.5-fast-response"],
  },
  {
    id: "copilot-5.5-deep-thinking",
    tone: "Gpt_5_5_Reasoning",
    aliases: [
      "copilot-reasoning",
      "gpt-5.5-reasoning",
      "gpt-5.5-thinking",
      "gpt-5.5-deep",
      "gpt-5.5-deep-thinking",
    ],
  },
];

const LISTED_MODEL_IDS = [
  "copilot-5.5-fast-response",
  "copilot-5.5-deep-thinking",
  "gpt-5.5-chat",
  "gpt-5.5-reasoning",
  "copilot-chat",
  "copilot-reasoning",
];

type Env = {
  OPENAI_COMPAT_API_KEY?: string;
  API_KEY?: string;
  COPILOT_ACCESS_TOKEN?: string;
  COPILOT_REFRESH_TOKEN?: string;
  COPILOT_REFRESH_TOKEN_KV_KEY?: string;
  COPILOT_CLIENT_ID?: string;
  COPILOT_TOKEN_TENANT?: string;
  COPILOT_TOKEN_RESOURCE?: string;
  COPILOT_TOKEN_SCOPE?: string;
  COPILOT_TOKEN_REDIRECT_URI?: string;
  COPILOT_USER_ID?: string;
  COPILOT_TENANT_ID?: string;
  COPILOT_SESSION_ID?: string;
  COPILOT_CONVERSATION_ID?: string;
  COPILOT_VARIANTS?: string;
  COPILOT_LOCALE?: string;
  COPILOT_MARKET?: string;
  COPILOT_TIMEZONE?: string;
  COPILOT_ORIGIN?: string;
  COPILOT_UPSTREAM_HOST?: string;
  COPILOT_DISABLE_MEMORY?: string;
  COPILOT_REDIS_REST_URL?: string;
  COPILOT_REDIS_REST_TOKEN?: string;
  UPSTASH_REDIS_REST_URL?: string;
  UPSTASH_REDIS_REST_TOKEN?: string;
  COPILOT_REDIS_TOKEN_KEY?: string;
  COPILOT_REDIS_LOCK_KEY?: string;
  COPILOT_REDIS_LOCK_TTL_MS?: string;
  DEFAULT_MODEL?: string;
  DEBUG_UPSTREAM?: string;
  COPILOT_TOKEN_KV?: KVNamespace;
};

type ChatMessage = {
  role: "system" | "developer" | "user" | "assistant" | "tool";
  content: unknown;
  name?: string;
};

type ChatCompletionRequest = {
  model?: string;
  messages?: ChatMessage[];
  stream?: boolean;
  temperature?: number;
  store?: boolean;
  temporary?: boolean;
};

type ResponsesRequest = {
  model?: string;
  input?: unknown;
  instructions?: string;
  stream?: boolean;
  previous_response_id?: string;
  store?: boolean;
  temporary?: boolean;
};

type ImagesGenerationRequest = {
  model?: string;
  prompt?: string;
  n?: number;
  response_format?: "url" | "b64_json";
  store?: boolean;
  temporary?: boolean;
};

type JwtPayload = {
  aud?: string;
  oid?: string;
  tid?: string;
  exp?: number;
  [key: string]: unknown;
};

type CopilotImageInput = {
  url: string;
  fileName?: string;
};

type CopilotImage = {
  url: string;
};

type CopilotUpload = {
  docId: string;
  fileName: string;
  fileType: string;
};

type CopilotRunOptions = {
  prompt: string;
  model: string;
  tone: string;
  sessionId?: string;
  conversationId?: string;
  imageInputs?: CopilotImageInput[];
  disableMemory?: boolean;
  onDelta?: (delta: string) => void | Promise<void>;
};

type CopilotRunResult = {
  text: string;
  images: CopilotImage[];
};

type ConversationState = {
  sessionId: string;
  conversationId: string;
};

type AccessToken = {
  token: string;
  payload: JwtPayload;
  refreshToken?: string;
};

type RefreshTokenSource = {
  token: string;
  source: "memory" | "redis" | "kv" | "secret";
};

type RedisConfig = {
  url: string;
  token: string;
  tokenKey: string;
  lockKey: string;
  lockTtlMs: number;
};

type RedisTokenBundle = {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExp?: number;
  updatedAt?: number;
};

type UpstashResponse<T = unknown> = {
  result?: T;
  error?: string;
};

let cachedAccessToken: AccessToken | undefined;
let cachedRefreshToken: string | undefined;

class HttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly type = "invalid_request_error",
  ) {
    super(message);
  }
}

class SignalRReader {
  private queue: string[] = [];
  private waiters: Array<(value: string) => void> = [];
  private failures: Array<(reason: Error) => void> = [];
  private closedError?: Error;

  constructor(private readonly socket: WebSocket) {
    socket.addEventListener("message", (event) => {
      for (const frame of splitSignalRFrames(event.data)) {
        const waiter = this.waiters.shift();
        const reject = this.failures.shift();
        if (waiter) {
          waiter(frame);
        } else {
          this.queue.push(frame);
        }
        if (reject) {
          void reject;
        }
      }
    });

    socket.addEventListener("error", () => {
      this.fail(new Error("Upstream websocket error"));
    });

    socket.addEventListener("close", () => {
      this.fail(new Error("Upstream websocket closed"));
    });
  }

  next(timeoutMs: number): Promise<string> {
    if (this.queue.length > 0) {
      return Promise.resolve(this.queue.shift()!);
    }
    if (this.closedError) {
      return Promise.reject(this.closedError);
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        const waiterIndex = this.waiters.indexOf(resolve);
        if (waiterIndex >= 0) {
          this.waiters.splice(waiterIndex, 1);
          this.failures.splice(waiterIndex, 1);
        }
        reject(new Error("Timed out waiting for upstream response"));
      }, timeoutMs);

      this.waiters.push((value) => {
        clearTimeout(timer);
        resolve(value);
      });
      this.failures.push((reason) => {
        clearTimeout(timer);
        reject(reason);
      });
    });
  }

  private fail(error: Error): void {
    if (!this.closedError) {
      this.closedError = error;
    }
    while (this.failures.length > 0) {
      const reject = this.failures.shift();
      this.waiters.shift();
      reject?.(error);
    }
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      return await route(request, env);
    } catch (error) {
      if (error instanceof HttpError) {
        return errorResponse(error.status, error.message, error.type);
      }
      const message = error instanceof Error ? error.message : "Unknown error";
      return errorResponse(500, message, "server_error");
    }
  },
};

async function route(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (url.pathname === "/" || url.pathname === "/healthz") {
    return jsonResponse({ ok: true, service: "openai-compatible-copilot-worker" });
  }

  if (url.pathname === "/v1/models" && request.method === "GET") {
    requireInboundAuth(request, env);
    return jsonResponse({
      object: "list",
      data: LISTED_MODEL_IDS.map(modelObject),
    });
  }

  if (url.pathname === "/v1/chat/completions" && request.method === "POST") {
    requireInboundAuth(request, env);
    const body = await readJson<ChatCompletionRequest>(request);
    return chatCompletions(body, env);
  }

  if (url.pathname === "/v1/responses" && request.method === "POST") {
    requireInboundAuth(request, env);
    const body = await readJson<ResponsesRequest>(request);
    return responses(body, env);
  }

  if (url.pathname === "/v1/images/generations" && request.method === "POST") {
    requireInboundAuth(request, env);
    const body = await readJson<ImagesGenerationRequest>(request);
    return imageGenerations(body, env);
  }

  return errorResponse(404, "Not found", "not_found");
}

async function chatCompletions(body: ChatCompletionRequest, env: Env): Promise<Response> {
  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    throw new HttpError(400, "`messages` must be a non-empty array");
  }

  const model = body.model || env.DEFAULT_MODEL || "copilot-5.5-fast-response";
  const tone = modelToTone(model);
  const prompt = messagesToPrompt(body.messages);
  const imageInputs = extractChatImages(body.messages);
  const disableMemory = requestDisablesMemory(body, env);

  if (body.stream) {
    return streamChatCompletion({ prompt: prompt || "Describe the image.", model, tone, imageInputs, disableMemory }, env);
  }

  const result = await runCopilotChat({ prompt: prompt || "Describe the image.", model, tone, imageInputs, disableMemory }, env);
  const content = formatCopilotOutput(result);
  const created = unixSeconds();
  const id = `chatcmpl-${crypto.randomUUID()}`;

  return jsonResponse({
    id,
    object: "chat.completion",
    created,
    model,
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content,
        },
        finish_reason: "stop",
      },
    ],
    usage: approximateUsage(prompt, content),
  });
}

async function responses(body: ResponsesRequest, env: Env): Promise<Response> {
  const model = body.model || env.DEFAULT_MODEL || "copilot-5.5-fast-response";
  const tone = modelToTone(model);
  const prompt = responsesInputToPrompt(body);
  const imageInputs = extractResponsesImages(body);
  if (!prompt && imageInputs.length === 0) {
    throw new HttpError(400, "`input` must contain text");
  }
  const resolvedPrompt = prompt || "Describe the image.";
  const disableMemory = requestDisablesMemory(body, env);

  const state = conversationStateFromResponseId(body.previous_response_id, env);
  const id = responseIdFromConversationState(state);

  if (body.stream) {
    return streamResponseApi({ prompt: resolvedPrompt, model, tone, ...state, imageInputs, disableMemory }, env, id);
  }

  const result = await runCopilotChat({ prompt: resolvedPrompt, model, tone, ...state, imageInputs, disableMemory }, env);
  const outputText = formatCopilotOutput(result);
  return jsonResponse(responseObject(id, model, outputText, resolvedPrompt));
}

async function imageGenerations(body: ImagesGenerationRequest, env: Env): Promise<Response> {
  const prompt = body.prompt?.trim();
  if (!prompt) {
    throw new HttpError(400, "`prompt` must contain text");
  }

  const model = body.model || env.DEFAULT_MODEL || "copilot-5.5-deep-thinking";
  const result = await runCopilotChat({
    prompt,
    model,
    tone: modelToTone(model),
    disableMemory: requestDisablesMemory({ store: false }, env),
  }, env);
  const images = result.images.slice(0, Math.max(1, body.n || 1));
  if (images.length === 0) {
    throw new HttpError(502, "Copilot did not return an image", "server_error");
  }

  const data = await Promise.all(images.map(async (image) => {
    if (body.response_format === "b64_json") {
      return {
        b64_json: await imageUrlToBase64(image.url),
      };
    }
    return { url: image.url };
  }));

  return jsonResponse({
    created: unixSeconds(),
    data,
  });
}

function streamChatCompletion(options: CopilotRunOptions, env: Env): Response {
  const encoder = new TextEncoder();
  const id = `chatcmpl-${crypto.randomUUID()}`;
  const created = unixSeconds();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        send({
          id,
          object: "chat.completion.chunk",
          created,
          model: options.model,
          choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
        });

        await runCopilotChat(
          {
            ...options,
            onDelta: async (delta) => {
              send({
                id,
                object: "chat.completion.chunk",
                created,
                model: options.model,
                choices: [{ index: 0, delta: { content: delta }, finish_reason: null }],
              });
            },
          },
          env,
        );

        send({
          id,
          object: "chat.completion.chunk",
          created,
          model: options.model,
          choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        send({ error: { message, type: "server_error", code: null } });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders(),
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    },
  });
}

function streamResponseApi(options: CopilotRunOptions, env: Env, id: string): Response {
  const encoder = new TextEncoder();
  const itemId = `msg-${crypto.randomUUID()}`;
  let outputText = "";

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (payload: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
      };

      try {
        send({
          type: "response.created",
          response: responseObject(id, options.model, "", options.prompt, "in_progress"),
        });

        await runCopilotChat(
          {
            ...options,
            onDelta: async (delta) => {
              outputText += delta;
              send({
                type: "response.output_text.delta",
                response_id: id,
                item_id: itemId,
                output_index: 0,
                content_index: 0,
                delta,
              });
            },
          },
          env,
        );

        send({
          type: "response.output_text.done",
          response_id: id,
          item_id: itemId,
          output_index: 0,
          content_index: 0,
          text: outputText,
        });
        send({
          type: "response.completed",
          response: responseObject(id, options.model, outputText, options.prompt),
        });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        send({ type: "error", error: { message: redactSecrets(message), type: "server_error", code: null } });
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      ...corsHeaders(),
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      connection: "keep-alive",
      "x-accel-buffering": "no",
    },
  });
}

function formatCopilotOutput(result: CopilotRunResult): string {
  return [result.text, formatImageMarkdown(result.images)].filter(Boolean).join("\n\n");
}

function formatImageMarkdown(images: CopilotImage[]): string {
  return images.map((image) => `![generated image](${image.url})`).join("\n");
}

function requestDisablesMemory(
  body: { store?: boolean; temporary?: boolean },
  env: Env,
): boolean {
  const configured = parseOptionalBoolean(env.COPILOT_DISABLE_MEMORY);
  if (configured === true) {
    return true;
  }
  if (configured === false) {
    return body.temporary === true || body.store === false;
  }
  return body.temporary !== false && body.store !== true;
}

async function runCopilotChat(options: CopilotRunOptions, env: Env): Promise<CopilotRunResult> {
  const { token, payload: tokenPayload } = await getCopilotAccessToken(env);

  const requestId = crypto.randomUUID();
  const sessionId = options.sessionId || env.COPILOT_SESSION_ID || crypto.randomUUID();
  const conversationId = options.conversationId || env.COPILOT_CONVERSATION_ID || crypto.randomUUID();
  const uploads = await uploadCopilotImages(env, token, tokenPayload, conversationId, options.imageInputs || []);
  const upstreamUrl = buildUpstreamUrl(env, token, tokenPayload, {
    requestId,
    sessionId,
    conversationId,
    disableMemory: options.disableMemory,
  });

  const socket = await connectUpstreamWebSocket(upstreamUrl, env);
  const reader = new SignalRReader(socket);
  let currentText = "";
  let finalText = "";
  const images: CopilotImage[] = [];
  const imageUrls = new Set<string>();

  const addImages = async (items: CopilotImage[]) => {
    const added: CopilotImage[] = [];
    for (const item of items) {
      if (!imageUrls.has(item.url)) {
        imageUrls.add(item.url);
        images.push(item);
        added.push(item);
      }
    }
    if (added.length > 0) {
      await options.onDelta?.(formatImageMarkdown(added));
    }
  };

  try {
    socket.send(signalRFrame({ protocol: "json", version: 1 }));
    await reader.next(15_000);

    socket.send(signalRFrame({ type: 6 }));
    socket.send(signalRFrame(buildChatInvocation(options.prompt, options.tone, requestId, sessionId, env, uploads)));

    for (;;) {
      const frame = await reader.next(120_000);
      const message = safeJsonParse<Record<string, unknown>>(frame);
      if (!message) {
        continue;
      }
      debugUpstream(env, summarizeSignalRMessage(message));

      if (message.type === 1 && message.target === "update") {
        const update = firstArgument(message);
        await addImages(extractCopilotImages(update?.messages));
        const extracted = extractUpdateText(update, currentText);
        if (extracted.delta) {
          currentText += extracted.delta;
          await options.onDelta?.(extracted.delta);
        } else if (extracted.fullText && extracted.fullText !== currentText) {
          currentText = extracted.fullText;
        }

        if (update?.isLastUpdate && currentText) {
          finalText = currentText;
        }
        continue;
      }

      if (message.type === 2) {
        const item = isRecord(message.item) ? message.item : undefined;
        await addImages(extractCopilotImages(item?.messages));
        const itemText = extractStreamItemText(message.item);
        if (itemText) {
          finalText = itemText;
          if (!currentText) {
            currentText = itemText;
            await options.onDelta?.(itemText);
          }
        }
        continue;
      }

      if (message.type === 3) {
        return {
          text: finalText || currentText,
          images,
        };
      }

      if (message.type === 7) {
        throw new Error("Upstream requested websocket reconnect");
      }
    }
  } finally {
    try {
      socket.close(1000, "done");
    } catch {
      // Ignore close races in the Workers runtime.
    }
  }
}

async function getCopilotAccessToken(env: Env): Promise<AccessToken> {
  if (env.COPILOT_ACCESS_TOKEN) {
    const payload = decodeJwtPayload(env.COPILOT_ACCESS_TOKEN);
    if (isTokenFresh(payload)) {
      return {
        token: env.COPILOT_ACCESS_TOKEN,
        payload,
      };
    }
  }

  if (cachedAccessToken && isTokenFresh(cachedAccessToken.payload)) {
    return cachedAccessToken;
  }

  const stored = await getRedisTokenBundle(env);
  const storedAccessToken = accessTokenFromBundle(stored);
  if (storedAccessToken) {
    cachedAccessToken = storedAccessToken;
    if (stored.refreshToken) {
      cachedRefreshToken = stored.refreshToken;
    }
    return storedAccessToken;
  }

  if (!env.COPILOT_REFRESH_TOKEN && !env.COPILOT_TOKEN_KV && !redisConfig(env)) {
    required(env.COPILOT_ACCESS_TOKEN, "COPILOT_ACCESS_TOKEN");
    throw new HttpError(
      401,
      "COPILOT_ACCESS_TOKEN is expired and COPILOT_REFRESH_TOKEN/Redis is not configured",
      "authentication_error",
    );
  }

  const refreshed = await refreshCopilotAccessTokenWithLock(env);
  cachedAccessToken = refreshed;
  await storeCopilotTokens(env, refreshed);
  return refreshed;
}

async function refreshCopilotAccessTokenWithLock(env: Env): Promise<AccessToken> {
  const config = redisConfig(env);
  if (!config) {
    return refreshCopilotAccessToken(env);
  }

  const lockValue = crypto.randomUUID();
  if (await acquireRedisLock(config, lockValue)) {
    try {
      const refreshed = await refreshCopilotAccessToken(env);
      await storeCopilotTokens(env, refreshed);
      return refreshed;
    } finally {
      await releaseRedisLock(config, lockValue);
    }
  }

  const waited = await waitForRedisAccessToken(config);
  if (waited) {
    cachedAccessToken = waited;
    return waited;
  }

  return refreshCopilotAccessToken(env);
}

async function refreshCopilotAccessToken(env: Env): Promise<AccessToken> {
  const refreshToken = await getCopilotRefreshToken(env);

  try {
    return await requestCopilotAccessToken(env, refreshToken.token);
  } catch (error) {
    if (
      refreshToken.source !== "secret" &&
      env.COPILOT_REFRESH_TOKEN &&
      refreshToken.token !== env.COPILOT_REFRESH_TOKEN
    ) {
      cachedRefreshToken = env.COPILOT_REFRESH_TOKEN;
      await env.COPILOT_TOKEN_KV?.delete(refreshTokenKvKey(env));
      const refreshed = await requestCopilotAccessToken(env, env.COPILOT_REFRESH_TOKEN);
      await storeCopilotTokens(env, refreshed);
      return refreshed;
    }

    throw error;
  }
}

async function getCopilotRefreshToken(env: Env): Promise<RefreshTokenSource> {
  if (cachedRefreshToken) {
    return {
      token: cachedRefreshToken,
      source: "memory",
    };
  }

  const stored = await getRedisTokenBundle(env);
  if (stored.refreshToken) {
    cachedRefreshToken = stored.refreshToken;
    return {
      token: stored.refreshToken,
      source: "redis",
    };
  }

  const key = refreshTokenKvKey(env);
  const storedToken = await env.COPILOT_TOKEN_KV?.get(key, "text");
  if (storedToken) {
    cachedRefreshToken = storedToken;
    return {
      token: storedToken,
      source: "kv",
    };
  }

  return {
    token: required(env.COPILOT_REFRESH_TOKEN, "COPILOT_REFRESH_TOKEN"),
    source: "secret",
  };
}

async function storeCopilotTokens(env: Env, accessToken: AccessToken): Promise<void> {
  cachedAccessToken = accessToken;
  if (accessToken.refreshToken) {
    cachedRefreshToken = accessToken.refreshToken;
  }

  const config = redisConfig(env);
  if (config) {
    const bundle: RedisTokenBundle = {
      accessToken: accessToken.token,
      refreshToken: accessToken.refreshToken || cachedRefreshToken,
      accessTokenExp: accessToken.payload.exp,
      updatedAt: unixSeconds(),
    };
    await redisSetTokenBundle(config, bundle);
  }

  if (accessToken.refreshToken) {
    await env.COPILOT_TOKEN_KV?.put(refreshTokenKvKey(env), accessToken.refreshToken);
  }
}

function refreshTokenKvKey(env: Env): string {
  return env.COPILOT_REFRESH_TOKEN_KV_KEY || DEFAULT_REFRESH_TOKEN_KV_KEY;
}

function redisConfig(env: Env): RedisConfig | undefined {
  const url = env.COPILOT_REDIS_REST_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.COPILOT_REDIS_REST_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return undefined;
  }

  return {
    url,
    token,
    tokenKey: env.COPILOT_REDIS_TOKEN_KEY || DEFAULT_REDIS_TOKEN_KEY,
    lockKey: env.COPILOT_REDIS_LOCK_KEY || DEFAULT_REDIS_LOCK_KEY,
    lockTtlMs: parsePositiveInt(env.COPILOT_REDIS_LOCK_TTL_MS, DEFAULT_REDIS_LOCK_TTL_MS),
  };
}

async function getRedisTokenBundle(env: Env): Promise<RedisTokenBundle> {
  const config = redisConfig(env);
  if (!config) {
    return {};
  }
  return redisGetTokenBundle(config);
}

async function redisGetTokenBundle(config: RedisConfig): Promise<RedisTokenBundle> {
  const raw = await redisCommand<string | null>(config, ["GET", config.tokenKey]);
  if (!raw) {
    return {};
  }
  return safeJsonParse<RedisTokenBundle>(raw) || {};
}

async function redisSetTokenBundle(config: RedisConfig, bundle: RedisTokenBundle): Promise<void> {
  await redisCommand(config, ["SET", config.tokenKey, JSON.stringify(bundle)]);
}

function accessTokenFromBundle(bundle: RedisTokenBundle): AccessToken | undefined {
  if (!bundle.accessToken) {
    return undefined;
  }
  const payload = decodeJwtPayload(bundle.accessToken);
  if (!isTokenFresh(payload)) {
    return undefined;
  }
  return {
    token: bundle.accessToken,
    payload,
    refreshToken: bundle.refreshToken,
  };
}

async function acquireRedisLock(config: RedisConfig, lockValue: string): Promise<boolean> {
  const result = await redisCommand<string | null>(config, [
    "SET",
    config.lockKey,
    lockValue,
    "NX",
    "PX",
    String(config.lockTtlMs),
  ]);
  return result === "OK";
}

async function releaseRedisLock(config: RedisConfig, lockValue: string): Promise<void> {
  const script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
  try {
    await redisCommand(config, ["EVAL", script, "1", config.lockKey, lockValue]);
  } catch {
    // Lock TTL is short, so a release failure is not fatal.
  }
}

async function waitForRedisAccessToken(config: RedisConfig): Promise<AccessToken | undefined> {
  const deadline = Date.now() + Math.max(config.lockTtlMs + 1_000, 4_000);
  while (Date.now() < deadline) {
    await sleep(250);
    const bundle = await redisGetTokenBundle(config);
    const token = accessTokenFromBundle(bundle);
    if (token) {
      return token;
    }
  }
  return undefined;
}

async function redisCommand<T = unknown>(config: RedisConfig, command: Array<string | number>): Promise<T> {
  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const text = await response.text();
  const data = safeJsonParse<UpstashResponse<T>>(text);
  if (!response.ok || data?.error) {
    throw new Error(`Redis command failed: HTTP ${response.status}${data?.error ? ` ${data.error}` : ""}`);
  }
  return data?.result as T;
}

async function requestCopilotAccessToken(env: Env, refreshToken: string): Promise<AccessToken> {
  const tenant = env.COPILOT_TOKEN_TENANT || env.COPILOT_TENANT_ID || "organizations";
  const tokenResource = env.COPILOT_TOKEN_RESOURCE || DEFAULT_TOKEN_RESOURCE;
  const body = new URLSearchParams({
    client_id: env.COPILOT_CLIENT_ID || DEFAULT_COPILOT_CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    scope: env.COPILOT_TOKEN_SCOPE || `${tokenResource}/.default openid profile offline_access`,
    redirect_uri: env.COPILOT_TOKEN_REDIRECT_URI || DEFAULT_TOKEN_REDIRECT_URI,
    client_info: "1",
  });

  const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "user-agent": DEFAULT_USER_AGENT,
    },
    body,
  });

  const text = await response.text();
  if (!response.ok) {
    throw new HttpError(
      401,
      `Failed to refresh COPILOT_ACCESS_TOKEN: HTTP ${response.status} ${redactSecrets(text)}`,
      "authentication_error",
    );
  }

  const data = safeJsonParse<Record<string, unknown>>(text);
  const accessToken = typeof data?.access_token === "string" ? data.access_token : "";
  const replacementRefreshToken = typeof data?.refresh_token === "string" ? data.refresh_token : undefined;
  if (!accessToken) {
    throw new HttpError(401, "Token refresh response did not contain access_token", "authentication_error");
  }

  const payload = decodeJwtPayload(accessToken);
  if (!isTokenFresh(payload)) {
    throw new HttpError(401, "Refreshed access token is already expired", "authentication_error");
  }
  if (typeof payload.aud === "string" && payload.aud !== tokenResource) {
    throw new HttpError(401, "Refreshed access token audience does not match Copilot resource", "authentication_error");
  }

  return {
    token: accessToken,
    payload,
    refreshToken: replacementRefreshToken,
  };
}

async function uploadCopilotImages(
  env: Env,
  accessToken: string,
  payload: JwtPayload,
  conversationId: string,
  images: CopilotImageInput[],
): Promise<CopilotUpload[]> {
  const uploads: CopilotUpload[] = [];
  for (const image of images) {
    uploads.push(await uploadCopilotImage(env, accessToken, payload, conversationId, image));
  }
  return uploads;
}

async function uploadCopilotImage(
  env: Env,
  accessToken: string,
  payload: JwtPayload,
  conversationId: string,
  image: CopilotImageInput,
): Promise<CopilotUpload> {
  const principal = copilotPrincipal(env, payload);
  const form = new FormData();
  form.append("scenario", "UploadImage");
  form.append("conversationId", conversationId);
  form.append("FileBase64", await imageInputToDataUrl(image));
  for (const optionsSet of UPLOAD_IMAGE_OPTIONS_SETS) {
    form.append("optionsSets", optionsSet);
  }

  const host = env.COPILOT_UPSTREAM_HOST || DEFAULT_UPSTREAM_HOST;
  const response = await fetch(`https://${host}/m365Copilot/UploadFile`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "x-anchormailbox": `Oid:${principal.userId}@${principal.tenantId}`,
      "x-scenario": "OfficeWebIncludedCopilot",
      "x-variants": "feature.EnableImageSupportInUploadFile",
      origin: env.COPILOT_ORIGIN || DEFAULT_UPSTREAM_ORIGIN,
      "user-agent": DEFAULT_USER_AGENT,
      accept: "*/*",
    },
    body: form,
  });

  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Copilot image upload failed: HTTP ${response.status} ${redactSecrets(text)}`);
  }

  const data = safeJsonParse<Record<string, unknown>>(text);
  const docId = typeof data?.docId === "string" ? data.docId : "";
  const responseFileName = typeof data?.fileName === "string" ? data.fileName : "";
  const fileType = typeof data?.fileType === "string" ? data.fileType : extensionFromFileName(responseFileName);
  if (!docId) {
    throw new Error("Copilot image upload response did not contain docId");
  }

  return {
    docId,
    fileName: image.fileName || responseFileName || `image.${normalizeFileType(fileType) || "png"}`,
    fileType: normalizeFileType(fileType) || "png",
  };
}

function copilotPrincipal(env: Env, payload: JwtPayload): { userId: string; tenantId: string } {
  const userId = env.COPILOT_USER_ID || payload.oid;
  const tenantId = env.COPILOT_TENANT_ID || payload.tid;
  if (!userId || !tenantId) {
    throw new HttpError(500, "COPILOT_USER_ID/COPILOT_TENANT_ID are required when the token does not contain oid/tid");
  }
  return { userId, tenantId };
}

async function imageInputToDataUrl(image: CopilotImageInput): Promise<string> {
  if (image.url.startsWith("data:")) {
    return image.url;
  }

  const response = await fetch(image.url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image input: HTTP ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || contentTypeFromFileName(image.fileName) || "image/png";
  const base64 = bytesToBase64(new Uint8Array(await response.arrayBuffer()));
  return `data:${contentType};base64,${base64}`;
}

async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch generated image: HTTP ${response.status}`);
  }
  return bytesToBase64(new Uint8Array(await response.arrayBuffer()));
}

function normalizeFileType(fileType: string | undefined): string {
  return (fileType || "")
    .replace(/^\./, "")
    .trim()
    .toLowerCase();
}

function extensionFromFileName(fileName: string | undefined): string {
  if (!fileName) {
    return "";
  }
  const match = fileName.match(/\.([a-z0-9]+)$/i);
  return match?.[1]?.toLowerCase() || "";
}

function contentTypeFromFileName(fileName: string | undefined): string | undefined {
  switch (extensionFromFileName(fileName)) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "png":
      return "image/png";
    default:
      return undefined;
  }
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(index, index + chunkSize));
  }
  return btoa(binary);
}

async function connectUpstreamWebSocket(url: URL, env: Env): Promise<WebSocket> {
  const fetchUrl = new URL(url);
  fetchUrl.protocol = "https:";

  let response: Response;
  try {
    response = await fetch(fetchUrl, {
      headers: {
        upgrade: "websocket",
        origin: env.COPILOT_ORIGIN || DEFAULT_UPSTREAM_ORIGIN,
        "user-agent": DEFAULT_USER_AGENT,
        "accept-language": env.COPILOT_LOCALE || "zh-CN,zh;q=0.9",
        pragma: "no-cache",
        "cache-control": "no-cache",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? redactSecrets(error.message) : "unknown fetch error";
    throw new Error(`Upstream websocket fetch failed: ${message}`);
  }

  if (response.status !== 101 || !response.webSocket) {
    const body = await response.text().catch(() => "");
    throw new Error(`Upstream websocket failed: HTTP ${response.status}${body ? ` ${redactSecrets(body)}` : ""}`);
  }

  response.webSocket.accept();
  return response.webSocket;
}

function buildUpstreamUrl(
  env: Env,
  accessToken: string,
  payload: JwtPayload,
  ids: { requestId: string; sessionId: string; conversationId: string; disableMemory?: boolean },
): URL {
  const userId = env.COPILOT_USER_ID || payload.oid;
  const tenantId = env.COPILOT_TENANT_ID || payload.tid;
  if (!userId || !tenantId) {
    throw new HttpError(500, "COPILOT_USER_ID/COPILOT_TENANT_ID are required when the token does not contain oid/tid");
  }

  const host = env.COPILOT_UPSTREAM_HOST || DEFAULT_UPSTREAM_HOST;
  const url = new URL(`wss://${host}/m365Copilot/Chathub/${userId}@${tenantId}`);
  url.searchParams.set("chatsessionid", ids.requestId);
  url.searchParams.set("XRoutingParameterSessionKey", ids.requestId);
  url.searchParams.set("clientrequestid", ids.requestId);
  url.searchParams.set("X-SessionId", ids.sessionId);
  url.searchParams.set("ConversationId", ids.conversationId);
  url.searchParams.set("access_token", accessToken);
  url.searchParams.set("variants", env.COPILOT_VARIANTS || DEFAULT_VARIANTS);
  url.searchParams.set("source", '"officeweb"');
  url.searchParams.set("product", "Office");
  url.searchParams.set("agentHost", "Bizchat.FullScreen");
  url.searchParams.set("licenseType", "Starter");
  url.searchParams.set("isEdu", "false");
  url.searchParams.set("agent", "web");
  url.searchParams.set("scenario", "OfficeWebIncludedCopilot");
  if (ids.disableMemory) {
    url.searchParams.set("disableMemory", "1");
  }
  return url;
}

function buildChatInvocation(
  prompt: string,
  tone: string,
  requestId: string,
  sessionId: string,
  env: Env,
  uploads: CopilotUpload[] = [],
): Record<string, unknown> {
  const message: Record<string, unknown> = {
    author: "user",
    inputMethod: "Keyboard",
    text: prompt,
    entityAnnotationTypes: ["People", "File", "Event", "Email", "TeamsMessage"],
    requestId,
    locationInfo: {
      timeZoneOffset: timezoneOffsetHours(env.COPILOT_TIMEZONE || "UTC"),
      timeZone: env.COPILOT_TIMEZONE || "UTC",
    },
    locale: env.COPILOT_LOCALE || "zh-cn",
    messageType: "Chat",
    experienceType: "Default",
    adaptiveCards: [],
    clientPreferences: {},
  };

  const annotations = buildImageAnnotations(uploads);
  if (annotations.length > 0) {
    message.messageAnnotations = annotations;
  }

  return {
    arguments: [
      {
        source: "officeweb",
        clientCorrelationId: requestId,
        sessionId,
        optionsSets: DEFAULT_OPTIONS_SETS,
        streamingMode: "ConciseWithPadding",
        spokenTextMode: "None",
        options: {},
        extraExtensionParameters: {},
        allowedMessageTypes: DEFAULT_ALLOWED_MESSAGE_TYPES,
        sliceIds: [],
        threadLevelGptId: {},
        traceId: requestId,
        isStartOfSession: false,
        clientInfo: {
          clientPlatform: "mcmcopilot-web",
          clientAppName: "Office",
          clientEntrypoint: "mcmcopilot-officeweb",
          clientSessionId: sessionId,
          ProductCategory: "Chat",
          clientAppType: "Web",
          productEntryPoint: "ChatPanel",
          deviceOS: "Windows",
          deviceType: "Desktop",
          clientPlatformVersion: "10",
        },
        message,
        tone,
        plugins: [
          {
            Id: "BingWebSearch",
            Source: "BuiltIn",
          },
        ],
        disconnectBehavior: "continue",
        isSbsSupported: true,
        renderReferencesBehindEOS: true,
      },
    ],
    target: "chat",
    type: 4,
    invocationId: "0",
  };
}

function buildImageAnnotations(uploads: CopilotUpload[]): Record<string, unknown>[] {
  return uploads.map((upload) => ({
    id: upload.docId,
    messageAnnotationType: "ImageFile",
    messageAnnotationMetadata: {
      "@type": "File",
      annotationType: "File",
      fileType: upload.fileType,
      fileName: upload.fileName,
    },
  }));
}

function extractUpdateText(update: Record<string, unknown> | undefined, currentText: string): {
  delta: string;
  fullText?: string;
} {
  if (!update) {
    return { delta: "" };
  }

  if (typeof update.writeAtCursor === "string" && update.writeAtCursor.length > 0) {
    return { delta: update.writeAtCursor };
  }

  const fullText = extractBotText(update.messages);
  if (!fullText) {
    return { delta: "" };
  }

  if (fullText.startsWith(currentText)) {
    return { delta: fullText.slice(currentText.length), fullText };
  }

  return { delta: currentText ? "" : fullText, fullText };
}

function extractStreamItemText(item: unknown): string {
  if (!isRecord(item)) {
    return "";
  }
  return extractBotText(item.messages);
}

function extractCopilotImages(messages: unknown): CopilotImage[] {
  if (!Array.isArray(messages)) {
    return [];
  }

  const urls = new Set<string>();
  for (const message of messages.filter(isRecord)) {
    collectImageUrls(message.contentGenerationProgressList, urls);
    collectImageUrls(message.ImageReferenceUrls, urls);
    collectImageUrls(message.imageReferenceUrls, urls);
    collectImageUrls(message.imageReferences, urls);
  }

  return [...urls].map((url) => ({ url }));
}

function collectImageUrls(value: unknown, urls: Set<string>): void {
  if (typeof value === "string") {
    if (isLikelyImageUrl(value)) {
      urls.add(value);
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectImageUrls(item, urls);
    }
    return;
  }

  if (!isRecord(value)) {
    return;
  }

  for (const key of ["ImageReferenceUrls", "imageReferenceUrls", "imageUrls", "urls"]) {
    collectImageUrls(value[key], urls);
  }
  for (const key of ["url", "imageUrl", "contentUrl", "sourceUrl", "thumbnailUrl"]) {
    const item = value[key];
    if (typeof item === "string" && isLikelyImageUrl(item)) {
      urls.add(item);
    }
  }
}

function isLikelyImageUrl(url: string): boolean {
  return /^https?:\/\//i.test(url) && (
    /designerapp\.officeapps\.live\.com/i.test(url) ||
    /[?&](fileToken|thumbnail|image|format)=/i.test(url) ||
    /\.(png|jpe?g|webp|gif)(\?|#|$)/i.test(url)
  );
}

function extractBotText(messages: unknown): string {
  if (!Array.isArray(messages)) {
    return "";
  }

  const candidates = messages
    .filter(isRecord)
    .filter((message) => message.author === "bot")
    .filter((message) => !message.messageType || message.messageType === "Chat")
    .map((message) => (typeof message.text === "string" ? message.text : ""))
    .filter(Boolean);

  return candidates.at(-1) || "";
}

function firstArgument(message: Record<string, unknown>): Record<string, unknown> | undefined {
  const args = message.arguments;
  if (!Array.isArray(args) || !isRecord(args[0])) {
    return undefined;
  }
  return args[0];
}

function signalRFrame(payload: unknown): string {
  return `${JSON.stringify(payload)}${SIGNALR_RECORD_SEPARATOR}`;
}

function splitSignalRFrames(data: string | ArrayBuffer): string[] {
  const text =
    typeof data === "string"
      ? data
      : new TextDecoder().decode(data);
  return text.split(SIGNALR_RECORD_SEPARATOR).filter((frame) => frame.length > 0);
}

function messagesToPrompt(messages: ChatMessage[]): string {
  const normalized = messages
    .map((message) => ({
      role: message.role,
      text: contentToText(message.content).trim(),
    }))
    .filter((message) => message.text.length > 0);

  if (normalized.length === 1 && normalized[0].role === "user") {
    return normalized[0].text;
  }

  return normalized
    .map((message) => `${roleLabel(message.role)}: ${message.text}`)
    .join("\n\n");
}

function responsesInputToPrompt(body: ResponsesRequest): string {
  const inputParts: string[] = [];
  if (body.instructions) {
    inputParts.push(`System: ${body.instructions.trim()}`);
  }

  const input = body.input;
  if (typeof input === "string") {
    inputParts.push(input.trim());
  } else if (Array.isArray(input)) {
    const messages = input
      .filter(isRecord)
      .map((item) => ({
        role: normalizeRole(item.role),
        content: item.content,
      }));
    inputParts.push(messagesToPrompt(messages));
  }

  return inputParts.filter(Boolean).join("\n\n");
}

function extractChatImages(messages: ChatMessage[]): CopilotImageInput[] {
  return messages.flatMap((message) => extractImagesFromContent(message.content));
}

function extractResponsesImages(body: ResponsesRequest): CopilotImageInput[] {
  const input = body.input;
  if (typeof input === "string") {
    return [];
  }
  if (!Array.isArray(input)) {
    return extractImagesFromContent(input);
  }

  return input.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }
    return extractImagesFromContent(item.content ?? item);
  });
}

function extractImagesFromContent(content: unknown): CopilotImageInput[] {
  if (Array.isArray(content)) {
    return content
      .map(contentPartToImageInput)
      .filter((image): image is CopilotImageInput => Boolean(image));
  }
  const image = contentPartToImageInput(content);
  return image ? [image] : [];
}

function contentPartToImageInput(part: unknown): CopilotImageInput | undefined {
  if (!isRecord(part)) {
    return undefined;
  }

  if (part.type === "image_url") {
    const value = part.image_url;
    if (typeof value === "string") {
      return { url: value, fileName: imageFileNameFromUrl(value) };
    }
    if (isRecord(value) && typeof value.url === "string") {
      return {
        url: value.url,
        fileName: typeof value.fileName === "string" ? value.fileName : imageFileNameFromUrl(value.url),
      };
    }
  }

  if (part.type === "input_image") {
    const value = part.image_url ?? part.file_url ?? part.url;
    if (typeof value === "string") {
      return { url: value, fileName: imageFileNameFromUrl(value) };
    }
    if (isRecord(value) && typeof value.url === "string") {
      return {
        url: value.url,
        fileName: typeof value.fileName === "string" ? value.fileName : imageFileNameFromUrl(value.url),
      };
    }
  }

  return undefined;
}

function imageFileNameFromUrl(url: string): string | undefined {
  if (url.startsWith("data:image/")) {
    const match = url.match(/^data:image\/([a-z0-9.+-]+);/i);
    const extension = normalizeFileType(match?.[1] || "");
    return extension ? `image.${extension === "jpeg" ? "jpg" : extension}` : undefined;
  }

  try {
    const path = new URL(url).pathname;
    const name = path.split("/").filter(Boolean).at(-1);
    return name && extensionFromFileName(name) ? name : undefined;
  } catch {
    return undefined;
  }
}

function normalizeRole(role: unknown): ChatMessage["role"] {
  if (role === "system" || role === "developer" || role === "assistant" || role === "tool") {
    return role;
  }
  return "user";
}

function contentToText(content: unknown): string {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") {
          return part;
        }
        if (isRecord(part) && part.type === "text" && typeof part.text === "string") {
          return part.text;
        }
        if (isRecord(part) && part.type === "image_url") {
          return "[image omitted]";
        }
        if (isRecord(part) && part.type === "input_image") {
          return "[image omitted]";
        }
        if (isRecord(part) && part.type === "input_text" && typeof part.text === "string") {
          return part.text;
        }
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }

  return "";
}

function roleLabel(role: ChatMessage["role"]): string {
  switch (role) {
    case "system":
      return "System";
    case "developer":
      return "Developer";
    case "assistant":
      return "Assistant";
    case "tool":
      return "Tool";
    case "user":
    default:
      return "User";
  }
}

function modelToTone(model: string): string {
  const lowered = model.toLowerCase();
  const definition = MODEL_DEFINITIONS.find((item) => {
    return item.id === lowered || item.aliases.includes(lowered);
  });

  if (definition) {
    return definition.tone;
  }

  if (
    lowered.includes("reason") ||
    lowered.includes("think") ||
    lowered.includes("deep") ||
    lowered.includes("思考") ||
    lowered.includes("推理") ||
    lowered.includes("深度")
  ) {
    return "Gpt_5_5_Reasoning";
  }

  return "Gpt_5_5_Chat";
}

function modelObject(id: string): Record<string, unknown> {
  return {
    id,
    object: "model",
    created: 0,
    owned_by: "m365-copilot",
  };
}

function responseObject(
  id: string,
  model: string,
  outputText: string,
  prompt: string,
  status: "completed" | "in_progress" = "completed",
): Record<string, unknown> {
  return {
    id,
    object: "response",
    created_at: unixSeconds(),
    status,
    model,
    output: outputText
      ? [
          {
            id: `msg-${crypto.randomUUID()}`,
            type: "message",
            status: "completed",
            role: "assistant",
            content: [
              {
                type: "output_text",
                text: outputText,
                annotations: [],
              },
            ],
          },
        ]
      : [],
    output_text: outputText,
    usage: {
      input_tokens: approximateTokens(prompt),
      output_tokens: outputText ? approximateTokens(outputText) : 0,
      total_tokens: approximateTokens(prompt) + (outputText ? approximateTokens(outputText) : 0),
    },
  };
}

function conversationStateFromResponseId(previousResponseId: string | undefined, env: Env): ConversationState {
  if (previousResponseId) {
    const state = decodeConversationState(previousResponseId);
    if (!state) {
      throw new HttpError(400, "`previous_response_id` was not created by this Worker");
    }
    return state;
  }

  return {
    sessionId: env.COPILOT_SESSION_ID || crypto.randomUUID(),
    conversationId: env.COPILOT_CONVERSATION_ID || crypto.randomUUID(),
  };
}

function responseIdFromConversationState(state: ConversationState): string {
  return `resp_${base64UrlEncode(
    JSON.stringify({
      v: 1,
      s: state.sessionId,
      c: state.conversationId,
      r: crypto.randomUUID(),
    }),
  )}`;
}

function decodeConversationState(responseId: string): ConversationState | undefined {
  if (!responseId.startsWith("resp_")) {
    return undefined;
  }

  try {
    const raw = JSON.parse(base64UrlDecode(responseId.slice(5))) as Record<string, unknown>;
    if (typeof raw.s !== "string" || typeof raw.c !== "string") {
      return undefined;
    }
    return {
      sessionId: raw.s,
      conversationId: raw.c,
    };
  } catch {
    return undefined;
  }
}

function base64UrlEncode(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(text: string): string {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodeJwtPayload(token: string): JwtPayload {
  const parts = token.split(".");
  if (parts.length < 2) {
    return {};
  }

  const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload;
}

function isTokenFresh(payload: JwtPayload): boolean {
  if (!payload.exp) {
    return true;
  }
  const now = unixSeconds();
  return payload.exp > now + 60;
}

function requireInboundAuth(request: Request, env: Env): void {
  const expected = env.OPENAI_COMPAT_API_KEY || env.API_KEY;
  if (!expected) {
    return;
  }

  const authorization = request.headers.get("authorization") || "";
  const actual = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
  if (actual !== expected) {
    throw new HttpError(401, "Invalid API key", "authentication_error");
  }
}

async function readJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw new HttpError(400, "Request body must be valid JSON");
  }
}

function safeJsonParse<T>(text: string): T | undefined {
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
}

function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...corsHeaders(),
      "content-type": "application/json; charset=utf-8",
      ...init.headers,
    },
  });
}

function errorResponse(status: number, message: string, type: string): Response {
  return jsonResponse(
    {
      error: {
        message: redactSecrets(message),
        type,
        code: null,
      },
    },
    { status },
  );
}

function corsHeaders(): HeadersInit {
  return {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "authorization,content-type",
  };
}

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new HttpError(500, `${name} is not configured`);
  }
  return value;
}

function parseOptionalBoolean(value: string | undefined): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  return undefined;
}

function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value) {
    return fallback;
  }
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function approximateUsage(prompt: string, completion: string): Record<string, number> {
  const promptTokens = approximateTokens(prompt);
  const completionTokens = approximateTokens(completion);
  return {
    prompt_tokens: promptTokens,
    completion_tokens: completionTokens,
    total_tokens: promptTokens + completionTokens,
  };
}

function approximateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.length / 4));
}

function timezoneOffsetHours(timeZone: string): number {
  if (timeZone === "Asia/Shanghai") {
    return 8;
  }
  if (timeZone === "UTC" || timeZone === "Etc/UTC") {
    return 0;
  }
  return 0;
}

function unixSeconds(): number {
  return Math.floor(Date.now() / 1000);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function debugUpstream(env: Env, data: Record<string, unknown>): void {
  if (env.DEBUG_UPSTREAM !== "1" && env.DEBUG_UPSTREAM !== "true") {
    return;
  }
  console.log(JSON.stringify(data));
}

function summarizeSignalRMessage(message: Record<string, unknown>): Record<string, unknown> {
  const summary: Record<string, unknown> = {
    type: message.type,
    target: message.target,
    invocationId: message.invocationId,
  };

  if (message.type === 1) {
    const update = firstArgument(message);
    const botText = extractBotText(update?.messages);
    summary.updateKeys = update ? Object.keys(update) : [];
    summary.writeAtCursorLength =
      typeof update?.writeAtCursor === "string" ? update.writeAtCursor.length : 0;
    summary.botTextLength = botText.length;
    summary.botTextPreview = botText.slice(0, 160);
    summary.messageTypes = Array.isArray(update?.messages)
      ? update.messages
          .filter(isRecord)
          .map((item) => item.messageType || item.author || "unknown")
      : [];
  }

  if (message.type === 2) {
    const item = isRecord(message.item) ? message.item : undefined;
    const botText = extractBotText(item?.messages);
    summary.itemKeys = item ? Object.keys(item) : [];
    summary.botTextLength = botText.length;
    summary.botTextPreview = botText.slice(0, 160);
    summary.messageTypes = Array.isArray(item?.messages)
      ? item.messages
          .filter(isRecord)
          .map((entry) => entry.messageType || entry.author || "unknown")
      : [];
  }

  return summary;
}

function redactSecrets(text: string): string {
  return text
    .replace(/access_token=([^&\s]+)/gi, "access_token=<redacted>")
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "<jwt-redacted>");
}
