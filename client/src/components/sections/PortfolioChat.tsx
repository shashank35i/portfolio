import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { ArrowUp, MessageCircle, RotateCcw, Sparkles, Briefcase, Code2, Zap, BookOpen } from "lucide-react";
import { compactChatHistory, type ChatMessage } from "@shared/portfolio-chat";

const starters = [
  { icon: Briefcase, label: "Java backend fit", prompt: "Why is Shashank a strong Java backend candidate?" },
  { icon: Zap,       label: "OpsPilot AI",      prompt: "Explain OpsPilot-AI in 30 seconds." },
  { icon: BookOpen,  label: "9X internship",     prompt: "What did Shashank work on at 9X IT Solutions?" },
  { icon: Code2,     label: "Android projects",  prompt: "Which projects show Android experience?" },
];

function SafeText({ text }: { text: string }) {
  const inline = (content: string) =>
    content.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i} className="font-semibold text-[#111]">{part.slice(2, -2)}</strong>;
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        try {
          const url = new URL(link[2]);
          if (!["http:", "https:", "mailto:"].includes(url.protocol)) throw new Error();
          return <a key={i} href={url.href} target="_blank" rel="noopener noreferrer"
            className="text-[#c84b1f] underline underline-offset-2 decoration-[#c84b1f]/30 hover:decoration-[#c84b1f] transition-all">{link[1]}</a>;
        } catch { return <span key={i}>{part}</span>; }
      }
      return <span key={i}>{part}</span>;
    });
  return (
    <div className="space-y-1.5 text-[13.5px] leading-[1.65] text-[#333]">
      {text.split("\n").map((line, i) => {
        const bullet = /^[-*]\s+/.test(line);
        const content = line.replace(/^[-*]\s+/, "");
        return bullet
          ? <div key={i} className="flex items-start gap-2"><span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#c84b1f]/50" /><p>{inline(content)}</p></div>
          : line ? <p key={i}>{inline(content)}</p>
          : <div key={i} className="h-1" />;
      })}
    </div>
  );
}

function ThinkingDots() {
  return (
    <span className="inline-flex items-center gap-[3px] py-0.5">
      {[0, 160, 320].map(d => (
        <span key={d} className="block h-[5px] w-[5px] rounded-full bg-[#c84b1f]/40 animate-bounce"
          style={{ animationDelay: `${d}ms`, animationDuration: "1.1s" }} />
      ))}
    </span>
  );
}

export function ChatLauncher() {
  const [, navigate] = useLocation();
  return (
    <button type="button"
      onClick={() => { navigate("/chat"); setTimeout(() => window.dispatchEvent(new Event("portfolio-chat-focus")), 100); }}
      aria-label="Ask about Shashank"
      className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-white text-[#333] shadow-[0_4px_24px_rgba(0,0,0,.14)] ring-1 ring-black/[0.07] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,.18)] sm:bottom-6 sm:right-6 sm:h-[56px] sm:w-[56px]"
    >
      <MessageCircle strokeWidth={1.6} className="h-5 w-5" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg border border-black/[0.07] bg-white px-3 py-1.5 text-[11px] font-medium text-[#444] shadow-lg sm:group-hover:block">
        Ask about Shashank
      </span>
    </button>
  );
}

export function PortfolioChat({ standalone = false }: { standalone?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<{ code: string; message: string } | null>(null);
  const [focused, setFocused]   = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const logRef      = useRef<HTMLDivElement>(null);
  const limit = 1200;

  useEffect(() => {
    const focus = () => { setFocused(true); textareaRef.current?.focus({ preventScroll: true }); };
    window.addEventListener("portfolio-chat-focus", focus);
    return () => window.removeEventListener("portfolio-chat-focus", focus);
  }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
  }, [input]);

  const send = useCallback(async (prompt = input, retry = false) => {
    const clean = prompt.trim();
    if (!clean || loading || clean.length > limit) return;
    const conversation = retry
      ? messages
      : [...messages, { role: "user", content: clean } as ChatMessage];
    const requestMessages = compactChatHistory(conversation);
    if (!retry) setMessages(conversation);
    setInput(""); setError(null); setLoading(true);
    try {
      const res  = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: requestMessages }) });
      const data = await res.json() as { answer?: string; error?: { code?: string; message?: string } };
      if (!res.ok || !data.answer) throw Object.assign(new Error(data.error?.message || "Unavailable."), { code: data.error?.code || "CHAT_ERROR" });
      setMessages(cur => [...cur, { role: "assistant", content: data.answer! }]);
    } catch (e) {
      const f = e as Error & { code?: string };
      setError({ code: f.code || "NETWORK_ERROR", message: f.message || "Could not reach the assistant." });
    } finally { setLoading(false); }
  }, [input, loading, messages]);

  const isEmpty    = messages.length === 0 && !error;
  const isExpanded = focused || !isEmpty;

  return (
    <div className={`flex flex-col items-center justify-center ${standalone ? "min-h-[calc(100svh-72px)]" : "h-[calc(100svh-72px)]"} bg-white px-4`}>

      {/* message log */}
      {!isEmpty && (
        <div ref={logRef} className="w-full max-w-[680px] flex-1 overflow-y-auto py-8" style={{ scrollbarWidth: "none" }}>
          <div className="space-y-5 pb-4">
            {messages.map((msg, i) =>
              msg.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[72%] rounded-2xl rounded-br-md bg-[#f4f4f4] px-4 py-2.5 text-[13.5px] leading-relaxed text-[#111] ring-1 ring-black/[0.06]">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fef2ee] ring-1 ring-[#c84b1f]/20">
                    <Sparkles className="h-[11px] w-[11px] text-[#c84b1f]" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <SafeText text={msg.content} />
                  </div>
                </div>
              )
            )}
            {loading && (
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fef2ee] ring-1 ring-[#c84b1f]/20">
                  <Sparkles className="h-[11px] w-[11px] text-[#c84b1f]" />
                </div>
                <ThinkingDots />
              </div>
            )}
            {error && (
              <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px]">
                <strong className="block text-red-600">{error.code === "CHAT_NOT_CONFIGURED" ? "Assistant unavailable" : "Something went wrong"}</strong>
                <p className="mt-0.5 text-[#666]">{error.code === "CHAT_NOT_CONFIGURED" ? "Chat is not enabled on this deployment." : error.message}</p>
                <div className="mt-2 flex gap-4 text-[12px]">
                  {error.code === "CHAT_NOT_CONFIGURED" ? (
                    <>
                      <a href="mailto:shashankpendyala3549@gmail.com" className="font-medium text-[#c84b1f] underline underline-offset-2">Email</a>
                      <a href="https://www.linkedin.com/in/shashank35i/" target="_blank" rel="noopener noreferrer" className="font-medium text-[#c84b1f] underline underline-offset-2">LinkedIn</a>
                    </>
                  ) : (
                    <button type="button"
                      onClick={() => { const last = [...messages].reverse().find(m => m.role === "user"); if (last) send(last.content, true); }}
                      className="inline-flex items-center gap-1.5 font-medium text-[#c84b1f]"
                    >
                      <RotateCcw className="h-3 w-3" /> Retry
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* headline */}
      {isEmpty && (
        <div className={`mb-8 text-center transition-all duration-500 ${isExpanded ? "mb-6" : "mb-10"}`}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#bbb]">Portfolio assistant</p>
          <h1 className={`mt-2 font-semibold tracking-tight text-[#111] transition-all duration-500 ${isExpanded ? "text-[26px]" : "text-[34px] sm:text-[42px]"}`}>
            Ask me anything
          </h1>
        </div>
      )}

      {/* input + suggestions */}
      <div className="w-full max-w-[680px]">
        {/* gradient border wrapper */}
        <div
          onClick={() => { if (!isExpanded) { setFocused(true); textareaRef.current?.focus(); } }}
          className={`rounded-[22px] p-[1.5px] transition-all duration-300 ${
            isExpanded
              ? "bg-gradient-to-r from-[#f04b23] via-[#e05cc0] to-[#7c6ef5] shadow-[0_6px_32px_rgba(240,75,35,0.22),0_2px_10px_rgba(0,0,0,0.07)]"
              : "bg-gradient-to-r from-[#f04b23]/30 via-[#e05cc0]/20 to-[#7c6ef5]/30 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:from-[#f04b23]/70 hover:via-[#e05cc0]/60 hover:to-[#7c6ef5]/70 hover:shadow-[0_6px_32px_rgba(240,75,35,0.18)] cursor-text"
          }`}
        >
          <div className="flex items-end gap-2 rounded-[20.5px] bg-white px-4 py-3">
            <textarea
              ref={textareaRef}
              value={input}
              maxLength={limit}
              onChange={e => setInput(e.target.value)}
              onFocus={() => setFocused(true)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              rows={1}
              aria-label="Ask about Shashank"
              placeholder={isExpanded ? "Ask a follow-up..." : "Ask about Shashank's work, projects, skills..."}
              className="max-h-[140px] min-h-[26px] flex-1 resize-none bg-transparent text-[14px] leading-relaxed text-[#111] outline-none placeholder:text-[#b0b0b0]"
            />
            <button
              type="button"
              onClick={e => { e.stopPropagation(); send(); }}
              disabled={!input.trim() || loading}
              aria-label="Send"
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] transition-all duration-200 ${
                input.trim() && !loading
                  ? "bg-gradient-to-br from-[#f04b23] to-[#c83a14] text-white shadow-[0_3px_12px_rgba(240,75,35,0.4)] hover:shadow-[0_4px_16px_rgba(240,75,35,0.55)] hover:scale-[1.04] active:scale-95"
                  : "bg-[#f2f2f2] text-[#c0c0c0]"
              }`}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.3} />
            </button>
          </div>
        </div>

        {/* suggestions */}
        <div className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded && isEmpty ? "mt-3 max-h-[60px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
          <div className="flex flex-wrap gap-1.5">
            {starters.map(item => {
              const Icon = item.icon;
              return (
                <button key={item.label} type="button" onClick={() => send(item.prompt)} disabled={loading}
                  className="group flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-[5px] text-[11.5px] font-medium text-[#555] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 hover:border-transparent hover:bg-gradient-to-r hover:from-[#fff4f1] hover:to-[#fdf1fb] hover:text-[#c84b1f] hover:shadow-[0_1px_8px_rgba(240,75,35,0.12)] disabled:opacity-40"
                >
                  <Icon className="h-[11px] w-[11px] text-[#ccc] transition group-hover:text-[#c84b1f]" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* char counter */}
        {isExpanded && input.length > 0 && (
          <div className="mt-1.5 flex justify-end px-1">
            <span className={`text-[10px] tabular-nums ${input.length > limit * 0.9 ? "text-orange-500" : "text-[#ccc]"}`}>
              {input.length}/{limit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
