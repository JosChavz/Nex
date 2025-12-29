import {APIError, betterAuth} from "better-auth";
import { createPool } from "mysql2/promise";
import {nextCookies} from "better-auth/next-js";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    database: createPool({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "nexdb",
        timezone: "-08:00",
    }),
    socialProviders: {
        google: {
            enabled: true,
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/dashboard",
            errorCallbackURL: "/forbidden",
        }
    },
    account: {
        accountLinking: {
            enabled: true
        }
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({url, user}) => {
            // await sendEmail(url, user);
        }
    },
    plugins: [
        nextCookies(),
        admin(),
    ],
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    if (!user.email.endsWith('@ucsc.edu')) {
                        // Send the API error.
                        throw new APIError("BAD_REQUEST", {
                            message: "User must be UCSC account to proceed.",
                        });
                    }
                    return {
                        data: user,
                    };
                },
            },
        },
    }
});
