import { Liveblocks } from "@liveblocks/node";
import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  // 检查请求头
  const sessionClaims = await auth()
  const user = await currentUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }
  const {room} = await req.json()
  const document = await fetchQuery(api.documents.getById, {id:room})
  if (!document) {
    return new Response("Document not found", { status: 404 })
  }

  const isOwner = document.ownerId === user.id
  const isOrganizationMember = !!(document.organizationId && document.organizationId === sessionClaims.orgId)
  if (!isOwner && !isOrganizationMember) {
    return new Response("Unauthorized", { status: 401 })
  }
  const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous"
  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const hue = Math.abs(nameToNumber) % 360
  const color = `hsl(${hue}, 80%, 60%)`

  // 准备 session
  const session = liveblocks.prepareSession(user?.id, {
    userInfo: {
      name: user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      avatar: user.imageUrl,
      color: color
    }
  });
  
  session.allow(room, session.FULL_ACCESS)
  const {body, status} = await session.authorize()
  return new Response(body, {status})
}