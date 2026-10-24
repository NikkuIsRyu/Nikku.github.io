export interface SeminarMilestone {
  id: string;
  titleEn: string;
  titleDe: string;
  date: string;
  descEn: string;
  descDe: string;
  status: 'completed' | 'in-progress' | 'current' | 'pending';
  defaultChecked: boolean;
  tagEn: string;
  tagDe: string;
}

export interface PaperSection {
  id: string;
  titleEn: string;
  titleDe: string;
  compassEn: string;
  compassDe: string;
  keyTerms: string[];
  selfCheckEn: string;
  selfCheckDe: string;
  defaultCompleted: boolean;
  isBookmark?: boolean;
}

export interface SeminarPaper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  roleBadgeEn: string;
  roleBadgeDe: string;
  roleType: 'presentation' | 'discussant' | 'required' | 'survey';
  pdfUrl: string;
  landingUrl: string;
  driveFileName: string;
  localPath: string;
  overviewEn: string;
  overviewDe: string;
  sections: PaperSection[];
}

export interface LexiconEntry {
  id: string;
  termEn: string;
  termDe: string;
  category: 'paradigms' | 'rl-reflexion' | 'benchmarks-eval' | 'medical-ai';
  papers: string[];
  defEn: string;
  defDe: string;
  paperContextEn: string;
  paperContextDe: string;
}

export const seminarMilestones: SeminarMilestone[] = [
  {
    id: 'm1',
    titleEn: 'Enrollment & Registration (Moodle & heiCo)',
    titleDe: 'Einschreibung & Registrierung (Moodle & heiCo)',
    date: 'Late Oct 2026',
    descEn: 'Confirm enrollment in Moodle with course key (42AIGen42) and register the seminar module in heiCo.',
    descDe: 'Einschreibung in Moodle mit Kursschlüssel (42AIGen42) bestätigen und das Modul in heiCo belegen.',
    status: 'in-progress',
    defaultChecked: true,
    tagEn: 'Admin',
    tagDe: 'Verwaltung'
  },
  {
    id: 'm2',
    titleEn: 'Required Reading #1: ReAct Paper (Yao et al., 2023)',
    titleDe: 'Pflichtlektüre #1: ReAct-Paper (Yao et al., 2023)',
    date: 'Oct 24, 2026',
    descEn: 'Understand the Thought-Action-Observation loop, action space augmentation, and HotpotQA/ALFWorld baselines.',
    descDe: 'Verständnis des Thought-Action-Observation-Zyklus, Aktionsraumerweiterung und ALFWorld/HotpotQA-Baselines.',
    status: 'completed',
    defaultChecked: true,
    tagEn: 'Reading',
    tagDe: 'Lektüre'
  },
  {
    id: 'm3',
    titleEn: 'Presentation Paper S5: Reflexion (Shinn et al., 2023)',
    titleDe: 'Vortragspaper S5: Reflexion (Shinn et al., 2023)',
    date: 'Late Oct – Nov 19',
    descEn: 'Primary presentation topic. Deep-dive into Verbal Reinforcement Learning, Actor-Evaluator-Reflector triad, and false positives in coding.',
    descDe: 'Haupt-Präsentationsthema. Verbales Reinforcement Learning, Akteur-Evaluator-Reflektor-Triade und Falsch-Positive bei Codetests.',
    status: 'current',
    defaultChecked: false,
    tagEn: 'Priority S5',
    tagDe: 'Priorität S5'
  },
  {
    id: 'm4',
    titleEn: 'Required Reading #2: Agentic Reasoning Survey (Wei et al., 2026)',
    titleDe: 'Pflichtlektüre #2: Agentic Reasoning Survey (Wei et al., 2026)',
    date: 'Before Nov 19',
    descEn: 'Targeted strategic skim of Sections 1–2 (taxonomy) and Sections 4.1–4.2 (memory and self-evolution).',
    descDe: 'Gezieltes strategisches Überfliegen von Kapitel 1–2 (Taxonomie) und 4.1–4.2 (Speicher & Selbstevaluation).',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Survey',
    tagDe: 'Überblick'
  },
  {
    id: 'm5',
    titleEn: 'Mandatory Advisor Meeting (≥2 Weeks Pre-Talk)',
    titleDe: 'Verpflichtendes Betreuer-Treffen (≥2 Wochen vor Vortrag)',
    date: 'By Nov 19, 2026',
    descEn: 'Discuss paper S5 outline, methodology understanding, and presentation structure with advisor (Prof. Gertz / team).',
    descDe: 'Vortragsgliederung zu Paper S5, Methodenverständnis und Aufbau mit Betreuer abstimmen.',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Milestone',
    tagDe: 'Meilenstein'
  },
  {
    id: 'm6',
    titleEn: 'Preliminary Slides Submission (1 Week Pre-Talk)',
    titleDe: 'Vorläufige Folien einreichen (1 Woche vor Vortrag)',
    date: 'Nov 26, 2026',
    descEn: 'Submit preliminary draft of Beamer/LaTeX presentation slides to advisor for feedback.',
    descDe: 'Vorläufigen Entwurf der Beamer/LaTeX-Präsentationsfolien beim Betreuer zur Durchsicht einreichen.',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Slides',
    tagDe: 'Folien'
  },
  {
    id: 'm7',
    titleEn: 'Final Slides Submission (≥3 Days Pre-Talk)',
    titleDe: 'Finale Folieneinreichung (≥3 Tage vor Vortrag)',
    date: 'Nov 30, 2026',
    descEn: 'Deliver finalized slide deck in PDF format to advisor for Moodle distribution to seminar participants.',
    descDe: 'Finale Folien als PDF beim Betreuer einreichen für die Moodle-Bereitstellung an alle Teilnehmer.',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Deadline',
    tagDe: 'Abgabe'
  },
  {
    id: 'm8',
    titleEn: 'Presentation Day: Paper S5 Reflexion (30 min talk + 10 min Q&A)',
    titleDe: 'Vortragstag: Paper S5 Reflexion (30 Min. Vortrag + 10 Min. Diskussion)',
    date: 'Dec 3, 2026 (9:00 c.t.)',
    descEn: 'Deliver 30-minute scientific presentation in INF 205, Seminar Room 1. Follow "Tell em Three Times" structure.',
    descDe: '30-minütigen Fachvortrag in INF 205, SR 1 halten. Struktur: Tell em Three Times & freies Sprechen.',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Talk 50%',
    tagDe: 'Vortrag 50%'
  },
  {
    id: 'm9',
    titleEn: 'Discussant Role: Paper S14 Conversational AI for Disease Management',
    titleDe: 'Diskutanten-Rolle: Paper S14 Conversational AI for Disease Management',
    date: 'Jan 14, 2027',
    descEn: 'Prepare at least 2 critical, deep questions for Paper S14 (AMIE). Pre-read Karunanayake (2025) for context.',
    descDe: 'Mindestens 2 tiefgehende kritische Fragen zu Paper S14 (AMIE) vorbereiten. Begleitend Karunanayake (2025) lesen.',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Discussant 8%',
    tagDe: 'Diskutant 8%'
  },
  {
    id: 'm10',
    titleEn: 'Final Seminar Report Submission (12–14 Pages LaTeX)',
    titleDe: 'Abgabe Seminarbericht (12–14 Seiten LaTeX)',
    date: 'Feb 12, 2027 (20:00)',
    descEn: 'Submit signed PDF report on Paper S5 using the official seminar LaTeX template. Strict pass threshold (grade ≤ 4.0).',
    descDe: 'Unterschriebenen PDF-Bericht zu Paper S5 im offiziellen LaTeX-Template fristgerecht per E-Mail einreichen.',
    status: 'pending',
    defaultChecked: false,
    tagEn: 'Report 42%',
    tagDe: 'Ausarbeitung 42%'
  }
];

export const seminarPapers: SeminarPaper[] = [
  {
    id: 'react',
    title: 'ReAct: Synergizing Reasoning and Acting in Language Models',
    authors: 'Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao',
    venue: 'ICLR 2023 (Princeton University & Google Research)',
    roleBadgeEn: '📘 Required Reading #1 (Foundational)',
    roleBadgeDe: '📘 Pflichtlektüre #1 (Grundlagen)',
    roleType: 'required',
    pdfUrl: 'https://arxiv.org/pdf/2210.03629.pdf',
    landingUrl: 'https://arxiv.org/abs/2210.03629',
    driveFileName: 'REAC T: SYNERGIZING REASONING AND ACTING IN.pdf',
    localPath: '/home/nikku/Documents/Seminar-Gertz/REAC T: SYNERGIZING REASONING AND ACTING IN.pdf',
    overviewEn: 'Introduces the foundational Thought → Action → Observation loop, combining Chain-of-Thought reasoning with external environment actions (Wikipedia search, embodied ALFWorld). Serves as the base agent for Reflexion.',
    overviewDe: 'Führt die grundlegende Thought → Action → Observation-Schleife ein, die Gedankenschritte mit externen Aktionen (Wikipedia-Suche, ALFWorld) koppelt. Dient Reflexion als Basisinfrastruktur.',
    sections: [
      {
        id: 'react-s1',
        titleEn: '§1 Introduction: Bridging Closed-World Thought & Action-Only Policies',
        titleDe: '§1 Einleitung: Brücke zwischen isoliertem Denken & reinen Aktions-Policies',
        compassEn: 'Contrasts CoT (internal hallucinations, no external grounding) with reactive action policies (no abstract planning or working memory), proposing interleaved reasoning traces.',
        compassDe: 'Stellt CoT (interne Halluzinationen, keine Erdung) reaktiven Aktionsmodellen gegenüber und motiviert verschränkte Denkspuren.',
        keyTerms: ['trajectory', 'action-space', 'closed-loop', 'barring'],
        selfCheckEn: 'Why do pure action-generation models fail at multi-hop tasks when observations deviate from expected states?',
        selfCheckDe: 'Warum scheitern reine Aktionsgeneratoren bei mehrstufigen Aufgaben, sobald Beobachtungen vom Idealzustand abweichen?',
        defaultCompleted: true
      },
      {
        id: 'react-s2',
        titleEn: '§2 ReAct: Synergizing Reasoning + Acting Formulation',
        titleDe: '§2 ReAct: Formale Synergie von Denken und Handeln',
        compassEn: 'Defines augmented action space Â = A ∪ L, where language thoughts do not mutate environment state but guide subsequent action selection.',
        compassDe: 'Formalisiert den erweiterten Aktionsraum Â = A ∪ L, bei dem Sprachgedanken die Umwelt nicht verändern, aber Folgeaktionen steuern.',
        keyTerms: ['action-space', 'trajectory', 'language-priors'],
        selfCheckEn: 'How does a Thought token differ operationally from an Action token in the environment transition function?',
        selfCheckDe: 'Wie unterscheidet sich ein Thought-Token operationell von einem Action-Token in der Zustandsübergangsfunktion?',
        defaultCompleted: true
      },
      {
        id: 'react-s3',
        titleEn: '§3 Knowledge-Intensive Reasoning Tasks (HotpotQA & FEVER)',
        titleDe: '§3 Wissensintensive Aufgaben (HotpotQA & FEVER)',
        compassEn: 'Evaluates search[entity], lookup[string], and finish[answer] actions against Wikipedia; tests Act-only and CoT ablations alongside CoT-SC hybrid fallbacks.',
        compassDe: 'Evaluiert Wikipedia-Aktionen (search, lookup, finish); vergleicht ReAct mit reinen Act- und CoT-Ablationen sowie CoT-SC-Fallback-Strategien.',
        keyTerms: ['ablation', 'cot-sc', 'hotpotqa'],
        selfCheckEn: 'Why does ReAct produce fewer false hallucinations than pure CoT, but sometimes require fallback to CoT-SC on dense factual queries?',
        selfCheckDe: 'Warum erzeugt ReAct weniger Halluzinationen als reines CoT, profitiert bei dichten Faktenfragen jedoch von CoT-SC?',
        defaultCompleted: true
      },
      {
        id: 'react-s4',
        titleEn: '§4 Decision Making Tasks (ALFWorld & WebShop) vs. Inner Monologue',
        titleDe: '§4 Entscheidungsaufgaben (ALFWorld & WebShop) vs. Inner Monologue',
        compassEn: 'Demonstrates 71% success on ALFWorld and compares ReAct against Huang et al.s Inner Monologue (ReAct-IM ablation lacking commonsense deduction).',
        compassDe: 'Zeigt 71 % Erfolgsquote in ALFWorld und vergleicht ReAct mit dem Inner Monologue von Huang et al. (ReAct-IM-Ablation ohne Weltwissensschlüsse).',
        keyTerms: ['inner-monologue', 'alfworld', 'affordance'],
        selfCheckEn: 'What is the qualitative difference between Huang et al.s reactive state reiteration and ReActs goal decomposition?',
        selfCheckDe: 'Was unterscheidet die reaktive Zustandsrepetition bei Huang et al. von der Zielzerlegung in ReAct?',
        defaultCompleted: true
      },
      {
        id: 'react-s5',
        titleEn: '§5–6 Related Work, Conclusion & Trajectory Bottlenecks',
        titleDe: '§5–6 Verwandte Arbeiten, Fazit & Trajektorien-Engpässe',
        compassEn: 'Synthesizes finetuning trade-offs and highlights ReActs single-trial limit: if an agent fails a trajectory, it cannot self-correct across attempts.',
        compassDe: 'Fasst Finetuning-Trade-offs zusammen und markiert ReActs Ein-Versuchs-Grenze: Scheitert ein Pfad, kann kein Versuch-übergreifendes Lernen stattfinden.',
        keyTerms: ['trajectory', 'closed-loop'],
        selfCheckEn: 'How does ReActs inability to store cross-trial episodic feedback directly motivate the Reflexion framework?',
        selfCheckDe: 'Wie motiviert ReActs Unfähigkeit zur versuchsübergreifenden Fehlerspeicherung direkt das Reflexion-Framework?',
        defaultCompleted: false
      }
    ]
  },
  {
    id: 'reflexion-s5',
    title: 'Reflexion: Language Agents with Verbal Reinforcement Learning',
    authors: 'Noah Shinn, Federico Cassano, Ashwin Gopinath, Karthik Narasimhan, Shunyu Yao',
    venue: 'NeurIPS 2023 (Northeastern, MIT, Princeton)',
    roleBadgeEn: '🎯 Your Presentation Paper (S5 — Dec 3, 2026)',
    roleBadgeDe: '🎯 Dein Vortragspaper (S5 — 03.12.2026)',
    roleType: 'presentation',
    pdfUrl: 'https://arxiv.org/pdf/2303.11366.pdf',
    landingUrl: 'https://arxiv.org/abs/2303.11366',
    driveFileName: 'Reflexion: Language Agents with.pdf',
    localPath: '/home/nikku/Documents/Seminar-Gertz/Reflexion: Language Agents with.pdf',
    overviewEn: 'Reinforces LLM agents without updating neural weights by storing natural language self-reflections in an episodic memory buffer across consecutive trials. Achieves 91% pass@1 on HumanEval Python.',
    overviewDe: 'Optimiert Sprachagenten ohne neuronale Gewichtsaktualisierung durch Speicherung sprachlicher Selbstreflexionen in einem episodischen Speicher über mehrere Versuche hinweg. Erreicht 91 % pass@1 auf HumanEval Python.',
    sections: [
      {
        id: 'reflexion-s1',
        titleEn: '§1 Introduction: The Cost of Gradient RL vs. Verbal Reinforcement',
        titleDe: '§1 Einleitung: Kosten von Gradienten-RL vs. Verbales Reinforcement',
        compassEn: 'Explains why traditional RL (PPO, policy gradients) is inefficient for billion-parameter LLMs and introduces episodic reflection as lightweight in-context policy updates.',
        compassDe: 'Erklärt die Ineffizienz klassischer Gradientenverfahren für Großmodelle und führt verbale Selbstreflexion als leichtgewichtiges In-Context-Lernen ein.',
        keyTerms: ['verbal-rl', 'policy', 'working-memory'],
        selfCheckEn: 'What are the two major computational bottlenecks of training LLM agents using traditional gradient descent RL?',
        selfCheckDe: 'Welche zwei Haupt-Engpässe treten auf, wenn man LLM-Agenten mit traditionellem Gradienten-RL trainieren möchte?',
        defaultCompleted: false,
        isBookmark: true
      },
      {
        id: 'reflexion-s2',
        titleEn: '§2 Related Work: Self-Refinement, Beam Search & Code RL',
        titleDe: '§2 Verwandte Arbeiten: Self-Refine, Beam Search & Code-RL',
        compassEn: 'Situates Reflexion among iterative prompting methods (Self-Refine, Beam Search) and code debugging frameworks (AlphaCode, CodeRL, Self-Debugging).',
        compassDe: 'Ordnet Reflexion zwischen iterativen Prompting-Verfahren (Self-Refine, Beam Search) und Code-Debugging-Tools (AlphaCode, CodeRL) ein.',
        keyTerms: ['ablation', 'humaneval'],
        selfCheckEn: 'Why are Self-Refine and CodeT unable to perform multi-trial reinforcement across multi-step action environments?',
        selfCheckDe: 'Warum eignen sich Self-Refine und CodeT nicht für versuchsübergreifende Pfadoptimierung in interaktiven Umgebungen?',
        defaultCompleted: false
      },
      {
        id: 'reflexion-s3',
        titleEn: '§3 Architecture: Actor Ma, Evaluator Me & Self-Reflector Msr',
        titleDe: '§3 Architektur: Akteur Ma, Evaluator Me & Selbstreflektor Msr',
        compassEn: 'Formalizes Algorithm 1: Actor generates trajectory τ, Evaluator scores performance, Self-Reflector generates linguistic advice, buffer mem prepends to next trial.',
        compassDe: 'Formalisiert Algorithmus 1: Akteur erzeugt Trajektorie τ, Evaluator bewertet, Reflektor formuliert verbales Feedback, Puffer mem speist Versuch t+1.',
        keyTerms: ['triad', 'verbal-rl', 'scalar-vs-linguistic', 'credit-assignment'],
        selfCheckEn: 'How does θ = {Ma, mem} allow policy improvement without modifying a single float weight in the underlying LLM?',
        selfCheckDe: 'Wie ermöglicht θ = {Ma, mem} eine Verhaltensverbesserung, ohne ein einziges neuronales Gewicht zu verändern?',
        defaultCompleted: false
      },
      {
        id: 'reflexion-s41',
        titleEn: '§4.1 Sequential Decision Making: ALFWorld (97% Success)',
        titleDe: '§4.1 Sequenzielle Entscheidungsfindung: ALFWorld (97 % Erfolg)',
        compassEn: 'Details experiments on ALFWorld, showing ReAct + Reflexion jumps from ~75% to 97% over 12 trials by diagnosing hallucinations and loop behavior.',
        compassDe: 'Präsentiert ALFWorld-Ergebnisse: ReAct + Reflexion steigert Erfolgsquote über 12 Versuche von ~75 % auf 97 % durch Loop- und Halluzinationserkennung.',
        keyTerms: ['alfworld', 'local-minima'],
        selfCheckEn: 'What specific failure patterns does the self-reflection prompt diagnose when an agent gets stuck in an ALFWorld room loop?',
        selfCheckDe: 'Welche Fehlermuster diagnostiziert die Reflexion, wenn der Agent in Endlosschleifen zwischen Räumen festhängt?',
        defaultCompleted: false
      },
      {
        id: 'reflexion-s42',
        titleEn: '§4.2–4.3 Reasoning (HotpotQA) & Coding (HumanEval 91% pass@1)',
        titleDe: '§4.2–4.3 Reasoning (HotpotQA) & Programmierung (HumanEval 91 % pass@1)',
        compassEn: 'HumanEval Python jumps from 80% to 91% pass@1. Analyzes the False Positive vs. False Negative unit test dilemma in self-generated test suites.',
        compassDe: 'HumanEval Python steigt von 80 % auf 91 % pass@1. Analysiert das Dilemma aus falsch-positiven und falsch-negativen Testfällen.',
        keyTerms: ['pass-at-1', 'false-positives', 'humaneval'],
        selfCheckEn: 'Why is a False Positive internal test case fatal for Reflexion, while a False Negative can still be corrected by subsequent reflection?',
        selfCheckDe: 'Warum ist ein Falsch-Positiver Testfall für Reflexion fatal, während ein Falsch-Negativer durch Folgereflexion korrigiert werden kann?',
        defaultCompleted: false
      },
      {
        id: 'reflexion-s5limit',
        titleEn: '§5–8 Limitations, Cost, Interpretability & Future Directions',
        titleDe: '§5–8 Limitationen, Kosten, Interpretierbarkeit & Ausblick',
        compassEn: 'Discusses sliding-window context limits, cumulative token cost per trial, vulnerability to hallucinated reflections, and auditability advantages.',
        compassDe: 'Diskutiert Kontextfenstergrenzen, kumulative Tokenkosten pro Versuch, Anfälligkeit für Fehldiagnosen und Auditierbarkeitsvorteile.',
        keyTerms: ['local-minima', 'verbal-rl'],
        selfCheckEn: 'What trade-off exists between zero-training-cost verbal RL and linear inference token consumption across k trials?',
        selfCheckDe: 'Welcher Trade-off besteht zwischen trainingskostenfreiem verbalem RL und linearem Tokenverbrauch über k Versuche?',
        defaultCompleted: false
      }
    ]
  },
  {
    id: 'survey-wei',
    title: 'A Survey of Agentic Reasoning for Large Language Models',
    authors: 'Tianxin Wei, Zhichen Zeng, Ruizhong Qiu, et al. (UIUC, Google DeepMind, Meta, Amazon)',
    venue: 'arXiv Survey 2026 (arXiv:2601.12538)',
    roleBadgeEn: '📘 Required Reading #2 (Seminar Taxonomy Framework)',
    roleBadgeDe: '📘 Pflichtlektüre #2 (Seminar-Taxonomie-Rahmenwerk)',
    roleType: 'survey',
    pdfUrl: 'https://arxiv.org/pdf/2601.12538.pdf',
    landingUrl: 'https://arxiv.org/abs/2601.12538',
    driveFileName: 'Agentic Reasoning for Large Language Models.pdf',
    localPath: '/home/nikku/Documents/Seminar-Gertz/Agentic Reasoning for Large Language Models.pdf',
    overviewEn: 'Comprehensive 135-page survey establishing the 3-layer seminar taxonomy: Foundational Single-Agent Reasoning (Layer 1), Self-Evolving Adaptation (Layer 2, where Reflexion sits), and Collective Multi-Agent Coordination (Layer 3).',
    overviewDe: 'Umfassender 135-Seiten-Survey, der die dreistufige Seminartaxonomie definiert: Fundamentales Einzelagenten-Denken (Stufe 1), Selbstevaluierende Adaption (Stufe 2, Heimat von Reflexion) und Kollektive Multi-Agenten-Systeme (Stufe 3).',
    sections: [
      {
        id: 'survey-s12',
        titleEn: '§1–2 Foundations & 3-Scope Taxonomy of Agentic Reasoning',
        titleDe: '§1–2 Grundlagen & Drei-Stufen-Taxonomie des Agentic Reasoning',
        compassEn: 'Defines Agentic Reasoning as reasoning positioned as the central mechanism of intelligent agents operating in dynamic, open environments.',
        compassDe: 'Definiert Agentic Reasoning als zentralen Mechanismus intelligenter Agenten zur Bewältigung dynamischer, offener Umgebungen.',
        keyTerms: ['trajectory', 'action-space', 'closed-loop'],
        selfCheckEn: 'How does Agentic Reasoning shift the paradigm from static closed-world benchmarking to dynamic environment interaction?',
        selfCheckDe: 'Wie verschiebt Agentic Reasoning das Paradigma von statischen Benchmarks hin zu dynamischer Umweltinteraktion?',
        defaultCompleted: false
      },
      {
        id: 'survey-s3',
        titleEn: '§3 Foundational Agentic Reasoning: Planning, Tools & Agentic Search',
        titleDe: '§3 Fundamentales Agentic Reasoning: Planung, Werkzeuge & Agentic Search',
        compassEn: 'Covers goal decomposition, tool interfaces, and the shift from static single-pass RAG to iterative agentic search loops (Figure 4).',
        compassDe: 'Behandelt Zielzerlegung, Werkzeugnutzung und den Wandel von statischem RAG zu iterativer agentischer Suche (Abbildung 4).',
        keyTerms: ['closed-loop', 'affordance'],
        selfCheckEn: 'What is the structural difference between classic RAG (retrieve once, generate) and agentic search (reason → search → critique)?',
        selfCheckDe: 'Worin liegt der Unterschied zwischen klassischem RAG und agentischer Suche (reason → search → critique)?',
        defaultCompleted: false
      },
      {
        id: 'survey-s4',
        titleEn: '§4.1–4.2 Self-Evolving Reasoning & Memory Architectures (Crucial for S5)',
        titleDe: '§4.1–4.2 Selbstevaluierendes Denken & Speicherarchitekturen (Zentral für S5)',
        compassEn: 'Classifies task-level feedback mechanisms and memory topologies (flat sliding buffers vs. structured graph representations). Explicitly contextualizes Reflexion.',
        compassDe: 'Klassifiziert Feedbackmechanismen und Speichertopologien (flache Schiebepuffer vs. strukturierte Graphen). Kontextualisiert Reflexion direkt.',
        keyTerms: ['verbal-rl', 'working-memory', 'local-minima'],
        selfCheckEn: 'Where does Reflexions sliding-window buffer rank in the survey taxonomy of agentic memory architectures?',
        selfCheckDe: 'Wo ordnet der Survey Reflexions Sliding-Window-Puffer in der Taxonomie agentischer Gedächtnisstrukturen ein?',
        defaultCompleted: false
      },
      {
        id: 'survey-s6',
        titleEn: '§6 Applications & Healthcare Agent Workflows',
        titleDe: '§6 Anwendungsfelder & Agentenabläufe im Gesundheitswesen',
        compassEn: 'Surveys domains where agentic reasoning enables complex workflow execution, providing conceptual bridges between general agents and clinical applications (S14).',
        compassDe: 'Gibt Überblick über Anwendungsdomänen und schlägt die Brücke von allgemeinen Agentenarchitekturen zu klinischen Systemen (S14).',
        keyTerms: ['diagnostic-vs-management', 'osce'],
        selfCheckEn: 'Why do safety-critical applications like healthcare require formal critique and verification loops before executing actions?',
        selfCheckDe: 'Warum erfordern sicherheitskritische Bereiche wie die Medizin formale Prüfschleifen vor der Aktionsausführung?',
        defaultCompleted: false
      }
    ]
  },
  {
    id: 'healthcare-karunanayake',
    title: 'Next-Generation Agentic AI for Transforming Healthcare',
    authors: 'Nalan Karunanayake',
    venue: 'Informatics and Health (2025), Memorial Sloan Kettering Cancer Center',
    roleBadgeEn: '📘 Required Reading #3 (Clinical Context for Discussant)',
    roleBadgeDe: '📘 Pflichtlektüre #3 (Klinischer Kontext für Diskutant)',
    roleType: 'required',
    pdfUrl: 'https://doi.org/10.1016/j.infoh.2025.01.001',
    landingUrl: 'https://www.sciencedirect.com/science/article/pii/S294976122500001X',
    driveFileName: 'Next-generation agentic AI for transforming healthcare.pdf',
    localPath: '/home/nikku/Documents/Seminar-Gertz/Next-generation agentic AI for transforming healthcare.pdf',
    overviewEn: 'Perspective paper examining the transition from narrow machine learning models to autonomous, multimodal agentic AI systems in clinical workflows, diagnostics, patient monitoring, and medical governance.',
    overviewDe: 'Perspektiven-Paper über den Übergang von isolierten KI-Modellen zu autonomen multimodalen Agentensystemen für klinische Abläufe, Diagnostik, Patientenmonitoring und Governance.',
    sections: [
      {
        id: 'health-s1',
        titleEn: '§1 Traditional AI vs. Agentic Systems in Healthcare',
        titleDe: '§1 Traditionelle KI vs. Agentische Systeme im Gesundheitswesen',
        compassEn: 'Contrasts narrow task-specific algorithms (e.g. static tumor segmentation) with autonomous agents that plan, reason probabilistically, and execute multi-step care pathways.',
        compassDe: 'Stellt isolierte Modelle (z. B. Tumor-Segmentierung) autonomen Agenten gegenüber, die Behandlungspläne eigenständig koordinieren.',
        keyTerms: ['diagnostic-vs-management', 'closed-loop'],
        selfCheckEn: 'What fundamental limitation of traditional medical AI does agentic autonomy aim to solve?',
        selfCheckDe: 'Welche grundlegende Einschränkung klassischer medizinischer KI soll durch agentische Autonomie überwunden werden?',
        defaultCompleted: false
      },
      {
        id: 'health-s2',
        titleEn: '§2 Core Functional Domains of AI Agents in Medicine',
        titleDe: '§2 Funktionale Kernbereiche medizinischer KI-Agenten',
        compassEn: 'Surveys diagnostics, clinical decision support systems (CDSS), longitudinal treatment planning, and robotic-assisted clinical procedures.',
        compassDe: 'Behandelt Diagnostik, klinische Entscheidungshilfesysteme (CDSS), Behandlungsplanung und robotergestützte Prozeduren.',
        keyTerms: ['diagnostic-vs-management', 'watchful-waiting'],
        selfCheckEn: 'How does multimodal data integration impact continuous patient monitoring in agentic healthcare setups?',
        selfCheckDe: 'Wie beeinflusst multimodale Datenintegration die kontinuierliche Patientenüberwachung in agentischen Systemen?',
        defaultCompleted: false
      },
      {
        id: 'health-s3',
        titleEn: '§3 Challenges: Data Privacy, Regulatory Compliance & Workflow Integration',
        titleDe: '§3 Herausforderungen: Datenschutz, Regulierung & Workflow-Integration',
        compassEn: 'Analyzes HIPAA/GDPR constraints, hallucination vulnerabilities in pharmacotherapy, EHR interoperability hurdles, and human-in-the-loop oversight.',
        compassDe: 'Analysiert Datenschutz nach DSGVO/HIPAA, Halluzinationsrisiken bei Medikamenten, KIS-Interoperabilität und menschliche Letztverantwortung.',
        keyTerms: ['drug-formulary', 'osce'],
        selfCheckEn: 'Why is seamless Electronic Health Record (EHR) integration often the biggest bottleneck for clinical agent deployment?',
        selfCheckDe: 'Warum ist die Integration in elektronische Patientenakten oft die größte Hürde für den klinischen Praxiseinsatz?',
        defaultCompleted: false
      },
      {
        id: 'health-s4',
        titleEn: '§4–5 Ethical Responsibilities, AI Governance & Future Outlook',
        titleDe: '§4–5 Ethische Verantwortung, KI-Governance & Zukunftsperspektiven',
        compassEn: 'Outlines governance frameworks, liability allocation between clinician and autonomous agent, and equity in algorithmic care recommendations.',
        compassDe: 'Skizziert Governance-Rahmenwerke, Haftungsfragen zwischen Arzt und Agent sowie Chancengleichheit bei Behandlungsentscheidungen.',
        keyTerms: ['watchful-waiting', 'non-inferiority'],
        selfCheckEn: 'Who bears legal and moral liability when an autonomous clinical agent recommends an erroneous drug dosage?',
        selfCheckDe: 'Wer trägt die rechtliche Verantwortung, wenn ein autonomer klinischer Agent eine fehlerhafte Medikamentendosierung vorschlägt?',
        defaultCompleted: false
      }
    ]
  },
  {
    id: 'amie-s14',
    title: 'Towards Conversational Artificial Intelligence for Disease Management',
    authors: 'Valentin Liévin, Anil Palepu, Wei-Hung Weng, et al. (Google DeepMind & Google Research)',
    venue: 'Nature (July 2026), Vol 655',
    roleBadgeEn: '💬 Your Discussant Paper (S14 — Jan 14, 2027)',
    roleBadgeDe: '💬 Dein Diskutanten-Paper (S14 — 14.01.2027)',
    roleType: 'discussant',
    pdfUrl: 'https://www.nature.com/articles/s41586-026-10764-5.pdf',
    landingUrl: 'https://doi.org/10.1038/s41586-026-10764-5',
    driveFileName: 'Towards conversational artificial intelligence.pdf',
    localPath: '/home/nikku/Documents/Seminar-Gertz/Towards conversational artificial intelligence.pdf',
    overviewEn: 'Advances AMIE from diagnostic intake into multivisit clinical disease management using Gemini long-context In-Context Retrieval (ICR) grounded in UK NICE guidelines and BMJ Best Practice. Evaluated in a randomized blinded virtual OSCE against 21 PCPs.',
    overviewDe: 'Erweitert AMIE von der reinen Anamnese-Diagnostik auf mehrvisitative Behandlungssteuerung mittels Gemini Long-Context In-Context Retrieval (ICR), verankert in NICE-Leitlinien und BMJ Best Practice. Randomisierte verblindete OSCE-Studie gegen 21 Hausärzte.',
    sections: [
      {
        id: 'amie-s1',
        titleEn: '§1 Introduction: Diagnostic Reasoning vs. Longitudinal Management Reasoning',
        titleDe: '§1 Einleitung: Diagnostik vs. Verlaufsbasiertes Behandlungsmanagement',
        compassEn: 'Contrasts single-turn diagnostic evaluation with multivisit management reasoning (ordering investigations, therapy monitoring, side-effects, watchful waiting).',
        compassDe: 'Differenziert einmalige Diagnosestellung von mehrvisitativem Behandlungsmanagement (Diagnostik, Therapiemonitoring, Nebenwirkungen, abwartendes Beobachten).',
        keyTerms: ['diagnostic-vs-management', 'watchful-waiting'],
        selfCheckEn: 'Why is clinical management reasoning more context-dependent and ambiguous than pure diagnostic classification?',
        selfCheckDe: 'Warum ist therapeutisches Behandlungsmanagement kontextabhängiger und uneindeutiger als reine Diagnoseklassifikation?',
        defaultCompleted: false
      },
      {
        id: 'amie-s2',
        titleEn: '§2 AMIE System Architecture: In-Context Retrieval & Structured Reasoning Loop',
        titleDe: '§2 AMIE-Architektur: In-Context Retrieval & Strukturierte Denkschleife',
        compassEn: 'Details multi-agent architecture combining dialogue state tracking, guideline retrieval (NICE, BMJ), draft management plan generation, and a critique/revision module.',
        compassDe: 'Erläutert das Multi-Agenten-Design aus Dialogverfolgung, Leitlinienabruf (NICE, BMJ), Planentwurf und formalem Kritik-Revisions-Modul.',
        keyTerms: ['in-context-retrieval', 'closed-loop', 'drug-formulary'],
        selfCheckEn: 'How does AMIEs explicit critique-and-revision step safeguard against clinical guideline violations before messaging the patient?',
        selfCheckDe: 'Wie schützt AMIEs Kritik- und Revisionsschritt vor Leitlinienverletzungen, bevor die Nachricht an den Patienten gesendet wird?',
        defaultCompleted: false
      },
      {
        id: 'amie-s3',
        titleEn: '§3 Randomized Blinded Virtual OSCE Study (AMIE vs. 21 PCPs)',
        titleDe: '§3 Randomisierte verblindete virtuelle OSCE-Studie (AMIE vs. 21 Hausärzte)',
        compassEn: 'Evaluates 100 multivisit scenarios with patient actors; demonstrates non-inferiority across all 15 clinical axes and superior guideline adherence.',
        compassDe: 'Untersucht 100 Mehrvisiten-Szenarien mit Patientenschauspielern; belegt Nicht-Unterlegenheit in allen 15 Dimensionen sowie höhere Leitlinientreue.',
        keyTerms: ['osce', 'non-inferiority'],
        selfCheckEn: 'What are the main criticisms of using text-based simulated OSCE actor consultations to approximate real-world medical practice?',
        selfCheckDe: 'Welche Einwände bestehen gegen textbasierte OSCE-Schauspieler-Szenarien als Abbild realer hausärztlicher Sprechstunden?',
        defaultCompleted: false
      },
      {
        id: 'amie-s4',
        titleEn: '§4 Medication Reasoning & The RxQA Formulary Benchmark',
        titleDe: '§4 Arzneimittel-Reasoning & der RxQA-Pharmakologie-Benchmark',
        compassEn: 'Derives RxQA from British National Formulary (BNF) and US FDA data; AMIE outperforms physicians particularly on high-difficulty drug interaction queries.',
        compassDe: 'Entwickelt RxQA aus nationalen Verzeichnissen (BNF/FDA); AMIE übertrifft Ärzte insbesondere bei komplexen Wechselwirkungsfragen.',
        keyTerms: ['drug-formulary', 'pass-at-1'],
        selfCheckEn: 'Why do LLMs with In-Context Retrieval excel at rare drug-drug interactions compared to human physician memory recall?',
        selfCheckDe: 'Warum schneiden LLMs mit In-Context Retrieval bei seltenen Arzneimittelinteraktionen oft besser ab als das menschliche Gedächtnis?',
        defaultCompleted: false
      },
      {
        id: 'amie-s5discuss',
        titleEn: '§5 Discussion, Real-World Translation & 4 Prepared Discussant Questions',
        titleDe: '§5 Diskussion, Translation in die Praxis & 4 Vorbereitete Diskutanten-Fragen',
        compassEn: 'Synthesizes clinical translation barriers (guideline anchoring, missing non-verbal cues) and equips Nick with 4 sharp questions for Jan 14, 2027.',
        compassDe: 'Bündelt Translationshürden (Leitlinienfixierung, fehlende nonverbale Signale) und liefert 4 präzise Fragen für den 14.01.2027.',
        keyTerms: ['watchful-waiting', 'non-inferiority'],
        selfCheckEn: 'Could AMIEs rigid adherence to standard clinical guidelines become a hazard when treating multimorbid patients with conflicting protocols?',
        selfCheckDe: 'Könnte AMIEs strikte Leitlinientreue zum Problem werden, wenn multimorbide Patienten widersprüchliche Behandlungspfade erfordern?',
        defaultCompleted: false
      }
    ]
  }
];

export const seminarSlideDecks = [
  {
    id: 'slides-intro',
    title: 'Agentic AI for Problem Solving: Seminar Introduction & Syllabus',
    lecturer: 'Prof. Dr. Michael Gertz, Jonas Gann, Marina Walther',
    date: 'Oct 15, 2026',
    pages: 18,
    drivePath: '/University/Seminar-Gertz/00_Seminar_Organization_Agentic_AI_Gertz.pdf',
    summaryEn: 'Covers seminar milestones, grading breakdown (50% talk, 42% report, 8% questions), strict GenAI policy (Slide 9), topic assignments S1–S19, and Moodle key (42AIGen42).',
    summaryDe: 'Behandelt Seminartermine, Benotung (50 % Vortrag, 42 % Bericht, 8 % Fragen), strenge KI-Richtlinie (Folie 9), Themen S1–S19 und Moodle-Schlüssel (42AIGen42).'
  },
  {
    id: 'slides-presentation-guide',
    title: 'How to Give a Presentation',
    lecturer: 'Prof. Dr. Michael Gertz (adopted from Prof. Dr. Jannik Strötgen)',
    date: 'October 2026',
    pages: 57,
    drivePath: '/University/Seminar-Gertz/00_How_To_Give_A_Presentation_Gertz.pdf',
    summaryEn: 'Comprehensive guide on slide design, John Wooden 8Ps, "Tell em Three Times" structure, formula explanation discipline, and pacing (1–2 min per slide = ~18–24 slides for 30 min).',
    summaryDe: 'Leitfaden zur Vortragsgestaltung: John Wooden 8Ps, "Tell em Three Times"-Prinzip, Disziplin bei Formeln und Zeitmanagement (1–2 Min. pro Folie = ca. 18–24 Inhaltsfolien für 30 Min.).'
  }
];

export const lexiconEntries: LexiconEntry[] = [
  // Category 1: Core Agentic Paradigms
  {
    id: 'trajectory',
    termEn: 'Trajectory (τ)',
    termDe: 'Trajektorie (Handlungs- & Denkpfad τ)',
    category: 'paradigms',
    papers: ['react', 'reflexion-s5', 'survey-wei'],
    defEn: 'The sequential history of observations, internal thoughts, and external actions executed by an agent from problem onset to termination: τ = (o₀, a₀, o₁, a₁, ...).',
    defDe: 'Die chronologische Abfolge aller Umgebungsbeobachtungen, internen Denkzwischenschritte und externen Aktionen eines Agenten von Aufgabenbeginn bis Abschluss: τ = (o₀, a₀, o₁, a₁, ...).',
    paperContextEn: 'In ReAct §2 and Reflexion §3, τ represents the episode history evaluated by Me and reflected upon by Msr.',
    paperContextDe: 'In ReAct §2 und Reflexion §3 repräsentiert τ den Episodenverlauf, der von Me bewertet und von Msr reflektiert wird.'
  },
  {
    id: 'action-space',
    termEn: 'Action Space Augmentation (Â = A ∪ L)',
    termDe: 'Aktionsraumerweiterung (Â = A ∪ L)',
    category: 'paradigms',
    papers: ['react', 'survey-wei'],
    defEn: 'Expanding the discrete set of environmental actions A with an unconstrained natural language reasoning space L, allowing the agent to generate thoughts that guide subsequent actions without directly altering external state.',
    defDe: 'Erweiterung der diskreten Umweltaktionen A um einen freien Sprachraum L für Denkprozesse, die künftige Entscheidungen strukturieren, ohne den externen Umweltzustand direkt zu verändern.',
    paperContextEn: 'ReAct §2 introduces Â = A ∪ L so the agent can interleave reasoning traces with environment API calls.',
    paperContextDe: 'ReAct §2 führt Â = A ∪ L ein, um Denkspuren flexibel mit API-Aufrufen in der Umwelt abzuwechseln.'
  },
  {
    id: 'closed-loop',
    termEn: 'Closed-Loop vs. Open-Loop Control',
    termDe: 'Geschlossener vs. Offener Regelkreis (Feedback-Schleife)',
    category: 'paradigms',
    papers: ['react', 'survey-wei', 'amie-s14'],
    defEn: 'An open-loop agent generates a full plan upfront without observing outcomes. A closed-loop agent iteratively conditions its next action on feedback and real-time environment observations.',
    defDe: 'Ein Open-Loop-Agent generiert vorab einen starren Gesamtplan ohne Rückmeldung. Ein Closed-Loop-Agent passt jeden Folgeschritt dynamisch an die tatsächliche Rückmeldung der Umgebung an.',
    paperContextEn: 'ReAct §1 emphasizes that Chain-of-Thought is open-loop reasoning, whereas ReAct introduces closed-loop interaction with Wikipedia and ALFWorld.',
    paperContextDe: 'ReAct §1 betont, dass CoT ein offener Regelkreis ist, während ReAct geschlossene Interaktion mit Wikipedia und ALFWorld ermöglicht.'
  },
  {
    id: 'inner-monologue',
    termEn: 'Inner Monologue vs. ReAct Reasoning Traces',
    termDe: 'Inner Monologue vs. Spärliche Denkspuren (ReAct)',
    category: 'paradigms',
    papers: ['react'],
    defEn: 'Huang et al.s Inner Monologue merely reiterates passive spatial sensor feedback (e.g., "red block is on blue block"). ReAct generates active, flexible cognitive deductions and subgoal decompositions.',
    defDe: 'Der Inner Monologue von Huang et al. wiederholt primär passive Sensorsignale (z. B. "roter Klotz liegt auf blauem Klotz"). ReAct formuliert aktive kognitive Schlüsse und zielgerichtete Teilzielzerlegungen.',
    paperContextEn: 'ReAct §4 compares ReAct against an ablated ReAct-IM baseline, showing ReAct wins by 71% to 53% on ALFWorld.',
    paperContextDe: 'ReAct §4 vergleicht ReAct mit der ReAct-IM-Ablation und belegt die Überlegenheit (71 % vs. 53 %) in ALFWorld.'
  },
  {
    id: 'language-priors',
    termEn: 'Language Priors',
    termDe: 'Sprachliche A-priori-Wahrscheinlichkeiten (Weltwissen)',
    category: 'paradigms',
    papers: ['react', 'survey-wei'],
    defEn: 'Common-sense world knowledge, relational facts, and problem-solving heuristics encoded in the pre-trained weights of a large language model prior to any task prompt.',
    defDe: 'Das im Vortraining gelernte Welt-, Sprach- und Faktenwissen eines Sprachmodells, das es zur Plausibilitätsbeurteilung und Lösungsfindung heranzieht.',
    paperContextEn: 'In ReAct §4, language priors enable the model to infer where a mug is likely kept (in a cupboard or near a coffee maker) without exhaustive search.',
    paperContextDe: 'In ReAct §4 helfen Sprach-Priors dem Modell zu schlussfolgern, dass Tassen üblicherweise in Schränken oder nahe Kaffeemaschinen zu finden sind.'
  },
  {
    id: 'affordance',
    termEn: 'Affordance Model (SayCan)',
    termDe: 'Affordanz-Modell (Ausführbarkeitsbewertung)',
    category: 'paradigms',
    papers: ['react', 'survey-wei'],
    defEn: 'A grounding mechanism (introduced in SayCan) that evaluates whether a proposed language action is physically executable in the current real-world robotic environment.',
    defDe: 'Ein Mechanismus aus SayCan, der prüft, ob eine vorgeschlagene Sprachaktion in der aktuellen physischen Roboterumgebung tatsächlich physikalisch machbar ist.',
    paperContextEn: 'ReAct §5 credits SayCans affordance scoring while demonstrating that ReAct achieves superior reasoning without expensive affordance models on digital benchmarks.',
    paperContextDe: 'ReAct §5 würdigt SayCans Ansatz, zeigt jedoch, dass ReAct auf digitalen Benchmarks ohne aufwendige Affordanz-Netze auskommt.'
  },
  {
    id: 'working-memory',
    termEn: 'Working Memory vs. Episodic Memory Buffer',
    termDe: 'Arbeitsgedächtnis vs. Episodischer Gedächtnispuffer (mem)',
    category: 'paradigms',
    papers: ['react', 'reflexion-s5', 'survey-wei'],
    defEn: 'Working memory maintains active scratchpad facts within a single trial trajectory. Episodic memory retains reflections and lessons learned across multiple distinct trials.',
    defDe: 'Das Arbeitsgedächtnis hält Zwischenergebnisse innerhalb eines einzelnen Durchlaufs. Der episodische Puffer speichert Lernerfahrungen über mehrere separate Versuche hinweg.',
    paperContextEn: 'ReAct possesses working memory via prompt history; Reflexion adds episodic memory (mem) persisting across consecutive failed attempts.',
    paperContextDe: 'ReAct besitzt ein Arbeitsgedächtnis im Prompthistorie; Reflexion ergänzt einen episodischen Puffer (mem), der über Fehlversuche hinweg bestehen bleibt.'
  },
  {
    id: 'barring',
    termEn: 'Barring (Academic English Idiom)',
    termDe: '„Barring X“ (Wissenschaftliches Englisch: „Mit Ausnahme von X“)',
    category: 'paradigms',
    papers: ['react'],
    defEn: 'Formal academic preposition meaning "with the sole exception of" or "apart from".',
    defDe: 'Formelle akademische Wendung im Englischen mit der Bedeutung „außer / abgesehen von / mit der einzigen Ausnahme von“.',
    paperContextEn: 'ReAct §1 states: "...barring Huang et al. (2022b) who perform a limited form of verbal reasoning...", noting that only Huang et al. attempted feedback reasoning prior to ReAct.',
    paperContextDe: 'ReAct §1 formuliert: „...barring Huang et al. (2022b)...“, um herauszustellen, dass vor ReAct lediglich Huang et al. eine Vorform testeten.'
  },

  // Category 2: Reinforcement Learning & S5 Reflexion
  {
    id: 'verbal-rl',
    termEn: 'Verbal Reinforcement Learning',
    termDe: 'Verbales Verstärkungslernen (Verbal Reinforcement Learning)',
    category: 'rl-reflexion',
    papers: ['reflexion-s5', 'survey-wei'],
    defEn: 'A paradigm that optimizes agent policies by storing natural language critique and diagnostic advice in an episodic memory buffer, rather than computing policy gradients to update weight matrices.',
    defDe: 'Ein Optimierungsansatz, der Agentenverhalten durch sprachliche Fehlerkritik in einem episodischen Textpuffer verbessert, statt Gradienten zur Veränderung von Modellgewichten zu berechnen.',
    paperContextEn: 'Reflexion §1 introduces verbal RL as a sample-efficient, human-interpretable alternative to PPO for LLM agents.',
    paperContextDe: 'Reflexion §1 stellt verbales RL als stichproben-effiziente, interpretierbare Alternative zu PPO für Sprachagenten vor.'
  },
  {
    id: 'policy',
    termEn: 'Policy (π_θ) & In-Context Parameterization (θ = {Ma, mem})',
    termDe: 'Strategie (π_θ) & In-Context-Parametrisierung (θ = {Ma, mem})',
    category: 'rl-reflexion',
    papers: ['reflexion-s5'],
    defEn: 'In classical RL, θ represents frozen or fine-tuned neural network weights. In Reflexion, θ is defined as the tuple of the base model Ma and the accumulating memory buffer mem.',
    defDe: 'Im klassischen RL beschreibt θ die neuronalen Netzwerk-Gewichte. In Reflexion wird θ als Tupel aus festem Sprachmodell Ma und dem wachsenden Textpuffer mem definiert.',
    paperContextEn: 'Reflexion §3 formally updates the policy π_θ at trial t by setting mem ← [sr₀, ..., srₜ] without backpropagation.',
    paperContextDe: 'Reflexion §3 aktualisiert die Policy π_θ im Versuch t formal über mem ← [sr₀, ..., srₜ] ganz ohne Backpropagation.'
  },
  {
    id: 'triad',
    termEn: 'Actor-Evaluator-Reflector Triad (Ma, Me, Msr)',
    termDe: 'Akteur-Evaluator-Reflektor-Triade (Ma, Me, Msr)',
    category: 'rl-reflexion',
    papers: ['reflexion-s5'],
    defEn: 'The three modular pillars of Reflexion: Actor (Ma) takes actions in the environment; Evaluator (Me) computes success signals; Self-Reflector (Msr) writes verbal corrective advice.',
    defDe: 'Die drei modularen Kernkomponenten von Reflexion: Akteur (Ma) interagiert mit der Umwelt; Evaluator (Me) bewertet das Ergebnis; Reflektor (Msr) verfasst sprachliche Ratschläge.',
    paperContextEn: 'Reflexion §3 and Algorithm 1 specify how Ma, Me, and Msr interact across trials until Me passes or max trials are reached.',
    paperContextDe: 'Reflexion §3 und Algorithmus 1 definieren das Zusammenspiel von Ma, Me und Msr bis zum Testerfolg oder Erreichen des Versuchslimits.'
  },
  {
    id: 'scalar-vs-linguistic',
    termEn: 'Scalar vs. Free-Form Linguistic Feedback',
    termDe: 'Skalares vs. Freiform-Sprachfeedback',
    category: 'rl-reflexion',
    papers: ['reflexion-s5'],
    defEn: 'Scalar feedback is a single numeric score (e.g., reward r ∈ {0, 1}). Linguistic feedback provides explanatory, actionable text describing what went wrong and how to fix it.',
    defDe: 'Skalares Feedback ist eine reine Zahl (z. B. Belohnung r ∈ {0, 1}). Sprachliches Feedback liefert eine semantische Begründung des Fehlers samt konkretem Korrekturhinweis.',
    paperContextEn: 'Reflexion §3 shows that Msr translates coarse binary test failures into rich natural language advice that Ma can condition on.',
    paperContextDe: 'Reflexion §3 zeigt, wie Msr grobe binäre Testergebnisse in inhaltsreiche sprachliche Handlungshinweise für Ma übersetzt.'
  },
  {
    id: 'credit-assignment',
    termEn: 'Credit Assignment Problem',
    termDe: 'Kredit-Zuweisungsproblem (Credit Assignment Problem)',
    category: 'rl-reflexion',
    papers: ['reflexion-s5', 'react'],
    defEn: 'The challenge of determining which specific action, thought, or assumption in a lengthy trajectory was responsible for ultimate task success or failure.',
    defDe: 'Die fundamentale Schwierigkeit festzustellen, welcher konkrete Teilschritt in einer langen Aktionssequenz für den späteren Misserfolg verantwortlich war.',
    paperContextEn: 'Reflexion §3 leverages Msr to review the entire trajectory τ and pinpoint the exact reasoning fork where the agent deviated.',
    paperContextDe: 'Reflexion §3 nutzt Msr, um die gesamte Trajektorie τ zu analysieren und die fehlerhafte Weggabelung im Denkpfad präzise zu isolieren.'
  },
  {
    id: 'false-positives',
    termEn: 'False Positive (FP) vs. False Negative (FN) Unit Tests',
    termDe: 'Falsch-Positive vs. Falsch-Negative Selbst-Tests',
    category: 'rl-reflexion',
    papers: ['reflexion-s5'],
    defEn: 'A False Positive test suite passes on incorrect code, causing the agent to halt prematurely with a bug. A False Negative test fails on valid code, allowing reflection to continue.',
    defDe: 'Ein Falsch-Positiver Test besteht trotz fehlerhaften Codes und bricht den Prozess verfrüht ab. Ein Falsch-Negativer fällt bei korrektem Code durch, erlaubt aber weitere Reflexion.',
    paperContextEn: 'Reflexion §4.3 and Table 2 emphasize that False Positives are catastrophic for pass@1 accuracy, whereas False Negatives are recoverable.',
    paperContextDe: 'Reflexion §4.3 und Tabelle 2 heben hervor, dass Falsch-Positive fatal für pass@1 sind, während Falsch-Negative oft behoben werden können.'
  },
  {
    id: 'local-minima',
    termEn: 'Local Minima & Hallucination Loops in Self-Reflection',
    termDe: 'Lokale Minima & Halluzinationsschleifen bei der Reflexion',
    category: 'rl-reflexion',
    papers: ['reflexion-s5', 'survey-wei'],
    defEn: 'When an agent misdiagnoses the root cause of an error in trial t, storing flawed reflection text that biases subsequent trials into repetitive, unhelpful actions.',
    defDe: 'Wenn der Agent im Durchlauf t die Fehlerursache falsch diagnostiziert und diese Fehlannahme im Puffer nachfolgende Versuche in eine Sackgasse leitet.',
    paperContextEn: 'Reflexion §5 highlights hallucinated self-reflection as an open challenge, requiring temperature tuning or heuristic evaluators to detect.',
    paperContextDe: 'Reflexion §5 diskutiert halluzinierte Reflexionen als offenes Problem, das durch Temperatur-Tuning oder Heuristiken abgemildert werden muss.'
  },
  {
    id: 'pass-at-1',
    termEn: 'Pass@1 Accuracy vs. Pass@k',
    termDe: 'Pass@1-Genauigkeit vs. Pass@k',
    category: 'benchmarks-eval',
    papers: ['reflexion-s5'],
    defEn: 'Pass@1 measures the proportion of problems where the first generated solution passes all test cases. Pass@k samples k independent completions and considers the problem solved if any passes.',
    defDe: 'Pass@1 misst den Anteil an Aufgaben, bei denen die allererste eingereichte Lösung alle Tests besteht. Pass@k generiert k Versuche und wertet Erfolg, wenn mindestens einer besteht.',
    paperContextEn: 'Reflexion §4.3 raises GPT-4s pass@1 on HumanEval Python from 80.1% to 91.0% without leaking hidden unit tests.',
    paperContextDe: 'Reflexion §4.3 steigert GPT-4s pass@1 auf HumanEval Python von 80,1 % auf 91,0 %, ohne geheime Testfälle vorab preiszugeben.'
  },

  // Category 3: Evaluation & Benchmarks
  {
    id: 'ablation',
    termEn: 'Ablation Study (to ablate)',
    termDe: 'Ablationsstudie (ablatieren / Komponenten isoliert entfernen)',
    category: 'benchmarks-eval',
    papers: ['react', 'reflexion-s5'],
    defEn: 'A scientific experiment where specific modules or prompt elements are deliberately removed to measure their individual contribution to overall system performance.',
    defDe: 'Ein wissenschaftliches Experiment, bei dem gezielt einzelne Systemkomponenten entfernt werden, um deren isolierten Beitrag zur Gesamtleistung exakt nachzuweisen.',
    paperContextEn: 'ReAct §3 systematically ablates Thoughts to create Act-only, and ablates Actions to create CoT-only (Figure 1).',
    paperContextDe: 'ReAct §3 ablatiert Denkspuren für das Act-only-Modell und entfernt Aktionen für das reine CoT-Modell (Abbildung 1).'
  },
  {
    id: 'cot-sc',
    termEn: 'Chain-of-Thought (CoT) & Self-Consistency (CoT-SC)',
    termDe: 'Gedankenkette (CoT) & Selbstkonsistenz-Mehrheitsentscheid (CoT-SC)',
    category: 'benchmarks-eval',
    papers: ['react'],
    defEn: 'CoT generates intermediate reasoning steps before answering. CoT-SC samples multiple diverse CoT reasoning trajectories (typically 21) and selects the answer via majority vote.',
    defDe: 'CoT erzeugt Zwischenschritte vor der Antwort. CoT-SC generiert mehrere unterschiedliche Denkpfade (oft 21) und wählt das Ergebnis per Mehrheitsentscheid.',
    paperContextEn: 'ReAct §3 demonstrates that hybrid fallbacks (ReAct → CoT-SC) achieve the highest overall accuracy on HotpotQA.',
    paperContextDe: 'ReAct §3 zeigt, dass hybride Fallback-Methoden (ReAct → CoT-SC) die höchste Gesamtgenauigkeit auf HotpotQA erzielen.'
  },
  {
    id: 'alfworld',
    termEn: 'ALFWorld Benchmark',
    termDe: 'ALFWorld (Textbasierter Haushalts-Benchmark)',
    category: 'benchmarks-eval',
    papers: ['react', 'reflexion-s5'],
    defEn: 'An embodied text environment based on the ALFRED dataset, simulating household tasks (e.g., finding, heating, and cleaning objects) across interactive rooms and receptacles.',
    defDe: 'Eine textbasierte Simulationsumgebung für Haushaltsaufgaben (z. B. Gegenstände finden, kühlen, säubern und verräumen) in virtuellen Räumen.',
    paperContextEn: 'Evaluated in ReAct §4 (71% success) and Reflexion §4.1 (97% success across 12 trials).',
    paperContextDe: 'Zentraler Benchmark in ReAct §4 (71 % Erfolg) und Reflexion §4.1 (97 % Erfolg über 12 Versuche hinweg).'
  },
  {
    id: 'hotpotqa',
    termEn: 'HotpotQA & FEVER Benchmarks',
    termDe: 'HotpotQA & FEVER (Mehrstufige Wissensabfrage & Faktenprüfung)',
    category: 'benchmarks-eval',
    papers: ['react', 'reflexion-s5'],
    defEn: 'HotpotQA requires multi-hop information retrieval across disparate Wikipedia articles. FEVER tests fact verification and claim validation against evidence documents.',
    defDe: 'HotpotQA erfordert mehrstufige Informationsverknüpfung über mehrere Wikipedia-Artikel hinweg. FEVER prüft die Wahrheitsverifikation von Behauptungen anhand von Belegtexten.',
    paperContextEn: 'ReAct §3 demonstrates ReActs superiority at navigating multi-hop Wikipedia links without hallucinating intermediate facts.',
    paperContextDe: 'ReAct §3 belegt ReActs Stärke beim Verknüpfen mehrstufiger Wikipedia-Quellen ohne Faktenhalluzinationen.'
  },
  {
    id: 'humaneval',
    termEn: 'HumanEval & MBPP Benchmarks',
    termDe: 'HumanEval & MBPP (Programmier-Benchmarks)',
    category: 'benchmarks-eval',
    papers: ['reflexion-s5'],
    defEn: 'Standard Python code generation benchmarks consisting of programming function prompts evaluated against hidden unit test suites.',
    defDe: 'Standard-Benchmarks zur Code-Synthese, bei denen Funktionsbeschreibungen in Python implementiert und gegen verdeckte Unit-Tests geprüft werden.',
    paperContextEn: 'Reflexion §4.3 evaluates self-reflection using self-generated tests on HumanEval (91% pass@1) and MBPP.',
    paperContextDe: 'Reflexion §4.3 evaluiert Selbstreflexion mit selbstgenerierten Unit-Tests auf HumanEval (91 % pass@1) und MBPP.'
  },

  // Category 4: Clinical & Medical Agentic AI (S14 AMIE)
  {
    id: 'diagnostic-vs-management',
    termEn: 'Diagnostic Reasoning vs. Management Reasoning (Mx)',
    termDe: 'Diagnostisches Schließen vs. Klinisches Behandlungsmanagement (Mx)',
    category: 'medical-ai',
    papers: ['amie-s14', 'healthcare-karunanayake'],
    defEn: 'Diagnostic reasoning identifies the disease etiology from symptoms. Management reasoning determines the longitudinal clinical plan: diagnostic tests, medications, follow-up, and watchful waiting.',
    defDe: 'Diagnostik identifiziert die Krankheitsursache anhand von Symptomen. Behandlungsmanagement steuert den therapeutischen Verlauf: Laboranforderungen, Medikation und Verlaufsbeobachtung.',
    paperContextEn: 'AMIE (S14) §1 highlights that while diagnostic AI is mature, conversational management reasoning across multiple visits was previously unaddressed.',
    paperContextDe: 'AMIE (S14) §1 hebt hervor, dass diagnostische KI weit fortgeschritten ist, mehrvisitative Behandlungsführung jedoch Neuland war.'
  },
  {
    id: 'osce',
    termEn: 'Objective Structured Clinical Examination (OSCE)',
    termDe: 'OSCE (Objektive Strukturierte Klinische Prüfung mit Schauspielpatienten)',
    category: 'medical-ai',
    papers: ['amie-s14', 'healthcare-karunanayake'],
    defEn: 'A gold-standard medical education examination where clinicians consult with standardized actor patients across scripted multi-visit clinical stations, evaluated by expert rubrics.',
    defDe: 'Der Goldstandard praktischer medizinischer Prüfungen, bei dem Ärzte standardisierte Konsultationen mit Schauspielpatienten führen, bewertet nach Fachgutachter-Kriterien.',
    paperContextEn: 'AMIE §3 reports a randomized, double-blind virtual OSCE study over 100 scenarios comparing AMIE against 21 licensed Primary Care Physicians.',
    paperContextDe: 'AMIE §3 berichtet von einer randomisierten, doppelblinden virtuellen OSCE-Studie über 100 Szenarien im direkten Vergleich mit 21 Hausärzten.'
  },
  {
    id: 'non-inferiority',
    termEn: 'Non-Inferiority Clinical Trial',
    termDe: 'Nicht-Unterlegenheitsstudie (Non-Inferiority Trial)',
    category: 'medical-ai',
    papers: ['amie-s14'],
    defEn: 'A clinical study designed to prove that a new intervention (e.g., an AI agent) is not unacceptably worse than the current standard of care (e.g., licensed physicians) by a predefined margin.',
    defDe: 'Ein klinisches Studiendesign zum Nachweis, dass eine neue Methode (z. B. ein KI-Agent) dem aktuellen Standard (z. B. Fachärzten) innerhalb einer definierten Grenze nicht unterlegen ist.',
    paperContextEn: 'AMIE §3 demonstrated statistical non-inferiority to PCPs across all 15 management reasoning axes, scoring superior on guideline grounding.',
    paperContextDe: 'AMIE §3 belegte statistische Nicht-Unterlegenheit gegenüber Hausärzten in allen 15 Bewertungsachsen bei überlegener Leitlinientreue.'
  },
  {
    id: 'in-context-retrieval',
    termEn: 'In-Context Retrieval (ICR) & Clinical Grounding',
    termDe: 'In-Context Retrieval (ICR) & Leitlinien-Verankerung',
    category: 'medical-ai',
    papers: ['amie-s14'],
    defEn: 'Injecting comprehensive, authoritative clinical practice guidelines (NICE, BMJ Best Practice) directly into an ultra-long context window, allowing structured multi-pass reasoning over trusted evidence.',
    defDe: 'Direktes Einbetten vollständiger medizinischer Behandlungsleitlinien (NICE, BMJ) in ein extrem großes Kontextfenster zur faktengetreuen Verankerung.',
    paperContextEn: 'AMIE §2 pairs Geminis long context with structured JSON management plan generation and iterative guideline critique.',
    paperContextDe: 'AMIE §2 nutzt Geminis langes Kontextfenster für strukturierte Behandlungspläne und iterativen Leitlinienabgleich.'
  },
  {
    id: 'drug-formulary',
    termEn: 'Drug Formulary & RxQA Pharmacology Benchmark',
    termDe: 'Arzneimittelverzeichnis & RxQA-Pharmakologie-Benchmark',
    category: 'medical-ai',
    papers: ['amie-s14'],
    defEn: 'An official compendium of approved pharmaceutical drugs, dosages, contraindications, and interactions. RxQA is a benchmark derived from UK BNF and US FDA formularies.',
    defDe: 'Ein amtliches Verzeichnis zugelassener Medikamente, Dosierungen und Kontraindikationen. Der RxQA-Benchmark wurde aus dem britischen BNF und US-FDA-Daten abgeleitet.',
    paperContextEn: 'AMIE §4 evaluated RxQA, finding AMIE outperformed human physicians on high-complexity pharmacology interaction queries.',
    paperContextDe: 'AMIE §4 evaluiert RxQA und zeigt, dass AMIE Ärzte insbesondere bei hochkomplexen Wechselwirkungsfragen übertrifft.'
  },
  {
    id: 'watchful-waiting',
    termEn: 'Watchful Waiting & Guideline Anchoring Bias',
    termDe: 'Abwartendes Beobachten & Leitlinien-Fixierung (Guideline Anchoring)',
    category: 'medical-ai',
    papers: ['amie-s14', 'healthcare-karunanayake'],
    defEn: 'Watchful waiting is a deliberate clinical strategy of deferring treatment while closely monitoring symptoms. Guideline anchoring is the risk of rigidly following protocols despite atypical patient factors.',
    defDe: 'Abwartendes Beobachten meint das gezielte Aufschieben einer Intervention unter engmaschiger Kontrolle. Leitlinien-Fixierung beschreibt starres Beharren auf Standardprotokollen trotz untypischer Begleitumstände.',
    paperContextEn: 'AMIE §5 highlights this tension: while AMIE strictly adheres to guidelines, experienced human physicians often deviate safely for patient convenience.',
    paperContextDe: 'AMIE §5 thematisiert dieses Spannungsfeld: Während AMIE Leitlinien strikt befolgt, weichen erfahrene Ärzte bei atypischen Konstellationen oft pragmatisch ab.'
  }
];
