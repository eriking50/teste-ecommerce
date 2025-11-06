import rateLimit from "express-rate-limit";

export const RateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: {
    status: 429,
    error: "Too many requests",
  },
  standardHeaders: true,
});
