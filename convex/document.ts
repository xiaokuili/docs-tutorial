
import { paginationOptsValidator } from "convex/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    title: v.string(),
    initialContent: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();  
    if (!user) {
      throw new Error("Not authenticated");
    }
    const documentId = await ctx.db.insert("documents", {
      title: args.title,
      initialContent: args.initialContent,
      ownerId: (user?.subject || "undefined").toString(),
      organizationId: (user?.organization_id || "undefined").toString(),
      roomId: "undefined",
    });
    return documentId;
  },
});


export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    title: v.optional(v.string()),
  },
  handler: async (ctx, {title, paginationOpts}) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const userId = user.subject || "undefined";
    const organizationId = user.organization_id || "undefined";
    if (!title) {
      const documents = await ctx.db
        .query("documents")
        .filter((q) => 
          q.or(
            q.eq(q.field("ownerId"), userId.toString()),
            q.eq(q.field("organizationId"), (organizationId || "undefined").toString())
          )
        )
        .order("desc")
        .paginate(paginationOpts);
      return documents;
    }

    const documents = await ctx.db
      .query("documents") 
      .withSearchIndex("search_title", (q) => q.search("title", title))
      .filter((q) => 
        q.or(
          q.eq(q.field("ownerId"), userId.toString()),
          q.eq(q.field("organizationId"), (organizationId || "undefined").toString())
        )
      )
      .paginate(paginationOpts);
    return documents;
  },
});


export const removeByID = mutation({
  args: {
    id: v.id("documents"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Not authenticated");
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    if (document.ownerId !== user.subject) {
      throw new Error("Not authorized");
    }

    await ctx.db.delete(args.id);
  }
})
