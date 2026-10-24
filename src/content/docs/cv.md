---
title: Curriculum Vitae & About Me
description: Academic background, projects, and contact info.
head:
  - tag: script
    content: document.documentElement.dataset.pageBg = 'desk';
---

<div class="page-bg-desk" aria-hidden="true"></div>

## 👨‍💻 About Me

Welcome to my personal academic portal and knowledge base. I document my university coursework, research summaries, and engineering projects here.

* **Name**: Nick Blassmann (Nikku)
* **University**: Heidelberg University (*Ruprecht-Karls-Universität Heidelberg*)
* **Degree**: B.Sc. in Computer Science (*Informatik*), 5th Semester
* **Focus Areas**: Artificial Intelligence & Machine Learning, Robotics & Embodied AI, AI Agent Security (MCP), Systems Architecture
* **Portfolio**: [nikku.tech](https://nikku.tech) *(alias: [nickblassmann.me](https://nickblassmann.me))*
* **GitHub**: [github.com/NikkuIsRyu](https://github.com/NikkuIsRyu)
* **LinkedIn**: [linkedin.com/in/nikkuisryu](https://linkedin.com)

---

## 🎓 Education

### B.Sc. in Computer Science (Informatik)
*Heidelberg University (Ruprecht-Karls-Universität Heidelberg)* • *Oct 2024 – Present (5th Semester)*

* **Core Computer Science & Systems**: Operating Systems and Networks (*Betriebssysteme und Netzwerke*), Algorithms and Data Structures (*AlDa*), Introduction to Software Engineering (*ISW/ISE*), Programming Course (C++), Introduction to Computer Science (*IPI*), Introduction to Computer Engineering (*ITE*), Theoretical Computer Science (*ITH*), Databases & Information Systems (*IDB*).
* **Mathematics**: Mathematics for Computer Scientists 1 & 2 (*Lineare Algebra, Analysis, Diskrete Mathematik*).
* **AI, Robotics & Visual Computing**: Artificial Intelligence (*State-Space Search, Heuristics, Logic, Planning*), Robotics and Machine Intelligence (*RMI*, WS 2026/27, Prof. Dr. Artur Andrzejak), Computer Graphics (*ICG*).
* **Current Seminar & Research Focus (WS 2026/27)**:
  * *Seminar IT Security* at EMCL (Prof. Dr. Vincent Heuveline): Security of AI Tool Ecosystems (Model Context Protocol / MCP trust boundaries), Indirect Prompt Injection in LLM agents, and Open-Source Software Supply Chain Security.
  * *AI Planning & Software Practicals*: Explainable AI Planning (*XAIP*, *PlanPilot* / *FASB*), Neurosymbolic Reasoning (*Answer-Set Programming with Clingo*), and LLM Guardrails (*NeMo Guardrails*).
* **Interdisciplinary & Languages**: Japanese B1 (*heiSKILLS & Central Language Laboratory of Heidelberg University* — completed coursework through A2.2, regular tandem partner meetups, and current B1.2 course), Mandarin Chinese.

#### 🧭 Academic Roadmap
* **6th Semester (Summer 2027)**: Bachelor's Thesis in Artificial Intelligence / Machine Learning.
* **7th Semester (Winter 2027/28)**: Planned Exchange Semester in East Asia (Japan, South Korea, or China).
* **Graduate Objective**: M.Sc. in Robotics & Autonomous / Embodied Intelligence.

---

## 🛠️ Technical Skills

* **Languages**: Python, C++, TypeScript/JavaScript, SQL, Bash/PowerShell, LaTeX
* **AI, ML & Audio Processing**: PyTorch, CUDA, GPT-SoVITS (Voice Cloning & TTS), Whisper ASR, HuBERT, RoBERTa, UVR5, Answer-Set Programming (Clingo), AI Agents & Model Context Protocol (MCP)
* **Frameworks, Systems & Tools**: Astro, Starlight, Linux (Ubuntu), Docker & Docker Compose, Git & GitHub Actions CI/CD, REST APIs

---

## 🚀 Projects

### [Voice ML — Chinese TTS Learning Assistant](https://github.com/NikkuIsRyu/Voice_ML_Project)
* **Stack**: Python 3.10, GPT-SoVITS v2, PyTorch 2.5, CUDA 12.1, Whisper ASR, HuBERT, RoBERTa, UVR5.
* **Overview**: End-to-end voice cloning and text-to-speech pipeline to generate natural-sounding Mandarin pronunciation for custom exercise book dialogues and vocabulary lists. Fine-tuned GPT-SoVITS on reference audio clips from the THCHS-30 speech dataset on an NVIDIA RTX 4060.
* **Architecture**: Local REST inference API server paired with batch synthesis client scripts (`generate_audio.py`) and a 17.5 GB deep learning checkpoint archive (`ml_models.zip`) hosted on the Google Drive Vault.

### [Academic Knowledge Vault & Portfolio (nikku.tech)](https://github.com/NikkuIsRyu/Nikku.github.io)
* **Stack**: Astro 5, Starlight, TypeScript, KaTeX, GitHub Actions CI/CD, Google Drive CDN.
* **Overview**: Personal academic knowledge base, lecture synthesis vault, and project portfolio. Automated continuous deployment with GitHub Actions, mathematical formula rendering with KaTeX, Pagefind client-side search, and hybrid cloud streaming of slides, datasets, and flashcard archives via `<DriveAsset />`.

### [AnkiDeckGenPython & LaTeX Study Automation](https://github.com/NikkuIsRyu/AnkiDeckGenPython)
* **Stack**: Python, LaTeX (`tikz`, `amsmath`, `algorithm2e`), Anki `.apkg` packaging.
* **Overview**: Automated spaced repetition deck generator transforming LaTeX course formulas and vocabulary registers into structured Anki cards for Theoretical Computer Science ($s^m_n$-theorem, formal automata, undecidability proofs) and East Asian language studies.
