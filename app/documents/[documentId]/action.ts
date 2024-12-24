"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { cookies, headers } from 'next/headers';


export async function getUsers() {
   
    const {sessionClaims} = await auth()
    const client = await clerkClient();
    
    
    const resp = await client.users.getUserList({
        organizationId: [sessionClaims?.org_id as string]
    })
    const users = resp.data.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}` ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl
    }))
    return users
}