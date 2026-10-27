export interface NumerikFormulaRule {
  id: string;
  lesson: string;
  category: string;
  title: string;
  formulaLaTeX: string;
  summary: string;
  intuition: string;
  invariants: string[];
  nuances?: string[];
  pythonCode: string;
  latexExample?: string;
}

export interface NumerikConfusablePair {
  id: string;
  lesson: string;
  topic: string;
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
    fatalTrap: {
      math: string;
      explanation: string;
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
    fatalTrap: {
      math: string;
      explanation: string;
    };
  };
}

export interface NumerikQuizOption {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
}

export interface NumerikQuizItem {
  id: string;
  number: number;
  lesson: string;
  timeLimitSec: number;
  title: string;
  question: string;
  options: NumerikQuizOption[];
  correctOptionId: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  workedProof: string;
  distractorBreakdown: {
    optionId: string;
    whyWrong: string;
  }[];
  slideCitation: string;
}

export interface NumerikCodeSnippet {
  id: string;
  title: string;
  lesson: string;
  description: string;
  filename: string;
  language: string;
  code: string;
  highlights: string[];
}

export const NUMERIK_COURSE_INFO = {
  courseTitle: "Einführung in die Numerik",
  semester: "Wintersemester 2026/27",
  lecturer: "Prof. Dr. Peter Bastian",
  institute: "Interdisziplinäres Zentrum für Wissenschaftliches Rechnen (IWR), Universität Heidelberg",
  headTutor: "Nils Schiefer-Frieß",
  moodleUrl: "https://moodle.uni-heidelberg.de/course/view.php?id=34201",
  quizzes: [
    { number: 1, date: "Dienstag, 17.11.2026", scope: "Übungsblätter 1–3", duration: "20 Minuten", weight: "Zulassungsrelevant (mind. 50%)" },
    { number: 2, date: "Dienstag, 08.12.2026", scope: "Übungsblätter 4–6", duration: "20 Minuten", weight: "Zulassungsrelevant (mind. 50%)" },
    { number: 3, date: "Dienstag, 19.01.2027", scope: "Übungsblätter 7–9", duration: "20 Minuten", weight: "Zulassungsrelevant (mind. 50%)" }
  ],
  admissionRule: "Zur Klausurzulassung ist das Bestehen (mindestens 50%) von 2 der 3 Quizzes / Miniklausuren erforderlich.",
  sheetsCount: 11,
  library: "HDNum (High Dimensional Numerical Library) — C++-basierte Lehrmatrix-/Vektorbibliothek, Header-Only, Open Source.",
  aiTutor: "Lytris Mathe-KI-Tutor (KI-Startup aus Heilbronn, Pilotprojekt der Fakultät mit Skriptkontext und Hilfe-Leveln)."
};

export const NUMERIK_FORMULA_RULES: NumerikFormulaRule[] = [
  {
    id: "floating_point_system",
    lesson: "VL02 & Üb 1",
    category: "Fließkommaarithmetik",
    title: "Normierte Fließkommazahlen F(β, r, s)",
    formulaLaTeX: "x = \\pm m(x) \\cdot \\beta^{e(x)} \\quad \\text{mit } m(x) = \\sum_{i=1}^r m_i \\beta^{-i}, \\quad m_1 \\neq 0, \\quad e(x) \\in [e_{\\min}, e_{\\max}]",
    summary: "Darstellung von Zahlen im Computer als normierte Fließkommazahl mit Basis $\\beta$, $r$ Mantissenstellen und $s$ Exponentenstellen.",
    intuition: "Durch Verschiebung des Dezimal-/Binärkommas deckt ein Rechner sowohl astronomisch riesige als auch mikroskopisch kleine Zahlen ab. Die Normierungsbedingung $m_1 \\neq 0$ erzwingt die Eindeutigkeit der Darstellung (keine führenden Nullen in der Mantisse).",
    invariants: [
      "Normierungsbedingung: $m_1 \\in \\{1, \\dots, \\beta-1\\}$, daher gilt strikt $\\beta^{-1} \\le |m(x)| < 1$.",
      "Kardinalität: $|\\mathbb{F}(\\beta,r,s)| = 2(\\beta-1)\\beta^{r-1}(2\\beta^s - 1) + 1$ (inklusive der Null).",
      "Unterlaufgrenze: $x_+ = \\beta^{-1 - (\\beta-1)\\sum_{j=0}^{s-1} \\beta^j}$, kleinste positive normalisierte Zahl.",
      "Überlaufgrenze: $X_+ = (1 - \\beta^{-r}) \\cdot \\beta^{(\\beta-1)\\sum_{j=0}^{s-1} \\beta^j}$."
    ],
    nuances: [
      "In IEEE 754 Binärsystemen ($\\beta=2$) ist $m_1 \\equiv 1$ immer bekannt (hidden bit), wodurch 1 Bit Speicherplatz für die Mantisse eingespart wird.",
      "Aufgabe der Normierung (subnormale / denormalisierte Zahlen) schließt die Lücke zur Null (gradual underflow), verringert jedoch die effektive relative Genauigkeit."
    ],
    pythonCode: `# Berechnung des Wertebereichs in Python für F(beta, r, s)
def fp_range(beta=10, r=4, s=2):
    max_exp = (beta - 1) * sum(beta**j for j in range(s))
    min_exp = -max_exp
    x_min = beta**(-1 + min_exp)
    x_max = (1.0 - beta**(-r)) * (beta**max_exp)
    cardinality = 2 * (beta - 1) * (beta**(r - 1)) * (2 * beta**s - 1) + 1
    return {'x_min': x_min, 'x_max': x_max, 'count': cardinality}

print(fp_range(3, 2, 2))  # Mini-Fließkommasystem aus Übungsblatt 1!`,
    latexExample: "x_+ = 3^{-9} = \\frac{1}{19683} \\approx 5.0805 \\cdot 10^{-5}, \\quad |\\mathbb{F}(3,2,2)| = 205"
  },
  {
    id: "rounding_and_machine_epsilon",
    lesson: "VL02 & Üb 3",
    category: "Rundungsfehler",
    title: "Maschinengenauigkeit (Machine Epsilon) & Rundung",
    formulaLaTeX: "\\frac{|x - \\text{rd}(x)|}{|x|} \\le \\text{eps} = \\frac{1}{2}\\beta^{1-r} \\quad (x \\neq 0)",
    summary: "Schranke für den relativen Rundungsfehler bei Rundung zur nächsten Zahl. Bestimmt die maximale Abweichung einer reellen Zahl von ihrer Rechnerdarstellung.",
    intuition: "Zwischen zwei benachbarten Fließkommazahlen $[\\beta^{e-1}, \\beta^e]$ beträgt der absolute Abstand $\\beta^{e-r}$. Teilt man diesen maximalen Halb-Abstand durch $|x| \\ge \\beta^{e-1}$, erhält man die relative Schranke $\\text{eps} = \\frac{1}{2}\\beta^{1-r}$, unabhängig von der Größe der Zahl!",
    invariants: [
      "IEEE 754 Single (`float`): 24 Bit Mantisse ($r=24$) $\\implies \\text{eps} = 2^{-24} \\approx 5.960 \\cdot 10^{-8}$ (ca. 7 Dezimalstellen).",
      "IEEE 754 Double (`double`): 53 Bit Mantisse ($r=53$) $\\implies \\text{eps} = 2^{-53} \\approx 1.110 \\cdot 10^{-16}$ (ca. 16 Dezimalstellen).",
      "Gerade Rundung (Round-to-Even / Default IEEE 754): Bei Gleichstand ($m_{r+1} = \\beta/2$) wird zur nächsten Zahl mit gerader letzter Mantissenziffer gerundet."
    ],
    nuances: [
      "Kaufmännische Rundung rundet bei $0.5$ stets auf, was in langen Iterationen (z. B. ODE-Zeitschritten) zu einem messbaren positiven statistischen Bias führt.",
      "Nulladdition: Wenn $|x| < \\text{eps} / 2$, wird bei $1.0 + x$ auf $1.0$ gerundet $\\implies 1.0 + x = 1.0$."
    ],
    pythonCode: `import sys
# Python float entspricht dem IEEE 754 double precision Standard
eps_double = sys.float_info.epsilon  # 2.220446049250313e-16 (bzw. eps_mach = eps/2 = 2^-53)
print("sys.float_info.epsilon:", eps_double)
print("1.0 + 1e-16 == 1.0:", 1.0 + 1e-16 == 1.0)
print("1.0 + 2e-16 == 1.0:", 1.0 + 2e-16 == 1.0)`,
    latexExample: "\\text{eps}_{float} = 2^{-24} \\approx 5.96 \\cdot 10^{-8}, \\quad \\text{eps}_{double} = 2^{-53} \\approx 1.11 \\cdot 10^{-16}"
  },
  {
    id: "conditioning_and_amplification",
    lesson: "VL03",
    category: "Konditionsanalyse",
    title: "Konditionierung & Verstärkungsfaktor κ_ij(x)",
    formulaLaTeX: "\\kappa_{ij}(x) = \\left| \\frac{\\partial f_i}{\\partial x_j}(x) \\cdot \\frac{x_j}{f_i(x)} \\right|, \\quad \\frac{f_i(x+\\Delta x) - f_i(x)}{f_i(x)} \\doteq \\sum_{j=1}^m \\kappa_{ij}(x) \\frac{\\Delta x_j}{x_j}",
    summary: "Der Verstärkungsfaktor $\\kappa_{ij}(x)$ misst, wie stark sich ein relativer Fehler in der Eingabekomponente $x_j$ auf die relative Änderung im Funktionsausgang $f_i(x)$ auswirkt.",
    intuition: "Kondition ist eine Eigenschaft des mathematischen Problems selbst, völlig unabhängig vom Algorithmus. Ist $\\kappa \\gg 1$, ist das Problem schlecht konditioniert: Kleinste Messungenauigkeiten oder Rundungen in den Eingaben sprengen das Ergebnis.",
    invariants: [
      "$\\kappa_{ij}(x) < 1$: Fehlerdämpfung (gut konditioniert).",
      "$\\kappa_{ij}(x) > 1$: Fehlerverstärkung. Ist $\\kappa_{ij}(x) \\gg 1$, spricht man von schlechter Kondition.",
      "Addition $f(x_1, x_2) = x_1 + x_2$: $\\kappa_1 = |\\frac{x_1}{x_1+x_2}|$. Wenn $x_1 \\approx -x_2$, geht der Nenner gegen 0 $\\implies \\kappa \\to \\infty$!",
      "Multiplikation $f(x_1, x_2) = x_1 \\cdot x_2$: $\\kappa_1 = \\kappa_2 = 1$ konstant für alle Eingaben $\\neq 0$!"
    ],
    pythonCode: `# Kondition der Addition f(x1, x2) = x1 + x2 bei Auslöschung
def kappa_addition(x1, x2):
    return abs(x1 / (x1 + x2))

# Gut konditioniert (gleiches Vorzeichen):
print("x1=100, x2=100 -> kappa =", kappa_addition(100.0, 100.0)) # 0.5
# Katastrophal schlecht konditioniert (Auslöschung):
print("x1=1.0000001, x2=-1.0 -> kappa =", kappa_addition(1.0000001, -1.0)) # ~10^7!`,
    latexExample: "\\kappa_1(x_1, x_2) = \\left| \\frac{x_1}{x_1 + x_2} \\right| \\xrightarrow{x_1 \\to -x_2} \\infty"
  },
  {
    id: "catastrophic_cancellation_vieta",
    lesson: "VL04",
    category: "Auslöschung & Stabilität",
    title: "Auslöschung & Vieta-Wurzelstabilisierung",
    formulaLaTeX: "x^2 - px + q = 0 \\implies x_1 = \\text{sgn}(p) \\left( \\frac{|p|}{2} + \\sqrt{\\frac{p^2}{4} - q} \\right), \\quad x_2 = \\frac{q}{x_1}",
    summary: "Vermeidung von katastrophaler Auslöschung (loss of significance) bei der Nullstellenberechnung quadratischer Gleichungen durch Ausnutzung des Satzes von Vieta.",
    intuition: "Wenn $p^2/4 \\gg q$, ist $\\sqrt{p^2/4-q} \\approx |p|/2$. Berechnet man die kleinere Wurzel naiv mit $p/2 - \\sqrt{p^2/4-q}$, zieht man zwei fast identische Zahlen voneinander ab. Die führenden korrekten Ziffern löschen sich aus, und übrig bleibt pures Rundungsrauschen!",
    invariants: [
      "Satz von Vieta: $x_1 + x_2 = p$ und $x_1 \\cdot x_2 = q$.",
      "Berechne immer die betragsgrößere Wurzel $x_1$ mit vorzeichengleicher Addition: keine Auslöschung möglich!",
      "Berechne die empfindliche kleinere Wurzel $x_2$ robust via Division $x_2 = q / x_1$."
    ],
    nuances: [
      "In IEEE 754 Double verliert die naive pq-Formel bei $p = 10^8, q = 1$ genau 8 Dezimalstellen. Bei $p = 10^{16}$ ist das Ergebnis $0.0$, obwohl die exakte Lösung $\\approx 10^{-16} \\neq 0$ lautet!"
    ],
    pythonCode: `import math

def solve_quadratic(p, q):
    # Naive pq-Formel (Gefahr der Auslöschung)
    disc = math.sqrt(p**2 / 4.0 - q)
    x1_naive = p / 2.0 + disc
    x2_naive = p / 2.0 - disc

    # Numerisch stabiler Vieta-Algorithmus
    sign = 1.0 if p >= 0 else -1.0
    x1_stable = sign * (abs(p) / 2.0 + disc)
    x2_stable = q / x1_stable

    return (x1_naive, x2_naive), (x1_stable, x2_stable)

# Test mit p = 1e8, q = 1:
naive, stable = solve_quadratic(1e8, 1.0)
print("Naiv x2: ", naive[1])   # 7.450580596923828e-09 (völlig falsch!)
print("Stabil x2:", stable[1]) # 1.0000000000000001e-08 (exakt 1e-8!)`,
    latexExample: "p = 10^8, q = 1: \\quad x_2^{\\text{naiv}} \\approx 7.45 \\cdot 10^{-9} \\text{ (Fehler 25\\%)}, \\quad x_2^{\\text{Vieta}} = 1.0000000000000000 \\cdot 10^{-8}"
  },
  {
    id: "taylor_expansion_remainder",
    lesson: "VL03",
    category: "Konditionsanalyse",
    title: "Satz von Taylor im R^m & Restgliedabschätzung",
    formulaLaTeX: "f(x+\\eta) = f(x) + \\nabla f(x)^T \\eta + \\frac{1}{2} \\sum_{i=1}^m \\sum_{j=1}^m \\frac{\\partial^2 f(x+\\theta\\eta)}{\\partial x_i \\partial x_j} \\eta_i \\eta_j, \\quad |R_1(x,\\eta)| \\le \\mathcal{O}(h^2)",
    summary: "Mehrdimensionale Taylor-Entwicklung für zweifach stetig differenzierbare Funktionen zur lokalen Linearisierung und Fehlerfortpflanzungsanalyse.",
    intuition: "Die lineare Näherung $f(x+\\eta) \\doteq f(x) + \\nabla f(x)^T \\eta$ ist das fundamentale Werkzeug der Numerik. Das quadratische Restglied garantiert, dass der Fehler wie $\\mathcal{O}(h^2)$ gegen 0 konvergiert, wenn die Schrittweite $h = \\max |\\eta_i| \\to 0$ geht.",
    invariants: [
      "Zwischenstelle: $\\theta \\in (0, 1)$ auf der Verbindungsstrecke zwischen $x$ und $x+\\eta$.",
      "Gradient $\\nabla f(x) = (\\frac{\\partial f}{\\partial x_1}, \\dots, \\frac{\\partial f}{\\partial x_m})^T$.",
      "Abschätzung des Restglieds mit $h := \\max_{1 \\le i \\le m} |\\eta_i|$ liefert $|R_1(x, \\eta)| \\le C h^2$."
    ],
    pythonCode: `# Linearisierung von f(x, y) = x^2 * exp(y) um (1, 0)
import numpy as np

def f(x, y): return x**2 * np.exp(y)
def grad_f(x, y): return np.array([2*x*np.exp(y), x**2 * np.exp(y)])

x0 = np.array([1.0, 0.0])
eta = np.array([0.01, -0.02])

# Taylor 1. Ordnung vs. Exakter Wert
f_linear = f(*x0) + np.dot(grad_f(*x0), eta)
f_exact = f(*(x0 + eta))
print(f"Linear: {f_linear:.6f}, Exakt: {f_exact:.6f}, Diff: {abs(f_exact - f_linear):.2e}")`,
    latexExample: "f(x+\\eta) = f(x) + \\nabla f(x)^T \\eta + \\mathcal{O}(\\|\\eta\\|^2)"
  },
  {
    id: "landau_symbols",
    lesson: "VL03",
    category: "Asymptotik",
    title: "Landau-Symbole & Konsistenzordnung",
    formulaLaTeX: "g(h) = \\mathcal{O}(f(h)) \\ (h \\to 0) \\iff \\exists c_0, h_0 > 0: |g(h)| \\le c_0 |f(h)| \\quad \\forall 0 < h \\le h_0",
    summary: "Charakterisierung des asymptotischen Grenzverhaltens von Diskretisierungsfehlern, Algorithmenlaufzeiten und Reihenentwicklungen.",
    intuition: "In der Numerik interessiert nicht das Verhalten bei unendlich großen Schritten, sondern wie rasant der Diskretisierungsfehler schrumpft, wenn die Gitterweite $h$ halbiert wird. $\\mathcal{O}(h^2)$ bedeutet: Schrittweite halbiert $\\implies$ Fehler geviertelt!",
    invariants: [
      "Groß-$\\mathcal{O}$ ($g = \\mathcal{O}(f)$): $g$ wächst höchstens so schnell bzw. fällt mindestens so schnell wie $f$.",
      "Klein-$o$ ($g = o(f)$): $\\lim_{h \\to 0} \\frac{|g(h)|}{|f(h)|} = 0$, $g$ fällt strikt schneller gegen Null als $f$.",
      "In erster Näherung gleich: $g(h) \\doteq f(h) \\iff g(h) - f(h) = o(h)$."
    ],
    pythonCode: `# Überprüfung der Konvergenzordnung eines Differenzenquotienten
import numpy as np

# Zentrale Differenz f'(x) approx (f(x+h) - f(x-h)) / (2h) -> O(h^2)
def central_diff(f, x, h): return (f(x + h) - f(x - h)) / (2 * h)

f = np.sin; exact = np.cos(1.0)
for h in [0.1, 0.05, 0.025]:
    err = abs(central_diff(f, 1.0, h) - exact)
    print(f"h={h:5f} -> Fehler={err:.3e} (Faktor ~4 bei Halbierung)")`,
    latexExample: "g(h) = f(h) + \\mathcal{O}(h^2) \\implies \\frac{\\text{Fehler}(h/2)}{\\text{Fehler}(h)} \\approx \\frac{1}{4}"
  },
  {
    id: "pipe_network_kirchhoff",
    lesson: "VL04",
    category: "Lineare Gleichungssysteme",
    title: "Knotenpotentialverfahren & Hagen-Poiseuille",
    formulaLaTeX: "\\hat{B}^T L \\hat{B} \\hat{p} = -\\hat{C}^T s, \\quad q = L \\hat{B} \\hat{p}",
    summary: "Modellierung von Fluidströmen in Rohrnetzwerken über gerichtete Inzidenzmatrizen $B, C$, Hagen-Poiseuille-Leitfähigkeiten $L$ und das 1. Kirchhoffsche Gesetz.",
    intuition: "Jeder Knoten im Netzwerk muss massenerhaltend sein (Summe aller Zuflüsse = Abflüsse). Die Druckdifferenzen treiben gemäß Hagen-Poiseuille laminare Strömungen durch die Rohre. Streicht man einen Referenzknoten ($p_n=0$), wird das System regulär und symmetrisch positiv definit!",
    invariants: [
      "Inzidenzmatrix Rohre $B \\in \\mathbb{R}^{m \\times n}$, Pumpen $C \\in \\mathbb{R}^{k \\times n}$. Zeile $i$: Anfangsknoten $(+1)$, Endknoten $(-1)$.",
      "Knotenregel (1. Kirchhoff): $B^T q + C^T s = 0$. Reduziertes System: $\\hat{B}^T q + \\hat{C}^T s = 0$.",
      "Leitfähigkeitsmatrix $L = \\text{diag}(L_1, \\dots, L_m)$ mit $L_i = \\frac{\\pi r_i^4}{8 \\eta l_i}$.",
      "Systemmatrix $A = \\hat{B}^T L \\hat{B} \\in \\mathbb{R}^{(n-1) \\times (n-1)}$ ist symmetrisch positiv definit (s.p.d.) und dünn besetzt $\\implies$ Cholesky-Zerlegung ohne Pivotisierung!"
    ],
    pythonCode: `import numpy as np

# 5 Knoten, 6 Rohre, 2 Pumpen (aus Vorlesung 4, Folie 60)
# Reduzierte Inzidenzmatrix B_hat (ohne Knoten 5)
B_hat = np.array([
    [ 1, -1,  0,  0],  # Rohr 1: 1 -> 2
    [ 0,  1, -1,  0],  # Rohr 2: 2 -> 3
    [ 0,  0, -1,  0],  # Rohr 3: 3 -> 5 (Knoten 5 gestrichen)
    [ 0,  1,  0,  0],  # Rohr 4: 2 -> 5
    [ 1,  0,  0, -1],  # Rohr 5: 1 -> 4
    [ 0,  0,  1, -1]   # Rohr 6: 4 -> 3
])

C_hat = np.array([
    [ 0,  0,  0,  1],  # Pumpe 1: 4 -> 5
    [-1,  0,  1,  0]   # Pumpe 2: 1 -> 3
])

L = np.eye(6)  # Einheitsleitfähigkeit
s = np.array([2.0, 1.5])  # Pumpenförderraten

# Systemmatrix A = B_hat^T * L * B_hat
A = B_hat.T @ L @ B_hat
b = -C_hat.T @ s
p_hat = np.linalg.solve(A, b)
p = np.append(p_hat, 0.0) # p_5 = 0
print("Knotendrücke p1..p5:", np.round(p, 4))`,
    latexExample: "A = \\hat{B}^T L \\hat{B} \\in \\mathbb{R}^{(n-1) \\times (n-1)}, \\quad \\text{det}(A) > 0 \\text{ (s.p.d.)}"
  },
  {
    id: "least_squares_linear_fit",
    lesson: "VL01",
    category: "Ausgleichsrechnung",
    title: "Gauß'sche Ausgleichsrechnung & Normalgleichungen",
    formulaLaTeX: "A^T A x = A^T b \\iff \\min_{x \\in \\mathbb{R}^k} \\|Ax - b\\|_2^2",
    summary: "Methode der kleinsten Quadrate zur Bestimmung optimaler Modellparameter in überbestimmten Gleichungssystemen, angewendet auf Pandemiewachstumsmodelle.",
    intuition: "Reale Messdaten enthalten Messfehler und Rauschen. Ein Modell mit $k=2$ Parametern kann $m=55$ Messpunkte nicht exakt interpolieren. Die Normalgleichungen projizieren den Datenvektor $b$ orthogonal auf den Spaltenraum von $A$ und minimieren die quadratische Abweichung.",
    invariants: [
      "Wachstumsmodell: $u(t) = u_0 e^{\\lambda t} \\implies \\ln u(t) = \\ln u_0 + \\lambda (t - t_0)$.",
      "Designmatrix $A \\in \\mathbb{R}^{m \\times 2}$: Spalte 1 = $1$, Spalte 2 = $t_i - t_0$.",
      "Rechte Seite $b_i = \\ln N_i$ (Logarithmierte Fallzahlen).",
      "Verdopplungszeit: $u_0 e^{\\lambda T_2} = 2u_0 \\implies T_2 = \\frac{\\ln 2}{\\lambda}$."
    ],
    pythonCode: `import numpy as np

# Logarithmische lineare Regression (Gauß-Normalgleichungen)
def fit_exponential(t, N):
    A = np.column_stack([np.ones_like(t), t - t[0]])
    b = np.log(N)
    # Normalgleichungen: (A^T A) p = A^T b
    ATA = A.T @ A
    ATb = A.T @ b
    p = np.linalg.solve(ATA, ATb)
    u0 = np.exp(p[0])
    lam = p[1]
    doubling_time = np.log(2) / lam
    return u0, lam, doubling_time

t = np.arange(10)
N = 100 * np.exp(0.28 * t) # Simuliertes Pandemiewachstum
u0, lam, T2 = fit_exponential(t, N)
print(f"u0: {u0:.1f}, lambda: {lam:.4f}, T2: {T2:.2f} Tage")`,
    latexExample: "u(t) = u_0 e^{\\lambda (t-t_0)}, \\quad T_2 = \\frac{\\ln 2}{\\lambda}"
  }
];

export const NUMERIK_CONFUSABLE_PAIRS: NumerikConfusablePair[] = [
  {
    id: "round_half_up_vs_even",
    lesson: "VL02 & Üb 3/5",
    topic: "Kaufmännische Rundung vs. Gerade Rundung (Round-to-Even)",
    mnemonic: "Bei exaktem Gleichstand (5er-Endung) rundet die kaufmännische Rundung stets auf (+Bias). Gerade Rundung rundet zur nächsten geraden Ziffer (unverzerrt, IEEE 754 Default)!",
    left: {
      term: "Kaufmännische Rundung (Half-Up)",
      concept: "Traditionelles Schulverfahren: $0 \\le m_{r+1} < \\beta/2 \\implies$ abrunden, $\\beta/2 \\le m_{r+1} < \\beta \\implies$ aufrunden.",
      formula: "\\text{rd}(x) = \\begin{cases} \\text{left}(x) & 0 \\le m_{r+1} < \\beta/2 \\\\ \\text{right}(x) & \\beta/2 \\le m_{r+1} < \\beta \\end{cases}",
      description: "Erzeugt bei langen numerischen Berechnungen eine systematische Drift nach oben, da genau die Mitte $0.5$ immer nach oben statt nach unten verschoben wird.",
      correctCase: {
        math: "0.267531 \\cdot 10^1 \\xrightarrow{\\mathbb{F}(10,4,2)} 0.2675 \\cdot 10^1",
        explanation: "Die 5. Stelle ist 3 ($< 5$), daher wird korrekt abgerundet."
      },
      fatalTrap: {
        math: "0.745000 \\xrightarrow{\\text{kaufm.}} 0.75",
        explanation: "Rundet stets auf $0.75$ auf, obwohl $0.74$ genauso nah liegt. Tausende Schritte summieren diesen Fehler systematisch auf."
      }
    },
    right: {
      term: "Gerade Rundung (Round-to-Even)",
      concept: "IEEE 754 Default: Bei absolutem Gleichstand entscheidet die Parität der letzten beizubehaltenden Mantissenstelle $m_r$ (muss gerade sein).",
      formula: "\\text{rd}(x) = \\begin{cases} \\text{left}(x) & |x-\\text{left}| < |x-\\text{right}| \\lor (|x-\\text{left}| = |x-\\text{right}| \\land m_r \\text{ gerade}) \\\\ \\text{right}(x) & \\text{sonst} \\end{cases}",
      description: "Statistisch unverzerrtes Runden: 50% der Fälle runden auf, 50% runden ab. Standard in allen modernen CPUs (x86, ARM, RISC-V).",
      correctCase: {
        math: "0.745000 \\xrightarrow{\\text{gerade}} 0.74, \\quad 0.755000 \\xrightarrow{\\text{gerade}} 0.76",
        explanation: "Bei $0.745$ ist 4 bereits gerade $\\implies 0.74$. Bei $0.755$ ist 5 ungerade $\\implies 0.76$. Beide runden zur nächsten geraden Endziffer!"
      },
      fatalTrap: {
        math: "0.745100 \\xrightarrow{\\text{gerade}} 0.75",
        explanation: "Falle: Parität greift NUR bei EXAKTEM Gleichstand. Weil $0.7451 > 0.7450$, ist der Abstand zu $0.75$ echt kleiner $\\implies 0.75$."
      }
    }
  },
  {
    id: "conditioning_vs_stability",
    lesson: "VL03 & VL04",
    topic: "Konditionierung des Problems vs. Stabilität des Algorithmus",
    mnemonic: "Die Kondition ist das Schicksal des mathematischen Problems; die Stabilität ist die Güte deines gewählten Algorithmus!",
    left: {
      term: "Kondition des Problems",
      concept: "Sensitivität der exakten Lösung gegenüber Störungen in den Eingabedaten: $\\kappa = \\lim_{\\Delta x \\to 0} \\frac{|\\Delta f / f|}{|\\Delta x / x|}$.",
      formula: "\\frac{\\|f(x) - f(\\tilde{x})\\|}{\\|f(x)\\|} \\le \\kappa(x) \\frac{\\|x - \\tilde{x}\\|}{\\|x\\|}",
      description: "Eine reine Eigenschaft der mathematischen Aufgabenstellung $f$. Ein schlecht konditioniertes Problem (z. B. Schnittpunkt zweier fast paralleler Geraden) kann von KEINEM Algorithmus der Welt präzise gelöst werden.",
      correctCase: {
        math: "f(x_1, x_2) = x_1 \\cdot x_2 \\implies \\kappa_1 = 1, \\; \\kappa_2 = 1",
        explanation: "Multiplikation ist für alle Eingaben $\\neq 0$ ideal konditioniert: 1% Fehler in der Eingabe erzeugt höchstens 1% Fehler im Ausgang."
      },
      fatalTrap: {
        math: "f(x_1, x_2) = x_1 + x_2 \\quad (x_1 = 1.0, x_2 = -0.999999)",
        explanation: "Klausurfalle: 'Mein Algorithmus rechnet exakt, also ist mein Ergebnis genau.' Falsch: $\\kappa \\approx 10^6$, 6 signifikante Stellen gehen mathematisch unvermeidbar verloren."
      }
    },
    right: {
      term: "Stabilität des Algorithmus",
      concept: "Güte der numerischen Realisierung $f'(x')$ gegenüber der exakten Funktion $f(x)$ unter Rundungsfehlereinfluss.",
      formula: "\\text{Algorithmus ist stabil} \\iff \\text{Verstärkungsfaktoren der Rundung} \\le \\text{Konditionsfaktoren des Problems}",
      description: "Gibt an, ob die Rechenvorschrift die unvermeidlichen Rundungsfehler zusätzlich aufschaukelt oder im Rahmen der Problemkondition hält.",
      correctCase: {
        math: "x_2 = \\frac{q}{x_1} \\quad (x_1 = \\frac{p}{2} + \\sqrt{p^2/4 - q})",
        explanation: "Der Vieta-Algorithmus ist numerisch stabil, weil er Rundungsfehler nicht über die Kondition der Wurzel hinaus verstärkt."
      },
      fatalTrap: {
        math: "x_2 = \\frac{p}{2} - \\sqrt{\\frac{p^2}{4} - q}",
        explanation: "Die naive pq-Formel ist numerisch INSTABIL. Obwohl die Nullstelle mathematisch gut konditioniert ist, zerstört der instabile Algorithmus alle Stellen durch Stellenauslöschung."
      }
    }
  },
  {
    id: "absolute_vs_relative_error",
    lesson: "VL02 & Folie 41",
    topic: "Absoluter vs. Relativer Fehler",
    mnemonic: "Absoluter Fehler hat physikalische Einheiten ($e_{abs} = x - x'$). Relativer Fehler misst den prozentualen Verlust an signifikanten Stellen ($e_{rel} = \\frac{x-x'}{x}$)!",
    left: {
      term: "Absoluter Fehler",
      concept: "Direkte Differenz zwischen exaktem Wert $x$ und Näherung $x'$: $e_{abs} = x - x'$.",
      formula: "e_{abs} = x - x', \\quad |e_{abs}| \\le \\frac{1}{2} \\beta^{e(x)-r}",
      description: "Skaliert mit der Größenordnung von $x$. Bei $x = 10^9$ ist ein absoluter Fehler von $1.0$ winzig; bei $x = 10^{-9}$ bedeutet derselbe Fehler den totalen Ruin.",
      correctCase: {
        math: "x = 1000.0, \\; x' = 1000.1 \\implies e_{abs} = -0.1",
        explanation: "Konkrete metrische Abweichung ohne Normierung."
      },
      fatalTrap: {
        math: "x = 10^{-6}, \\; x' = 10^{-5} \\implies e_{abs} = -9 \\cdot 10^{-6}",
        explanation: "Klausurfalle: '$10^{-6}$ ist doch super klein, also ist die Näherung gut!' Falsch: Der relative Fehler beträgt 900%!"
      }
    },
    right: {
      term: "Relativer Fehler",
      concept: "Auf die wahre Größe bezogener prozentualer Fehler: $e_{rel} = \\frac{x - x'}{x}$ (nur definiert für $x \\neq 0$).",
      formula: "e_{rel} = \\frac{x - x'}{x}, \\quad |e_{rel}| \\le \\text{eps} = \\frac{1}{2}\\beta^{1-r}",
      description: "Das fundamentale Maß der Numerik. Gibt exakt an, wie viele führende Dezimal- bzw. Binärstellen der Näherung vertrauenswürdig sind.",
      correctCase: {
        math: "e_{rel} = 10^{-5} \\implies \\text{ca. 5 verlässliche Dezimalstellen}",
        explanation: "Unabhängig von Zehnerpotenzen sofort interpretierbar."
      },
      fatalTrap: {
        math: "x \\to 0 \\implies e_{rel} = \\frac{x - x'}{x} \\to \\infty",
        explanation: "Falle: Bei Zielwerten nahe 0 explodiert der relative Fehler, selbst wenn der absolute Fehler $10^{-16}$ beträgt. Hier muss auf absolute Abbruchkriterien umgeschaltet werden."
      }
    }
  },
  {
    id: "quadratic_cancellation_vs_vieta",
    lesson: "VL04 & Folie 54–55",
    topic: "Direkte pq-Formel vs. Vieta-Stabilisierung",
    mnemonic: "Ziehe niemals fast gleiche Zahlen voneinander ab! Berechne die stabile Wurzel mit Addition und die zweite über Vieta: $x_2 = q / x_1$!",
    left: {
      term: "Direkte pq-Formel (Gefahr!)",
      concept: "Schulformel: $x_{1,2} = \\frac{p}{2} \\pm \\sqrt{\\frac{p^2}{4} - q}$.",
      formula: "x_2 = \\frac{p}{2} - \\sqrt{\\frac{p^2}{4} - q}",
      description: "Wenn $p^2/4 \\gg q$, ist $\\sqrt{p^2/4 - q} = \\frac{p}{2} \\sqrt{1 - 4q/p^2} \\approx \\frac{p}{2} (1 - \\frac{2q}{p^2})$. Bei der Subtraktion $p/2 - p/2$ löschen sich die führenden Ziffern vollständig aus.",
      correctCase: {
        math: "x^2 - 4x + 3 = 0 \\implies x_2 = 2 - \\sqrt{4-3} = 1.0",
        explanation: "Wenn $p^2/4$ und $q$ von ähnlicher Größenordnung sind, tritt keine Auslöschung auf."
      },
      fatalTrap: {
        math: "x^2 - 10000x + 1 = 0 \\implies x_2 = 5000 - \\sqrt{25000000 - 1}",
        explanation: "In einfacher Genauigkeit (float) liefert dies exakt $0.0$, obwohl die wahre Nullstelle $0.0001$ ist! 100% relativer Fehler."
      }
    },
    right: {
      term: "Vieta-Stabilisierung (Robust)",
      concept: "Satz von Vieta: $x_1 \\cdot x_2 = q \\implies x_2 = q / x_1$.",
      formula: "x_1 = \\text{sgn}(p) \\left( \\frac{|p|}{2} + \\sqrt{\\frac{p^2}{4} - q} \\right), \\quad x_2 = \\frac{q}{x_1}",
      description: "Berechnet $x_1$ immer über vorzeichengleiche Addition (vollkommen stabil ohne Stellenauslöschung) und gewinnt $x_2$ per einfacher Division.",
      correctCase: {
        math: "x_1 \\approx 10000.0, \\quad x_2 = \\frac{1}{10000.0} = 0.0001",
        explanation: "Volle 16 Dezimalstellen Maschinengenauigkeit in Double ohne jeglichen Genauigkeitsverlust!"
      },
      fatalTrap: {
        math: "q = 0 \\implies x_2 = 0 / x_1 = 0",
        explanation: "Sonderfall $q=0$: Vor der Division prüfen, ob $q=0$ ist (Nullstellen sind dann direkt $0$ und $p$)."
      }
    }
  },
  {
    id: "interpolation_vs_least_squares",
    lesson: "VL01 & Folie 15–17",
    topic: "Interpolation vs. Ausgleichsrechnung (Regression)",
    mnemonic: "Interpolation erzwingt das exakte Durchlaufen aller Punkte (Fehlerrisiko bei Rauschen!). Ausgleichsrechnung minimiert die Summe aller quadratischen Residuen $\\|Ax - b\\|_2^2$!",
    left: {
      term: "Interpolation",
      concept: "Konstruktion einer Funktion $P(t_i) = y_i$ für alle Stützstellen $i=0, \\dots, m-1$.",
      formula: "P(t_i) = y_i \\quad \\forall i=0, \\dots, m-1",
      description: "Geeignet für exakte tabellierte Funktionswerte oder Integrationsformeln. Bei fehlerbehafteten Messdaten führt ein hohes Polynomgrad zu wilden Oszillationen (Runge-Phänomen).",
      correctCase: {
        math: "u(t_0) = N_0, \\; u(t_1) = N_1 \\implies \\lambda = \\frac{\\ln N_1 - \\ln N_0}{t_1 - t_0}",
        explanation: "Zweipunkt-Interpolation zur schnellen Abschätzung zweier Parameter."
      },
      fatalTrap: {
        math: "55 \\text{ Corona-Tage mit Polynom 54. Grades interpolieren}",
        explanation: "Völliger Kollaps: Das Polynom oszilliert zwischen den Datenpunkten um Milliardenwerte."
      }
    },
    right: {
      term: "Ausgleichsrechnung (Least Squares)",
      concept: "Überbestimmtes System $Ax \\approx b$: Finde $x^* = \\arg\\min_x \\|Ax - b\\|_2^2$ via Normalgleichungen $A^T A x = A^T b$.",
      formula: "A^T A x = A^T b \\iff \\sum_{i=1}^m (f(t_i; x) - y_i)^2 \\to \\min",
      description: "Standardverfahren für reale physikalische und biologische Messdaten. Filtert Messrauschen heraus und schätzt die wahren Modellparameter statistisch optimal ab.",
      correctCase: {
        math: "A \\in \\mathbb{R}^{55 \\times 2}, \\; b = \\ln(N) \\implies A^T A \\in \\mathbb{R}^{2 \\times 2}",
        explanation: "Kompaktes $2 \\times 2$ Gleichungssystem liefert hochrobuste Verdopplungszeiten."
      },
      fatalTrap: {
        math: "A^T A \\text{ ist schlecht konditioniert}",
        explanation: "Klausurfalle: Bei hohen Polynomgraden wird $A^T A$ extrem schlecht konditioniert (Hilbert-Matrizen). Besser: QR-Zerlegung statt Normalgleichungen!"
      }
    }
  },
  {
    id: "associativity_real_vs_float",
    lesson: "VL03 & Folie 44",
    topic: "Assoziativität: Reelle Zahlen ℝ vs. Fließkommazahlen 𝔽",
    mnemonic: "In reeller Mathematik gilt $(a+b)+c = a+(b+c)$. In Fließkommaarithmetik gilt das Assoziativgesetz NICHT! Die Summationsreihenfolge entscheidet über Leben und Tod!",
    left: {
      term: "Reelle Arithmetik (ℝ)",
      concept: "Körperaxiome: Addition und Multiplikation sind uneingeschränkt assoziativ und distributiv.",
      formula: "(a + b) + c = a + (b + c), \\quad a \\cdot (b + c) = a \\cdot b + a \\cdot c",
      description: "Die Reihenfolge, in der Terme aufsummiert werden, hat in $\\mathbb{R}$ mathematisch absolut keinen Einfluss auf das Ergebnis.",
      correctCase: {
        math: "(10^{20} - 10^{20}) + 1 = 10^{20} + (-10^{20} + 1) = 1",
        explanation: "In $\\mathbb{R}$ heben sich die $10^{20}$ Terme stets zu $0$ auf."
      },
      fatalTrap: {
        math: "\\text{Annahme: Code-Optimierer darf Summen beliebig umstellen}",
        explanation: "Compiler dürfen Fließkommaoperationen ohne `-ffast-math` nicht frei umordnen, weil dies das numerische Ergebnis verändert."
      }
    },
    right: {
      term: "Fließkommaarithmetik (𝔽)",
      concept: "Rundung nach jeder Operation $\\implies (x \\oplus y) \\oplus z \\neq x \\oplus (y \\oplus z)$.",
      formula: "(x \\oplus y) \\oplus z = \\text{rd}(\\text{rd}(x + y) + z)",
      description: "Summiert man eine Reihe $1 + \\sum_{i=1}^N 10^{-16}$, ergibt die Vorwärtssumme stets $1.0$ (da jeder Summand im Epsilon verschluckt wird). Summiert man rückwärts von klein nach groß, wächst die Summe akkurat an!",
      correctCase: {
        math: "(10^{20} \\oplus -10^{20}) \\oplus 1 = 0 \\oplus 1 = 1.0",
        explanation: "Große gegensätzliche Zahlen zuerst subtrahieren, um die Nullauslöschung zu isolieren."
      },
      fatalTrap: {
        math: "10^{20} \\oplus (-10^{20} \\oplus 1) = 10^{20} \\oplus -10^{20} = 0.0",
        explanation: "Weil $10^{20} + 1 = 10^{20}$ im Rechner gerundet wird, geht die $+1$ vollständig verloren $\\implies$ Ergebnis $0.0$ statt $1.0$!"
      }
    }
  }
];

export const NUMERIK_QUIZ_ITEMS: NumerikQuizItem[] = [
  {
    id: "quiz_f322_cardinality",
    number: 1,
    lesson: "VL02 & Üb 1a",
    timeLimitSec: 60,
    title: "Mächtigkeit des Mini-Fließkommasystems F(3, 2, 2)",
    question: "Wie viele Fließkommazahlen enthält die Menge $\\mathbb{F}(3, 2, 2)$ gemäß der allgemeinen Vorlesungsformel für normierte Fließkommazahlen?",
    options: [
      { id: "a", text: "$162$" },
      { id: "b", text: "$205$" },
      { id: "c", text: "$216$" },
      { id: "d", text: "$243$" }
    ],
    correctOptionId: "b",
    explanation: "Die allgemeine Formel für $|\\mathbb{F}(\\beta, r, s)|$ lautet: $2 \\cdot (\\beta-1) \\beta^{r-1} \\cdot (2\\beta^s - 1) + 1$. Einsetzen liefert $2 \\cdot 2 \\cdot 3^1 \\cdot (2 \\cdot 3^2 - 1) + 1 = 12 \\cdot 17 + 1 = 205$.",
    workedProof: "$$|\\mathbb{F}(3, 2, 2)| = 2 \\cdot (3-1) \\cdot 3^{2-1} \\cdot (2 \\cdot 3^2 - 1) + 1 = 4 \\cdot 3 \\cdot (18 - 1) + 1 = 12 \\cdot 17 + 1 = 204 + 1 = 205$$ (Der Summand $+1$ zählt die Null, die gesondert codiert wird).",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Vergessen der negativen Exponenten und der Null." },
      { optionId: "c", whyWrong: "Reine Potenz $3^5$, ignoriert die Vorzeichen und Normierung." },
      { optionId: "d", whyWrong: "Nimmt $3^{2+2+1} = 3^5 = 243$ an ohne Berücksichtigung der Normierungsbedingung $m_1 \\neq 0$." }
    ],
    slideCitation: "Übungsblatt 1, Aufgabe 1a & Vorlesung 2, Folie 34/35"
  },
  {
    id: "quiz_f322_smallest_pos",
    number: 2,
    lesson: "VL02 & Üb 1b",
    timeLimitSec: 60,
    title: "Kleinste positive Zahl in F(3, 2, 2)",
    question: "Wie groß ist der Abstand von der Null zur kleinsten benachbarten positiven Zahl $x_+$ in $\\mathbb{F}(3, 2, 2)$ (Basis 10)?",
    options: [
      { id: "a", text: "$3^{-2} = \\frac{1}{9}$" },
      { id: "b", text: "$3^{-5} = \\frac{1}{243}$" },
      { id: "c", text: "$3^{-9} = \\frac{1}{19683} \\approx 5.08 \\cdot 10^{-5}$" },
      { id: "d", text: "$3^{-8} = \\frac{1}{6561} \\approx 1.52 \\cdot 10^{-4}$" }
    ],
    correctOptionId: "c",
    explanation: "Die kleinste positive normalisierte Zahl ist $x_+ = \\beta^{-1 - (\\beta-1)\\sum_{j=0}^{s-1} \\beta^j}$. Für $\\beta=3, s=2$: Exponentensumme $= 3^0 + 3^1 = 4$. Minimaler Exponent $= - (3-1) \\cdot 4 = -8$. Mit kleinster Mantisse $3^{-1}$ ergibt sich $3^{-1} \\cdot 3^{-8} = 3^{-9} = 1/19683$.",
    workedProof: "$$e_{\\min} = -(\\beta-1)\\sum_{j=0}^{s-1} \\beta^j = -2 \\cdot (1 + 3) = -8 \\implies x_+ = m_{\\min} \\cdot 3^{e_{\\min}} = 3^{-1} \\cdot 3^{-8} = 3^{-9} = \\frac{1}{19683}$$",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Nimmt fälschlicherweise an, der Exponent sei $0$." },
      { optionId: "b", whyWrong: "Zählt die Exponentenstellen nicht geometrisch auf." },
      { optionId: "d", whyWrong: "Vergisst die erste Mantissenstelle $3^{-1}$." }
    ],
    slideCitation: "Übungsblatt 1, Aufgabe 1b & Vorlesung 2, Folie 35"
  },
  {
    id: "quiz_nulladdition_limit",
    number: 3,
    lesson: "VL02 & Üb 6",
    timeLimitSec: 60,
    title: "Numerische Nulladdition in float",
    question: "In C++ gilt für eine Variable `float x`: Für welche Werte von $x > 0$ liefert die Abfrage `(x + 1.0f == 1.0f)` unter IEEE 754 (Round-to-Even) `true`?",
    options: [
      { id: "a", text: "Für alle $x < 2^{-24} \\approx 5.96 \\cdot 10^{-8}$" },
      { id: "b", text: "Für alle $x \\le 2^{-25} \\approx 2.98 \\cdot 10^{-8}$" },
      { id: "c", text: "Ausschließlich für $x == 0.0f$" },
      { id: "d", text: "Für alle $x < 2^{-53} \\approx 1.11 \\cdot 10^{-16}$" }
    ],
    correctOptionId: "b",
    explanation: "Die Maschinengenauigkeit in Single Precision ist $\\text{eps} = 2^{-24}$. Bei Round-to-Even wird alles strikt kleiner als $\\text{eps}/2 = 2^{-25}$ auf $1.0f$ abgerundet, und exakt bei $2^{-25}$ entscheidet das hidden bit der Mantisse (gerade Rundung $\\implies$ abrunden auf $1.0f$).",
    workedProof: "Die Mantisse von $1.0$ hat 24 Bits: $1.000\\dots0_2$. Das niedrigstwertige Bit (ULP) hat den Wert $2^{-23}$. Addiert man $x < 2^{-24}$, liegt der Wert näher an $1.0$ als an $1.0 + 2^{-23}$. Bei genau $x = 2^{-24} / 2 = 2^{-25}$ greift die Tie-Breaking-Regel zur geraden Mantisse $\\implies$ Rundung auf $1.0f$.",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Verwechselt Machine Epsilon $2^{-24}$ mit dem Rundungsschwellwert $2^{-25}$ (Hälfte des Abstands)." },
      { optionId: "c", whyWrong: "Gilt nur in exakter reeller Arithmetik $\\mathbb{R}$, nicht in Fließkommaarithmetik $\\mathbb{F}$!" },
      { optionId: "d", whyWrong: "Das ist die Schranke für `double`, nicht für `float`." }
    ],
    slideCitation: "Übungsblatt 1, Aufgabe 6 & nulladdition.cpp"
  },
  {
    id: "quiz_cancellation_roots",
    number: 4,
    lesson: "VL04",
    timeLimitSec: 60,
    title: "Auslöschung bei quadratischen Gleichungen",
    question: "Gegeben sei die Gleichung $x^2 - 10000x + 1 = 0$. Warum versagt die direkte pq-Formel $x_2 = 5000 - \\sqrt{25000000 - 1}$ in einfacher Genauigkeit (`float`)?",
    options: [
      { id: "a", text: "Weil der Radikand negativ wird und imaginäre Wurzeln entstehen." },
      { id: "b", text: "Weil $\\sqrt{25000000-1}$ in float zu exakt $5000.0f$ gerundet wird und $5000 - 5000 = 0.0$ liefert (Auslöschung aller signifikanten Stellen)." },
      { id: "c", text: "Weil die Multiplikation $p^2$ einen Gleitkommaüberlauf (Overflow) auslöst." },
      { id: "d", text: "Weil das Problem mathematisch schlecht konditioniert ist." }
    ],
    correctOptionId: "b",
    explanation: "Da $25000000 - 1 = 24999999$, benötigt man 8 Dezimalstellen zur Unterscheidung. `float` hat aber nur ca. 7 Dezimalstellen ($24$ Bit). Daher wird $\\sqrt{24999999}$ zu $5000.0f$ gerundet $\\implies x_2 = 0.0f$! Mit Vieta $x_2 = q / x_1 = 1 / 10000 = 0.0001$ ist das Ergebnis sofort perfekt.",
    workedProof: "Radikand $= 2.5 \\cdot 10^7 - 1$. Da $\\text{eps}_{float} \\approx 5.96 \\cdot 10^{-8}$, ist $\\Delta = 1 / (2.5 \\cdot 10^7) = 4 \\cdot 10^{-8} < \\text{eps}$. Im Rechner ist daher $\\text{rd}(25000000 - 1) = 25000000.0f$. Die Wurzel ist $5000.0f$, die Differenz $0.0f$.",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Der Radikand ist $24999999 > 0$, also rein reell." },
      { optionId: "c", whyWrong: "$10000^2 = 10^8$, weit unter dem Float-Überlauf von $\\sim 3.4 \\cdot 10^{38}$." },
      { optionId: "d", whyWrong: "Das Problem der Wurzelberechnung ist gut konditioniert; der naive Algorithmus ist instabil!" }
    ],
    slideCitation: "Vorlesung 4, Folie 54 & 55"
  },
  {
    id: "quiz_conditioning_addition",
    number: 5,
    lesson: "VL03",
    timeLimitSec: 60,
    title: "Konditionszahl der Addition",
    question: "Für $f(x_1, x_2) = x_1 + x_2$ lautet der Verstärkungsfaktor der ersten Komponente $\\kappa_1 = |\\frac{x_1}{x_1 + x_2}|$. Wann ist die Addition katastrophal schlecht konditioniert?",
    options: [
      { id: "a", text: "Wenn beide Summanden dasselbe Vorzeichen haben ($x_1, x_2 > 0$)." },
      { id: "b", text: "Wenn $x_1 \\approx -x_2$ (fast betragsgleiche Zahlen mit entgegengesetztem Vorzeichen)." },
      { id: "c", text: "Wenn einer der beiden Summanden exakt 0 ist." },
      { id: "d", text: "Die Addition ist immer perfekt konditioniert mit $\\kappa = 1$." }
    ],
    correctOptionId: "b",
    explanation: "Wenn $x_1 \\to -x_2$, geht der Nenner $x_1 + x_2 \\to 0$. Folglich strebt $\\kappa_1 \\to \\infty$. Ein relativer Fehler von $10^{-8}$ in $x_1$ wird mit $\\kappa = 10^8$ multipliziert und zerstört das Ergebnis vollständig.",
    workedProof: "$$\\kappa_1(x_1, x_2) = \\left| \\frac{\\partial f}{\\partial x_1} \\cdot \\frac{x_1}{f(x_1, x_2)} \\right| = \\left| 1 \\cdot \\frac{x_1}{x_1 + x_2} \\right| \\xrightarrow{x_1 \\to -x_2} \\infty$$",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Bei gleichem Vorzeichen ist $\\kappa_1 = x_1 / (x_1+x_2) \\le 1$ (Fehlerdämpfung!)." },
      { optionId: "c", whyWrong: "Wenn $x_2=0$, ist $\\kappa_1 = |x_1 / x_1| = 1$ (perfekt konditioniert)." },
      { optionId: "d", whyWrong: "Verwechselt Addition mit Multiplikation (für Multiplikation ist $\\kappa \\equiv 1$)." }
    ],
    slideCitation: "Vorlesung 3, Folie 50 & Bsp. 3.8"
  },
  {
    id: "quiz_graph_incidence_rank",
    number: 6,
    lesson: "VL04",
    timeLimitSec: 60,
    title: "Rang der reduzierten Inzidenzmatrix",
    question: "Warum muss im Knotenpotentialverfahren für Rohrnetzwerke eine Zeile der Inzidenzmatrix $B^T \\in \\mathbb{R}^{n \\times m}$ gestrichen werden (zu $\\hat{B}^T \\in \\mathbb{R}^{(n-1) \\times m}$)?",
    options: [
      { id: "a", text: "Weil ein Rohr im Netzwerk defekt sein könnte." },
      { id: "b", text: "Weil die Zeilensumme von $B^T$ Null ist ($1-1=0$) und die Zeilen daher linear abhängig sind; Streichen eines Referenzknotens ($p_n=0$) garantiert maximalen Rang $n-1$." },
      { id: "c", text: "Weil man nur ungerade Matrixdimensionen invertieren kann." },
      { id: "d", text: "Damit die Matrix symmetrisch wird." }
    ],
    correctOptionId: "b",
    explanation: "Jede Kante (Spalte in $B^T$) hat genau einen Eingangsknoten ($+1$) und einen Ausgangsknoten ($-1$). Die Summe aller Zeilen ist somit identisch Null ($1 - 1 = 0$). Folglich ist die vollständige Matrix $B^T L B$ singulär (Druck ist nur bis auf eine additive Konstante $p + c$ bestimmt). Das Festhalten von $p_n = 0$ macht das System regulär.",
    workedProof: "$$\\sum_{i=1}^n B_{ji}^T = 1 + (-1) = 0 \\implies \\text{Rang}(B^T) \\le n-1.$$ Für zusammenhängende Netzwerke hat $\\hat{B}^T$ nach Streichen einer Zeile maximalen Rang $n-1$.",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Physikalisch unsinnig." },
      { optionId: "c", whyWrong: "Die Dimension $n-1$ kann sowohl gerade als auch ungerade sein." },
      { optionId: "d", whyWrong: "$B^T$ ist ohnehin nicht quadratisch ($n \\times m$)." }
    ],
    slideCitation: "Vorlesung 4, Folie 61 & 63"
  },
  {
    id: "quiz_rounding_tie_breaker",
    number: 7,
    lesson: "VL02 & Üb 3/5",
    timeLimitSec: 60,
    title: "Rundung von 0.745000",
    question: "Wie wird die Dezimalzahl $x = 0.745000$ auf zwei Nachkommastellen gerundet: a) kaufmännisch, b) gerade Rundung (Round-to-Even)?",
    options: [
      { id: "a", text: "kaufmännisch: 0.75, gerade: 0.74" },
      { id: "b", text: "kaufmännisch: 0.74, gerade: 0.75" },
      { id: "c", text: "kaufmännisch: 0.75, gerade: 0.75" },
      { id: "d", text: "kaufmännisch: 0.74, gerade: 0.74" }
    ],
    correctOptionId: "a",
    explanation: "Kaufmännisch: Die Folgestelle ist 5 $\\implies$ Aufrunden auf $0.75$. Gerade Rundung: Exakter Gleichstand ($x$ liegt exakt mittig zwischen $0.74$ und $0.75$). Die 2. Stelle von $0.74$ ist 4 (gerade), während bei $0.75$ die 5 ungerade ist $\\implies$ Rundung zur geraden Zahl $0.74$!",
    workedProof: "$$|0.745 - 0.74| = 0.005 = |0.745 - 0.75| \\implies m_2 = 4 \\text{ ist gerade} \\implies \\text{rd}_{even}(0.745) = 0.74.$$",
    distractorBreakdown: [
      { optionId: "b", whyWrong: "Verkehrt beide Verfahren ins Gegenteil." },
      { optionId: "c", whyWrong: "Nimmt fälschlicherweise an, gerade Rundung runde auch immer auf." },
      { optionId: "d", whyWrong: "Kaufmännisch rundet bei 5 zwingend auf." }
    ],
    slideCitation: "Vorlesung 2, Folie 39 & Übungsblatt 1, Aufgabe 5"
  },
  {
    id: "quiz_spd_matrix_properties",
    number: 8,
    lesson: "VL04",
    timeLimitSec: 60,
    title: "Eigenschaft der Systemmatrix A = B̂^T L B̂",
    question: "Welche mathematische Eigenschaft besitzt die Systemmatrix $A = \\hat{B}^T L \\hat{B}$ im Knotenpotentialverfahren für Rohrnetzwerke mit positiven Leitfähigkeiten $L_i > 0$?",
    options: [
      { id: "a", text: "Schiefsymmetrisch und nilpotent" },
      { id: "b", text: "Symmetrisch positiv definit (s.p.d.) und dünn besetzt" },
      { id: "c", text: "Singulär mit $\\det(A) = 0$" },
      { id: "d", text: "Vollbesetzt und stets schlecht konditioniert" }
    ],
    correctOptionId: "b",
    explanation: "Da $L = \\text{diag}(L_i)$ mit $L_i > 0$ positiv definit ist und $\\hat{B}$ vollen Spaltenrang hat, ist $x^T A x = (\\hat{B}x)^T L (\\hat{B}x) > 0$ für alle $x \\neq 0$. $A$ ist daher symmetrisch positiv definit (s.p.d.) und kann extrem effizient per Cholesky-Zerlegung ohne Pivotisierung gelöst werden.",
    workedProof: "$$A^T = (\\hat{B}^T L \\hat{B})^T = \\hat{B}^T L^T (\\hat{B}^T)^T = \\hat{B}^T L \\hat{B} = A.$$ Da $\\hat{B}x = 0 \\iff x = 0$ (voller Rang), gilt $x^T A x = \\sum L_i (\\hat{B}x)_i^2 > 0$.",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "$A^T = A$, also strikt symmetrisch, nicht schiefsymmetrisch." },
      { optionId: "c", whyWrong: "Als s.p.d. Matrix ist $A$ garantiert regulär ($\\det(A) > 0$)." },
      { optionId: "d", whyWrong: "Da jeder Knoten nur mit wenigen Nachbarn verbunden ist, enthält $A$ fast nur Nullen (dünn besetzt!)." }
    ],
    slideCitation: "Vorlesung 4, Folie 63"
  },
  {
    id: "quiz_exp_negative_cancellation",
    number: 9,
    lesson: "VL02",
    timeLimitSec: 60,
    title: "Taylor-Reihe für e^-20",
    question: "Berechnet man $e^{-20}$ in einfacher Genauigkeit (`float`) über die Potenzreihe $S_n = \\sum_{i=0}^n \\frac{(-20)^i}{i!}$, erhält man als Grenzwert $\\approx 0.75668$ statt des wahren Werts $2.061 \\cdot 10^{-9}$. Warum?",
    options: [
      { id: "a", text: "Weil die Taylor-Reihe für negative Zahlen mathematisch divergiert." },
      { id: "b", text: "Weil Zwischenterme bis zu $\\sim 2.6 \\cdot 10^6$ anwachsen; bei der alternierenden Aufsummierung löschen sich die vorderen 7 Stellen aus, sodass im $10^{-9}$-Bereich nur Rundungsmüll übrigbleibt." },
      { id: "c", text: "Weil $i!$ einen Integer-Überlauf erzeugt." },
      { id: "d", text: "Weil $e^{-20}$ kleiner als die kleinste positive Gleitkommazahl ist." }
    ],
    correctOptionId: "b",
    explanation: "Die Reihe konvergiert in $\\mathbb{R}$, aber die Summanden erreichen bei $i=20$ Werte um $\\pm 2.6 \\cdot 10^6$. Ein `float` speichert nur 7 signifikante Stellen. Subtrahiert man zwei Zahlen der Größenordnung $10^6$, geht jede Information unterhalb von $10^{-1}$ verloren! Das Resultat im $10^{-9}$-Bereich ist reiner Zufallsmüll.",
    workedProof: "Größter Term: $\\frac{20^{20}}{20!} \\approx 2.61 \\cdot 10^6$. Fließkommaauflösung bei $10^6$: $\\text{ULP} \\approx 10^6 \\cdot 2^{-24} \\approx 0.15$. Da der wahre Wert $2 \\cdot 10^{-9} \\ll 0.15$ ist, wird er vom Rundungsrauschen komplett überdeckt.",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Die Exponentialreihe hat Konvergenzradius $R = \\infty$, konvergiert also für jedes $x \\in \\mathbb{R}$." },
      { optionId: "c", whyWrong: "Die Fakultät wird fortlaufend in Fließkomma dividiert ($y_n = y_{n-1} \\cdot x / n$)." },
      { optionId: "d", whyWrong: "$e^{-20} \\approx 2 \\cdot 10^{-9}$ ist viel größer als $x_+ \\approx 1.17 \\cdot 10^{-38}$." }
    ],
    slideCitation: "Vorlesung 2, Folie 30 & 31"
  },
  {
    id: "quiz_doubling_time_formula",
    number: 10,
    lesson: "VL01",
    timeLimitSec: 60,
    title: "Verdopplungszeit bei exponentiellem Wachstum",
    question: "In einem Pandemiemodell $u(t) = u_0 e^{\\lambda t}$ beträgt die geschätzte Wachstumsrate $\\lambda = 0.231 \\ \\text{Tag}^{-1}$. Wie lang ist die Verdopplungszeit $T_2$?",
    options: [
      { id: "a", text: "$T_2 = \\frac{2}{\\lambda} \\approx 8.66 \\text{ Tage}$" },
      { id: "b", text: "$T_2 = \\frac{\\ln 2}{\\lambda} \\approx 3.00 \\text{ Tage}$" },
      { id: "c", text: "$T_2 = \\lambda \\cdot \\ln 2 \\approx 0.16 \\text{ Tage}$" },
      { id: "d", text: "$T_2 = \\frac{1}{\\lambda} \\approx 4.33 \\text{ Tage}$" }
    ],
    correctOptionId: "b",
    explanation: "Die Verdopplung erfordert $u(t + T_2) = 2 u(t) \\iff u_0 e^{\\lambda (t+T_2)} = 2 u_0 e^{\\lambda t} \\iff e^{\\lambda T_2} = 2 \\iff \\lambda T_2 = \\ln 2 \\iff T_2 = \\frac{\\ln 2}{\\lambda}$. Mit $\\lambda = 0.231$ ergibt sich $T_2 = 0.69315 / 0.231 \\approx 3.0$ Tage.",
    workedProof: "$$u_0 e^{\\lambda T_2} = 2 u_0 \\implies \\lambda T_2 = \\ln 2 \\implies T_2 = \\frac{\\ln 2}{\\lambda} = \\frac{0.693147}{0.231} \\approx 3.00 \\text{ Tage}.$$",
    distractorBreakdown: [
      { optionId: "a", whyWrong: "Nimmt fälschlicherweise $2 / \\lambda$ statt $\\ln 2 / \\lambda$." },
      { optionId: "c", whyWrong: "Multipliziert statt zu dividieren." },
      { optionId: "d", whyWrong: "Das wäre die Zeit bis zum Faktor $e \\approx 2.718$ (e-Faltungszeit)." }
    ],
    slideCitation: "Vorlesung 1, Folie 22 & 23"
  }
];

export const NUMERIK_CODE_SNIPPETS: NumerikCodeSnippet[] = [
  {
    id: "nulladdition_code",
    title: "Numerische Nulladdition (C++ Templates)",
    lesson: "Übungsblatt 1, Aufgabe 6",
    description: "C++-Implementierung zur Bestimmung der Schranke für Nulladdition ($x + 1 == 1$) unter Vermeidung impliziter Casts durch generische Templates.",
    filename: "nulladdition.cpp",
    language: "cpp",
    highlights: [
      "Verwendung von T(1) verhindert versehentliche Promotion auf double",
      "Maximale Dezimalpräzision mit std::numeric_limits<T>::max_digits10",
      "Veranschaulicht Machine Epsilon: x + 1.0f == 1.0f für x <= 2^-25"
    ],
    code: `#include <iostream>
#include <iomanip>
#include <limits>
#include <string>

// Bonus (Teilaufgabe d): Template-Funktion zur Überprüfung der Nulladdition
// Verwendet T(1), damit kein impliziter Cast auf double (wie bei Literal 1.0) stattfindet.
template <typename T>
bool is_null_addition(T x) {
    return (x + T(1) == T(1));
}

template <typename T>
void test_type(const std::string& type_name) {
    T x;
    std::cout << "\\n=== Test fuer Typ: " << type_name << " ===\\n";
    std::cout << "Geben Sie eine Zahl x ein: ";
    if (std::cin >> x) {
        // Ausgabe mit maximaler Stellengenauigkeit für den jeweiligen Typ
        std::cout << std::setprecision(std::numeric_limits<T>::max_digits10);
        std::cout << std::scientific;
        
        bool result = is_null_addition(x);
        std::cout << "Eingabe x           : " << x << "\\n";
        std::cout << "Berechnung x + 1    : " << (x + T(1)) << "\\n";
        std::cout << "Ergebnis            : " 
                  << (result ? "x + 1 == 1 (Nulladdition findet statt!)" 
                             : "x + 1 != 1 (Nulladdition findet NICHT statt)") 
                  << "\\n";
    }
}

int main() {
    std::cout << "Numerische Nulladdition (Aufgabe 6)\\n";
    std::cout << "Gleichung: x + 1 = 1\\n";

    test_type<float>("float");
    test_type<double>("double");

    return 0;
}`
  },
  {
    id: "hdnum_linear_fit_code",
    title: "Gauß-Ausgleichsrechnung in HDNum (C++)",
    lesson: "Vorlesung 1, Folie 18",
    description: "Lineare Ausgleichsrechnung durch Logarithmierung über die HDNum-Lehrbibliothek (Normalgleichungen A^T A x = A^T b).",
    filename: "linear_fit_hdnum.cpp",
    language: "cpp",
    highlights: [
      "Header-only HDNum Matrix- und Vektorklassen",
      "Matrix-Matrix-Multiplikation ATA.mm(AT, A)",
      "Matrix-Vektor-Multiplikation AT.mv(b, logN)",
      "Direkter LGS-Löser linsolve(ATA, p, b)"
    ],
    code: `#include <iostream>
#include <cmath>
#include "hdnum.hh" // HDNum Header-Only Lehrbibliothek

using namespace hdnum;
using Number = double;
using Vec = Vector<Number>;
using Mat = DenseMatrix<Number>;

Vec linear_fit(const Vec& N, const Vec& t)
{
    // Erstelle die Designmatrix A (m x 2)
    Mat A(N.size(), 2);
    for (std::size_t i = 0; i < N.size(); ++i) {
        A[i][0] = 1.0;
        A[i][1] = t[i] - t[0];
    }

    // Erstelle die rechte Seite (logarithmierte Fallzahlen)
    Vec logN(N.size());
    for (std::size_t i = 0; i < N.size(); ++i) {
        logN[i] = std::log(N[i]); // Natürlicher Logarithmus!
    }

    // Berechne Gauß'sche Normalgleichungen: A^T * A * p = A^T * logN
    Mat AT(A.transpose());       // A transponieren
    Mat ATA(2, 2); 
    ATA.mm(AT, A);               // Matrix-Matrix: A^T * A
    
    Vec b(2);
    AT.mv(b, logN);              // Matrix-Vektor: b = A^T * logN

    Vec p(2);
    linsolve(ATA, p, b);         // LGS lösen für p = [ln(u0), lambda]^T
    return p;
}`
  },
  {
    id: "hdnum_newton_fit_code",
    title: "Nichtlineare Parameterschätzung mit Newton-Verfahren",
    lesson: "Vorlesung 1, Folie 21",
    description: "Lösung des nichtlinearen Kleinste-Quadrate-Problems min ||u0 * exp(lambda * t) - N||^2 mittels HDNum Newton-Löser und Lambda-Funktion.",
    filename: "nonlinear_fit_hdnum.cpp",
    language: "cpp",
    highlights: [
      "C++ Lambda-Funktion als Residuenvektor F(p)",
      "Newton-Verfahren mit adaptiver Liniensuche (Line Search)",
      "Automatische Reduktion und Abbruchschranken"
    ],
    code: `#include <iostream>
#include <cmath>
#include "hdnum.hh"

using namespace hdnum;
using Number = double;
using Vec = Vector<Number>;

Vec nonlinear_fit(const Vec& N, const Vec& t, const Vec& p0)
{
    // Gradient des quadratischen Residuums J(u0, lambda)
    auto F = [&](const Vec& p) {
        Vec r(2, 0.0);
        for (std::size_t i = 0; i < N.size(); ++i) {
            Number dt = t[i] - t[0];
            Number exp_val = std::exp(p[1] * dt);
            Number diff = p[0] * exp_val - N[i];

            r[0] += diff * exp_val;
            r[1] += diff * dt * exp_val;
        }
        return r;
    };

    auto nlp = getNonlinearProblem(F, p0);

    Newton newton;
    newton.set_maxit(50);
    newton.set_verbosity(2);
    newton.set_reduction(1e-10);
    newton.set_abslimit(1e-100);
    newton.set_linesearchsteps(8);

    Vec p(p0); // Startwert (z.B. aus linear_fit)
    newton.solve(nlp, p);
    return p;
}`
  },
  {
    id: "robust_quadratic_solver_code",
    title: "Robuste Nullstellenberechnung mit Vieta-Stabilisierung",
    lesson: "Vorlesung 4, Folie 54–55",
    description: "Vollständig numerisch robuster C++20-Löser für x^2 - px + q = 0, der selbst bei extremen Koeffizienten p >> q keine Stellen durch Auslöschung verliert.",
    filename: "robust_quadratic.cpp",
    language: "cpp",
    highlights: [
      "Verhindert Subtraktion betragsgleicher Gleitkommazahlen",
      "Nutzt Satz von Vieta x1 * x2 = q",
      "Erreicht stets volle IEEE 754 Maschinengenauigkeit"
    ],
    code: `#include <iostream>
#include <cmath>
#include <utility>
#include <iomanip>

// Löst x^2 - p*x + q = 0 numerisch stabil
std::pair<double, double> solve_quadratic_stable(double p, double q) {
    double disc = std::sqrt(p * p / 4.0 - q);
    
    // Berechne betragsgrößere Wurzel mit vorzeichengleicher Addition
    double sign = (p >= 0.0) ? 1.0 : -1.0;
    double x1 = sign * (std::abs(p) / 2.0 + disc);
    
    // Zweite Wurzel über den Satz von Vieta: x1 * x2 = q
    double x2 = (x1 != 0.0) ? (q / x1) : 0.0;
    
    return {x1, x2};
}

int main() {
    double p = 1e8;
    double q = 1.0;
    
    // Naiv: x2 = p/2 - sqrt(p^2/4 - q)
    double naive_x2 = p / 2.0 - std::sqrt(p * p / 4.0 - q);
    auto [x1, stable_x2] = solve_quadratic_stable(p, q);
    
    std::cout << std::setprecision(16) << std::scientific;
    std::cout << "Exakter Wert x2: 1.0000000000000000e-08\\n";
    std::cout << "Naive pq-Formel: " << naive_x2 << " (Auslöschung!)\\n";
    std::cout << "Vieta-Methode  : " << stable_x2 << " (Exakt!)\\n";
    return 0;
}`
  }
];

export const COVID_DATA_GERMANY = [
  { date: "24/02/2020", day: 0, cases: 16 },
  { date: "25/02/2020", day: 1, cases: 18 },
  { date: "26/02/2020", day: 2, cases: 21 },
  { date: "27/02/2020", day: 3, cases: 26 },
  { date: "28/02/2020", day: 4, cases: 53 },
  { date: "29/02/2020", day: 5, cases: 66 },
  { date: "01/03/2020", day: 6, cases: 117 },
  { date: "02/03/2020", day: 7, cases: 150 },
  { date: "03/03/2020", day: 8, cases: 188 },
  { date: "04/03/2020", day: 9, cases: 240 },
  { date: "05/03/2020", day: 10, cases: 400 },
  { date: "06/03/2020", day: 11, cases: 639 },
  { date: "07/03/2020", day: 12, cases: 795 },
  { date: "08/03/2020", day: 13, cases: 902 },
  { date: "09/03/2020", day: 14, cases: 1139 },
  { date: "10/03/2020", day: 15, cases: 1296 },
  { date: "11/03/2020", day: 16, cases: 1567 },
  { date: "12/03/2020", day: 17, cases: 2369 },
  { date: "13/03/2020", day: 18, cases: 3062 },
  { date: "14/03/2020", day: 19, cases: 3795 },
  { date: "15/03/2020", day: 20, cases: 4838 },
  { date: "16/03/2020", day: 21, cases: 6012 },
  { date: "17/03/2020", day: 22, cases: 7156 },
  { date: "18/03/2020", day: 23, cases: 8198 },
  { date: "19/03/2020", day: 24, cases: 10999 },
  { date: "20/03/2020", day: 25, cases: 13957 },
  { date: "21/03/2020", day: 26, cases: 16662 },
  { date: "22/03/2020", day: 27, cases: 18610 }, // 1. Lockdown
  { date: "23/03/2020", day: 28, cases: 22672 },
  { date: "24/03/2020", day: 29, cases: 27436 },
  { date: "25/03/2020", day: 30, cases: 31554 },
  { date: "26/03/2020", day: 31, cases: 36508 },
  { date: "27/03/2020", day: 32, cases: 42288 },
  { date: "28/03/2020", day: 33, cases: 48582 },
  { date: "29/03/2020", day: 34, cases: 52547 },
  { date: "30/03/2020", day: 35, cases: 57298 },
  { date: "31/03/2020", day: 36, cases: 61913 },
  { date: "01/04/2020", day: 37, cases: 67366 },
  { date: "02/04/2020", day: 38, cases: 73522 },
  { date: "03/04/2020", day: 39, cases: 79696 },
  { date: "04/04/2020", day: 40, cases: 85778 },
  { date: "05/04/2020", day: 41, cases: 91714 },
  { date: "06/04/2020", day: 42, cases: 95391 },
  { date: "07/04/2020", day: 43, cases: 99225 },
  { date: "08/04/2020", day: 44, cases: 103228 },
  { date: "09/04/2020", day: 45, cases: 108202 },
  { date: "10/04/2020", day: 46, cases: 113525 }, // Karfreitag
  { date: "11/04/2020", day: 47, cases: 117658 },
  { date: "12/04/2020", day: 48, cases: 120479 },
  { date: "13/04/2020", day: 49, cases: 123016 }, // Fit-Ende in VL01
  { date: "14/04/2020", day: 50, cases: 125098 },
  { date: "15/04/2020", day: 51, cases: 127584 },
  { date: "16/04/2020", day: 52, cases: 130450 },
  { date: "17/04/2020", day: 53, cases: 133830 },
  { date: "18/04/2020", day: 54, cases: 137439 }
];
