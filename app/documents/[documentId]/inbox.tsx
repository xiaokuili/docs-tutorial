import { InboxNotification } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { BellIcon } from "lucide-react"


export default function Inbox() {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative hover:bg-gray-100 p-1.5 rounded-sm">
          <BellIcon className="w-5 h-5 text-gray-600" />
          {inboxNotifications.length > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-[10px] font-medium">{inboxNotifications.length}</span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[600px]">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {inboxNotifications.length === 0 ? (
          <DropdownMenuItem>No new notifications</DropdownMenuItem>
        ) : (
          inboxNotifications.map((inboxNotification) => (
            <DropdownMenuItem key={inboxNotification.id} className="bg-transparent hover:bg-transparent focus:bg-transparent p-0">
              <InboxNotification
                inboxNotification={inboxNotification}
              />
              
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
