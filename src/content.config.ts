import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollections = defineCollection({
    loader: glob({ pattern: "**/*.(md|mdx)", base: "./src/content/blog" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        date: z.date(),
        description: z.string(),
        // author: z.string(),
        author: reference('author'),
        image: image(),
        tags: z.array(z.string()),
        isDraft: z.boolean().default(false )
    })
});

const authorCollection = defineCollection({
    loader: glob({ pattern: "**/*.yml", base: "./src/content/author"}),
    schema: ({ image }) => z.object({
        name: z.string(),
        avatar: image(),
        twitter: z.string(),
        linkedIn: z.string(),
        github: z.string(),
        bio: z.string(),
        subtitle: z.string(),
    })
})

export const collections = { blog: blogCollections, author: authorCollection }