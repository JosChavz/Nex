// TODO: READ, UPDATE

import {NextRequest} from "next/server";
import {db} from "@/app/lib/db";
import {headers} from "next/headers";
import {auth} from "@/app/lib/auth";

/**
 * Gets a specific user if they are logged in
 * @param req
 * @param params
 * @constructor
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> },) {
    const id = (await params).id;
    let client;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("No such session", { status: 401 });
    }

    try {
        client = await db.getConnection();
        const query = "SELECT * FROM user WHERE id = ?";
        const [rows] = await client.execute(query, [id]);

        if (!rows) return new Response("User not found", { status: 404 });

        client.release();
        return new Response(JSON.stringify(rows), { status: 200 });
    } catch(e) {
        if (client) client.release();
        return new Response("Error fetching user", { status: 500 });
    }
}
