import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getResumeFallbackAnswer, requestGroq, validateChatBody } from "../shared/portfolio-chat";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const rate = new Map<string, { count: number; reset: number }>();
  app.post("/api/chat", async (req, res) => {
    const now = Date.now(); const key = req.ip || "unknown"; const current = rate.get(key);
    if (current && current.reset > now && current.count >= 12) return res.status(429).set("retry-after", "60").json({ error: { code: "RATE_LIMITED", message: "Too many requests. Please try again shortly." } });
    rate.set(key, !current || current.reset <= now ? { count: 1, reset: now + 60000 } : { ...current, count: current.count + 1 });
    const valid = validateChatBody(req.body); if (!valid.ok) return res.status(400).json({ error: { code: valid.code, message: valid.message } });
    const apiKey = process.env.GROQ_API_KEY; if (!apiKey) return res.json({ answer: getResumeFallbackAnswer(valid.messages), model: "resume-context" });
    const result = await requestGroq(valid.messages, apiKey, process.env.GROQ_MODEL); if (!result.ok) return res.json({ answer: getResumeFallbackAnswer(valid.messages), model: "resume-context", fallback: result.code });
    return res.json({ answer: result.answer, model: result.model });
  });
  return httpServer;
}
