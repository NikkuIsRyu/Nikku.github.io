---
title: IT-Security & Exploitation
description: Cryptography basics, network security, web vulnerabilities, CTF challenge flags and writeups.
sidebar:
  order: 4
---

import DriveAsset from '../../../../components/DriveAsset.astro';

:::tip[Lab & CTF Archive]
Compiled writeups, security flags, and practice exercise notes from hands-on IT security coursework.
:::

## 🗂️ Course Assets (Google Drive)

<DriveAsset
	title="IT-Security Flags & Assignment Notes"
	type="doc"
	description="CTF challenge flags and writeups from Google Drive: University/Flags_03-2.md & itsecub03flags.txt"
	href="https://drive.google.com"
/>

---

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
