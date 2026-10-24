---
title: Algorithmen & Datenstrukturen (AlDa)
description: Asymptotic complexity, sorting algorithms, graph traversals, and dynamic programming.
sidebar:
  order: 3
---

:::tip[Exam Focus]
Covers asymptotic notation, recurrent relations, greedy paradigms, dynamic programming, and amortized analysis.
:::

## 📐 Asymptotic Notations

For functions $f, g: \mathbb{N} \to \mathbb{R}^+$:

* **Big-$O$ (Upper bound)**:
  $$
  f(n) \in \mathcal{O}(g(n)) \iff \exists c > 0, n_0 \in \mathbb{N} :\allowbreak \forall n \ge n_0, \;\allowbreak f(n) \le c \cdot g(n)
  $$
* **Big-$\Omega$ (Lower bound)**:
  $$
  f(n) \in \Omega(g(n)) \iff \exists c > 0, n_0 \in \mathbb{N} :\allowbreak \forall n \ge n_0, \;\allowbreak f(n) \ge c \cdot g(n)
  $$
* **Big-$\Theta$ (Tight bound)**:
  $$
  f(n) \in \Theta(g(n)) \iff f(n) \in \mathcal{O}(g(n)) \land f(n) \in \Omega(g(n))
  $$

---

## ⚡ Master Theorem for Divide-and-Conquer

For recurrences of the form $T(n) = a T(n/b) + f(n)$ with $a \ge 1, b > 1$:

Let $c_{\text{crit}} = \log_b a$.

1. If $f(n) = \mathcal{O}(n^c)$ where $c < c_{\text{crit}}$, then:
   $$
   T(n) = \Theta\left(n^{\log_b a}\right)
   $$
2. If $f(n) = \Theta\left(n^{c_{\text{crit}}} \log^k n\right)$ for $k \ge 0$, then:
   $$
   T(n) = \Theta\left(n^{\log_b a} \log^{k+1} n\right)
   $$
3. If $f(n) = \Omega(n^c)$ where $c > c_{\text{crit}}$ and regularity condition holds ($a f(n/b) \le k f(n)$ for $k < 1$), then:
   $$
   T(n) = \Theta(f(n))
   $$
