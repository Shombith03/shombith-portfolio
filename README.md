# shombith-portfolio

Source for https://shombith03.github.io/shombith-portfolio/. GitHub Pages builds it with Jekyll on every push.

## Writing a post

Add a Markdown file to `_posts/` named `YYYY-MM-DD-slug.md`:

```markdown
---
title: "Post title"
description: "One sentence for the post list and link previews."
---

Body in Markdown. Link a Cosmic Shore commit with
{% include hash.html h="<full commit hash>" %}.
```

It is published at `/blog/<slug>/` and listed on the home page and `/blog/`.

## Settings

`_config.yml` holds the contact details, the "full record" link (`contributions_url`) and the
Claude skills section, which stays hidden until `skills_repo` and `skills_install` are both set.

## Preview locally

```bash
bundle install
bundle exec jekyll serve
```
