import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
    database: createPool({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "nexdb",
        timezone: "America/Los_Angeles", // Important to ensure consistent timezone values
    }),
});
