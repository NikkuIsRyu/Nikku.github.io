## Asset Safety & Mandatory Image Backups

**CRITICAL RULE - NEVER VIOLATE**:
- **NEVER** delete, overwrite, or replace any image or pixel art asset (under `public/`, `src/assets/`, or anywhere in the project) without FIRST creating a timestamped backup copy.
- Always back up the existing image to `backups/assets/` and copy it to `${HOME}/GoogleDrive/University/Website_Project_Backups/asset_vault/` before touching it.
- **NEVER** replace user artwork or personalized pixel art (such as the OG friends group portraits or uni friends under the sakura tree) with generic placeholders or other scenes unless explicitly confirmed by the user.

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
