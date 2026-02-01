import {auth} from "@/app/lib/auth";
import {headers} from "next/headers";
import {db} from "@/app/lib/db";
import {OnboardingState} from "@/app/redux/onboarding/onboarding-types";

export async function POST(request: Request) {
    const body: OnboardingState = await request.json();

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("No such session", { status: 401 });
    }

    if (!body) {
        return new Response("No body", { status: 400 });
    }

    try {
        // TODO: insert/update user_meta and update user.onboarding flag
    } catch (e) {
        return new Response("Error saving onboarding data", { status: 500 });
    }

    return new Response("Onboarding completed", { status: 200 });
}
