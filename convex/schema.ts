import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.string(),
    userId: v.string(),
    orgId: v.string(),
    roomId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_org", ["userId", "orgId"])
    .index("by_title", ["title"])
    .index("by_user", ["userId"])
    .index("by_org", ["orgId"])
});