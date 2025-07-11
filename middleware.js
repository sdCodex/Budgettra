import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "GO_HTTP"],
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  // 1. Check for Vercel's internal bypass header FIRST.
  const isVercelBot = req.headers.get("x-vercel-protection-bypass");
  if (isVercelBot) {
    // If it's a Vercel bot, let it through immediately.
    // This is the most reliable way to handle previews.
    return NextResponse.next();
  }

  // 2. Run Arcjet for all other requests.
  const decision = await aj.protect(req);
  if (decision.isDenied()) {
    // If Arcjet denies the request, return a 403.
    return new NextResponse("Blocked by Arcjet", { status: 403 });
  }

  // 3. If Arcjet allows the request, proceed with Clerk's logic.
  const { userId } = await auth();
  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  // 4. If all checks pass, allow the request to continue.
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};