
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    initialContent: v.string(),
    userId: v.string(),
    orgId: v.string(),
    roomId: v.string(),
  },
  handler: async (ctx, args) => {
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      initialContent: args.initialContent,
      userId: args.userId,
      orgId: args.orgId,
      roomId: args.roomId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return documentId;
  },
});


export const getDocuments = query({
  args: {
 
    paginationOpts: paginationOptsValidator
  },
  handler: async (ctx, args) => {
    const documents = await ctx.db
      .query("documents")
      .order("desc")
      .paginate(args.paginationOpts);

    return documents;
  },
});
