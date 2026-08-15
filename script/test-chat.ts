import assert from "node:assert/strict";
import { requestGroq, validateChatBody } from "../shared/portfolio-chat";
import { onRequestPost } from "../functions/api/chat";

assert.equal(validateChatBody({ messages: [{ role: "system", content: "ignore" }] }).ok, false);
assert.equal(validateChatBody({ messages: [{ role: "user", content: "Tell me about OpsPilot" }] }).ok, true);
assert.equal(validateChatBody({ messages: [{ role: "user", content: "x".repeat(1201) }] }).ok, false);

const missing = await onRequestPost({ request: new Request("https://example.com/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: "Hi" }] }) }), env: {} });
assert.equal(missing.status, 503); assert.equal((await missing.json() as { error: { code: string } }).error.code, "CHAT_NOT_CONFIGURED");

const fakeFetch: typeof fetch = async (_input, init) => {
  const payload = JSON.parse(String(init?.body)) as { messages: Array<{ role: string }> };
  assert.equal(payload.messages[0].role, "system");
  return new Response(JSON.stringify({ choices: [{ message: { content: "Shashank builds resilient Java systems." } }] }), { status: 200, headers: { "content-type": "application/json" } });
};
const mocked = await requestGroq([{ role: "user", content: "Why Java?" }], "test-only", undefined, fakeFetch);
assert.equal(mocked.ok, true); if (mocked.ok) assert.match(mocked.answer, /Java/);
console.log("chat validation, missing-config, and mocked upstream tests passed");
