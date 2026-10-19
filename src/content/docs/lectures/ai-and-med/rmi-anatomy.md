---
title: RMI & Anatomy (WS 2026/27)
description: Medical informatics, robotics, anatomical coordinate systems, and remote method invocation.
sidebar:
  order: 2
---

import DriveAsset from '../../../../components/DriveAsset.astro';

:::note[Current Semester Note (Wintersemester 2026/27)]
Lecture notes and slide summaries for the Wintersemester 2026/27 curriculum.
:::

## 🗂️ Course Assets (Google Drive)

<DriveAsset
	title="s00: RMI Introduction (WS 2026/27)"
	type="slides"
	description="Semester kick-off slide deck from Google Drive: University/s00-rmi-intro-WS2026_..."
	href="https://drive.google.com"
/>

<DriveAsset
	title="s01: Introduction to Anatomy"
	type="slides"
	description="Anatomical foundations and imaging systems from Google Drive: University/s01-introduction-anatomy_..."
	href="https://drive.google.com"
/>

---

## 🔬 Core Disciplines & Intersections

* **Robotic Medical Interventions (RMI)**: Kinematics, tracking systems, surgical guidance, and registration of anatomical models with real-time sensor streams.
* **Coordinate Systems & Anatomical Planes**:
  - **Sagittal plane**: Bisects body into left and right.
  - **Coronal (Frontal) plane**: Bisects body into anterior and posterior.
  - **Transverse (Axial) plane**: Bisects body into superior and inferior.
* **Rigid Body Transformations in 3D Space**:
  Representing spatial transformations using homogeneous transformation matrices in $SE(3)$:

$$
T = \begin{bmatrix} R & \mathbf{t} \\ \mathbf{0}^T & 1 \end{bmatrix} \in \mathbb{R}^{4 \times 4}, \quad R \in SO(3), \; \mathbf{t} \in \mathbb{R}^3
$$
