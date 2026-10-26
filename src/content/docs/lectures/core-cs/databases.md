---
title: Datenbanken & Informationssysteme
description: Relational model, relational algebra, SQL optimization, indexing, and Docker environments.
sidebar:
  order: 2
head:
  - tag: script
    content: document.documentElement.dataset.pageBg = 'core-cs';
---

<div class="page-bg-core-cs" aria-hidden="true"></div>

:::tip[Exam & Exercise Archives]
Includes solutions and notes based on university exam archives and Docker-based database labs.
:::

## 📐 Relational Algebra Fundamentals

The foundational operators in relational algebra:

| Operator | Symbol | Meaning | Example |
| :--- | :--- | :--- | :--- |
| **Selection** | $\sigma_\varphi(R)$ | Rows satisfying predicate $\varphi$ | $\sigma_{\text{credits} \ge 6}(\text{Course})$ |
| **Projection** | $\pi_{A_1, \dots, A_k}(R)$ | Select specific columns | $\pi_{\text{name, matnr}}(\text{Student})$ |
| **Natural Join** | $R \bowtie S$ | Join on matching attribute names | $\text{Student} \bowtie \text{Enrollment}$ |
| **Theta Join** | $R \bowtie_\theta S$ | General condition join | $R \bowtie_{R.A < S.B} S$ |
| **Rename** | $\rho_{S}(R)$ | Renames relation or attributes | $\rho_{\text{Alumni}}(\text{Graduates})$ |

### Example Query

Retrieve all students enrolled in "Datenbanken" with a grade $\le 2.0$:

$$
\pi_{\text{name, matnr}}\bigl(\allowbreak \sigma_{\text{title} = \text{'Datenbanken'} \land \text{grade} \le 2.0}\allowbreak (\text{Student} \bowtie \text{Exam} \bowtie \text{Course}) \bigr)
$$

---

## 💻 Dockerized Lab Setup

```yaml
# docker-compose.yml for local database lab
version: '3.8'

services:
  postgres-db:
    image: postgres:16-alpine
    container_name: uni_postgres
    restart: always
    environment:
      POSTGRES_USER: uni_user
      POSTGRES_PASSWORD: secretpassword
      POSTGRES_DB: university_vault
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```
