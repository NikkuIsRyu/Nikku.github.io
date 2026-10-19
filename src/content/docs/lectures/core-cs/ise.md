---
title: Information Systems Engineering (ISE)
description: Enterprise software engineering, design patterns, microservices architecture, and requirements engineering.
sidebar:
  order: 5
---

import DriveAsset from '../../../../components/DriveAsset.astro';

:::tip[Assignment & Quiz Vault]
Coursework materials, weekly assignments, and design patterns from Information Systems Engineering.
:::

## 🗂️ Course Assets (Google Drive)

<DriveAsset
	title="ISE Assignment Submissions & Quizzes"
	type="pdf"
	description="Assignment deliverables (Ass05, Ass08, Ass10) and Quizzes from Google Drive: University/"
	href="https://drive.google.com"
/>

---

## 🏛️ Architecture Patterns

1. **Layered (N-Tier) Architecture**:
   - Presentation $\to$ Application / Business Logic $\to$ Data Access Layer (DAL) $\to$ Database.
2. **Event-Driven Architecture (EDA)**:
   - Decoupled producers and consumers communicating via message brokers (Kafka, RabbitMQ).
3. **Domain-Driven Design (DDD)**:
   - Ubiquitous language, bounded contexts, entities, value objects, aggregates, and domain events.

---

## 🔄 SOLID Principles Checklist

| Principle | Description |
| :--- | :--- |
| **S** — Single Responsibility | A class should have one, and only one, reason to change. |
| **O** — Open/Closed | Software entities should be open for extension, but closed for modification. |
| **L** — Liskov Substitution | Subtypes must be substitutable for their base types without altering correctness. |
| **I** — Interface Segregation | Clients should not be forced to depend upon interfaces they do not use. |
| **D** — Dependency Inversion | Depend upon abstractions, not concretions. |
