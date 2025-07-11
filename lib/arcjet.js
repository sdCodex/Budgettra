import arcjet, { tokenBucket } from "@arcjet/next";
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"], //Based Clerk User Id,
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;
