import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const key = req.user?._id.toString() || req.ip;

    //const { success } = await rateLimit.limit(key);
    // const { success } = await rateLimit.limit("my-limit-key");
    const { success, limit, remaining, reset } = await rateLimit.limit(key);
    console.log(`Key: ${key} | Remaining: ${remaining} | Success: ${success}`);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests - try again later",
      });
    }

    next();
  } catch (error) {
    console.log("Error in rateLimiter middleware", error);
    next(error);
  }
};

export default rateLimiter;
