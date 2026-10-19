---
title: Machine Learning & Gradient Descent
description: Foundations of empirical risk minimization, loss functions, convergence, and checkpoint assets.
sidebar:
  order: 1
---

import DriveAsset from '../../../../components/DriveAsset.astro';

:::tip[AI Assisted Note]
Synthesized and formatted from lecture slides, course datasets, and model checkpoint archives.
:::

## 🗂️ Course Assets (Google Drive)

<DriveAsset
	title="Trained Model Checkpoints Archive"
	type="dataset"
	description="17.5 GB compressed deep learning model weights from Google Drive: Meine Ablage/ml_models.zip"
	href="https://drive.google.com"
/>

<DriveAsset
	title="Course Slides & Dataset Benchmarks"
	type="slides"
	description="Lecture slide decks and benchmark datasets from Google Drive: University/"
	href="https://drive.google.com"
/>

---

## 🎯 Key Objectives

1. Understand empirical risk minimization.
2. Formalize Gradient Descent and convergence conditions.
3. Link lecture materials with practical code examples.

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
