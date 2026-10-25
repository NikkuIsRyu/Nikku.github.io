# 🌐 Project Summary & Omarchy Handover Guide: Website_project (nikku.tech)

**Document Purpose**: Comprehensive master handover and architectural context for seamlessly resuming development in **Antigravity** on your **Omarchy (Arch Linux)** system.

---

## 🧭 Executive Summary & Core Mission

This project is a high-performance academic digital garden and professional developer portfolio engineered for **Nick Blassmann (Nikku)**, currently in his 5th semester studying B.Sc. Computer Science (*Informatik*) at Heidelberg University (*Ruprecht-Karls-Universität Heidelberg*).

* **Live URL**: [https://nikku.tech](https://nikku.tech) (Primary custom domain with SSL)
* **Secondary Domain**: `https://nickblassmann.me` (301 permanent redirect)
* **GitHub Repository**: [NikkuIsRyu/Nikku.github.io](https://github.com/NikkuIsRyu/Nikku.github.io) (public, CI/CD automated via GitHub Actions)

### Architectural Pillars:
1. **Zero Cost**: Built entirely for free using benefits from the **GitHub Student Developer Pack** (GitHub Pages static hosting, free domains `.tech` and `.me` via Namecheap/Name.com).
2. **Hybrid Cloud CDN Storage**: The Git repository remains ultra-lightweight (<5 MB). Multi-gigabyte binaries (such as the 17.5 GB PyTorch voice model archive `ml_models.zip`, university lecture slides, textbook PDFs, and Anki packages) are streamed via a custom `<DriveAsset />` component connected to a 5 TB Google Drive vault.
3. **Continuous AI Co-Pilot Collaboration**: Antigravity is used across PC, Laptop, and now Omarchy to synthesize course notes, verify grammar rules, render complex mathematical formulas with KaTeX, audit external study decks, and maintain clean documentation.

---

## 🏛️ Project Directory Structure & Key Content

```
Website_project/
├── .github/
│   └── workflows/
│       └── deploy.yml             # Automated GitHub Pages CI/CD workflow
├── astro.config.mjs               # Starlight theme, KaTeX math plugins, sidebar navigation
├── package.json                   # Dependencies (Astro, Starlight, KaTeX, sharp)
├── tsconfig.json                  # TypeScript configuration
├── AGENTS.md                      # Antigravity development instructions and rules
├── CONVERSATION_HISTORY.md        # Comprehensive chronological ledger of all sessions
├── public/
│   ├── CNAME                      # Custom domain configuration (nikku.tech)
│   └── favicon.svg                # Favicon
└── src/
    ├── assets/
    │   └── houston.webp           # Starlight mascot asset
    ├── components/
    │   ├── DriveAsset.astro       # Interactive card component for Google Drive asset streaming
    │   └── LanguageSwitch.astro   # Interactive EN/DE language switcher with SVG flags
    ├── styles/
    │   └── custom.css             # Global KaTeX styles and theme customization
    └── content/docs/
        ├── index.mdx              # Splash landing page with course curriculum cards
        ├── cv.md                  # CV & About Me (education, skills, research, projects)
        ├── heidelberg.mdx         # Heidelberg University & Student Life Guide
        └── lectures/
            ├── index.mdx          # Academic Vault directory & Drive storage overview
            ├── core-cs/           # CS Foundations
            │   ├── algorithms.md          # Algorithmen und Datenstrukturen (AlDa)
            │   ├── databases.md           # Datenbanken (SQL, Relational Algebra, ER)
            │   ├── ise.md                 # Introduction to Software Engineering
            │   ├── it-security.md         # IT-Sicherheit (MCP boundaries, prompt injection)
            │   └── theoretical-cs.md      # Theoretische Informatik (Automata, Complexity)
            ├── ai-and-med/        # AI & Systems
            │   ├── machine-learning.md    # Voice ML, PyTorch, GPT-SoVITS v2 (17.5 GB models)
            │   └── rmi-anatomy.md         # Robotics & Machine Intelligence + Anatomy
            └── languages/         # Language Vault
                ├── chinese.md             # Mandarin Chinese study notes & Anki vault
                └── japanese/
                    ├── index.mdx          # Intermediate Japanese Track Hub
                    ├── b1-1/
                    │   ├── index.mdx      # English B1.1 Reference (Chapters 26–32, 335 vocabs)
                    │   └── de/index.mdx   # German B1.1 Reference (Chapters 26–32, 335 vocabs)
                    └── b1-2/
                        └── index.md       # Ongoing WS 2026/27 coursework placeholder
```

---

## 📑 Static Routes & Pages (17 Verified Routes)

1. `/index.html`: Digital Garden Landing Page with quick-access cards to all semesters
2. `/cv/index.html`: Curriculum Vitae, academic background, research interests, and project links
3. `/lectures/index.html`: Academic Vault Directory & Google Drive hybrid CDN storage guide
4. `/lectures/core-cs/theoretical-cs/index.html`: Theoretische Informatik
5. `/lectures/core-cs/algorithms/index.html`: Algorithmen & Datenstrukturen
6. `/lectures/core-cs/databases/index.html`: Datenbanken & Informationssysteme
7. `/lectures/core-cs/ise/index.html`: Introduction to Software Engineering
8. `/lectures/core-cs/it-security/index.html`: IT-Sicherheit & MCP Trust Boundaries
9. `/lectures/ai-and-med/machine-learning/index.html`: Machine Learning & Voice ML Project
10. `/lectures/ai-and-med/rmi-anatomy/index.html`: Robotics & Machine Intelligence + Anatomy
11. `/lectures/ai-and-med/seminar-agentic-ai/index.html`: Agentic AI Seminar Hub (Interactive Progress Tracker & Per-Card EN/DE Lexicon)
12. `/lectures/languages/chinese/index.html`: Mandarin Chinese & Interactive Multi-Speaker Dialogues
13. `/lectures/languages/japanese/index.html`: Japanese Track Hub (Intermediate B1)
14. `/lectures/languages/japanese/b1-1/index.html`: Japanese B1.1 Reference (English edition)
15. `/lectures/languages/japanese/b1-1/de/index.html`: Japanese B1.1 Reference (German edition)
16. `/lectures/languages/japanese/b1-2/index.html`: Japanese B1.2 Coursework (WS 2026/27 placeholder)
17. `/404.html`: Custom 404 error page

---

## 💬 Summary of All Conversation Milestones (Sessions 1–10)

### Phase 1: Foundation, Live Deployment & Custom Domains (Sessions 1–3)
- **Scaffolding**: Initialized Astro + Starlight with Node.js 22 LTS, integrated `remark-math` and `rehype-katex` for global formula rendering, and established background dev server workflows (`astro dev --background`).
- **Live Deployment**: Connected repository to GitHub (`NikkuIsRyu/Nikku.github.io`), configured GitHub Actions CI/CD (`deploy.yml`), set up custom domain `https://nikku.tech` with verified HTTPS/SSL, and configured `nickblassmann.me` as a 301 permanent redirect.
- **Academic Realignment**: Aligned CV with official Heidelberg University records (5th Semester B.Sc. Informatik). Corrected RMI terminology to *Robotics and Machine Intelligence* (WS 2026/27, Prof. Dr. Artur Andrzejak), added cutting-edge IT-Security topics (MCP trust boundaries, prompt injection, supply chain security), and linked live projects (`Voice_ML_Project`, `AnkiDeckGenPython`).

### Phase 2: Language Vault Realignment & B1 Track (Sessions 4–5)
- **Portfolio Language Update**: Updated Japanese level on CV to **B1** (reflecting completion of A1.1–A2.2 at *heiSKILLS / Central Language Laboratory*, ongoing tandem partner exchanges, and B1.2 enrollment).
- **Subdirectory Architecture**: Replaced old standalone A1.2 page with an intermediate Japanese Track Hub (`japanese/index.mdx`) and dedicated subdirectories for `b1-1` and `b1-2`. Configured `astro.config.mjs` sidebar dropdowns accordingly.

### Phase 3: B1.1 Grammar Synthesis & Anki Deck Integration (Session 6)
- **Screenshot Audit**: Systematically analyzed all 27 reference screenshots from the *iMina* app (`Minna no Nihongo Shokyu II`, Lessons 26–32).
- **Anki SQLite Extraction**: Unpacked modern Zstandard-compressed SQLite database (`collection.anki21b`) from `Japanese__Minna no Nihongo 1 & 2 (Chapters 1-50).apkg` to extract all 335 vocabulary entries for Lessons 26–32.
- **Errata Identification**: Discovered and corrected **8 grammar/spelling errors in the iMina app screenshots** (e.g. `しめって` $\to$ `しめて`, `つかたら` $\to$ `つかったら`, `て きます` $\to$ `ときます`, `しゅちょう` $\to$ `しゅっちょう`, `とかい` $\to$ `とけい`, `あたらしし` $\to$ `あたらしいし`) and **7 card errors in the Anki deck** (e.g. L29 `開[ひら]きます` $\to$ `開[あ]きます`, `ふさます` $\to$ `ふきます`, `お先に どうそ` $\to$ `どうぞ`, L27 `はかの` $\to$ `ほかの`, L32 `いけませんえ` $\to$ `いけませんね`).
- **Synthesis**: Published the complete English reference on `b1-1/index.mdx` featuring quick navigation, master conjugation tables, clause attachment rules, and 7 collapsible vocabulary registers.

### Phase 4: Peer Review, German Edition & Multilingual Switcher (Sessions 7–9)
- **Linguistic Review 1**: Refined grammatical nuances (such as `片づきます` intransitive vs. transitive distinction, `～んです` contextual justification, `土` schedule abbreviations, and potential verb state focus) based on external linguistic review.
- **German Edition (`b1-1/de/index.mdx`)**: Audited 27 German iMina screenshots (`/home/nick/Dokumente/Imina /`) and constructed a complete, native German edition for B1.1 with full German grammatical terminology, corrected example sentences, and 335 translated vocabulary items. Corrected 6 Japanese typos and 7 German translation defects in the source app.
- **`<LanguageSwitch />` Component**: Built a dedicated Astro component featuring SVG flags (`🇬🇧 English` | `🇩🇪 Deutsch`) and dynamic anchor mapping (`#lesson-XX` $\leftrightarrow$ `#lektion-XX`) that preserves the reader's scroll/chapter position when toggling languages.
- **Linguistic Review 2 & Rendering Fixes**: Replaced raw KaTeX LaTeX arrow formulas (`\to`, `\longrightarrow`) with clean Unicode `→` arrows to eliminate MathML/HTML double-rendering issues. Refined translations for `映画を見たかもしれない` and nuanced `予定です` vs. `つもりです`.
- **Verification**: Verified zero-error compilation with `npm run build` (16 static routes, complete Pagefind search index).

### Phase 5: Omarchy Handover, Cross-System Sync & Cloud Archival (Session 10)
- **Cross-Device Handover**: Consolidated conversation histories and architectural plans from both the PC (`Website-project-pc/`) and Laptop environments.
- **USB Migration Bundle**: Bundled full active Antigravity profile (`antigravity_user_data.tar.gz`, 469 MB) containing OAuth credentials, brain transcripts, and skills to USB storage (`/media/nick/Ventoy/antigravity_migration/`).
- **Google Drive Sync**: Synchronized `SUMMARY.md` and `CONVERSATION_HISTORY.md` to Google Drive via `rclone` under `University/gemini_convos/Website-project-laptop/` and mirrored to `Website-project-omarchy/`.

---

## 💻 Environment & Cross-System Inventory

| System | Role | Relevant Paths & Setup |
| :--- | :--- | :--- |
| **PC (Windows 11)** | Heavy compute, Anki SQLite unpack, Initial B1.1 synthesis | `D:\nickb\Documents\Website_project`<br/>Google Drive mount `G:\Meine Ablage\University\`<br/>Exported to `gemini_convos/Website-project-pc/` |
| **Laptop (Ubuntu 24.04)** | Laptop mobility, German iMina audit, Arrow rendering fix, USB export | `/home/nick/Dokumente/Uni_Relevantes/Website_project`<br/>German screenshots in `/home/nick/Dokumente/Imina /`<br/>Exported to `gemini_convos/Website-project-laptop/` |
| **Target: Omarchy (Arch Linux)** | Clean, rolling-release primary workstation running Antigravity IDE | Cloned via Git SSH or restored from USB migration archive |

---

## 🐧 Quickstart Guide for Omarchy / Arch Linux Antigravity

When opening or setting up this project in **Antigravity** on your **Omarchy (Arch Linux)** system:

### 1. Prerequisites Check
Ensure Node.js 22+ and Git are installed on your Omarchy system:
```bash
# On Omarchy / Arch Linux
sudo pacman -S nodejs npm git rclone

# Check versions
node -v   # Should be v22.x or newer
npm -v
git --version
```

### 2. Clone or Link the Repository
Clone your repository directly from GitHub:
```bash
git clone git@github.com:NikkuIsRyu/Nikku.github.io.git Website_project
cd Website_project
```
*(Or copy the repository directory directly from your laptop or USB drive).*

### 3. Install Dependencies
```bash
npm install
```

### 4. Running the Development Server
Always run the dev server in background mode per `AGENTS.md`:
```bash
astro dev --background
```
Manage the server using:
```bash
astro dev status   # Check server health
astro dev logs     # View live logs
astro dev stop     # Stop the dev server
```

### 5. Build & Verification
Before pushing any new changes, always verify with:
```bash
npm run build
```
*(Expected output: 16 HTML pages generated, Pagefind search index built in ~2.7s).*

### 6. First Prompt to Send to Antigravity on Omarchy
Once you open the folder in Antigravity on your Omarchy machine, you can simply send:
> *"Read SUMMARY.md, CONVERSATION_HISTORY.md, and AGENTS.md to understand where we left off, run npm run build to verify the environment, and let me know you're ready to proceed."*
