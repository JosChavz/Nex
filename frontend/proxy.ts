import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const pathname = request.nextUrl.pathname;
    const isApiRoute = pathname.startsWith("/api/");
    const isOnboardingRoute = pathname.startsWith("/onboarding") || pathname.startsWith("/api/onboarding");

    if(!session) {
        if (isApiRoute) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (session.user.onboarding && !isOnboardingRoute) {
        if (isApiRoute) {
            return NextResponse.json({ error: "Onboarding not completed" }, { status: 403 });
        }
        return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/onboarding/:path*",
        "/api/users/:path*",
        "/api/projects/:path*",
        "/api/onboarding/:path*",
    ],
};
