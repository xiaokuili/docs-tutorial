"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"


export async function getUsers() {
   
    const {sessionClaims} = await auth()
    const client = await clerkClient();
    
    
    const resp = await client.users.getUserList({
        organizationId: [sessionClaims?.org_id as string]
    })
    const users = resp.data.map((user) => ({
        id: user.id,
        name: [user.firstName, user.lastName]
        .filter(Boolean)
        .join(" ") || user.primaryEmailAddress?.emailAddress || "Anonymous",
        avatar: user.imageUrl,
    }))
    return users
}