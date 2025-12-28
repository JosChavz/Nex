import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})

export type Session = typeof authClient.$Infer.Session.user;

export const signInWithGoogle = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
        errorCallbackURL: "/forbidden",
    });
}
