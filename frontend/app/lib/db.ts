import { createPool, Pool } from "mysql2/promise";

declare global {
    var mysqlPool: Pool | undefined;
}

const pool =
    globalThis.mysqlPool ??
    createPool({
        host: "localhost",
        user: "root",
        password: "mysql",
        database: "nexdb",
        timezone: "-08:00",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
    });

if (process.env.NODE_ENV !== "production") {
    globalThis.mysqlPool = pool;
}

export const db = pool;
