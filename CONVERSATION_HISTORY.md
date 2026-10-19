# Antigravity Conversation History & Project Context

This document captures the complete context, architectural decisions, and conversation history from the initial setup session. When opening this project on a new PC, Antigravity can read this file to immediately pick up where we left off.

---

## 📌 Project Objectives & Vision
* **Purpose**: A personal academic vault for university lectures, coursework, summaries, and research, combined with a professional CV / Portfolio for career applications.
* **Cost**: 100% free using benefits from the **GitHub Student Developer Pack** (GitHub Pages for hosting, free custom domain like `.me` or `.tech` from Namecheap/Name.com).
* **Storage Integration**: Hybrid architecture utilizing a **5 TB Google Drive** account as a CDN/asset vault for heavy slides, textbook PDFs, datasets, and video recordings, while keeping the Git repository lightweight.
* **AI Access Point**: Antigravity acts as a co-pilot directly in this repository to synthesize lecture notes, format mathematical formulas in $\KaTeX$, generate code examples, and maintain docs.

---

## 🏗️ Technical Architecture & Choices
1. **Framework**: [Astro](https://astro.build) with [@astrojs/starlight](https://starlight.astro.build) documentation theme.
2. **Runtime Engine**: Node.js v22 LTS (`>=22.22.0` required by Astro 5/7).
3. **Math & Formula Rendering**:
   * Installed `remark-math`, `rehype-katex`, and `katex`.
   * Connected via `@astrojs/markdown-remark` using `unified` processor in `astro.config.mjs`.
   * Global KaTeX CSS imported via `src/styles/custom.css`.
4. **Search**: Built-in client-side indexing with Pagefind.
5. **Dev Server Rule**:
   * Always run in background mode: `astro dev --background`
   * Manage using: `astro dev status`, `astro dev logs`, `astro dev stop`.

---

## 📂 Current File Structure
```
Website_project/
├── AGENTS.md                  # Development rules and instructions for Antigravity
├── astro.config.mjs           # Starlight, KaTeX, and sidebar navigation config
├── package.json               # Dependencies (Astro, Starlight, KaTeX, sharp)
├── tsconfig.json              # TypeScript config
├── src/
│   ├── assets/                # Local images (e.g. houston.webp)
│   ├── styles/
│   │   └── custom.css         # KaTeX CSS imports and custom color theme
│   ├── content.config.ts      # Starlight content collections schema
│   └── content/docs/
│       ├── index.mdx          # Homepage / Landing page
│       ├── cv.md              # Curriculum Vitae & About Me page
│       └── lectures/
│           └── sample-lecture.md  # Example lecture with formulas, code, and Drive links
```

---

## 💬 Summary of Session Milestones
1. **Perks & Options Discussed**: Explored GitHub Student Developer Pack options (free domains, GitHub Pages) and the hybrid approach with Google Drive.
2. **Project Scaffolding**: Initialized Astro + Starlight with Node.js 22 LTS.
3. **KaTeX Integration**: Configured markdown math plugins and KaTeX styles.
4. **Content Setup**: Created landing page, CV page, and sample lecture note with Drive links and Python gradient descent code.
5. **Dev Server Verification**: Dev server confirmed running at `http://localhost:4321`.
6. **Google Drive Integration**:
   * Located Google Drive mount under GNOME Online Accounts (`/run/user/1000/gvfs/...`).
   * Located folder `University`.
   * Created folder `gemini_convos`.
   * Packaged and uploaded `Website_project.zip` and the uncompressed project files.
7. **Session 2 (Windows Setup & Live Deployment)**:
   * Diagnosed `C:` drive storage limit (222 GB SSD, ~3.64 GB free).
   * Relocated `npm` global cache to `D:\.npm-cache` and temp to `D:\Temp`, preserving `C:` from being exhausted during dependency installation.
   * Installed 365 Astro/Starlight dependencies cleanly on `D:` and launched background dev server.
   * Initialized Git repo, pushed to GitHub at `https://github.com/NikkuIsRyu/Nikku.github.io`.
   * Automated CI/CD pipeline using GitHub Actions (`.github/workflows/deploy.yml`).
   * Registered and connected primary custom domain **`https://nikku.tech`** with HTTPS/SSL verified.
   * Configured **`nickblassmann.me`** via 301 URL redirect to seamlessly forward to `https://nikku.tech`.
8. **Session 3 (Repo Synchronization, Push Auth & Academic Realignment)**:
   * Synchronized local workspace with remote GitHub repository (`NikkuIsRyu/Nikku.github.io`).
   * Configured local repository `core.sshCommand` with account key `~/.ssh/cggames_key` for passwordless push.
   * Aligned `cv.md` with verified Heidelberg University records (B.Sc. Informatik, 5th Semester, Oct 2024 – Present), listing passed coursework without numerical grades per user preference.
   * Corrected RMI terminology to *Robotics and Machine Intelligence* (Prof. Dr. Artur Andrzejak, WS 2026/27) and updated sidebar to `'AI, Robotics & Medical Informatics'`.
   * Enriched `it-security.md` with Model Context Protocol (MCP) security, prompt injection, and supply chain analysis.
   * Connected `machine-learning.md` to `Voice_ML_Project` (GPT-SoVITS v2, PyTorch, CUDA, 17.5 GB checkpoint archive on Google Drive).
   * Added direct GitHub project links to `Voice_ML_Project` and `AnkiDeckGenPython`.
9. **Session 4 (Sync Laptop Work & Language Update)**:
   * Executed `git pull` cleanly fast-forwarding all laptop edits from `main`.
   * Updated Japanese language proficiency under Portfolio (`cv.md`) to **B1** (reflecting completed coursework through A2.2, active tandem exchanges, and current B1.2 enrollment).
10. **Session 5 (Reorganize Japanese Track & Subdirectories)**:
   * Removed legacy A1.2 page (`japanese.md`).
   * Created intermediate Japanese track hub (`japanese/index.mdx`) with subdirectories `b1-1` and `b1-2`.
   * Initialized `b1-1/index.md` and `b1-2/index.md` with "Work in Progress / TBA" status callouts and curriculum placeholders.
   * Updated `astro.config.mjs` sidebar and `lectures/index.mdx` links.
11. **Session 6 (Japanese B1.1 Chapters 26–32 Grammar & Anki Deck Integration)**:
   * Audited all 27 `iMina` grammar screenshots (`G:\Meine Ablage\University\Screenshot_20261019_210*_iMina.jpg`) and decompressed the `collection.anki21b` Zstandard SQLite database from `E:\nickb\Documents\Japanese__Minna no Nihongo 1 & 2 (Chapters 1-50).apkg`.
   * Identified and corrected 8 grammatical/spelling typos in the iMina app screenshots (e.g., `しめって` $\to$ `しめて`, `つかたら` $\to$ `つかったら`, `て きます` $\to$ `ときます`, `しゅちょう` $\to$ `しゅっちょう`, `とかい` $\to$ `とけい`, `あたらしし` $\to$ `あたらしいし`) and 7 card typos in the Anki `.apkg` deck (e.g., L29 `開[ひら]きます` $\to$ `開[あ]きます`, `ふさます` $\to$ `ふきます`, `お先に どうそ` $\to$ `どうぞ`, L27 `はかの` $\to$ `ほかの`, L32 `いけませんえ` $\to$ `いけませんね`).
   * Built `src/content/docs/lectures/languages/japanese/b1-1/index.mdx` featuring a quick-jump navigation table, master conjugation & clause-attachment matrices, all 27 grammar patterns with Kanji/Furigana + iMina Kana + English translations, and 7 collapsible vocabulary drawers containing all 335 verified words across Chapters 26–32.

---

## 🚀 How to Resume in Antigravity on Your Home PC
1. Extract `Website_project.zip` into your desired projects directory.
2. Open the folder in **Antigravity IDE** (`File > Open Folder...`).
3. Ensure Node.js v22+ is installed on your PC (`node -v`).
4. In the Antigravity chat, send:
   > *"Read CONVERSATION_HISTORY.md and AGENTS.md, run npm install, and start the dev server."*
