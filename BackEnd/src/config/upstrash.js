import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a ratelimiter that allows 5 requests per 20 seconds using a sliding window algorithm
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(), // Connect to Redis using environment variables
  limiter: Ratelimit.slidingWindow(10, "20 s"), // 10 requests per 0 seconds
});

export default ratelimit;