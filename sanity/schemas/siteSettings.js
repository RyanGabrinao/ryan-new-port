export default {
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true,
          },
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true,
          },
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: "heroImage2",
      title: "Hero Image 2",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessiblity.",
          options: {
            isHighlighted: true,
          },
        },
      ],
      options: {
        hotspot: true,
      },
    },
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "subTitle",
      title: "Sub-title",
      type: "object",
      fields: [
        {
          name: "first_word",
          title: "First Word",
          type: "string",
        },
        {
          name: "second_word",
          title: "Second Word",
          type: "string",
        },
      ],
    },
    {
      name: "currentlyListening",
      title: "Currently Listening to:",
      type: "array",
      of: [{ type: "songs" }],
      validation: (Rule) => Rule.length(5),
    },
    {
      name: "currentlyWatching",
      title: "Currently Watching:",
      type: "array",
      of: [{ type: "songs" }],
      validation: (Rule) => Rule.length(5),
    },
  ],
};
