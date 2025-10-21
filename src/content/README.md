# EncryptHer Content Management

This directory contains all the editable content for the EncryptHer website. Content is organized by page, with each page having its own subdirectory.

## How It Works

Each section of a page is defined in a separate Markdown (`.md`) file. You can:
- **Enable/Disable sections** by changing `enabled: true` to `enabled: false` in the frontmatter
- **Reorder sections** by changing the `order:` number
- **Edit content** by modifying the markdown below the frontmatter

## Frontmatter Structure

Every content file starts with frontmatter (between the `---` markers):

```markdown
---
enabled: true        # Set to false to hide this section
order: 1            # Controls the order sections appear (1 = first)
section: hero       # Section identifier
title: "Hero"       # Section title (for reference)
---

# Your content here

Write your content using standard Markdown syntax.
```

## Directory Structure

```
content/
├── index/              # Homepage sections
│   ├── hero.md
│   ├── what-we-do.md
│   ├── courses.md
│   └── advocacy.md
├── about/              # About page sections
│   ├── mission.md
│   └── values.md
├── online-privacy/     # Online Privacy page
├── public-safety/      # Public Safety page
├── travel-safety/      # Travel Safety page
├── digital-advocacy/   # Digital Advocacy page
├── donate/             # Donate page
└── contact/            # Contact page
```

## How to Enable/Disable Sections

### To Disable a Section

Change `enabled: true` to `enabled: false`:

```markdown
---
enabled: false
order: 1
section: hero
---
```

### Or Comment Out the Entire File

You can also comment out the entire frontmatter to disable:

```markdown
<!---
---
enabled: true
order: 1
section: hero
---
--->
```

## How to Add New Sections

1. Create a new `.md` file in the appropriate page directory
2. Add frontmatter with `enabled`, `order`, and `section` fields
3. Write your content in Markdown
4. The section will automatically appear on the page

Example:

```markdown
---
enabled: true
order: 5
section: newsletter
title: "Newsletter Section"
---

# Subscribe to Our Newsletter

Stay updated with the latest privacy tips and safety guides.
```

## Markdown Syntax Guide

### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Emphasis
```markdown
**bold text**
*italic text*
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2
  - Nested point
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](/images/image-name.jpg)
```

## Image Guidelines

- Place images in the `/public/images/` directory
- Reference them in markdown as `/images/filename.jpg`
- Recommended formats: JPG (photos), PNG (graphics with transparency)
- Optimize images before uploading (aim for under 200KB per image)
- Use descriptive filenames: `hero-privacy.jpg` not `img1.jpg`

## Best Practices

1. **Keep frontmatter consistent** - Always include enabled, order, and section
2. **Use descriptive section names** - Make it obvious what each file contains
3. **Number orders with gaps** - Use 10, 20, 30 instead of 1, 2, 3 to make reordering easier
4. **Test after changes** - Run `npm run dev` to preview your changes locally
5. **Keep backup copies** - Before making major changes, copy the original file

## Troubleshooting

**Section not appearing?**
- Check that `enabled: true` is set
- Verify the frontmatter is properly formatted (three dashes at start and end)
- Make sure the file has a `.md` extension

**Section in wrong order?**
- Adjust the `order:` number (lower numbers appear first)
- Ensure all sections have order numbers

**Styling looks wrong?**
- Check for unclosed markdown syntax (like unmatched `**` for bold)
- Verify image paths start with `/images/`
- Try viewing the page in development mode (`npm run dev`)

