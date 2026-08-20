import { requestGroq, validateChatBody } from "../../shared/portfolio-chat";

type Env = { GROQ_API_KEY?: string; GROQ_MODEL?: string };
type PagesContext = { request: Request; env: Env };
const visits = new Map<string, { count: number; reset: number }>();

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const size = Number(context.request.headers.get("content-length") || 0);
  if (size > 16000) return Response.json({ error: { code: "PAYLOAD_TOO_LARGE", message: "Request is too large." } }, { status: 413 });
  const ip = context.request.headers.get("cf-connecting-ip") || "unknown"; const now = Date.now(); const current = visits.get(ip);
  if (current && current.reset > now && current.count >= 12) return Response.json({ error: { code: "RATE_LIMITED", message: "Too many requests. Please try again shortly." } }, { status: 429, headers: { "retry-after": "60" } });
  visits.set(ip, !current || current.reset <= now ? { count: 1, reset: now + 60000 } : { ...current, count: current.count + 1 });
  let body: unknown; try { body = await context.request.json(); } catch { return Response.json({ error: { code: "INVALID_JSON", message: "Request body must be JSON." } }, { status: 400 }); }
  const valid = validateChatBody(body); if (!valid.ok) return Response.json({ error: { code: valid.code, message: valid.message } }, { status: 400 });
  if (!context.env.GROQ_API_KEY) return Response.json({ error: { code: "CHAT_NOT_CONFIGURED", message: "Portfolio chat is not configured yet." } }, { status: 503 });
  const result = await requestGroq(valid.messages, context.env.GROQ_API_KEY, context.env.GROQ_MODEL);
  if (!result.ok) return Response.json({ error: { code: result.code, message: result.message, upstreamStatus: result.upstreamStatus, upstreamBody: result.upstreamBody } }, { status: result.status, headers: result.retryAfter ? { "retry-after": result.retryAfter } : undefined });
  return Response.json({ answer: result.answer, model: result.model });
}

function methodNotAllowed(): Response { return Response.json({ error: { code: "METHOD_NOT_ALLOWED", message: "Use POST /api/chat." } }, { status: 405, headers: { allow: "POST" } }); }
export const onRequestGet = methodNotAllowed;
export const onRequestPut = methodNotAllowed;
export const onRequestPatch = methodNotAllowed;
export const onRequestDelete = methodNotAllowed;
