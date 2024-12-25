"use client";

import { ReactNode, useState, useMemo, useEffect } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import FullscreenLoader from "@/components/fullscreen-loader";
import { getUsers } from "./action";
import { RIGHT_MARGIN_DEFAULT } from "@/app/(home)/constants/margins";
import { LEFT_MARGIN_DEFAULT } from "@/app/(home)/constants/margins";

type User = {
  id: string;
  name: string;
  avatar: string;
}
export function Room({ children }: { children: ReactNode }) {
  const params = useParams()

  const [users, setUsers] = useState<User[]>([])
  const fetchUsers = useMemo(() => async () => {
    try {
      const users = await getUsers()
      setUsers(users)
    } catch (error) {
      console.error(error)
    }
  }, [])

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
            body: JSON.stringify({room: params.documentId})
          })
          return await response.json()
        }
      }

      resolveUsers={({ userIds }) => {
        return users.filter(user => userIds.includes(user.id))
      }}
      resolveMentionSuggestions={({ text }) => {
        const filteredUsers = users.filter(user => user.name?.toLowerCase().includes(text.toLowerCase()))
        return filteredUsers.map(user => user.id)
      }}
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT}}>
        <ClientSideSuspense fallback={<FullscreenLoader label="Room document..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}