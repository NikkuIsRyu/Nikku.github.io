/**
 * Comprehensive Academic Data Store for Robotics and Machine Intelligence (RMI)
 * WS 2026 / 2027 · Heidelberg University · Prof. Dr. Artur Andrzejak (AIP)
 * Modern Robotics (Lynch & Park) / URDF / Kinematics / PoE / Quizzes
 */

export interface RmiFormulaRule {
  id: string;
  title: string;
  lesson: string;
  category: 'SO(3) Rotation' | 'Lie Algebra' | 'SE(3) Transform' | 'Forward Kinematics' | 'Inverse Kinematics' | 'Dynamics & Trajectories';
  formulaLaTeX: string;
  summary: string;
  intuition: string;
  invariants: string[];
  nuances: string[];
  pythonCode: string;
  latexExample: string;
}

export interface RmiConfusablePair {
  id: string;
  topic: string;
  lesson: string;
  mnemonic: string;
  left: {
    term: string;
    concept: string;
    formula: string;
    description: string;
    correctCase: {
      math: string;
      explanation: string;
    };
    pitfallCase: {
      math: string;
      warning: string;
    };
  };
  right: {
    term: string;
    concept: string;
    formula: string;
    description: string;
    correctCase: {
      math: string;
      explanation: string;
    };
    pitfallCase: {
      math: string;
      warning: string;
    };
  };
}

export interface RmiQuizItem {
  id: string;
  number: number;
  title: string;
  lesson: string;
  timeLimitSec: number;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  explanation: string;
  distractorBreakdown: {
    optionId: string;
    whyWrong: string;
  }[];
  slideRef: string;
  bookRef: string;
}

export interface Ar4JointSpec {
  joint: string;
  name: string;
  type: string;
  omega: [number, number, number];
  q_mm: [number, number, number];
  v_mm: [number, number, number];
  limitsDeg: [number, number];
  description: string;
}

export const AR4_JOINT_SPECS: Ar4JointSpec[] = [
  {
    joint: 'J1',
    name: 'Base Swivel',
    type: 'Revolute',
    omega: [0, 0, 1],
    q_mm: [0, 0, 0],
    v_mm: [0, 0, 0],
    limitsDeg: [-170, 170],
    description: 'Rotates around vertical space axis z_s. Pure rotation, v1 = -w1 x q1 = [0,0,0].'
  },
  {
    joint: 'J2',
    name: 'Shoulder Pitch',
    type: 'Revolute',
    omega: [0, 1, 0],
    q_mm: [64.2, 0, 169.8],
    v_mm: [-169.8, 0, 64.2],
    limitsDeg: [-42, 90],
    description: 'Tilts upper arm. q2 = [a1, 0, d1]. v2 = -[0,1,0] x [64.2, 0, 169.8] = [-169.8, 0, 64.2].'
  },
  {
    joint: 'J3',
    name: 'Elbow Pitch',
    type: 'Revolute',
    omega: [0, 1, 0],
    q_mm: [64.2, 0, 474.8],
    v_mm: [-474.8, 0, 64.2],
    limitsDeg: [-89, 52],
    description: 'Elbow elevation. q3 = [a1, 0, d1 + a2] = [64.2, 0, 474.8]. v3 = [-474.8, 0, 64.2].'
  },
  {
    joint: 'J4',
    name: 'Forearm Roll',
    type: 'Revolute',
    omega: [1, 0, 0],
    q_mm: [0, 0, 474.8],
    v_mm: [0, 474.8, 0],
    limitsDeg: [-165, 165],
    description: 'First spherical wrist axis. Coincident roll axis along x_s at height h = 474.8 mm.'
  },
  {
    joint: 'J5',
    name: 'Wrist Pitch',
    type: 'Revolute',
    omega: [0, 1, 0],
    q_mm: [286.8, 0, 474.8],
    v_mm: [-474.8, 0, 286.8],
    limitsDeg: [-105, 105],
    description: 'Spherical wrist pitch. q5 = [a1 + d4, 0, h] = [286.8, 0, 474.8]. v5 = [-474.8, 0, 286.8].'
  },
  {
    joint: 'J6',
    name: 'Tool Flange Roll',
    type: 'Revolute',
    omega: [1, 0, 0],
    q_mm: [0, 0, 474.8],
    v_mm: [0, 474.8, 0],
    limitsDeg: [-155, 155],
    description: 'Final tool roll axis. Collinear with J4 at home pose.'
  }
];

export const RMI_FORMULA_RULES: RmiFormulaRule[] = [
  {
    id: 'rodrigues',
    title: "Rodrigues' Rotation Formula",
    lesson: 'Lecture 2 & 3 · MR § 3.2.3',
    category: 'SO(3) Rotation',
    formulaLaTeX: 'R = \\mathrm{Rot}(\\hat{\\omega}, \\theta) = e^{[\\hat{\\omega}]\\theta} = I + \\sin\\theta [\\hat{\\omega}] + (1 - \\cos\\theta)[\\hat{\\omega}]^2',
    summary: 'Closed-form solution for the matrix exponential on SO(3), turning an axis-angle rotation pair (unit vector omega_hat and angle theta) directly into a 3x3 orthogonal rotation matrix.',
    intuition: 'The identity matrix I preserves the vector component along the axis. The term sin(theta)[omega_hat] pushes sideways along the circle tangent. The term (1 - cos(theta))[omega_hat]^2 pulls radially inwards toward the rotation axis to keep the trajectory on the circle.',
    invariants: [
      'For any unit vector: [omega_hat]^3 = -[omega_hat] (powers repeat with alternating signs: +, +, -, -)',
      'Orthogonality: R^T R = I and det(R) = +1 (preserves lengths ||Rv|| = ||v|| and right-handedness)',
      'Inversion cost is zero: R^{-1} = R^T = Rot(omega_hat, -theta)'
    ],
    nuances: [
      'Requires ||omega_hat|| = 1. If speed ||omega|| != 1, time t rescales the angle: theta = ||omega|| * t.',
      'For small angles theta << 1, Taylor approximation yields R approx I + theta[omega_hat].'
    ],
    latexExample: '\\hat{\\omega} = \\hat{z} = (0,0,1), \\; \\theta = 90^\\circ \\implies R = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}',
    pythonCode: `import numpy as np
from scipy.spatial.transform import Rotation as R

# Rotation of 90 degrees around z-axis
omega_hat = np.array([0.0, 0.0, 1.0])
theta = np.radians(90.0)

omega_bracket = np.array([
    [0.0, -omega_hat[2], omega_hat[1]],
    [omega_hat[2], 0.0, -omega_hat[0]],
    [-omega_hat[1], omega_hat[0], 0.0]
])

# Rodrigues' formula
R_rodrigues = np.eye(3) + np.sin(theta) * omega_bracket + (1.0 - np.cos(theta)) * (omega_bracket @ omega_bracket)
print("Rodrigues:\\n", np.round(R_rodrigues, 2))

# Scipy verification
R_scipy = R.from_rotvec(theta * omega_hat).as_matrix()
assert np.allclose(R_rodrigues, R_scipy)`
  },
  {
    id: 'skew-bracket',
    title: 'Skew-Symmetric Bracket Operator [ · ] (so(3))',
    lesson: 'Lecture 2 & 3 · MR § 3.2.2',
    category: 'Lie Algebra',
    formulaLaTeX: '[a] = \\begin{pmatrix} 0 & -a_3 & a_2 \\\\ a_3 & 0 & -a_1 \\\\ -a_2 & a_1 & 0 \\end{pmatrix} \\in so(3), \\quad [a]b = a \\times b',
    summary: 'Maps a 3D vector into a 3x3 skew-symmetric matrix such that matrix-vector multiplication reproduces the cross-product exactly.',
    intuition: 'Row i of [a] contains the linear coefficients of vector a in component i of the vector cross product a x b. Represents infinitesimal rotations and angular velocity.',
    invariants: [
      'Skew-symmetry: [a]^T = -[a]',
      'Zero trace: tr([a]) = 0',
      'For unit vector: [a]^3 = -[a]',
      '3 free parameters for 3 DoF'
    ],
    nuances: [
      'a x (b x c) = b(a . c) - c(a . b)',
      'Cross product of parallel vectors vanishes: [a]a = a x a = 0'
    ],
    latexExample: '[\\hat{z}]\\hat{x} = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix} \\begin{pmatrix} 1 \\\\ 0 \\\\ 0 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 0 \\end{pmatrix} = \\hat{y} = \\hat{z} \\times \\hat{x}',
    pythonCode: `import numpy as np

def so3_bracket(w):
    return np.array([
        [0.0, -w[2], w[1]],
        [w[2], 0.0, -w[0]],
        [-w[1], w[0], 0.0]
    ])

a = np.array([1.0, 2.0, 3.0])
b = np.array([4.0, 5.0, 6.0])

# Verify matrix multiplication equals cross product
assert np.allclose(so3_bracket(a) @ b, np.cross(a, b))`
  },
  {
    id: 'homogeneous-transform',
    title: 'Homogeneous Transformation Matrix (SE(3))',
    lesson: 'Lecture 2 · MR § 3.3.1',
    category: 'SE(3) Transform',
    formulaLaTeX: 'T_{sb} = \\begin{pmatrix} R_{sb} & p_{sb} \\\\ \\mathbf{0} & 1 \\end{pmatrix} = \\begin{pmatrix} r_{11} & r_{12} & r_{13} & p_1 \\\\ r_{21} & r_{22} & r_{23} & p_2 \\\\ r_{31} & r_{32} & r_{33} & p_3 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} \\in SE(3)',
    summary: 'Combines 3D orientation R in SO(3) and 3D translation p in R^3 into a single 4x4 matrix representing rigid body pose in space.',
    intuition: 'Adding the artificial homogeneous coordinate 1 allows both rotation and translation to be chained via standard associative matrix multiplications.',
    invariants: [
      'Subscript cancellation rule: T_{ab} T_{bc} = T_{ac}',
      'Vector conversion: p_s = R_{sb} p_b + p_{sb}',
      'A point gets a 1 appended (shifts); a direction/velocity gets a 0 appended (only rotates)'
    ],
    nuances: [
      'Order of composition matters: non-commutative Tab Tbc != Tbc Tab.',
      'Subscripts must match identically: if inner subscripts do not cancel, the operation is physically invalid.'
    ],
    latexExample: 'T_{camera} = \\begin{pmatrix} 1 & 0 & 0 & 0.4 \\\\ 0 & -1 & 0 & 0 \\\\ 0 & 0 & -1 & 0.6 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}, \\; p_c = \\begin{pmatrix} 0.10 \\\\ 0.05 \\\\ 0.55 \\\\ 1 \\end{pmatrix} \\implies p_s = \\begin{pmatrix} 0.50 \\\\ -0.05 \\\\ 0.05 \\\\ 1 \\end{pmatrix}',
    pythonCode: `import numpy as np

# Camera transform T_sc
T_sc = np.array([
    [1.0,  0.0,  0.0, 0.4],
    [0.0, -1.0,  0.0, 0.0],
    [0.0,  0.0, -1.0, 0.6],
    [0.0,  0.0,  0.0, 1.0]
])

# Cup in camera coordinates (homogeneous)
p_c = np.array([0.10, 0.05, 0.55, 1.0])
p_s = T_sc @ p_c
print("Cup in robot base frame (m):", p_s[:3])
# Result: [0.50, -0.05, 0.05]`
  },
  {
    id: 'transform-inverse',
    title: 'Closed-Form Inverse of SE(3) Transform',
    lesson: 'Lecture 2 · MR § 3.3.1',
    category: 'SE(3) Transform',
    formulaLaTeX: 'T_{sb}^{-1} = T_{bs} = \\begin{pmatrix} R^\\top & -R^\\top p \\\\ \\mathbf{0} & 1 \\end{pmatrix}',
    summary: 'Exact algebraic inversion of a homogeneous transformation matrix without performing expensive numerical Gaussian elimination or matrix inversion.',
    intuition: 'To reverse from {b} to {s}, you un-rotate the world using R^T, and un-shift the origin position: p_{new} = -R^T * p.',
    invariants: [
      'T_{sb} T_{bs} = I_{4x4}',
      'T_{ab}^{-1} = T_{ba}',
      'O(1) algebraic computation'
    ],
    nuances: [
      'Do not invert p as -p alone! It must be rotated by -R^T p.',
      'Check: (R p) * (R^T -R^T p) = R R^T p - R R^T p = 0.'
    ],
    latexExample: 'T = \\begin{pmatrix} 0 & -1 & 0 & 2 \\\\ 1 & 0 & 0 & 3 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix} \\implies T^{-1} = \\begin{pmatrix} 0 & 1 & 0 & -3 \\\\ -1 & 0 & 0 & 2 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}',
    pythonCode: `import numpy as np

def invert_se3(T):
    R = T[:3, :3]
    p = T[:3, 3]
    T_inv = np.eye(4)
    T_inv[:3, :3] = R.T
    T_inv[:3, 3] = -R.T @ p
    return T_inv

T_test = np.array([
    [0.0, -1.0, 0.0, 2.0],
    [1.0,  0.0, 0.0, 3.0],
    [0.0,  0.0, 1.0, 0.0],
    [0.0,  0.0, 0.0, 1.0]
])

T_inv = invert_se3(T_test)
assert np.allclose(T_test @ T_inv, np.eye(4))`
  },
  {
    id: 'screw-axis',
    title: 'Screw Axis S and Matrix Bracket [S] in se(3)',
    lesson: 'Lecture 3 · MR § 3.3.2',
    category: 'Lie Algebra',
    formulaLaTeX: '\\mathcal{S} = (\\hat{\\omega}, v) \\in \\mathbb{R}^6, \\quad [\\mathcal{S}] = \\begin{pmatrix} [\\hat{\\omega}] & v \\\\ \\mathbf{0} & 0 \\end{pmatrix} \\in se(3)',
    summary: 'A 6-vector packing angular velocity omega_hat and linear velocity v representing spatial rigid body motion. [S] is its 4x4 matrix Lie algebra representation.',
    intuition: 'For a revolute joint, omega_hat is the unit direction axis, and v = -omega_hat x q is the velocity of the point at the origin of frame {s} if the body were rigidly extended there. Any point q on the axis yields the exact same v.',
    invariants: [
      'Revolute Joint: ||omega_hat|| = 1, v = -omega_hat x q',
      'Prismatic Joint: omega_hat = 0, ||v|| = 1 (linear sliding direction)',
      'Matrix exponential of [S]*theta gives rigid spatial displacement in SE(3)'
    ],
    nuances: [
      'v is NOT the linear velocity of joint q! It is the linear velocity of the origin {s}.',
      'Adding any multiple c * omega_hat to q leaves v invariant since omega_hat x omega_hat = 0.'
    ],
    latexExample: '\\text{Revolute joint at } q = (0.3, 0, 0), \\; \\hat{\\omega} = \\hat{z} = (0,0,1) \\implies v = -\\hat{z} \\times (0.3, 0, 0) = (0, -0.3, 0)',
    pythonCode: `import numpy as np

def make_screw_axis(omega_hat, q_point=None, is_prismatic=False):
    if is_prismatic:
        omega = np.zeros(3)
        v = omega_hat / np.linalg.norm(omega_hat)
    else:
        omega = omega_hat / np.linalg.norm(omega_hat)
        v = -np.cross(omega, q_point)
    return np.hstack([omega, v])

# AR4 Joint 2
S2 = make_screw_axis([0, 1, 0], [64.2, 0, 169.8])
print("S2 Screw Axis:", S2)
# Output: [ 0.     1.     0.   -169.8    0.    64.2]`
  },
  {
    id: 'poe-space',
    title: 'Product of Exponentials (PoE) — Space Form',
    lesson: 'Lecture 3 · MR § 4.1.1',
    category: 'Forward Kinematics',
    formulaLaTeX: 'T(\\theta) = e^{[\\mathcal{S}_1]\\theta_1} e^{[\\mathcal{S}_2]\\theta_2} \\cdots e^{[\\mathcal{S}_n]\\theta_n} M',
    summary: 'Computes forward kinematics for an n-joint robot arm without requiring intermediate link reference frames. Only needs base {s}, home pose M, and screw axes S_i in {s}.',
    intuition: 'Each joint turns everything downstream of it as a single rigid body. Because downstream joints are evaluated starting from the tip to the base when joints are at zero, each transformation factor multiplies from the LEFT.',
    invariants: [
      'All screw axes S_i are evaluated at the home pose theta = 0 in base frame {s}',
      'M in SE(3) is the end-effector home pose T(0)',
      'e^{[S_i]theta_i} = [[Rot(w_i, theta_i), (I - Rot(w_i, theta_i))q_i], [0, 1]]'
    ],
    nuances: [
      'Space Form has M on the far RIGHT: T = e^{S1}...e^{Sn} * M.',
      'No link frames are needed — eliminates Denavit-Hartenberg (DH) convention confusion!'
    ],
    latexExample: '2R \\text{ Arm}: T(\\theta) = e^{[\\mathcal{S}_1]30^\\circ} e^{[\\mathcal{S}_2]60^\\circ} M = \\begin{pmatrix} 0 & -1 & 0 & 0.26 \\\\ 1 & 0 & 0 & 0.35 \\\\ 0 & 0 & 1 & 0 \\\\ 0 & 0 & 0 & 1 \\end{pmatrix}',
    pythonCode: `import numpy as np
import modern_robotics as mr

# AR4 Kinematics in mm
d1, a1, a2, d4, d6 = 169.77, 64.2, 305.0, 222.63, 41.0
h = d1 + a2

# Home pose M (tool pointing forward along x_s, gripper z_e points forward)
M = np.array([
    [ 0,  0, 1, a1 + d4 + d6],
    [ 0,  1, 0, 0],
    [-1,  0, 0, h],
    [ 0,  0, 0, 1]
])

# Screw axes S1 ... S6 (each column is a joint)
Slist = np.array([
    [0, 0, 1,      0, 0,       0],
    [0, 1, 0,    -d1, 0,      a1],
    [0, 1, 0,     -h, 0,      a1],
    [1, 0, 0,      0, h,       0],
    [0, 1, 0,     -h, 0, a1 + d4],
    [1, 0, 0,      0, h,       0]
]).T

theta = np.radians([0, 30, -30, 0, 90, 0])
T_pose = mr.FKinSpace(M, Slist, theta)
print("End-Effector Pose (rounded):\\n", np.round(T_pose, 1))`
  },
  {
    id: 'poe-body',
    title: 'Product of Exponentials (PoE) — Body Form',
    lesson: 'Lecture 3 · MR § 4.1.2',
    category: 'Forward Kinematics',
    formulaLaTeX: 'T(\\theta) = M e^{[\\mathcal{B}_1]\\theta_1} e^{[\\mathcal{B}_2]\\theta_2} \\cdots e^{[\\mathcal{B}_n]\\theta_n}',
    summary: 'PoE formula expressed using body screw axes B_i seen from the tool frame {b} at home pose. Note that home pose M stands on the LEFT.',
    intuition: 'Each joint rotation is applied relative to the moving tool frame {b}. Because each successive factor describes motion relative to the current frame, factors multiply from the RIGHT.',
    invariants: [
      'Both Space Form and Body Form produce the exact same physical pose T(theta)',
      'Adjoint relationship: B_i = [Ad_{M^{-1}}] S_i',
      'Extremely convenient for numerical IK when task errors are measured at the gripper'
    ],
    nuances: [
      'Crucial formula difference: In Space form, M is on the right; in Body form, M is on the left.',
      'B_i axes are fixed in the tool frame {b} at home pose.'
    ],
    latexExample: 'T(\\theta) = M \\prod_{i=1}^n e^{[\\mathcal{B}_i]\\theta_i} = \\left( \\prod_{i=1}^n e^{[\\mathcal{S}_i]\\theta_i} \\right) M',
    pythonCode: `import modern_robotics as mr
import numpy as np

# Verify Adjoint relationship between Space and Body screws
# B_i = Ad_{M^{-1}}(S_i)
# T_space == T_body for any joint angle vector
# mr.FKinBody(M, Blist, theta) == mr.FKinSpace(M, Slist, theta)`
  },
  {
    id: 'matrix-logarithm',
    title: 'Matrix Logarithm on SO(3) & SE(3)',
    lesson: 'Lecture 3 · MR § 3.2.3.3 & 3.3.3.2',
    category: 'Inverse Kinematics',
    formulaLaTeX: '\\theta = \\arccos\\left(\\frac{\\mathrm{tr}(R) - 1}{2}\\right), \\quad [\\hat{\\omega}] = \\frac{1}{2\\sin\\theta}(R - R^\\top)',
    summary: 'The mathematical inverse of Rodrigues and the matrix exponential: extracts the rotation axis omega_hat and angle theta from a 3x3 rotation matrix R.',
    intuition: 'Computes the shortest angular geodesic between two orientations. Essential in numerical inverse kinematics for computing orientation error e_R = log(R^T R_d).',
    invariants: [
      'Valid for 0 < theta < 180 degrees',
      'For theta = 0, R = I, omega is arbitrary',
      'For theta = 180 degrees, tr(R) = -1, diagonal formula must be used'
    ],
    nuances: [
      'Special care is required near theta = 0 and theta = 180 to avoid division by zero.',
      'For SE(3), log(T) yields the 6D twist V = S * theta.'
    ],
    latexExample: 'R = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix} \\implies \\mathrm{tr}(R) = 1, \\; \\theta = \\arccos(0) = 90^\\circ, \\; [\\hat{\\omega}] = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}',
    pythonCode: `import modern_robotics as mr
import numpy as np

R_test = np.array([
    [0.0, -1.0, 0.0],
    [1.0,  0.0, 0.0],
    [0.0,  0.0, 1.0]
])

omega_hat, theta = mr.AxisAng3(mr.MatrixLog3(R_test))
print(f"Axis: {omega_hat}, Angle: {np.degrees(theta):.1f} deg")
# Output: Axis: [0. 0. 1.], Angle: 90.0 deg`
  }
];

export const RMI_CONFUSABLE_PAIRS: RmiConfusablePair[] = [
  {
    id: 'fk-vs-ik',
    topic: 'Forward Kinematics (FK) vs. Inverse Kinematics (IK)',
    lesson: 'Lecture 1, 2 & 3 · MR § 4.1 & 6.1',
    mnemonic: 'FK is easy & unique; IK is hard, multi-valued, and non-linear.',
    left: {
      term: 'Forward Kinematics (FK)',
      concept: 'Joint Angles -> Gripper Pose',
      formula: 'T_{sb} = f(\\theta_1, \\dots, \\theta_n)',
      description: 'Given joint angles theta measured by encoders, compute the end-effector pose T in base frame {s}.',
      correctCase: {
        math: 'T(\\theta) = e^{[\\mathcal{S}_1]\\theta_1} \\cdots e^{[\\mathcal{S}_n]\\theta_n} M',
        explanation: 'Always has exactly ONE unique analytical solution for any open serial robot arm. Fast and computationally cheap.'
      },
      pitfallCase: {
        math: '\\theta = f^{-1}(T) \\text{ by matrix inversion}',
        warning: 'Fatal exam error: Inverting the 4x4 matrix T does NOT solve IK! T^{-1} gives T_{bs} (base seen from gripper), not joint angles.'
      }
    },
    right: {
      term: 'Inverse Kinematics (IK)',
      concept: 'Target Pose -> Joint Angles',
      formula: '\\theta = f^{-1}(T_d)',
      description: 'Given desired gripper pose T_d, compute the joint angles (theta_1, ..., theta_n) needed to reach it.',
      correctCase: {
        math: '\\text{Solve non-linear } f(\\theta) = T_d \\text{ (analytical or iterative)}',
        explanation: 'May have 0 solutions (out of reach), finite multiple solutions (e.g., elbow-up and elbow-down for 2R arm), or infinite solutions (redundant arm n > 6).'
      },
      pitfallCase: {
        math: '\\text{Assuming a unique single solution exists}',
        warning: 'Robots can achieve the same tip position with multiple arm configurations. Trajectory planners must select the smoothest branch.'
      }
    }
  },
  {
    id: 'chain-vs-poe',
    topic: 'Chain of Transforms (URDF/DH) vs. Product of Exponentials (PoE)',
    lesson: 'Lecture 2 & 3 · MR § 4.1.1',
    mnemonic: 'Chain puts frames on every link; PoE needs only {s} and {b}.',
    left: {
      term: 'Chain of Transforms (URDF/DH)',
      concept: 'Link-by-Link Sequential Frames',
      formula: 'T_{sb}(\\theta) = T_{01}(\\theta_1) T_{12}(\\theta_2) \\cdots T_{n-1,n}(\\theta_n) T_{nb}',
      description: 'A dedicated coordinate frame is placed on EVERY link. Each joint defines a fixed offset and a rotation.',
      correctCase: {
        math: 'T_{i-1,i}(\\theta_i) = \\mathrm{Trans}(p_i) \\mathrm{Rot}(\\hat{z}, \\theta_i)',
        explanation: 'Standard format used by ROS 2 (URDF), CAD models, and physics simulators (Gazebo, MuJoCo).'
      },
      pitfallCase: {
        math: '\\text{Cumbersome frame alignment rules (e.g. DH common normals)}',
        warning: 'Strict rules for frame placement (Denavit-Hartenberg); singularities when joint axes are parallel.'
      }
    },
    right: {
      term: 'Product of Exponentials (PoE)',
      concept: 'Zero Intermediate Link Frames',
      formula: 'T(\\theta) = e^{[\\mathcal{S}_1]\\theta_1} e^{[\\mathcal{S}_2]\\theta_2} \\cdots e^{[\\mathcal{S}_n]\\theta_n} M',
      description: 'Only TWO frames are ever established: the fixed base {s} and the tool {b} at home pose M.',
      correctCase: {
        math: '\\mathcal{S}_i = (\\hat{\\omega}_i, v_i) \\text{ read directly from zero-pose drawing in } \\{s\\}',
        explanation: 'No link frame rules! Clean closed formula. Space Jacobian columns are simply the screw axes.'
      },
      pitfallCase: {
        math: '\\text{Forgetting home pose } M \\text{ or measuring } \\mathcal{S}_i \\text{ in moving frames}',
        warning: 'In Space Form PoE, all screw axes S_i MUST be measured in {s} at the home configuration theta = 0.'
      }
    }
  },
  {
    id: 'fixed-vs-moving-axes',
    topic: 'Fixed Space Axes (RPY) vs. Moving Body Axes (Euler ZYX)',
    lesson: 'Lecture 2 · MR § 3.2.3 & App. B',
    mnemonic: 'Fixed axes multiply from the LEFT; Moving axes multiply from the RIGHT.',
    left: {
      term: 'Fixed Space Axes (RPY)',
      concept: 'Rotations about Room/Base Axes',
      formula: 'R = R_z(\\psi) R_y(\\theta) R_x(\\phi) \\; (\\text{Left Multiplication})',
      description: 'Consecutive rotations performed around the original, non-moving reference axes of frame {s}.',
      correctCase: {
        math: 'R_{later} \\text{ is multiplied from the } \\mathbf{LEFT}: \\; R_{total} = R_2 R_1',
        explanation: 'If you rotate by 90 deg around x, then by 90 deg around room-z, the total matrix is Rot(z, 90) * Rot(x, 90).'
      },
      pitfallCase: {
        math: 'R_{total} = R_1 R_2 \\; (\\text{Order inversion})',
        warning: 'Matrix products do not commute (AB != BA). Multiplying fixed axes rotations from the right gives a completely wrong orientation!'
      }
    },
    right: {
      term: 'Moving Body Axes (Euler ZYX)',
      concept: 'Rotations about Object Body Axes',
      formula: 'R = R_z(\\psi) R_{y\'}(\\theta) R_{x\'\'}(\\phi) \\; (\\text{Right Multiplication})',
      description: 'Consecutive rotations performed around the newly rotated, body-attached axes of frame {b}.',
      correctCase: {
        math: 'R_{later} \\text{ is multiplied from the } \\mathbf{RIGHT}',
        explanation: 'Remarkably, fixed Roll-Pitch-Yaw (x then y then z) yields the EXACT same matrix as Euler ZYX (z then y then x).'
      },
      pitfallCase: {
        math: '\\text{Assuming fixed and moving conventions use the same formula}',
        warning: 'Always state explicitly whether Euler angles refer to fixed space axes or moving intrinsic body axes.'
      }
    }
  },
  {
    id: 'space-vs-body-poe',
    topic: 'Space Form PoE vs. Body Form PoE',
    lesson: 'Lecture 3 · MR § 4.1.1 & 4.1.2',
    mnemonic: 'Space form has M on the right; Body form has M on the left.',
    left: {
      term: 'Space Form PoE',
      concept: 'Screws Expressed in Base Frame {s}',
      formula: 'T(\\theta) = e^{[\\mathcal{S}_1]\\theta_1} e^{[\\mathcal{S}_2]\\theta_2} \\cdots e^{[\\mathcal{S}_n]\\theta_n} M',
      description: 'All joint screws S_i = (omega_i, v_i) are expressed in the fixed space frame {s} at home pose.',
      correctCase: {
        math: 'M \\text{ stands on the far } \\mathbf{RIGHT}',
        explanation: 'Standard formulation in Modern Robotics. Space Jacobian columns are J_{si} = [Ad_{e^{S1}...e^{S(i-1)}}] S_i.'
      },
      pitfallCase: {
        math: 'T = M e^{[\\mathcal{S}_1]\\theta_1} \\cdots \\; (\\text{Placing } M \\text{ on the left with space screws})',
        warning: 'If M is on the left, you MUST use body screws B_i, not space screws S_i.'
      }
    },
    right: {
      term: 'Body Form PoE',
      concept: 'Screws Expressed in Tool Frame {b}',
      formula: 'T(\\theta) = M e^{[\\mathcal{B}_1]\\theta_1} e^{[\\mathcal{B}_2]\\theta_2} \\cdots e^{[\\mathcal{B}_n]\\theta_n}',
      description: 'All joint screws B_i are expressed in the moving tool frame {b} at home pose.',
      correctCase: {
        math: 'M \\text{ stands on the far } \\mathbf{LEFT}',
        explanation: 'Connected via adjoint: B_i = [Ad_{M^{-1}}] S_i. Convenient when camera or task errors are measured at the tool.'
      },
      pitfallCase: {
        math: '\\text{Assuming body form produces a different final transform}',
        warning: 'Both space form and body form produce the EXACT same numerical transformation matrix T(theta).'
      }
    }
  },
  {
    id: 'gimbal-lock-vs-quaternions',
    topic: 'Euler Angles (Gimbal Lock) vs. Unit Quaternions',
    lesson: 'Lecture 2 · MR § 3.2.3 & App. B',
    mnemonic: 'Euler has 3 numbers but singularities; Quaternions have 4 numbers and smooth SLERP.',
    left: {
      term: 'Euler Angles / Roll-Pitch-Yaw',
      concept: 'Minimal 3-Parameter Representation',
      formula: 'R = \\mathrm{Rot}(\\hat{z}, \\psi) \\mathrm{Rot}(\\hat{y}, \\theta) \\mathrm{Rot}(\\hat{x}, \\phi)',
      description: 'Compact 3 numbers (roll, pitch, yaw). Intuitive for human interfaces ("tilt 20 deg forward").',
      correctCase: {
        math: '\\text{Only suitable for GUI display and visualization}',
        explanation: 'When displaying arm telemetry to operators on a dashboard, Roll-Pitch-Yaw angles are human-readable.'
      },
      pitfallCase: {
        math: '\\text{Pitch } \\theta = \\pm 90^\\circ \\implies \\text{\\textbf{Gimbal Lock}}',
        warning: 'At pitch +/-90 deg, roll and yaw axes coincide! One DoF is lost; atan2(0,0) fails; tiny motion requires infinite angular jumps.'
      }
    },
    right: {
      term: 'Unit Quaternions',
      concept: '4-Parameter Lie Group Representation',
      formula: 'q = (q_w, q_x, q_y, q_z) = \\left(\\cos\\frac{\\theta}{2}, \\hat{\\omega}\\sin\\frac{\\theta}{2}\\right), \\; ||q|| = 1',
      description: 'Stores rotation axis and angle in 4 numbers on a 4D unit sphere S^3. Used by ROS, PyTorch, Gazebo.',
      correctCase: {
        math: '\\text{Zero singularities; Smooth SLERP interpolation}',
        explanation: 'Interpolation along geodesic is continuous. Composing two rotations takes 16 multiplications vs. 27 for matrices.'
      },
      pitfallCase: {
        math: 'q \\text{ and } -q \\text{ represent the same rotation}',
        warning: 'In machine learning loss or SLERP, if q0 . q1 < 0, you must flip to -q1 to avoid taking the long path around the sphere.'
      }
    }
  },
  {
    id: 'holonomic-vs-nonholonomic',
    topic: 'Holonomic vs. Non-Holonomic Constraints',
    lesson: 'Lecture 1 · MR § 2.4 & 13.3',
    mnemonic: 'Holonomic restricts positions; Non-holonomic restricts only velocities.',
    left: {
      term: 'Holonomic Constraints',
      concept: 'Configuration / Position Constraints',
      formula: 'g(q, t) = 0 \\implies \\text{Directly reduces DoF}',
      description: 'Algebraic relationship between coordinates that can be integrated. Removes degrees of freedom from the C-space.',
      correctCase: {
        math: '\\text{Closed kinematic loops (Grübler: } \\text{DoF} = m(N-1-J) + \\sum f_i)',
        explanation: 'Four-bar linkage: 4 links, 4 joints -> DoF = 3(4-1-4) + 4 = 1. Robot arms have ONLY holonomic constraints.'
      },
      pitfallCase: {
        math: '\\text{Applying to wheeled mobile robots}',
        warning: 'Car wheel rolling without slipping is NOT holonomic: you cannot integrate v_y = 0 into a position formula.'
      }
    },
    right: {
      term: 'Non-Holonomic Constraints',
      concept: 'Non-Integrable Velocity Constraints',
      formula: 'g(q, \\dot{q}, t) = 0 \\implies \\text{Velocity restricted, positions reachable}',
      description: 'Restricts instantaneous velocities (how you can move right now), but does NOT reduce the total reachable configuration space.',
      correctCase: {
        math: '\\text{Wheeled cars: cannot slide sideways, but can parallel park anywhere}',
        explanation: 'A car in 2D has 3 DoF in configuration space (x, y, orientation), even though its steering wheel only gives 2 instantaneous control inputs.'
      },
      pitfallCase: {
        math: '\\text{Claiming a serial robot arm has non-holonomic constraints}',
        warning: 'Serial arms have NO non-holonomic constraints. Every joint motor directly controls a configuration coordinate.'
      }
    }
  }
];

export const RMI_QUIZ_PRACTICE_ITEMS: RmiQuizItem[] = [
  {
    id: 'q1',
    number: 1,
    title: 'Forward vs. Inverse Kinematics',
    lesson: 'Lecture 1 & 2',
    timeLimitSec: 60,
    question: 'Which of the following statements regarding kinematics is **TRUE**?',
    options: [
      { id: 'a', text: 'Forward kinematics maps gripper poses in task space to joint angles.' },
      { id: 'b', text: 'For any open serial robot arm, the forward kinematics solution is unique.' },
      { id: 'c', text: 'Inverse kinematics always yields exactly one unique solution for any serial arm.' },
      { id: 'd', text: 'Forward kinematics is generally computationally harder than inverse kinematics.' }
    ],
    correctOptionId: 'b',
    explanation: 'For any open serial kinematic chain, given joint angles theta, substituting them into the transformation chain or PoE yields exactly one unique gripper pose T(theta). In contrast, Inverse Kinematics can have 0, multiple (elbow-up/down), or infinitely many solutions (redundancy).',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'Mapping gripper poses to joint angles is the definition of INVERSE kinematics, not forward kinematics.' },
      { optionId: 'c', whyWrong: 'IK frequently has multiple solutions (e.g. 2 for planar 2R, 8 for 6R industrial arms, infinity for redundant arms).' },
      { optionId: 'd', whyWrong: 'FK requires simple sequential matrix multiplications (cheap and exact). IK requires solving coupled non-linear equations.' }
    ],
    slideRef: 'Lecture 2 · Slide D1 (022Y2J)',
    bookRef: 'Modern Robotics § 4.1'
  },
  {
    id: 'q2',
    number: 2,
    title: 'Properties of Rotation Matrices in SO(3)',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'Let $R \\in \\mathbb{R}^{3 \\times 3}$ be a valid rotation matrix in $\\text{SO}(3)$. Which condition must strictly hold?',
    options: [
      { id: 'a', text: 'R^{-1} = -R^T and det(R) = 1' },
      { id: 'b', text: 'R R^T = I and det(R) = -1' },
      { id: 'c', text: 'R^{-1} = R^T and det(R) = 1' },
      { id: 'd', text: '||R v|| = 0 for any unit vector v' }
    ],
    correctOptionId: 'c',
    explanation: 'By definition of the Special Orthogonal group SO(3), rotation matrices are orthogonal (R^T R = R R^T = I, so R^{-1} = R^T) and "special" (det(R) = +1).',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'The inverse is R^T, not -R^T (a negative transpose would imply anti-orthogonality).' },
      { optionId: 'b', whyWrong: 'det(R) = -1 corresponds to an improper rotation (reflection / mirror), not a physical rigid rotation.' },
      { optionId: 'd', whyWrong: 'Rotations preserve length: ||Rv|| = ||v|| = 1. A norm of 0 would mean the matrix maps non-zero vectors to zero.' }
    ],
    slideRef: 'Lecture 2 · Slide A6 (02RQW8)',
    bookRef: 'Modern Robotics § 3.2.1'
  },
  {
    id: 'q3',
    number: 3,
    title: 'Degrees of Freedom (DoF) of Rigid Bodies',
    lesson: 'Lecture 1',
    timeLimitSec: 60,
    question: 'How many degrees of freedom does an unconstrained rigid body have in 2D plane and in 3D space, respectively?',
    options: [
      { id: 'a', text: '2 DoF in 2D space, 3 DoF in 3D space' },
      { id: 'b', text: '3 DoF in 2D space, 6 DoF in 3D space' },
      { id: 'c', text: '3 DoF in 2D space, 7 DoF in 3D space' },
      { id: 'd', text: '6 DoF in 2D space, 6 DoF in 3D space' }
    ],
    correctOptionId: 'b',
    explanation: 'In 2D: 2 position coordinates (x, y) + 1 rotation angle phi = 3 DoF. In 3D: 3 position coordinates (x, y, z) + 3 orientation angles (roll, pitch, yaw) = 6 DoF.',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'Ignores orientation in 2D and rotational degrees of freedom in 3D.' },
      { optionId: 'c', whyWrong: 'A free rigid body in 3D space has exactly 6 DoF. 7 DoF refers to redundant robot arms (e.g. Franka Emika).' },
      { optionId: 'd', whyWrong: 'In 2D, rigid bodies cannot translate in z or rotate out of plane, so they have 3 DoF, not 6.' }
    ],
    slideRef: 'Lecture 1 · Slide C2 (01NQCE)',
    bookRef: 'Modern Robotics § 2.1'
  },
  {
    id: 'q4',
    number: 4,
    title: 'Inverse of Homogeneous Transformation Matrix',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'Given $T_{sb} = \\begin{pmatrix} R & p \\\\ 0 & 1 \\end{pmatrix} \\in \\text{SE}(3)$, what is its inverse $T_{sb}^{-1} = T_{bs}$?',
    options: [
      { id: 'a', text: '[[R^T, -p], [0, 1]]' },
      { id: 'b', text: '[[R^T, -R^T * p], [0, 1]]' },
      { id: 'c', text: '[[-R^T, p], [0, 1]]' },
      { id: 'd', text: '[[R, -R * p], [0, 1]]' }
    ],
    correctOptionId: 'b',
    explanation: 'Multiplying T_{sb} by [[R^T, -R^T * p], [0, 1]]: Top-left is R R^T = I. Top-right is R(-R^T p) + p = -p + p = 0. Hence T * T^{-1} = I_{4x4}. The translation must be rotated by -R^T.',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'Classic pitfall: forgetting to multiply -p by R^T.' },
      { optionId: 'c', whyWrong: 'R^T is not negated in the rotation block.' },
      { optionId: 'd', whyWrong: 'The rotation block must be transposed (R^T), not kept as R.' }
    ],
    slideRef: 'Lecture 2 · Slide C3 (029S57)',
    bookRef: 'Modern Robotics § 3.3.1'
  },
  {
    id: 'q5',
    number: 5,
    title: 'Order of Rotations in 3D',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'A body is rotated by $90^\\circ$ about fixed axis $\\hat{x}_s$ ($R_1 = \\mathrm{Rot}(\\hat{x}, 90^\\circ)$), then by $90^\\circ$ about fixed axis $\\hat{z}_s$ ($R_2 = \\mathrm{Rot}(\\hat{z}, 90^\\circ)$). What is the total rotation $R_{total}$?',
    options: [
      { id: 'a', text: 'R_{total} = R_1 * R_2' },
      { id: 'b', text: 'R_{total} = R_2 * R_1' },
      { id: 'c', text: 'R_{total} = R_1 + R_2' },
      { id: 'd', text: 'R_{total} = R_1 * R_2 = R_2 * R_1 because rotations always commute' }
    ],
    correctOptionId: 'b',
    explanation: 'Fundamental fixed-axis rule: Consecutive rotations about fixed space axes {s} multiply from the LEFT. Therefore, the subsequent rotation R_2 is multiplied on the left of R_1, giving R_2 * R_1.',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'R_1 * R_2 would apply R_2 first or rotate about the moving body axis.' },
      { optionId: 'c', whyWrong: 'Rotations compose via matrix multiplication, never addition.' },
      { optionId: 'd', whyWrong: 'Rotations in 3D do NOT commute: R_1 * R_2 != R_2 * R_1.' }
    ],
    slideRef: 'Lecture 2 · Slide B4 (02R9AJ)',
    bookRef: 'Modern Robotics § 3.2.3'
  },
  {
    id: 'q6',
    number: 6,
    title: 'Reading a Rotation Matrix',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'Consider $R_{sb} = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$. Along which axis of $\{s\}$ does body axis $\\hat{x}_b$ point?',
    options: [
      { id: 'a', text: 'Along +x_s' },
      { id: 'b', text: 'Along -y_s' },
      { id: 'c', text: 'Along +y_s' },
      { id: 'd', text: 'Along +z_s' }
    ],
    correctOptionId: 'c',
    explanation: 'The columns of R_{sb} are the unit axes of frame {b} written in coordinates of {s}: Column 1 is x_b = [0, 1, 0]^T, which points directly along +y_s. (Column 2 is y_b = [-1, 0, 0]^T = -x_s, Column 3 is z_b = [0, 0, 1]^T = +z_s).',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'Row 1 is not the vector x_b; column 1 is [0, 1, 0]^T.' },
      { optionId: 'b', whyWrong: 'The y component of column 1 is +1, so it points along +y_s, not -y_s.' },
      { optionId: 'd', whyWrong: 'The z component is 0 in column 1.' }
    ],
    slideRef: 'Lecture 2 · Slide B1 (02G58C) & Slide F1 (02FGJV)',
    bookRef: 'Modern Robotics § 3.2.1'
  },
  {
    id: 'q7',
    number: 7,
    title: 'Gimbal Lock in Roll-Pitch-Yaw',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'Under what specific condition does Gimbal Lock occur in standard Roll-Pitch-Yaw ($Z-Y-X$) representation?',
    options: [
      { id: 'a', text: 'When roll phi = 0 degrees' },
      { id: 'b', text: 'When pitch theta = +/- 90 degrees' },
      { id: 'c', text: 'When yaw psi = 180 degrees' },
      { id: 'd', text: 'When all three angles are identical' }
    ],
    correctOptionId: 'b',
    explanation: 'When pitch theta = +/- 90 degrees, cos(theta) = 0. The rotation matrix collapses such that only (phi - psi) appears. The roll axis x_b coincides with the yaw axis z_s, losing one degree of freedom and making atan2(0,0) undefined.',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'Roll = 0 is a completely regular orientation with no singularity.' },
      { optionId: 'c', whyWrong: 'Yaw = 180 is well-defined and has non-zero cosine.' },
      { optionId: 'd', whyWrong: 'Equal angles do not cause singularity unless the pitch happens to be +/- 90 deg.' }
    ],
    slideRef: 'Lecture 2 · Slide F3 (02PK5A)',
    bookRef: 'Modern Robotics Appendix B.1'
  },
  {
    id: 'q8',
    number: 8,
    title: 'Point Transformation with Homogeneous Coordinates',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'A point has coordinates $p_b = (1, 2, 0)^\\top$ in $\{b\}$. Frame $\{b\}$ is translated by $p_{sb} = (3, 0, 1)^\\top$ and rotated by $90^\\circ$ around $\\hat{z}_s$ ($R_{sb} = \\begin{pmatrix} 0 & -1 & 0 \\\\ 1 & 0 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}$). Where is the point in $\{s\}$?',
    options: [
      { id: 'a', text: 'p_s = (1, 1, 1)^T' },
      { id: 'b', text: 'p_s = (4, 2, 1)^T' },
      { id: 'c', text: 'p_s = (-2, 1, 1)^T' },
      { id: 'd', text: 'p_s = (3, 2, 1)^T' }
    ],
    correctOptionId: 'a',
    explanation: 'p_s = R_{sb} * p_b + p_{sb}. First rotate: R_{sb} * [1, 2, 0]^T = [-2, 1, 0]^T. Then translate: [-2, 1, 0]^T + [3, 0, 1]^T = [1, 1, 1]^T.',
    distractorBreakdown: [
      { optionId: 'b', whyWrong: 'Directly added coordinates without rotating: (1+3, 2+0, 0+1) = (4, 2, 1).' },
      { optionId: 'c', whyWrong: 'Forgot to add the translation vector p_{sb}.' },
      { optionId: 'd', whyWrong: 'Calculation arithmetic error.' }
    ],
    slideRef: 'Lecture 2 · Slide C4 (02WNHM)',
    bookRef: 'Modern Robotics § 3.3.1'
  },
  {
    id: 'q9',
    number: 9,
    title: 'Grübler\'s Formula for Closed Kinematic Chains',
    lesson: 'Lecture 1',
    timeLimitSec: 60,
    question: 'A planar closed mechanism has $N = 4$ links (including ground) and $J = 4$ revolute joints ($f_i = 1$). Using Grübler\'s formula $\\mathrm{DoF} = m(N - 1 - J) + \\sum_{i=1}^J f_i$ with $m = 3$, what is its DoF?',
    options: [
      { id: 'a', text: 'DoF = 0 (rigid structure)' },
      { id: 'b', text: 'DoF = 1 (four-bar linkage mechanism)' },
      { id: 'c', text: 'DoF = 2' },
      { id: 'd', text: 'DoF = 4' }
    ],
    correctOptionId: 'b',
    explanation: 'In 2D plane, m = 3. DoF = 3 * (4 - 1 - 4) + (1 + 1 + 1 + 1) = 3 * (-1) + 4 = -3 + 4 = 1. This is the classic 1-DoF planar four-bar linkage.',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'DoF = 0 applies to a triangle (N = 3, J = 3).' },
      { optionId: 'c', whyWrong: 'DoF = 2 applies to an open 2R arm (N = 3, J = 2).' },
      { optionId: 'd', whyWrong: 'Simply summing joint freedoms sum(f_i) = 4 ignores the loop closure constraint.' }
    ],
    slideRef: 'Lecture 1 · Slide C4 (01EB8E) & Slide E5 (014W7N)',
    bookRef: 'Modern Robotics § 2.2.2'
  },
  {
    id: 'q10',
    number: 10,
    title: 'Subscript Cancellation Rule',
    lesson: 'Lecture 2',
    timeLimitSec: 60,
    question: 'Which of the following transformation matrix equations is **CONSISTENT** with the subscript cancellation rule?',
    options: [
      { id: 'a', text: 'T_{ba} * T_{cb} = T_{ca}' },
      { id: 'b', text: 'T_{ab} * T_{bc} = T_{ac}' },
      { id: 'c', text: 'T_{ab} * T_{cb} = T_{ac}' },
      { id: 'd', text: 'T_{ac} * T_{bc} = T_{ab}' }
    ],
    correctOptionId: 'b',
    explanation: 'In T_{ab} * T_{bc} = T_{ac}, the adjacent inner indices (b and b) cancel, leaving start index a and end index c. Valid and physically consistent.',
    distractorBreakdown: [
      { optionId: 'a', whyWrong: 'Inner indices are a and c, which do not match.' },
      { optionId: 'c', whyWrong: 'Inner indices are b and c, which do not match.' },
      { optionId: 'd', whyWrong: 'Inner indices are c and b, which do not match.' }
    ],
    slideRef: 'Lecture 2 · Slide C6 (02CQFH)',
    bookRef: 'Modern Robotics § 3.3.1'
  }
];

export const RMI_COURSE_INFO = {
  title: 'Robotics and Machine Intelligence (IRMI)',
  code: 'WS 2026 / 2027 · Module 1100222042 (Lecture) / 1100222043 (Exercise)',
  credits: '6 CP (2 SWS Lecture + 2 SWS Tutorial)',
  workload: '180 hours (~12 h/week: lecture, tutorial, project)',
  lecturer: 'Prof. Dr. Artur Andrzejak (AI for Programming - AIP)',
  assistant: 'Lennart Stöpler',
  tutors: ['Til Gramlich', 'Ole Plechinger'],
  schedule: {
    lecture: 'Monday 11:15–12:45 · INF 205 (Mathematikon), Hörsaal',
    tutorial1: 'Tuesday 11:15–12:45 · SR 1, INF 205',
    tutorial2: 'Thursday 16:15–17:45 · SR C, INF 205'
  },
  quizzes: [
    { name: 'Quiz A', date: '02.11.2026', scope: 'Lectures 1 & 2 (Foundations, Kinematics, Rotations)', points: 40 },
    { name: 'Quiz B', date: '23.11.2026', scope: 'Lectures 3 & 4 (PoE, Inverse Kinematics, Dynamics)', points: 40 },
    { name: 'Quiz C', date: '14.12.2026', scope: 'Lectures 5 & 6 (ML Refresher, Deep Learning Vision)', points: 40 },
    { name: 'Quiz D', date: '18.01.2027', scope: 'Lectures 7 & 8 (3D Vision, Imitation & RL)', points: 40 }
  ],
  grading: {
    neededPoints: 96,
    totalQuizPoints: 160,
    passingPercentage: '60%',
    bonusPoints: 'Up to 30+ bonus points from 10 weekly online micro-quizzes (3 MC questions, opens 10m before lecture)',
    project: 'Pass / Fail software project in groups of 3 with dedicated primary tutor',
    exam: 'Closed-book final exam (Finals A & Finals B at start of SoSe 2027)'
  },
  links: {
    discord: 'https://discord.gg/GPFutgV9R',
    heibox: 'https://bit.ly/HDRMI2026',
    modernRoboticsBook: 'https://modernrobotics.org'
  }
};
