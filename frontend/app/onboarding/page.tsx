// Steps to take
// 1. Get the user's data from the database - API
//  This is in the case that they started but haven't completed the onboarding process yet
// 2. Implement user profile setup using MUI components and form validation
//  Also use reducers for state management???
import {authClient} from "@/app/lib/auth-client";
import {auth} from "@/app/lib/auth";
import {headers} from "next/headers";
import OnboardingClientPage from "@/app/components/onboarding/client-page";

export default async function OnboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return <p>No session</p>;
    }

    // Get the user data
    const userFetch = await fetch(`http://localhost:3000/api/users/${session.user.id}`, {
        headers: await headers(),
        method: "GET"
    });
    const [userData] = await userFetch.json();

    return <OnboardingClientPage />
}
