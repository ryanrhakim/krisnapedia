import { defineField, defineType } from "sanity";

/**
 * Centralized category taxonomy. Insight, Manual, and Regulation documents
 * reference a category doc instead of storing a free-text string — this
 * eliminates typos and lets editors add new categories inline via the
 * reference dropdown ("Create new category").
 */
export const categorySchema = defineType({
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (R) => R.required().max(80),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "scope",
      type: "string",
      title: "Applies to",
      description: "Which content type this category belongs to.",
      options: {
        list: [
          { title: "Insight", value: "insight" },
          { title: "Manual", value: "manual" },
          { title: "Regulation", value: "regulation" },
        ],
        layout: "radio",
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "orderIndex",
      type: "number",
      title: "Display order",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "published", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title", subtitle: "scope" },
  },
});
