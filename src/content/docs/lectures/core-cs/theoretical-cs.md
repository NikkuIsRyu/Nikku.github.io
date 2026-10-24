---
title: Theoretische Informatik
description: Formal languages, automata theory, decidability, and computational complexity.
sidebar:
  order: 1
---

:::tip[Academic Vault Entry]
Summary and exam memory protocols synthesized for the **Theoretische Informatik** curriculum.
:::

## 🎯 Key Topics & Pillars

1. **Automata Theory & Formal Languages**:
   - Regular languages, deterministic/non-deterministic finite automata (DFA/NFA).
   - Chomsky Hierarchy ($L_3 \subset L_2 \subset L_1 \subset L_0$).
   - Context-free grammars and Pushdown Automata (PDA).
2. **Computability & Decidability**:
   - Turing machines, Church-Turing thesis.
   - The Halting Problem ($H = \{ \langle M, w \rangle \mid M \text{ halts on } w \}$) is undecidable via diagonalization.
   - Rice's Theorem: Any non-trivial semantic property of Turing machines is undecidable.
3. **Complexity Theory**:
   - Classes $\mathbf{P}$, $\mathbf{NP}$, $\mathbf{NP}\text{-complete}$, and $\mathbf{PSPACE}$.
   - Polynomial-time reductions ($A \le_p B$).

---

## 📐 Formal Definitions

### Pumping Lemma for Regular Languages

If $L$ is a regular language, then there exists a constant $p \ge 1$ (the pumping length) such that any word $w \in L$ with $|w| \ge p$ can be partitioned into $w = xyz$ satisfying:

1. $|y| \ge 1$
2. $|xy| \le p$
3. $\forall i \ge 0, \; x y^i z \in L$

$$
\forall w \in L, \;\allowbreak (|w| \ge p \implies \exists x,y,z:\allowbreak w = xyz \land |y| > 0 \land |xy| \le p \land \forall i \ge 0, \;\allowbreak xy^iz \in L)
$$

### The Halting Problem Undecidability Proof Sketch

Assume a decider $H(\langle M \rangle, w)$ exists that outputs $1$ if $M$ halts on $w$, and $0$ otherwise. Construct machine $D$:

$$
D(\langle M \rangle) = \begin{cases} \text{loop forever} & \text{if } H(\langle M \rangle, \langle M \rangle) = 1 \\ \text{halt} & \text{if } H(\langle M \rangle, \langle M \rangle) = 0 \end{cases}
$$

Running $D(\langle D \rangle)$ yields an immediate contradiction: $D$ halts on $\langle D \rangle$ if and only if $D$ loops forever on $\langle D \rangle$. Hence, no such decider $H$ can exist.
