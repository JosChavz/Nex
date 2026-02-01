import {db} from "@/app/lib/db";

export async function GET() {
    try {
        const [result] = await db.query("SELECT * FROM user");
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (e) {
        return new Response("Error fetching users", { status: 500 });
    }
}

export async function PUT() {
    return new Response("PUT request to /api/users", { status: 200 });
}