import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
    if(!session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

// TODO: Should this be better? If so, how would that affect the function's behavior?
export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
};
