import {db} from "@/app/lib/db";

export async function GET() {
    let client;

    try {
        client = await db.getConnection();
        const query = "SELECT * FROM user";
        const [result] = await client.query(query);
        client.release();
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (e) {
        if (client) client.release();
        return new Response("Error fetching users", { status: 500 });
    }
}

export async function PUT() {
    return new Response("PUT request to /api/users", { status: 200 });
}
