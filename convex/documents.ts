import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";


export const create = mutation({
    args: {
        title: v.string(),
        initialContent: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId =await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error("Unauthorized");
        }
        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled",
            ownerId: userId.subject,
            initialContent: args.initialContent,
        });
        return documentId;
    }
});


export const get = query({
    args: { paginationOpts: paginationOptsValidator },
    handler: async (ctx, args) => {
      const documents = await ctx.db
        .query("documents")
        .order("desc")
        .paginate(args.paginationOpts);

      return documents;
    },
  });

export const removeById = mutation({
    args: {
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error("Unauthorized");
        }
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        if (document.ownerId !== userId.subject) {
            throw new Error("Unauthorized");
        }
        await ctx.db.delete(args.id);
    }
});

export const updateById = mutation({
    args: {
        id: v.id("documents"),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await ctx.auth.getUserIdentity();
        if (!userId) {
            throw new Error("Unauthorized");
        }
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        if (document.ownerId !== userId.subject) {
            throw new Error("Unauthorized");
        }
        await ctx.db.patch(args.id, {
            title: args.title,
        });
    }
});
