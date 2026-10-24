---
title: IT-Security & Exploitation
description: Cryptography basics, network security, web vulnerabilities, CTF challenge flags, and AI agent security.
sidebar:
  order: 4
---

:::tip[Lab & CTF Archive]
Compiled writeups, security flags, practice exercise notes, and research topics from IT security coursework and the WS 2026/27 Seminar at Heidelberg University.
:::

## 🛡️ Core Security Concepts

### 1. Symmetric vs. Asymmetric Cryptography

* **Symmetric Encryption (AES-GCM, ChaCha20)**: Fast bulk encryption using a single shared key $K$.
* **Asymmetric Encryption (RSA, ECC)**: Key pair $(e, d)$ where $e$ is public and $d$ is private:
  $$
  c \equiv m^e \pmod N, \quad m \equiv c^d \pmod N
  $$
* **Diffie-Hellman Key Exchange**:
  Given generator $g$ and prime $p$:
  $$
  A = g^a \pmod p, \quad B = g^b \pmod p \implies K = B^a \equiv A^b \equiv g^{ab} \pmod p
  $$

---

## 🚩 Web Security & Vulnerability Analysis

* **SQL Injection (SQLi)**: Parameterizing queries or using ORM layers to neutralize malicious input.
* **Cross-Site Scripting (XSS)**: Reflected, Stored, and DOM-based sanitization via Content Security Policy (CSP).
* **Cross-Site Request Forgery (CSRF)**: Mitigated by SameSite cookies and cryptographically signed anti-CSRF tokens.

---

## 🤖 Security of AI Tool Ecosystems & Agents (WS 2026/27 Seminar)

### 1. Model Context Protocol (MCP) Security
As AI coding assistants and autonomous agents gain direct access to local files, terminal tools, and remote APIs, the **Model Context Protocol (MCP)** establishes communication standards between models, host clients, and external tool servers.
* **Trust Boundaries**: Defining isolation zones between probabilistic reasoning engines and deterministic system executors.
* **Privilege Escalation**: Mitigating risks where models execute arbitrary actions or exfiltrate private files via compromised server tools.
* **Defense Strategies**: Least-privilege capability negotiation, strict schema validation, and verified human-in-the-loop authorization gates.

### 2. Prompt Injection in LLM-Integrated Applications
* **Direct vs. Indirect Prompt Injection**: While direct attacks attempt jailbreaking via user prompts, indirect prompt injection occurs when an agent ingests untrusted external data (web pages, GitHub READMEs, API responses) containing embedded instructions.
* **Instruction vs. Data Conflation**: Because transformer architectures process prompts and retrieved context within the same attention stream, separating operational directives from passive text remains a fundamental vulnerability.
* **Evaluation & Defense**: Multi-model verification architectures, input/output filtering with guardrail frameworks (e.g., NeMo Guardrails), and structured tool parameter enforcement.

### 3. Securing the Open-Source Software Supply Chain
* **Ecosystem Vulnerabilities**: Analyzing typo-squatting, malicious package updates, dependency confusion, and build-pipeline compromises in open-source Python (PyPI) and Node (npm) ecosystems.
* **Mitigation**: Cryptographic hash verification, immutable lockfiles, reproducible builds, and isolated ephemeral containers for build scripts.
