## Asset Safety & Image Preservation Rules

**CRITICAL RULES - STRICTLY ENFORCED**:
1. **USER BACKUPS & COPIES ARE PERMANENT & SACROSANCT**:
   - The user frequently creates local copy/backup images directly in `public/` or asset directories (e.g. `desk-bg (Copy).jpg`, `desk-bg (Copy)1.jpg`, `*-Copy*`, `* (Copy)*`, `* - Kopie*`, `*_backup*`, `*.bak`).
   - **NEVER delete, move, rename, or clean up any user-created copy or backup file.**
   - Do NOT run `rm`, `mv`, `git clean`, or cleanup scripts targeting these files.
   - These files are intentionally ignored in `.gitignore` so they remain safely in place without affecting git status or staging.

2. **RESTORING / REVERTING IMAGES (UNINTERRUPTED & PRECISE)**:
   - When the user asks to undo, revert, or restore an image (e.g., restoring `public/uni-og-bg.jpg` or `public/desk-bg.jpg` from git history or backups), you **MUST proceed immediately** to restore and overwrite the specific active image target file (e.g., via `git checkout <commit> -- <filepath>`).
   - Restoring the image should **NEVER be interrupted or blocked**.
   - However, restoring must **ONLY** update the specific active image file being restored. Do **NOT** perform broad directory cleans or delete any adjacent user copies (`*(Copy)*`).

3. **MODIFICATIONS & AGENT BACKUPS**:
   - Before modifying, replacing, or generating a new version of an existing image asset, always ensure a timestamped backup exists in `backups/assets/` and `${HOME}/GoogleDrive/University/Website_Project_Backups/asset_vault/`.
   - **NEVER** replace user artwork or personalized pixel art (such as the OG friends group portraits or uni friends under the sakura tree) with generic placeholders or other scenes unless explicitly requested by the user.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
