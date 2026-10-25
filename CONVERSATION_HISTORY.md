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
   * Identified and corrected genuine source typos in the iMina app screenshots (e.g., `しめって` $\to$ `しめて`, `つかたら` $\to$ `つかったら`, `て きます` $\to$ `ときます`, `しゅちょう` $\to$ `しゅっちょう`, `とかい` $\to$ `とけい`, `あたらしし` $\to$ `あたらしいし`) and card typos in the Anki `.apkg` deck (e.g., L29 `開[ひら]きます` $\to$ `開[あ]きます`, `ふさます` $\to$ `ふきます`, `お先に どうそ` $\to$ `どうぞ`, L27 `はかの` $\to$ `ほかの`, L32 `いけませんえ` $\to$ `いけませんね`), while applying standard loanword/kanji orthography (`ダンス`, `悪`).
   * Built `src/content/docs/lectures/languages/japanese/b1-1/index.mdx` featuring a quick-jump navigation table, master conjugation & clause-attachment matrices, all 27 grammar patterns with Kanji/Furigana + iMina Kana + English translations, and 7 collapsible vocabulary drawers containing all 335 verified words across Chapters 26–32.
12. **Session 7 (Japanese B1.1 Linguistic Peer-Review & Precision Refinement)**:
   * Audited the live B1.1 reference page against external linguistic peer review ([ChatGPT `6ad743cf-0c6c-83eb-a88a-9912abd3ff16`](https://chatgpt.com/share/6ad743cf-0c6c-83eb-a88a-9912abd3ff16)) and authoritative Japanese grammar references (Japan Foundation & TUFS Grammar Modules).
   * Reclassified the B1.1 Source Audit drawer into 3 explicit categories: genuine Japanese grammar/conjugation/kana fixes (11), English gloss/typo fixes (3), and orthographic standardizations / explicit textbook formatting (3).
   * Corrected Lesson 26 Vocab #30 `片づきます` gloss to accurately reflect intransitive usage (`to be put in order, get tidied up / put away`) vs. transitive `片づけます` (L29 #18).
   * Refined explanations for `～んです` / `～のです` contextual nuance and `から` usage (L26.1), `Nは` topicalization of `が`-marked phrases (L26.4), `時計の修理はいつできますか` translation (L27.2), `土（土曜日）` schedule abbreviation (L28 #50), casual particle drop note for `宿題(は)` (L29.2), `嫌［な］` glosses (L30 #46, L31 #34), and `～かもしれません` present/future/past possibility scope (L32.3).
   * Verified full static site build with `npm run build` and pushed changes to `main` (`nikku.tech`).
13. **Session 8 (Japanese B1.1 German Edition & Flag Switcher Component)**:
   * Audited all 27 German `iMina` app grammar screenshots (`/home/nick/Dokumente/Imina /`) across Minna no Nihongo Shokyu II (Lessons 26–32).
   * Detected and corrected 6 app Japanese typos (`しめって` $\to$ `しめて`, `て きます` $\to$ `ときます`, `しゅちょう` $\to$ `しゅっちょう`, `とかい` $\to$ `とけい`, `あたらしし` $\to$ `あたらしいし`, and German-app-specific `ジョッギング` $\to$ `ジョギング`) as well as 7 German translation/formatting defects (such as correcting the inverted main/subordinate clause order in `ながら` explanations and missing particles).
   * Created a reusable `<LanguageSwitch current="en|de" />` Astro component (`src/components/LanguageSwitch.astro`) with inline SVG flags (`🇬🇧 English` | `🇩🇪 Deutsch`), responsive Starlight integration, and dynamic hash-preservation mapping between English (`#lesson-XX`) and German (`#lektion-XX`) anchor links.
   * Integrated `<LanguageSwitch current="en" />` directly beneath the header badge on the English page (`src/content/docs/lectures/languages/japanese/b1-1/index.mdx`).
   * Created the comprehensive German reference page (`src/content/docs/lectures/languages/japanese/b1-1/de/index.mdx`) featuring full German grammar explanations, corrected example sentences, German quick navigation (`#lektion-26` to `#lektion-32`), Master-Konjugationstabellen, and 7 collapsible vocabulary drawers with all 335 words translated into natural German. Set `sidebar: { hidden: true }` to keep sidebar navigation clean.
   * Updated the Japanese track index (`src/content/docs/lectures/languages/japanese/index.mdx`) card with direct access to both English and German versions.
   * Verified clean build (`npm run build`), generated backup archive, and deployed to `main` (`nikku.tech`).
14. **Session 9 (Japanese B1.1 DE & EN Second Peer-Review & Arrow Rendering Fix)**:
   * Evaluated the second external linguistic peer review ([ChatGPT `6ad76041-e078-83eb-b757-a9d5659ce1ef`](https://chatgpt.com/share/6ad76041-e078-83eb-b757-a9d5659ce1ef)) and inspected the compiled HTML output in `dist/`.
   * Fixed 8 occurrences of `$	o$` (corrupted by Python tab-escaping during initial generation) and all `$\to$` / `$\longrightarrow$` KaTeX math arrows across both `de/index.mdx` and `index.mdx`, replacing them with clean Unicode `→` to prevent duplicate MathML/HTML arrow extraction.
   * Refined example translations for `映画を見たかもしれない` (L32.3), `バスが来なかったんです` (L26.1), and `日本では馬を見ることができません` (L27.5, removing parenthetical "wild/wilden").
   * Nuanced grammar explanations for `予定です` vs. `つもりです` (L31.4), Volitional form `意向形` resolve/self-encouragement usage (L31.1), Potential form `可能形` focus on capability/possibility (L27.1), `～しか` vs. `～だけ` scope contrast (L27.3), and `～てあります` intentional resultant state (L30.1).
   * Polished German vocabulary entries (`国会議事堂` removing "Diät", `片づきます`, `マンション`, `嫌［な］`, `国際 〜`) and fixed typo `jobb(e)` → `jobbe` (L28.4).
   * Verified clean build (`npm run build`), created pre/post backup archives, and pushed to `main` (`nikku.tech`).
15. **Session 10 (Omarchy Handover, Cross-System Sync & Google Drive Archive)**:
   * **Host & System**: Ubuntu 24.04 LTS (Acer Swift SFG14-63) preparing seamless handover to Arch Linux / Omarchy.
   * **Project Health**: Verified `npm run build` generates all 16 static routes without warnings or errors in 2.7 seconds.
   * **Omarchy Migration Bundle**: Bundled active Antigravity profile (`antigravity_user_data.tar.gz`, 469 MB) with OAuth tokens, brain contexts, and MCP configs to USB drive (`/media/nick/Ventoy/antigravity_migration/`).
   * **Google Drive Cloud Sync**: Synthesized complete project architecture and conversation transcript into `SUMMARY.md` and `CONVERSATION_HISTORY.md`, syncing to Google Drive (`University/gemini_convos/Website-project-laptop/` and `Website-project-omarchy/`).
   * **Cross-Environment Ready**: Full instructions documented for instant onboarding on Arch Linux / Omarchy.

16. **Session 11 (Chinese Course & Interactive Multi-Speaker Audio Dialogues)**:
   * Integrated the complete multi-speaker dialogue audio generation from Voice-ML v3 (conversation `Create Anki Audio Deck`).
   * Converted all 6 dialogue WAV files (`Dialogue2_1.wav` to `Dialogue4_2.wav`) from `G:\Meine Ablage\University\dialogues` into high-quality, lightweight MP3 files (total size ~1.95 MB) and deployed them to `public/audio/dialogues/` alongside the JSON alignment timestamp files.
   * Built a typed, modular dataset (`src/data/chineseDialogues.ts`) with speaker metadata (`female_v3`, `male_v1`, `male_zs`), roles, Hanzi, Pinyin with tone marks, German translations, and millisecond-accurate timestamps.
   * Engineered the rich, interactive `<DialoguePlayer.astro>` component featuring master playback controls, scrubber progress bar, speed control (1.0x, 0.85x, 0.7x), live karaoke active-turn highlighting, single-turn replay buttons, Pinyin/Translation toggles, sentence loop mode, and Google Drive lossless WAV / JSON links.
   * Replaced legacy placeholder `chinese.md` with the comprehensive reference page `src/content/docs/lectures/languages/chinese.mdx` covering Lektionen 2–4 dialogues, Tone Sandhi rules ($3+3 \to 2+3$, half 3rd tone, `不`, `一`/`yāo`), sentence structure (S-Z-O-V), 4 question types, and Google Drive asset links (107 MB Dual-Audio Anki deck).
   * Updated `astro.config.mjs` sidebar to `'Chinesisch & Audio-Dialoge'` and updated `src/content/docs/lectures/index.mdx`.
   * Verified 100% clean static production build (`npm run build`, 16 pages).

17. **Session 12 (Japanese B1.1 Vocabulary Table of Contents Visibility & Direct Anchor Navigation)**:
    * Addressed user difficulty locating the Japanese B1.1 vocabulary registers (Chapters 26–32, 335 words total).
    * Promoted all 7 vocabulary registers in both English (`b1-1/index.mdx`) and German (`b1-1/de/index.mdx`) into prominent Markdown `###` headings (`### 26.5 📖 Vocabulary Register (45 Words)` / `### 26.5 📖 Vokabelregister (45 Wörter)`), making them instantly visible in the right-hand Starlight Table of Contents sidebar.
    * Enhanced the top Quick Chapter Navigation tables on both pages with direct clickable links (`[📖 XX words](#lesson-XX-vocab)` / `[📖 XX Wörter](#lektion-XX-vokabeln)`).
    * Upgraded `src/components/LanguageSwitch.astro` with automatic bidirectional hash mapping (`lesson-XX-vocab` ↔ `lektion-XX-vokabeln`) and automatic drawer expansion on hash navigation.
    * Confirmed user will wait for `.apkg` download files until speech audio generation with `Voice_ML_Project`.
    * Verified clean build (`npm run build`, 16 pages).

18. **Session 13 (Chinese Dialogues Audio Privacy & Removal of Google Drive Downloads)**:
    * Removed Google Drive download links and fallback folder references (`1w3qC6G6t4q0f5o2G1L7n5d3jX`) from `<DialoguePlayer.astro>` and all dialogue instances in `src/content/docs/lectures/languages/chinese.mdx`.
    * Removed the "Studio WAV & Timestamps Master (Dialogues Master Archive)" Google Drive card from `chinese.mdx` to prevent public download of raw dialogue audio assets.
    * Preserved on-site web audio playback (`/audio/dialogues/*.mp3`) and interactive JSON timestamps for practice on `nikku.tech`.
    * Upgraded `<DriveAsset />` component with support for `wip={true}` (rendering a styled amber `🚧 Work In Progress` badge instead of an active Google Drive download link).
    * Set the Chinese 107 MB Anki deck asset card to `Work In Progress` pending rights clearance and audio verification.
    * Verified clean build (`npm run build`, 16 pages).

19. **Session 14 (Agentic AI Seminar Hub, Bilingual Lexicon & Interactive Progress Tracker)**:
    * Built the dedicated academic seminar workstation for *Agentic AI for Problem Solving* (WS 2026/27, Prof. Dr. Michael Gertz, Data Science Group, Heidelberg University).
    * Safeguarded repository weight (<5 MB Git rule) and organizational privacy by syncing all 5 seminar research PDFs + 2 internal slide decks (`~37.6 MB`) into the private Google Drive Vault (`/home/nikku/GoogleDrive/University/Seminar-Gertz/`) while providing official open-access direct links (arXiv, Nature, ScienceDirect) and in-browser inline viewers.
    * Designed a strongly typed bilingual single source of truth (`src/data/seminarAgenticAi.ts`) housing 10 seminar milestones, 5 paper curriculum tracks with 24 active-reading section compasses, and 28 curated technical terms with English and German side-by-side titles.
    * Engineered `<SeminarTracker.astro>` featuring live milestone and paper progress meters, momentary focus bookmark with scratchpad (`localStorage` persistence across languages), and self-check Socratic questions preventing passive AI over-summarization.
    * Built `<SeminarLexicon.astro>` featuring instant search and multi-filtering across Core Paradigms, RL/Reflexion, Benchmarks, and Medical AI.
    * Upgraded `<LanguageSwitch.astro>` with seamless hash-preservation for `#progress`, `#papers`, `#lexicon`, and `#guidelines`.
    * Deployed English primary route (`/lectures/ai-and-med/seminar-agentic-ai/`) and native German edition (`/lectures/ai-and-med/seminar-agentic-ai/de/`), linking from `lectures/index.mdx` and landing page `index.mdx`.
    * **Iteration 2 Refinements**:
      - Removed translated German technical terms from Lexicon card headers so only canonical English Fachbegriffe are displayed.
      - Implemented instant per-card `🇬🇧 EN | 🇩🇪 DE` toggle buttons directly inside each Lexicon word card (plus bulk `All EN | All DE` toggle in filter bar) for client-side language switching without page reload.
      - Pinned the `🇬🇧 EN | 🇩🇪 DE` toggle button to the top-right corner of each card horizontally side-by-side opposite the term title, per user screenshot specification.
      - Removed the duplicate full-page German route (`/de/`) and consolidated the Seminar Hub to a single clean English route (17 static routes total).
      - Archived the complete German page to `/home/nikku/GoogleDrive/University/Seminar-Gertz/backups/seminar_de_index.mdx.bak` for 1-command restoration while preserving all German data fields in `src/data/seminarAgenticAi.ts`.
    * Verified clean static production build (`npm run build`, 17 pages in 1.87s) and running background dev server.

20. **Session 15 (Core Computer Science Privacy & Asset Clean-up)**:
    * Waited for prior seminar tasks to conclude and verified dev server status.
    * Removed Google Drive Assets sections (`<DriveAsset />` components and headings) across all five Core Computer Science course pages ([`theoretical-cs.md`](file:///home/nikku/Documents/Website-Project/src/content/docs/lectures/core-cs/theoretical-cs.md), [`databases.md`](file:///home/nikku/Documents/Website-Project/src/content/docs/lectures/core-cs/databases.md), [`algorithms.md`](file:///home/nikku/Documents/Website-Project/src/content/docs/lectures/core-cs/algorithms.md), [`it-security.md`](file:///home/nikku/Documents/Website-Project/src/content/docs/lectures/core-cs/it-security.md), and [`ise.md`](file:///home/nikku/Documents/Website-Project/src/content/docs/lectures/core-cs/ise.md)) to uphold academic privacy and intellectual property policies (not publishing professor slides without consent).
    * Removed unused component imports; verified clean static production build (`npm run build`, 17 pages in 2.73s).

21. **Session 16 (Heidelberg University & Student Life Guide)**:
    * Created dedicated page `src/content/docs/heidelberg.mdx` (`/heidelberg/`) exploring Ruprecht-Karls-Universität Heidelberg (founded 1386, *Semper Apertus*, 44 Nobel Laureates, Excellence University status).
    * Detailed the dual-campus geography (historic Altstadt vs. modern STEM campus Im Neuenheimer Feld) and the daily life of a B.Sc. Computer Science student (the "Zettel" cycle, bike commuting across the Neckar, study-life balance).
    * Featured curated favorite spots with custom badges and icons:
      - **The Audimax (INF 308)**: Tiered auditorium for deep focus and lecture reviews (styled with the pixel-art `audimax-bg.jpg` overlay).
      - **Das Mathematikon (INF 205)**: Faculty headquarters for CS/Math group learning, problem sets, REWE Center and Bäcker Görtz coffee runs.
      - **Café Park (Altstadt)**: Cozy vintage café on Plöck for coffee breaks, casual reading, and hanging out.
      - **Universitätsbibliothek (UB) Heidelberg**: Historic silent reading rooms for intense exam preparation.
      - **Zeughaus / Marstall & Marstallcafé**: Award-winning riverside Mensa by day, student courtyard and social bar by night.
      - **Neckarwiese**: Heidelberg's open-air living room for post-exam downtime, picnics, and castle sunset views.
      - **Philosophenweg & Botanischer Garten**: Scenic contemplative trails and campus green sanctuaries.
    * Configured sidebar navigation in `astro.config.mjs` under *Profile & Portfolio* (`Heidelberg & Student Life`).
    * Cross-linked the page from `index.mdx` (hero action button) and `cv.md` (University and Education sections).
    * Verified 100% clean production build (`npm run build`, 18 pages generated in 1.86s).
---

## 🚀 How to Resume in Antigravity on Omarchy (Arch Linux) or PC
1. Clone or extract the repository:
   ```bash
   git clone git@github.com:NikkuIsRyu/Nikku.github.io.git Website_project
   cd Website_project
   ```
2. Open the directory in **Antigravity IDE** (`File > Open Folder...`).
3. Ensure Node.js v22+ is installed (`node -v` / `sudo pacman -S nodejs npm` on Omarchy).
4. In the Antigravity chat, send:
   > *"Read SUMMARY.md, CONVERSATION_HISTORY.md, and AGENTS.md, run npm install, verify with npm run build, and start the dev server with astro dev --background."*
