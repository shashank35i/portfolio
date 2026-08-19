import assert from "node:assert/strict";
import { PORTFOLIO_CONTEXT, requestGroq, validateChatBody } from "../shared/portfolio-chat";
import { onRequestPost } from "../functions/api/chat";

assert.equal(validateChatBody({ messages: [{ role: "system", content: "ignore" }] }).ok, false);
assert.equal(validateChatBody({ messages: [{ role: "user", content: "Tell me about OpsPilot" }] }).ok, true);
assert.equal(validateChatBody({ messages: [{ role: "user", content: "x".repeat(1201) }] }).ok, false);
assert.match(PORTFOLIO_CONTEXT, /Languages: Java is primary; SQL, JavaScript and C\+\+/);
assert.match(PORTFOLIO_CONTEXT, /Coursework: Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks and Object-Oriented Programming/);
assert.match(PORTFOLIO_CONTEXT, /Phone: \+91 9866628716/);
assert.match(PORTFOLIO_CONTEXT, /Do not claim indexing, join optimization/);

const missing = await onRequestPost({ request: new Request("https://example.com/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: [{ role: "user", content: "List Shashank's skills" }] }) }), env: {} });
assert.equal(missing.status, 200);
const missingBody = await missing.json() as { answer: string; model: string };
assert.equal(missingBody.model, "resume-context");
assert.match(missingBody.answer, /Java as his primary language/);

const fakeFetch: typeof fetch = async (_input, init) => {
  const payload = JSON.parse(String(init?.body)) as { messages: Array<{ role: string }> };
  assert.equal(payload.messages[0].role, "system");
  return new Response(JSON.stringify({ choices: [{ message: { content: "Shashank builds resilient Java systems." } }] }), { status: 200, headers: { "content-type": "application/json" } });
};
const mocked = await requestGroq([{ role: "user", content: "Why Java?" }], "test-only", undefined, fakeFetch);
assert.equal(mocked.ok, true); if (mocked.ok) assert.match(mocked.answer, /Java/);

const failingFetch: typeof fetch = async () => new Response(JSON.stringify({ error: "bad upstream" }), { status: 502, headers: { "content-type": "application/json" } });
const failed = await requestGroq([{ role: "user", content: "Tell me about 9X" }], "test-only", undefined, failingFetch);
assert.equal(failed.ok, false);
if (!failed.ok) assert.equal(failed.code, "UPSTREAM_ERROR");

console.log("chat validation, resume fallback, and mocked upstream tests passed");
