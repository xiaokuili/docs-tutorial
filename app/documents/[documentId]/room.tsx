"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullScreenLoader from "@/components/full-screen-loader";
import { getUsers } from "./action";



export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams()
  const [users, setUsers] = useState<{ id: string; name: string; color: string; avatar: string; }[]>([])

  const fetchUsers = useMemo(() => async () => {
    try {
      const users = await getUsers()
      setUsers(users)
    } catch (error) {
      console.error("Error fetching users:", error)
    }

  }, []);

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <LiveblocksProvider
      authEndpoint={
        async () => {
          const endpoint = "/api/liveblocks-auth"
          const response = await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify({ room: documentId })
          })
          return await response.json()
        }
      }

      resolveUsers={async ({ userIds }) => {

        return users.filter((user) => userIds.includes(user.id))
      }}
      resolveMentionSuggestions={({ text }) => {
        if (text) {
          const filteredUsers = users.filter(user => user.name?.toLowerCase().includes(text.toLowerCase()))
          return filteredUsers.map(user => user.name)
        }
        return users.map(user => user.name)
      }}
      resolveRoomsInfo={() => []}

    >
      <RoomProvider 
      id={documentId as string} 
      initialStorage={{
        leftPadding: 56,
        rightPadding: 56,
      }}
      >
        <ClientSideSuspense fallback={<FullScreenLoader message="Room Loading…" />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}