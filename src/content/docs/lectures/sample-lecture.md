---
title: "Lecture 01: Foundations & Gradient Descent"
description: Overview of optimization, loss functions, and learning rate dynamics.
sidebar:
  order: 1
---

:::tip[AI Assisted Note]
Synthesized and formatted by **Antigravity** from original lecture slides and notes.
:::

## 🎯 Key Objectives

1. Understand empirical risk minimization.
2. Formalize Gradient Descent and convergence conditions.
3. Link lecture materials with practical code examples.

---

## 🗂️ Course Assets (Google Drive)

Large slides and datasets are stored on Google Drive to keep the repository fast:

* [📥 Download Original Lecture Slides (Google Drive)](https://drive.google.com)
* [📊 Download Dataset Benchmark (Google Drive)](https://drive.google.com)

---

## 📐 Mathematical Formulation

### Mean Squared Error (MSE) Loss

For a dataset of $N$ training points $(x_i, y_i)$, the loss is defined as:

$$
L(\theta) = \frac{1}{2N} \sum_{i=1}^N \left( h_\theta(x_i) - y_i \right)^2
$$

### Parameter Update Rule

In standard gradient descent with learning rate $\eta > 0$:

$$
\theta_{t+1} = \theta_t - \eta \nabla_\theta L(\theta_t)
$$

Where the gradient vector is given by:

$$
\nabla_\theta L(\theta) = \begin{bmatrix} \frac{\partial L}{\partial \theta_0} \\ \frac{\partial L}{\partial \theta_1} \\ \vdots \\ \frac{\partial L}{\partial \theta_d} \end{bmatrix}
$$

---

## 💻 Python Implementation

```python
import numpy as np

def gradient_descent(X, y, lr=0.01, epochs=1000):
    m, n = X.shape
    theta = np.zeros((n, 1))
    
    for epoch in range(epochs):
        predictions = X @ theta
        errors = predictions - y
        gradient = (1 / m) * (X.T @ errors)
        theta -= lr * gradient
        
    return theta
```
