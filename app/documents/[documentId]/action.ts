"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

export async function getUsers() {
    const { sessionClaims } = auth()
    const clerk = clerkClient()
    const resp = await clerk.users.getUserList({
        organizationId: [sessionClaims?.org_id as string]
    })
    const users = resp.users.map((user) => ({
        id: user.id,
        name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatarUrl: user.imageUrl
    }))
    return users
}