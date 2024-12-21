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
        const organizationId = (userId.organization_id ?? undefined) as string | undefined

        const documentId = await ctx.db.insert("documents", {
            title: args.title ?? "Untitled",
            ownerId: userId.subject,
            organizationId: organizationId,
            initialContent: args.initialContent,
        });
        return documentId;
    }
});


export const get = query({
    args: { paginationOpts: paginationOptsValidator,  search: v.optional(v.string()) },
    handler: async (ctx, {search, paginationOpts}) => {
      const user = await ctx.auth.getUserIdentity();
      if (!user) {
        throw new Error("Unauthorized");
      }

      const organizationId = (user.organization_id ?? undefined) as string | undefined

    //   search within organization
      if (search && organizationId) {
        return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", 
            (q) => q.search("title", search).eq("organizationId", organizationId))
        .paginate(paginationOpts)
      }

      // search within personal
      if (search) {
        return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) => q.search("title", search).eq("ownerId", user.subject))
        .paginate(paginationOpts)
      }

      // All docs inside organization 
      if (organizationId) {
        return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) => q.eq("organizationId", organizationId))
        .order("desc")
        .paginate(paginationOpts)
      }

      // All doc inside personal
      return await ctx.db
         .query("documents") 
         .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
         .order("desc")
         .paginate(paginationOpts)
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
        const organizationId = (userId.organization_id ?? undefined) as string | undefined


        
        const document = await ctx.db.get(args.id);
        if (!document) {
            throw new Error("Document not found");
        }
        const isOwner = document.ownerId === userId.subject
        const isOrganization = document.organizationId === organizationId 
        
        if (!isOwner && !isOrganization) {
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
