import { Pool } from 'pg'
import * as process from "process";
require('dotenv').config()

const pool = new Pool({
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export default pool;