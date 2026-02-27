import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from "dotenv";
dotenv.config();

const redis = Redis.fromEnv();

redis
  .ping()
  .then((res) => console.log("Upstash Connection:", res))
  .catch((err) => console.error("Upstash Connection Failed:", err));

// create a new ratelimiter, that allows 10 requests per 20 seconds
const rateLimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, "60 s"),
});

export default rateLimit;
