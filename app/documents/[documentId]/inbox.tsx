"use client"

import {ClientSideSuspense} from "@liveblocks/react"
import {  BellIcon  } from "lucide-react"
import {useInboxNotifications} from "@liveblocks/react/suspense"
import { InboxNotification, InboxNotificationList  } from "@liveblocks/react-ui"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export const Inbox = () => {
    return (
        <ClientSideSuspense fallback={null}>
            <InboxMenu/>
        </ClientSideSuspense>
    )
}

const InboxMenu = () => {
    const {inboxNotifications} = useInboxNotifications();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <BellIcon  className="size-5"/>
                    {inboxNotifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 size-4 bg-sky-500 rounded-full text-xs flex items-center justify-center">
                            {inboxNotifications.length} 
                        </span>
                    )}
                </Button>
            
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-auto">
                {inboxNotifications.length > 0 ? (
                    <InboxNotificationList  >
                        {inboxNotifications.map((notification) => (
                            <InboxNotification key={notification.id}  inboxNotification={notification} />
                        ))}
                    </InboxNotificationList>
                ) : (
                    <div className="text-center text-sm text-muted-foreground p-2 w-[400px]">
                        No notifications
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
