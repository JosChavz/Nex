// TODO: Create, Read, Update API endpoints required. Delete?
// CREATE = must be authenticated
// READ = public
// UPDATE = must be authenticated and be the owner of the project

import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import {db} from "@/app/lib/db";

/**
 * Get all projects
 * TODO: Integrate pagination
 * @tag Public
 */
export async function GET() {
    try {
        const [rows] = await db.execute("SELECT * FROM projects");
        return new Response(JSON.stringify({data: rows}), { status: 200 });
    } catch(e) {
        return new Response("Error fetching projects", { status: 500 });
    }
}

/**
 * Create a new project
 * @constructor
 */
export async function POST() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    return new Response("POST request to /api/projects", { status: 200 });
}

/**
 * Update portions of the project
 * @constructor
 */
export async function PUT() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }

    return new Response("PUT request to /api/projects", { status: 200 });
}