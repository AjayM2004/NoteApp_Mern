// Import the ratelimit instance from the upstash config
import ratelimit from "../config/upstrash.js";

// Express middleware for rate limiting
const rateLimiter = async (req, res, next) => {
  try {
    // Check if the request exceeds the rate limit
    const { success } = await ratelimit.limit("my-rate-limit");
    if (!success) {
      // If rate limit exceeded, send 429 response
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }
    // If under the limit, proceed to the next middleware/route
    next();
  } catch (error) {
    // Log any errors and pass them to the next error handler
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;