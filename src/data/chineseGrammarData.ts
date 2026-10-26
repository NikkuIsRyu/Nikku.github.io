export interface GrammarExample {
  hanzi: string;
  pinyin: string;
  translationDe: string;
  translationEn: string;
  breakdown?: { char: string; pinyin: string; tone: 0 | 1 | 2 | 3 | 4 }[];
  note?: string;
}

export interface GrammarRule {
  id: string;
  titleDe: string;
  titleEn: string;
  part: string;
  lesson: string;
  tags: string[];
  category: 'syntax' | 'questions' | 'locatives' | 'verbs-modals' | 'numbers-commerce' | 'comparisons' | 'aspect-particles';
  formula: string;
  summaryDe: string;
  summaryEn: string;
  nuancesDe?: string[];
  nuancesEn?: string[];
  examples: GrammarExample[];
}

export interface ConfusableSide {
  term: string;
  pinyin: string;
  conceptDe: string;
  conceptEn: string;
  formula: string;
  ruleDe: string;
  ruleEn: string;
  correct: {
    hanzi: string;
    pinyin: string;
    translationDe: string;
    translationEn: string;
  };
  incorrect: {
    hanzi: string;
    pinyin: string;
    explanationDe: string;
    explanationEn: string;
  };
}

export interface ConfusablePair {
  id: string;
  pairLabel: string;
  topicDe: string;
  topicEn: string;
  lesson: string;
  left: ConfusableSide;
  right: ConfusableSide;
  mnemonicDe: string;
  mnemonicEn: string;
}

export const CHINESE_GRAMMAR_CATEGORIES = [
  { id: 'all', labelDe: 'Alle Regeln', labelEn: 'All Rules', icon: '📚' },
  { id: 'syntax', labelDe: 'Syntax & Wortstellung', labelEn: 'Syntax & Word Order', icon: '📐' },
  { id: 'questions', labelDe: 'Fragetypen (4 Muster)', labelEn: 'Questions (4 Patterns)', icon: '❓' },
  { id: 'locatives', labelDe: 'Raum, Lokative & 在/有', labelEn: 'Space, Locatives & 在/有', icon: '🧭' },
  { id: 'verbs-modals', labelDe: 'Modal- & Richtungsverben', labelEn: 'Modal & Direction Verbs', icon: '⚡' },
  { id: 'numbers-commerce', labelDe: 'Zahlen, Zählwörter & Rabatte', labelEn: 'Numbers, Classifiers & Discounts', icon: '🏷️' },
  { id: 'comparisons', labelDe: 'Vergleiche (比, 更, 最)', labelEn: 'Comparisons (比, 更, 最)', icon: '⚖️' },
  { id: 'aspect-particles', labelDe: 'Aspekte (了, 过, 正在) & Pivots', labelEn: 'Aspects (了, 过, 正在) & Pivots', icon: '⏳' },
] as const;

export const CONFUSABLE_PAIRS: ConfusablePair[] = [
  {
    id: 'er-vs-liang',
    pairLabel: '二 (èr) vs. 两 (liǎng)',
    topicDe: 'Ziffern & Mathematik vs. Mengenangaben vor Zählwörtern',
    topicEn: 'Math/Digits vs. Quantities with Classifiers',
    lesson: 'Lektion 6',
    left: {
      term: '二',
      pinyin: 'èr',
      conceptDe: 'Mathematische Ziffer, Ordnungszahlen, Telefonnummern',
      conceptEn: 'Mathematical digit, ordinals, phone numbers',
      formula: '二 / 第二 / [Telefon-Ziffer]',
      ruleDe: 'Wird beim reinen Zählen (1, 2, 3...), in Daten, Stockwerken (二楼) und Telefonnummern verwendet.',
      ruleEn: 'Used for counting, serial numbers, dates, floor levels, and phone numbers.',
      correct: {
        hanzi: '我们住在二楼，房间号是二零二。',
        pinyin: 'Wǒmen zhù zài èr lóu, fángjiān hào shì èr líng èr.',
        translationDe: 'Wir wohnen im 2. Stock, Zimmernummer ist 202.',
        translationEn: 'We live on the 2nd floor, room number 202.'
      },
      incorrect: {
        hanzi: '我买两，他买一。',
        pinyin: 'Wǒ mǎi liǎng, tā mǎi yī.',
        explanationDe: '„两“ kann nicht isoliert ohne Zählwort oder Nomen gezählt werden!',
        explanationEn: '“两” cannot be used standalone without a classifier or noun!'
      }
    },
    right: {
      term: '两',
      pinyin: 'liǎng',
      conceptDe: 'Paare, Zählmenge VOR Zählwörtern',
      conceptEn: 'Quantity "two" BEFORE measure words',
      formula: '两 + [Zählwort] + [Nomen]',
      ruleDe: 'MUSS immer verwendet werden, wenn ein Zählwort folgt („zwei Stück“, „zwei Personen“).',
      ruleEn: 'MUST always be used whenever a measure word follows ("two items", "two people").',
      correct: {
        hanzi: '我有两个中国朋友，想买两瓶水。',
        pinyin: 'Wǒ yǒu liǎng gè Zhōngguó péngyou, xiǎng mǎi liǎng píng shuǐ.',
        translationDe: 'Ich habe zwei chinesische Freunde und möchte zwei Flaschen Wasser kaufen.',
        translationEn: 'I have two Chinese friends and want to buy two bottles of water.'
      },
      incorrect: {
        hanzi: '我有二个中国朋友。',
        pinyin: 'Wǒ yǒu èr gè Zhōngguó péngyou.',
        explanationDe: '„二个“ ist grammatisch falsch! Vor Zählwörtern wie „个“ immer „两“!',
        explanationEn: '“二个” is grammatically incorrect! Before measure words like “个”, always use “两”!'
      }
    },
    mnemonicDe: 'Merkhilfe: Ziffer = 二 (èr), Zählmenge mit Zählwort = 两 (liǎng).',
    mnemonicEn: 'Rule of thumb: Digit = 二 (èr), Quantity with classifier = 两 (liǎng).'
  },
  {
    id: 'zai-vs-you',
    pairLabel: '在 (zài) vs. 有 (yǒu)',
    topicDe: 'Standort bekannter Dinge vs. Existenz unbekannter Dinge am Ort',
    topicEn: 'Location of known items vs. Existence of new items',
    lesson: 'Lektion 5',
    left: {
      term: '在',
      pinyin: 'zài',
      conceptDe: 'Definites/Bekanntes Objekt steht am Ort X',
      conceptEn: 'Known object is located at place X',
      formula: '[Bekanntes Subjekt] + 在 + [Ort/Lokativ]',
      ruleDe: 'Man weiß bereits, von welchem Gegenstand die Rede ist, und gibt dessen Position an.',
      ruleEn: 'The object is already known/specific; you specify its location.',
      correct: {
        hanzi: '你的手机在沙发上边。',
        pinyin: 'Nǐ de shǒujī zài shāfā shàngbian.',
        translationDe: 'Dein Handy liegt auf dem Sofa.',
        translationEn: 'Your phone is on top of the sofa.'
      },
      incorrect: {
        hanzi: '在沙发上边是你的手机。',
        pinyin: 'Zài shāfā shàngbian shì nǐ de shǒujī.',
        explanationDe: '„在“ steht nicht an erster Stelle für Existenzsätze mit Definitpronomen!',
        explanationEn: 'Do not start with “在” to assert the location of a known subject.'
      }
    },
    right: {
      term: '有',
      pinyin: 'yǒu',
      conceptDe: 'An Ort X existiert / befindet sich ein unbestimmtes Objekt',
      conceptEn: 'At place X there exists an indefinite object',
      formula: '[Ort/Lokativ] + 有 + [Unbestimmtes Nomen]',
      ruleDe: 'Man nennt zuerst den Ort (ohne 在!) und beschreibt, was dort vorhanden ist.',
      ruleEn: 'Start directly with the location (no 在!) and describe what exists there.',
      correct: {
        hanzi: '沙发上边有一部手机。',
        pinyin: 'Shāfā shàngbian yǒu yí bù shǒujī.',
        translationDe: 'Auf dem Sofa liegt ein (unbestimmtes) Handy.',
        translationEn: 'On the sofa there is a mobile phone.'
      },
      incorrect: {
        hanzi: '在沙发上边有手机。',
        pinyin: 'Zài shāfā shàngbian yǒu shǒujī.',
        explanationDe: 'Kein „在“ am Satzanfang vor Existenzsätzen mit „有“!',
        explanationEn: 'Never prefix the initial location with “在” in existential “有” sentences!'
      }
    },
    mnemonicDe: 'Merkhilfe: Bekannt = Subjekt + 在 + Ort. Unbekannt = Ort + 有 + Objekt.',
    mnemonicEn: 'Rule of thumb: Known = Subject + 在 + Place. New = Place + 有 + Object.'
  },
  {
    id: 'xiang-vs-yao',
    pairLabel: '想 (xiǎng) vs. 要 (yào)',
    topicDe: 'Höflicher Wunsch / Gedanke vs. Entschlossene Absicht / Notwendigkeit',
    topicEn: 'Polite wish/desire vs. Determined plan/necessity',
    lesson: 'Lektion 6',
    left: {
      term: '想',
      pinyin: 'xiǎng',
      conceptDe: 'Möchte gerne, Lust haben, nachdenken',
      conceptEn: 'Would like to, feel like doing, thinking of',
      formula: '[Subjekt] + 想 + [Verb] / Verneinung: 不想',
      ruleDe: 'Höflicher Wunsch oder innere Neigung. Verneint mit 不想 (keine Lust haben).',
      ruleEn: 'Polite wish or inclination. Negated with 不想 (no desire to).',
      correct: {
        hanzi: '周末我想去大理看看风景。',
        pinyin: 'Zhōumò wǒ xiǎng qù Dàlǐ kànkan fēngjǐng.',
        translationDe: 'Am Wochenende möchte ich gerne nach Dali fahren und die Landschaft anschauen.',
        translationEn: 'This weekend I would like to go to Dali to see the scenery.'
      },
      incorrect: {
        hanzi: '我不想要加班。',
        pinyin: 'Wǒ bù xiǎng yào jiābān.',
        explanationDe: '„不想“ reicht vollkommen; „不想要“ wirkt redundant für Tätigkeiten.',
        explanationEn: '“不想” alone is standard; “不想要” is redundant before actions.'
      }
    },
    right: {
      term: '要',
      pinyin: 'yào',
      conceptDe: 'Wollen, feste Absicht, müssen / bestellen',
      conceptEn: 'Want firmly, intend to, must, ordering',
      formula: '[Subjekt] + 要 + [Verb] / Verneinung: 不想 (nicht 不要!)',
      ruleDe: 'Entschlossener Wille oder Notwendigkeit. Achtung: Verneint man die Absicht, sagt man „不想“ (denn „不要“ bedeutet „Tu es nicht! / Verboten“)!',
      ruleEn: 'Determined intention or order. Caution: Negating an intention uses “不想”, as “不要” means "Don\'t do it!"',
      correct: {
        hanzi: '我明天要参加上海工博会。',
        pinyin: 'Wǒ míngtiān yào cānjiā Shànghǎi gōngbóhuì.',
        translationDe: 'Ich werde morgen definitiv an der Shanghai Industriemesse teilnehmen.',
        translationEn: 'I will / am determined to attend the Shanghai Industrial Fair tomorrow.'
      },
      incorrect: {
        hanzi: '明天我不要去。 (wenn gemeint ist: Ich will nicht)',
        pinyin: 'Míngtiān wǒ bú yào qù.',
        explanationDe: '„不要去“ bedeutet als Aufforderung „Geh nicht!“. Will man „Ich habe keine Lust zu gehen“ sagen: „不想去“!',
        explanationEn: '“不要去” is a prohibitive command ("Don\'t go!"). To say "I don\'t want to go", use “不想去”!'
      }
    },
    mnemonicDe: 'Merkhilfe: Höflich/Wunsch = 想 (Verneinung 不想). Feste Absicht = 要 (Verneinung ebenfalls 不想!).',
    mnemonicEn: 'Rule of thumb: Wish = 想 (negated 不想). Intent = 要 (intention negated with 不想, not 不要!).'
  },
  {
    id: 'li-vs-cong-dao',
    pairLabel: '离 (lí) vs. 从 … 到 … (cóng … dào …)',
    topicDe: 'Statischer Abstand zweier Punkte vs. Dynamische Wegstrecke & Route',
    topicEn: 'Static distance between 2 points vs. Dynamic route from A to B',
    lesson: 'Lektion 7',
    left: {
      term: '离',
      pinyin: 'lí',
      conceptDe: 'Statischer Abstand (Entfernt von)',
      conceptEn: 'Static distance (Away from)',
      formula: '[Ort A] + 离 + [Ort B] + 远 / 近 / [km]',
      ruleDe: 'Vergleicht den festen räumlichen Abstand zwischen Punkt A und B („Flughafen ist weit von Innenstadt entfernt“).',
      ruleEn: 'Describes the fixed static distance between A and B ("Airport is far from city center").',
      correct: {
        hanzi: '国际机场离市中心很远，大概四十公里。',
        pinyin: 'Guójì jīchǎng lí shìzhōngxīn hěn yuǎn, dàgài sìshí gōnglǐ.',
        translationDe: 'Der internationale Flughafen ist weit vom Stadtzentrum entfernt, etwa 40 km.',
        translationEn: 'The international airport is far from the city center, about 40 km.'
      },
      incorrect: {
        hanzi: '我离酒店去机场。',
        pinyin: 'Wǒ lí jiǔdiàn qù jīchǎng.',
        explanationDe: '„离“ kann keine Bewegung beschreiben! Für Bewegung immer „从 … 到 …“!',
        explanationEn: '“离” cannot express travel from A to B! Use “从 … 到 …” for journeys!'
      }
    },
    right: {
      term: '从 … 到 …',
      pinyin: 'cóng … dào …',
      conceptDe: 'Dynamische Reiseroute oder Zeitspanne (Von … bis …)',
      conceptEn: 'Dynamic travel route or time span (From … to …)',
      formula: '从 + [Start] + 到 + [Ziel] + [Verb/Dauer]',
      ruleDe: 'Beschreibt den Weg vom Ausgangspunkt zum Endpunkt inklusive Fortbewegungsmethode oder Fahrzeit.',
      ruleEn: 'Traces the trajectory from starting point to destination, including transit mode or duration.',
      correct: {
        hanzi: '从酒店到地铁站走过去要十分钟。',
        pinyin: 'Cóng jiǔdiàn dào dìtiězhàn zǒu guòqù yào shí fēnzhōng.',
        translationDe: 'Vom Hotel bis zur U-Bahn-Station braucht man zu Fuß zehn Minuten.',
        translationEn: 'From the hotel to the subway station takes 10 minutes on foot.'
      },
      incorrect: {
        hanzi: '国际机场从市中心很远。',
        pinyin: 'Guójì jīchǎng cóng shìzhōngxīn hěn yuǎn.',
        explanationDe: 'Vor statischen Adjektiven wie „很远“ (sehr weit) oder „很近“ (sehr nah) steht „离“, nicht „从“!',
        explanationEn: 'Before static adjectives like “很远” or “很近”, you must use “离”, never “从”!'
      }
    },
    mnemonicDe: 'Merkhilfe: A 离 B 很远 (Abstand). 从 A 到 B (Strecke zurücklegen).',
    mnemonicEn: 'Rule of thumb: A 离 B 很远 (spatial gap). 从 A 到 B (moving across path).'
  },
  {
    id: 'ji-vs-duoshao',
    pairLabel: '几 (jǐ) vs. 多少 (duōshǎo)',
    topicDe: 'Fragen nach kleinen Mengen (<10) mit Zählwort vs. Beliebige Mengen & Telefonnummern',
    topicEn: 'Small numbers (<10) with classifier vs. Any quantity & numbers',
    lesson: 'Lektion 6',
    left: {
      term: '几',
      pinyin: 'jǐ',
      conceptDe: 'Kleinere Zahlen (< 10), ZÄHLWORT OBLIGATORISCH',
      conceptEn: 'Small counts (< 10), CLASSIFIER MANDATORY',
      formula: '几 + [Zählwort] + [Nomen]',
      ruleDe: 'Fragt nach Mengen, die typischerweise unter 10 liegen (Familienmitglieder, Tage, Uhrzeiten). Ein Zählwort ist PFLICHT.',
      ruleEn: 'Asks for small quantities typically below 10. A measure word is strictly REQUIRED.',
      correct: {
        hanzi: '你打算在上海住几天？',
        pinyin: 'Nǐ dǎsuàn zài Shànghǎi zhù jǐ tiān?',
        translationDe: 'Wie viele Tage hast du vor, in Shanghai zu bleiben?',
        translationEn: 'How many days do you plan to stay in Shanghai?'
      },
      incorrect: {
        hanzi: '你的电话号码是几？',
        pinyin: 'Nǐ de diànhuà hàomǎ shì jǐ?',
        explanationDe: 'Telefonnummern werden im Chinesischen immer mit „多少“ erfragt, niemals mit „几“!',
        explanationEn: 'Phone numbers are always asked with “多少”, never with “几”!'
      }
    },
    right: {
      term: '多少',
      pinyin: 'duōshǎo',
      conceptDe: 'Beliebige Mengen, Preise, Rufnummern (Zählwort optional)',
      conceptEn: 'Any quantity, prices, phone numbers (Classifier optional)',
      formula: '多少 + [optional Zählwort] + [Nomen]',
      ruleDe: 'Fragt nach unbestimmten oder großen Mengen (> 10), Preisen („多少钱“) und Telefonnummern.',
      ruleEn: 'Asks for quantities > 10, prices (“多少钱”), and phone numbers.',
      correct: {
        hanzi: '请问天津分公司的传真号码是多少？',
        pinyin: 'Qǐngwèn Tiānjīn fēngōngsī de chuánzhēn hàomǎ shì duōshǎo?',
        translationDe: 'Darf ich fragen, wie die Faxnummer der Filiale Tianjin lautet?',
        translationEn: 'May I ask what the fax number of the Tianjin branch is?'
      },
      incorrect: {
        hanzi: '现在多少点？',
        pinyin: 'Xiànzài duōshǎo diǎn?',
        explanationDe: 'Bei Uhrzeiten (< 12) fragt man immer „现在几点？“!',
        explanationEn: 'For clock time (< 12 hours) always ask “现在几点？”, not “多少点”!'
      }
    },
    mnemonicDe: 'Merkhilfe: 几 + Zählwort für < 10 & Uhrzeit. 多少 für Preise, Rufnummern & große Mengen.',
    mnemonicEn: 'Rule of thumb: 几 + classifier for < 10 & time. 多少 for prices, phone numbers & large counts.'
  },
  {
    id: 'da-zhe-discount',
    pairLabel: '打 x 折 (dǎ x zhé) vs. Deutsches Rabattsystem',
    topicDe: 'Chinesischer Zahlbetrag (x Zehntel) vs. Westlicher Prozentsatz-Abzug',
    topicEn: 'Paying x-tenths in China vs. West %-off mindset',
    lesson: 'Lektion 8',
    left: {
      term: '打八折',
      pinyin: 'dǎ bā zhé',
      conceptDe: 'Kunde zahlt 80% des Preises = 20% Rabatt',
      conceptEn: 'Customer pays 80% = 20% discount',
      formula: '原价 × 0.8',
      ruleDe: '„打八折“ bedeutet wörtlich: Man schlägt den Preis auf 8 Zehntel an. Man zahlt 80 %!',
      ruleEn: '“打八折” literally means paying 8/10ths of original price. You pay 80% (20% off)!',
      correct: {
        hanzi: '这件外套原价五百块，现在打八折，只要四百块。',
        pinyin: 'Zhè jiàn wàitào yuánjià wǔbǎi kuài, xiànzài dǎ bā zhé, zhǐ yào sìbǎi kuài.',
        translationDe: 'Diese Jacke kostet regulär 500 Yuan, jetzt mit 20% Rabatt nur 400 Yuan.',
        translationEn: 'This jacket is 500 yuan regular, now at 20% off it is only 400 yuan.'
      },
      incorrect: {
        hanzi: '打八折 = 80% Rabatt (Achtung Denkfehler!)',
        pinyin: 'Dǎ bā zhé = 80% off (False!)',
        explanationDe: 'Häufiger Fehler: Man spart NICHT 80 %, sondern bezahlt 80 %!',
        explanationEn: 'Common trap: You do NOT get 80% off, you PAY 80%!'
      }
    },
    right: {
      term: '打八五折',
      pinyin: 'dǎ bā wǔ zhé',
      conceptDe: 'Kunde zahlt 85% des Preises = 15% Rabatt',
      conceptEn: 'Customer pays 85% = 15% discount',
      formula: '原价 × 0.85',
      ruleDe: 'Folgen zwei Ziffern wie „八五“, zahlt man 85 % des Preises (also 15 % Rabatt).',
      ruleEn: 'If two digits follow like “八五”, you pay 85% of the sticker price (15% off).',
      correct: {
        hanzi: '买两盒电池可以打八五折。',
        pinyin: 'Mǎi liǎng hé diànchí kěyǐ dǎ bā wǔ zhé.',
        translationDe: 'Beim Kauf von zwei Packungen Batterien gibt es 15% Rabatt (Zahlung 85%).',
        translationEn: 'Buying two packs of batteries yields a 15% discount (pay 85%).'
      },
      incorrect: {
        hanzi: '打八五折 = 85% Rabatt',
        pinyin: 'Dǎ bā wǔ zhé = 85% off',
        explanationDe: 'Niemals als Rabatthöhe lesen, sondern immer als Restkaufpreis!',
        explanationEn: 'Never interpret as deduction amount; it represents the remaining price fraction!'
      }
    },
    mnemonicDe: 'Goldene Formel: (10 − x) × 10 = Rabatt in Prozent! 打九折 = 10% Rabatt, 打七折 = 30% Rabatt.',
    mnemonicEn: 'Golden formula: (10 − x) × 10 = Discount %! 打九折 = 10% off, 打七折 = 30% off.'
  }
];

export const CHINESE_GRAMMAR_RULES: GrammarRule[] = [
  // TEIL I
  {
    id: 'szov-syntax',
    titleDe: '1. Grundlegende Satzstellung (Die S-Z-O-V-Regel)',
    titleEn: '1. Basic Sentence Order (The S-T-P-V-O Rule)',
    part: 'Teil I: Grundlegende Syntax',
    lesson: 'Lektionen 2–4',
    tags: ['Syntax', 'SVO', 'Zeit', 'Ort'],
    category: 'syntax',
    formula: 'Subjekt + Zeitpunkt + Ort + [Modalverb / Negation] + Verb + Objekt',
    summaryDe: 'Das Prädikat steht wie im Englischen vor dem Objekt (SVO). Modifizierende Zeit- und Ortsangaben stehen jedoch immer VOR dem Verb.',
    summaryEn: 'Predicate precedes object (SVO). Modifying time and location elements must strictly precede the predicate verb.',
    nuancesDe: [
      'Zeitangaben können zur thematischen Betonung auch ganz vor das Subjekt an den Satzanfang gestellt werden (z. B. 今天我去...).',
      'Ortsangaben mit 在 (zài) stehen direkt vor der eigentlichen Handlung (z. B. 在上海工作).'
    ],
    nuancesEn: [
      'Time words may move to the absolute beginning of the sentence to set the temporal frame (e.g. 今天我去...).',
      'Locative phrases with 在 (zài) directly precede the action verb (e.g. 在上海工作).'
    ],
    examples: [
      {
        hanzi: '陈先生现在在上海工作。',
        pinyin: 'Chén xiānsheng xiànzài zài Shànghǎi gōngzuò.',
        translationDe: 'Herr Chen arbeitet zurzeit in Shanghai.',
        translationEn: 'Mr. Chen currently works in Shanghai.'
      },
      {
        hanzi: '我们下午在会议室讨论新合同。',
        pinyin: 'Wǒmen xiàwǔ zài huìyìshì tǎolùn xīn hétong.',
        translationDe: 'Wir besprechen heute Nachmittag im Konferenzraum den neuen Vertrag.',
        translationEn: 'We will discuss the new contract in the meeting room this afternoon.'
      }
    ]
  },
  {
    id: 'four-question-types',
    titleDe: '2. Die vier Fragetypen im Chinesischen',
    titleEn: '2. The Four Question Types in Mandarin',
    part: 'Teil I: Grundlegende Syntax',
    lesson: 'Lektionen 2–4',
    tags: ['Fragen', 'Partikel', 'Pronomen', 'A-not-A', 'Auswahl'],
    category: 'questions',
    formula: 'Aussagesatz + 吗 | Fragewort am Platz der Antwort | V-不-V | A 还是 B',
    summaryDe: 'Chinesisch kennt 4 Fragemuster: Partikelfragen (吗 / 呢), W-Fragen mit Fragewort an Antwortposition, A-nicht-A Fragen und Auswahlsätze mit 还是.',
    summaryEn: 'Mandarin features 4 question patterns: Particle questions (吗/呢), Question pronoun in-situ, A-not-A constructions, and Alternative questions with 还是.',
    nuancesDe: [
      'Keine Inversion: Bei W-Fragen wird die Satzstellung nicht umgestellt! Fragewörter (什么, 哪儿, 谁) ersetzen genau den Antwortplatz.',
      'A-nicht-A Fragen schließen das Fragepartikel 吗 kategorisch aus (z. B. 你去不去？ nicht *你去不去吗？).'
    ],
    nuancesEn: [
      'No fronting: Question words (wh-in-situ) stay exactly where the answered noun would sit.',
      'A-not-A structures forbid the question particle 吗 (e.g. 你去不去？ never *你去不去吗？).'
    ],
    examples: [
      {
        hanzi: '你是德国人吗？ / 他是不是经理？',
        pinyin: 'Nǐ shì Déguórén ma? / Tā shì bu shì jīnglǐ?',
        translationDe: 'Bist du Deutscher? / Ist er [oder nicht] der Manager?',
        translationEn: 'Are you German? / Is he [or not] the manager?'
      },
      {
        hanzi: '你想喝茶还是咖啡？',
        pinyin: 'Nǐ xiǎng hē chá háishi kāfēi?',
        translationDe: 'Möchtest du Tee oder Kaffee trinken?',
        translationEn: 'Would you like to drink tea or coffee?'
      }
    ]
  },
  // TEIL II
  {
    id: 'shenme-syntax',
    titleDe: '3. Das Fragepronomen 什么 (shénme) – allein & als Attribut',
    titleEn: '3. Question Pronoun 什么 (shénme) – Standalone & Attributive',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Pronomen', 'Fragen', 'Attribut'],
    category: 'questions',
    formula: 'Verb + 什么 („was?“) | 什么 + [Nomen] („was für ein...?“)',
    summaryDe: 'Alleinstehend nach dem Verb fragt 什么 nach Gegenständen („was?“). Direkt vor einem Nomen ohne 的 erfragt es die Kategorie („was für ein...?“).',
    summaryEn: 'Standalone after verbs, 什么 asks "what?". Directly preceding a noun without 的, it specifies category or type ("what kind of...?").',
    examples: [
      {
        hanzi: '你在抽屉里找什么？',
        pinyin: 'Nǐ zài chōuti lǐ zhǎo shénme?',
        translationDe: 'Was suchst du in der Schublade?',
        translationEn: 'What are you looking for in the drawer?'
      },
      {
        hanzi: '书架上那是本什么杂志？',
        pinyin: 'Shūjià shàng nà shì běn shénme zázhì?',
        translationDe: 'Was für eine Zeitschrift ist das im Bücherregal?',
        translationEn: 'What kind of magazine is that on the bookshelf?'
      }
    ]
  },
  {
    id: 'locatives-fangweici',
    titleDe: '4. Die Syntax der chinesischen Lokativwörter (方位词)',
    titleEn: '4. Syntax of Chinese Locative Nouns (方位词)',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Lokative', 'Raum', 'Nomen', 'Syntax'],
    category: 'locatives',
    formula: '在 + [Bezugsnomen] + [Lokativwort] | [Lokativwort] + 的 + [Nomen]',
    summaryDe: 'Chinesische Lokativwörter (上边, 旁边, 里边) sind Substantive, keine Präpositionen. Sie werden dem Bezugsnomen nachgestellt.',
    summaryEn: 'Locative markers (上边, 旁边, 里边) are grammatically nouns, not prepositions. They follow the reference object.',
    nuancesDe: [
      'In festen Verbindungen entfällt oft die Silbe 边: 桌子上 (auf dem Tisch), 房间里 (im Zimmer).',
      'Als Attribut vor Nomen wird 的 ergänzt: 左边的办公室 (das linke Büro).'
    ],
    examples: [
      {
        hanzi: '合同在电脑旁边。',
        pinyin: 'Hétong zài diànnǎo pángbiān.',
        translationDe: 'Der Vertrag liegt neben dem Computer.',
        translationEn: 'The contract is next to the computer.'
      },
      {
        hanzi: '右边的房间是会议室。',
        pinyin: 'Yòubian de fángjiān shì huìyìshì.',
        translationDe: 'Das Zimmer auf der rechten Seite ist der Konferenzraum.',
        translationEn: 'The room on the right side is the meeting room.'
      }
    ]
  },
  {
    id: 'zai-vs-you-rule',
    titleDe: '5. Ortsbezogene Existenzsätze: 在 (zài) vs. 有 (yǒu)',
    titleEn: '5. Locative Existence Sentences: 在 vs. 有',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Lokative', 'Existenz', 'Confusable', 'Partikel'],
    category: 'locatives',
    formula: '[Bekannt] + 在 + [Ort] vs. [Ort] + 有 + [Unbekannt]',
    summaryDe: 'Bei 在 steht das bekannte Bezugsobjekt vorn. Bei 有 nennt man zuerst den Ort (ohne 在 am Anfang) und gibt an, was dort neu/unbestimmt vorhanden ist.',
    summaryEn: 'With 在, the known entity comes first. With 有, start with the location directly to state what exists there.',
    examples: [
      {
        hanzi: '字典在书架下边。 / 书架下边有一本词典。',
        pinyin: 'Zìdiǎn zài shūjià xiàbian. / Shūjià xiàbian yǒu yì běn cídiǎn.',
        translationDe: 'Das Wörterbuch steht unten im Regal. / Unten im Regal steht ein Wörterbuch.',
        translationEn: 'The dictionary is on the bottom shelf. / On the bottom shelf there is a dictionary.'
      }
    ]
  },
  {
    id: 'qu-destination',
    titleDe: '6. Richtungsverb 去 (qù) + Zielort',
    titleEn: '6. Directional Verb 去 (qù) + Destination',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Verben', 'Richtung', 'Zielort'],
    category: 'verbs-modals',
    formula: '去 + [Zielort]',
    summaryDe: 'Das Ziel einer Bewegung folgt unmittelbar auf 去, ohne dass eine Präposition wie „nach“ oder „zu“ nötig ist.',
    summaryEn: 'The destination directly follows 去 without needing any preposition equivalent to "to" or "towards".',
    examples: [
      {
        hanzi: '他下午去二号车间检查设备。',
        pinyin: 'Tā xiàwǔ qù èr hào chējiān jiǎnchá shèbèi.',
        translationDe: 'Er geht heute Nachmittag in Werkstatt 2, um die Geräte zu prüfen.',
        translationEn: 'He is going to Workshop No. 2 this afternoon to inspect equipment.'
      }
    ]
  },
  {
    id: 'shei-de-possession',
    titleDe: '7. Besitzfragen mit 谁的 (shéi de – wessen)',
    titleEn: '7. Possessive Questions with 谁的 (whose)',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Besitz', 'Fragen', 'Pronomen'],
    category: 'questions',
    formula: '这是谁的 + [Nomen]？ | [Nomen] 是谁的？',
    summaryDe: 'Mit 谁的 wird nach dem Eigentümer oder Besitzer gefragt. Es kann als Attribut vor Nomen oder prädikativ am Satzende stehen.',
    summaryEn: '谁的 asks for possession or ownership. Can appear attributively before nouns or predicatively at the clause end.',
    examples: [
      {
        hanzi: '沙发上那件黑色外套是谁的？',
        pinyin: 'Shāfā shàng nà jiàn hēisè wàitào shì shéi de?',
        translationDe: 'Wem gehört diese schwarze Jacke auf dem Sofa?',
        translationEn: 'Whose is that black jacket on the sofa?'
      }
    ]
  },
  {
    id: 'guo-wen-yu',
    titleDe: '8. Länder-, Sprach- und Medienattribute: 国 vs. 文 vs. 语',
    titleEn: '8. Country, Script & Spoken Language Suffixes',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Nomen', 'Sprache', 'Land', 'Suffix'],
    category: 'syntax',
    formula: '[Stamm] + 国 (Land) | [Stamm] + 文 (Schriftsprache) | [Stamm] + 语 (Gesprochene Sprache)',
    summaryDe: '国 bezeichnet das Territorium/Land, 文 die Schriftsprache (Texte, Dokumente) und 语 die gesprochene Sprache (Mündlichkeit).',
    summaryEn: '国 designates state/country, 文 denotes written script/literature, and 语 signifies spoken tongue/oral speech.',
    examples: [
      {
        hanzi: '这份德文合同需要翻译成中文。',
        pinyin: 'Zhè fèn Déwén hétong xūyào fānyì chéng Zhōngwén.',
        translationDe: 'Dieser deutsche Vertrag muss ins Chinesische übersetzt werden.',
        translationEn: 'This German contract needs to be translated into Chinese.'
      }
    ]
  },
  {
    id: 'duo-adjective-degree',
    titleDe: '9. Grad- und Dimensionsfragen mit 多 (duō + Adjektiv)',
    titleEn: '9. Degree and Dimension Questions with 多 + Adjective',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Fragen', 'Dimension', 'Adjektiv', 'Grad'],
    category: 'questions',
    formula: '[Objekt] + 有多 + 大 / 远 / 高 / 重？',
    summaryDe: 'Zur quantitativen Erfragung von Distanzen, Flächen, Höhen oder Altern kombiniert man 多 direkt mit einem Adjektiv.',
    summaryEn: 'Ask for concrete quantities, measurements, or ages by prefixing scalable adjectives with 多.',
    examples: [
      {
        hanzi: '这个生产车间有多大？',
        pinyin: 'Zhè ge shēngchǎn chējiān yǒu duō dà?',
        translationDe: 'Wie groß ist diese Produktionswerkstatt?',
        translationEn: 'How large is this production workshop?'
      }
    ]
  },
  {
    id: 'yixia-shortness',
    titleDe: '10. Kurzzeitigkeit & Höflichkeit mit 一下 (yīxià)',
    titleEn: '10. Softening Actions with 一下 (yīxià)',
    part: 'Teil II: Raumpositionen & Lokative',
    lesson: 'Lektion 5',
    tags: ['Höflichkeit', 'Aspekt', 'Verben'],
    category: 'verbs-modals',
    formula: 'Verb + 一下 (wörtl.: „einmal kurz...“)',
    summaryDe: 'Nach einem Verb signalisiert 一下 eine kurze Dauer und mildert Bitten höflich ab („ich schau mal kurz nach“).',
    summaryEn: 'Following a verb, 一下 denotes an action of brief duration and softens imperative requests politely.',
    examples: [
      {
        hanzi: '我介绍一下，这是我们车间的主任。',
        pinyin: 'Wǒ jièshào yíxià, zhè shì wǒmen chējiān de zhǔrèn.',
        translationDe: 'Ich stelle kurz vor: Das ist der Leiter unserer Werkstatt.',
        translationEn: 'Let me briefly introduce: This is the director of our workshop.'
      }
    ]
  },
  // TEIL III
  {
    id: 'weishenme-order',
    titleDe: '11. Wortstellung bei 为什么 (wèishénme – warum)',
    titleEn: '11. Word Order of 为什么 (Why)',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Fragen', 'Syntax', 'Kausalität'],
    category: 'questions',
    formula: '[Subjekt] + 为什么 + [Prädikat] | 为什么 + [Subjekt] + [Prädikat]',
    summaryDe: 'Fragewörter für Kausalität können sowohl direkt vor dem Verb als auch ganz vor dem Subjekt am Satzanfang stehen.',
    summaryEn: 'Causal question words can either sit directly in front of the verb or at the very start before the subject.',
    examples: [
      {
        hanzi: '你为什么更喜欢在安静的农村生活？',
        pinyin: 'Nǐ wèishénme gèng xǐhuan zài ānjìng de nóngcūn shēnghuó?',
        translationDe: 'Warum lebst du lieber im ruhigen ländlichen Raum?',
        translationEn: 'Why do you prefer living in quiet rural areas?'
      }
    ]
  },
  {
    id: 'yao-vs-xiang-rule',
    titleDe: '12. Die Modalverben 要 (yào) und 想 (xiǎng) & Verneinung',
    titleEn: '12. Modal Verbs 要 vs. 想 & Negation Quirks',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Modalverben', 'Wille', 'Confusable'],
    category: 'verbs-modals',
    formula: '想 (Wunsch, Verneinung: 不想) | 要 (Absicht, Verneinung: 不想!)',
    summaryDe: '想 drückt einen höflichen Wunsch aus. 要 steht für feste Pläne. Achtung: Zur Verneinung einer Absicht nutzt man 不想, da 不要 ein Verbot ist!',
    summaryEn: '想 indicates wishes. 要 signals firm plans. To negate an intention, use 不想; 不要 acts as a prohibitive command ("don\'t!").',
    examples: [
      {
        hanzi: '明天我要去上海参加展会，不想坐慢车。',
        pinyin: 'Míngtiān wǒ yào qù Shànghǎi cānjiā zhǎnhuì, bù xiǎng zuò mànchē.',
        translationDe: 'Morgen fahre ich fest nach Shanghai zur Messe; ich will keinen langsamen Zug nehmen.',
        translationEn: 'Tomorrow I am attending the Shanghai expo; I do not want to take a slow train.'
      }
    ]
  },
  {
    id: 'qu-second-verb-purpose',
    titleDe: '13. Finalsätze mit 去 (qù) + Zweitverb & 打算 (dǎsuàn)',
    titleEn: '13. Purpose Clauses with 去 + Verb & 打算 (Planning)',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Finalsätze', 'Verben', 'Reise'],
    category: 'verbs-modals',
    formula: '[Subjekt] + 打算 + 去 + [Ort] + [Handlungsverb]',
    summaryDe: 'Serielle Verbkonstruktion: Man geht an einen Ort (去 + Ort), um dort unmittelbar eine Handlung auszuführen.',
    summaryEn: 'Serial verb structure: Traveling to a place (去 + location) directly followed by the intended purpose action.',
    examples: [
      {
        hanzi: '我们打算去周边城市看看工业展。',
        pinyin: 'Wǒmen dǎsuàn qù zhōubiān chéngshì kànkan gōngyèzhǎn.',
        translationDe: 'Wir planen, in benachbarte Städte zu fahren, um uns Industriemessen anzuschauen.',
        translationEn: 'We plan to travel to neighboring cities to view industrial exhibitions.'
      }
    ]
  },
  {
    id: 'ji-vs-duoshao-rule',
    titleDe: '14. Mengenerfragung: 几 (jǐ) vs. 多少 (duōshǎo)',
    titleEn: '14. Quantity Inquiry: 几 vs. 多少',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Zahlen', 'Fragen', 'Confusable'],
    category: 'numbers-commerce',
    formula: '几 + [Zählwort] (< 10) vs. 多少 + [optional Zählwort] (> 10 & Rufnummern)',
    summaryDe: '几 verlangt zwingend ein Zählwort und fragt nach Mengen < 10. 多少 fragt nach beliebigen Mengen, Preisen und Telefonnummern.',
    summaryEn: '几 requires a classifier and expects numbers < 10. 多少 is used for larger quantities, prices, and telephone numbers.',
    examples: [
      {
        hanzi: '你打算住几天？ / 这套设备多少钱？',
        pinyin: 'Nǐ dǎsuàn zhù jǐ tiān? / Zhè tào shèbèi duōshǎo qián?',
        translationDe: 'Wie viele Tage willst du bleiben? / Wie viel kostet dieses Ausrüstungsset?',
        translationEn: 'How many days will you stay? / How much does this equipment cost?'
      }
    ]
  },
  {
    id: 'ge-classifier-tian-nian',
    titleDe: '15. Das Universal-Zählwort 个 & Ausnahme für 天 und 年',
    titleEn: '15. General Classifier 个 & Exception for 天 and 年',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Zählwörter', 'Zeit', 'Syntax'],
    category: 'numbers-commerce',
    formula: 'Zahl + 个 + Nomen | ABER: Zahl + 天 / 年 (KEIN 个!)',
    summaryDe: 'Das Universal-Zählwort 个 steht vor den meisten Nomen. Ausnahme: 天 (Tag) und 年 (Jahr) fungieren selbst als Zeiteinheit und dulden kein 个!',
    summaryEn: '个 is the default classifier. Exception: 天 (day) and 年 (year) act as their own measure units and forbid 个!',
    examples: [
      {
        hanzi: '在这个城市住三天、两个月。',
        pinyin: 'Zài zhè ge chéngshì zhù sān tiān, liǎng ge yuè.',
        translationDe: 'Drei Tage (sān tiān) und zwei Monate (liǎng ge yuè) in dieser Stadt leben.',
        translationEn: 'Living in this city for three days (no ge) and two months (with ge).'
      }
    ]
  },
  {
    id: 'time-point-vs-duration',
    titleDe: '16. Goldene Wortstellungsregel: Zeitpunkt vs. Zeitdauer',
    titleEn: '16. Golden Word Order: Time Point vs. Duration',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Syntax', 'Zeit', 'Dauer', 'SVO'],
    category: 'syntax',
    formula: '[Zeitpunkt] + Verb + [Zeitdauer]',
    summaryDe: 'WANN etwas geschieht (Zeitpunkt), steht VOR dem Verb. WIE LANGE etwas dauert (Zeitdauer), steht HINTER dem Verb.',
    summaryEn: 'Time points (WHEN) precede the verb. Duration spans (HOW LONG) succeed the verb.',
    examples: [
      {
        hanzi: '我们明天开会开三个小时。',
        pinyin: 'Wǒmen míngtiān kāihuì kāi sān ge xiǎoshí.',
        translationDe: 'Wir tagen morgen (Zeitpunkt) drei Stunden lang (Zeitdauer).',
        translationEn: 'We will hold a meeting tomorrow (point) for three hours (duration).'
      }
    ]
  },
  {
    id: 'dagai-vs-zuoyou',
    titleDe: '17. Ungefähre Angaben: 大概 (dàgài) vs. 左右 (zuǒyòu)',
    titleEn: '17. Approximation: 大概 (Prefix) vs. 左右 (Suffix)',
    part: 'Teil III: Reisen & Modalverben',
    lesson: 'Lektion 6',
    tags: ['Zahlen', 'Syntax', 'Schätzung'],
    category: 'numbers-commerce',
    formula: '大概 + [Zahl/Angabe] vs. [Zahl/Angabe] + 左右',
    summaryDe: '大概 steht als Adverb VOR der Zahl. 左右 steht als Nachstellung HINTER der Zahl.',
    summaryEn: '大概 precedes the number as an adverb ("approximately"). 左右 follows the number as a postposition ("or so").',
    examples: [
      {
        hanzi: '大概四十公里 / 四十公里左右',
        pinyin: 'dàgài sìshí gōnglǐ / sìshí gōnglǐ zuǒyòu',
        translationDe: 'etwa 40 Kilometer / 40 Kilometer ungefähr',
        translationEn: 'approximately 40 kilometers / 40 km or so'
      }
    ]
  },
  // TEIL IV
  {
    id: 'transit-construction',
    titleDe: '18. Fortbewegungskonstruktion: 坐 / 开 / 骑 + Verkehrsmittel',
    titleEn: '18. Transit Construction: 坐 / 开 / 骑 + Vehicle + 来/去',
    part: 'Teil IV: Stadtverkehr & Routen',
    lesson: 'Lektion 7',
    tags: ['Verkehr', 'Verben', 'Reise'],
    category: 'verbs-modals',
    formula: '坐 (sitzen) / 开 (fahren) / 骑 (reiten) + [Fahrzeug] + 去 / 来 + [Ort]',
    summaryDe: 'Verkehrsmittel werden als vorbereitende Prädikate vor das Zielverb gestellt (wörtl. „U-Bahn nehmend dorthin fahren“).',
    summaryEn: 'Means of transit are formatted as a preceding verbal clause before the destination motion.',
    examples: [
      {
        hanzi: '坐地铁去火车站比打车比较快。',
        pinyin: 'Zuò dìtiě qù huǒchēzhàn bǐ dǎchē bǐjiào kuài.',
        translationDe: 'Mit der U-Bahn zum Bahnhof zu fahren ist vergleichsweise schneller als ein Taxi zu nehmen.',
        translationEn: 'Taking the subway to the train station is faster than hailing a cab.'
      }
    ]
  },
  {
    id: 'hui-huilai-huiqu',
    titleDe: '19. Das Rückkehrverb 回 (huí) & Richtungskomplemente',
    titleEn: '19. Returning with 回 and Directional Complements',
    part: 'Teil IV: Stadtverkehr & Routen',
    lesson: 'Lektion 7',
    tags: ['Verben', 'Richtung', 'Komplemente'],
    category: 'verbs-modals',
    formula: '回 + [Ort] | 回来 (zum Sprecher hin) | 回去 (vom Sprecher weg)',
    summaryDe: '回 verlangt direkt das Zielnomen. Durch 来 oder 去 wird präzisiert, ob die Rückkehr zum aktuellen Sprecherstandort erfolgt.',
    summaryEn: '回 directly takes the destination noun. Adding 来 or 去 specifies orientation towards or away from speaker.',
    examples: [
      {
        hanzi: '经理什么时候回公司来？',
        pinyin: 'Jīnglǐ shénme shíhou huí gōngsī lái?',
        translationDe: 'Wann kommt der Manager (hierher ins Büro) zurück?',
        translationEn: 'When will the manager return (here to the office)?'
      }
    ]
  },
  {
    id: 'keyi-vs-buneng',
    titleDe: '20. Erlaubnis & Möglichkeit: 可以 (kěyǐ) vs. 不能 (bù néng)',
    titleEn: '20. Permission & Inability: 可以 vs. 不能',
    part: 'Teil IV: Stadtverkehr & Routen',
    lesson: 'Lektion 7',
    tags: ['Modalverben', 'Erlaubnis', 'Negation'],
    category: 'verbs-modals',
    formula: '可以 + Verb (erlaubt/möglich) | 不能 + Verb (nicht dürfen/unmöglich)',
    summaryDe: 'Möglichkeit und Erlaubnis werden mit 可以 bejaht, aber mit 不能 verneint („hier kann/darf man nicht parken“).',
    summaryEn: 'Situational possibility/permission is granted via 可以, but negated with 不能 (cannot / not allowed).',
    examples: [
      {
        hanzi: '这里可以停车吗？——路口附近不能停车。',
        pinyin: 'Zhèlǐ kěyǐ tíng chē ma? —— Lùkǒu fùjìn bù néng tíng chē.',
        translationDe: 'Darf man hier parken? — In Kreuzungsnähe darf man nicht parken.',
        translationEn: 'Can one park here? — Parking is not allowed near the intersection.'
      }
    ]
  },
  {
    id: 'wang-direction-movement',
    titleDe: '21. Richtungspräposition 往 (wǎng) + Richtung + Verb',
    titleEn: '21. Directional Preposition 往 (Towards) + Motion',
    part: 'Teil IV: Stadtverkehr & Routen',
    lesson: 'Lektion 7',
    tags: ['Richtung', 'Präposition', 'Orientierung'],
    category: 'locatives',
    formula: '往 + [前 / 后 / 左 / 右 / 东 / 西] + 走 / 开 / 拐',
    summaryDe: '往 gibt die Zielrichtung einer Fortbewegung an („nach rechts abbiegen“, „geradeaus gehen“).',
    summaryEn: '往 specifies the vector of movement ("turn right", "walk straight ahead").',
    examples: [
      {
        hanzi: '过了地下通道请往右拐，再往前走五十米。',
        pinyin: 'Guò le dìxià tōngdào qǐng wǎng yòu guǎi, zài wǎng qián zǒu wǔshí mǐ.',
        translationDe: 'Biegen Sie nach der Unterführung rechts ab und gehen Sie dann 50 m geradeaus.',
        translationEn: 'After the underpass, please turn right, then proceed forward 50 meters.'
      }
    ]
  },
  // TEIL V
  {
    id: 'verb-reduplication',
    titleDe: '22. Verbverdoppelung (V-V) für lockere Kurzhandlungen',
    titleEn: '22. Verb Reduplication (V-V) for Casual Actions',
    part: 'Teil V: Handel & Rabatte',
    lesson: 'Lektion 8',
    tags: ['Verben', 'Höflichkeit', 'Stil'],
    category: 'verbs-modals',
    formula: 'V + V (zweite Silbe im Neutralton) | 看看 / 问问 / 试试',
    summaryDe: 'Die Verdoppelung einsilbiger Verben drückt eine lockere, unverbindliche Handlung von kurzer Dauer aus („mal kurz anprobieren“).',
    summaryEn: 'Reduplicating a monosyllabic verb conveys an informal, brief attempt ("try it on a bit", "take a quick look").',
    examples: [
      {
        hanzi: '这件夹克我可以试试吗？',
        pinyin: 'Zhè jiàn jiákè wǒ kěyǐ shìshi ma?',
        translationDe: 'Kann ich diese Jacke mal kurz anprobieren?',
        translationEn: 'May I quickly try on this jacket?'
      }
    ]
  },
  {
    id: 'numbers-zero-rule',
    titleDe: '23. Große Zahlen & die Null-Regel (零 líng)',
    titleEn: '23. Large Numbers & The Zero Rule (零 líng)',
    part: 'Teil V: Handel & Rabatte',
    lesson: 'Lektion 8',
    tags: ['Zahlen', 'Preise', 'Grammatik'],
    category: 'numbers-commerce',
    formula: '百 (100) | 千 (1.000) | Binnen-Nullen werden mit 零 gesprochen',
    summaryDe: 'Eingeschobene Nullen zwischen Stellenwerten müssen einmal als 零 gesprochen werden (105 = 一百零五). Endnullen entfallen.',
    summaryEn: 'Internal zeros across place-value tiers must be verbalized once as 零 (105 = 一百零五). Trailing zeros are dropped.',
    examples: [
      {
        hanzi: '这台笔记本电脑三千零五十块。',
        pinyin: 'Zhè tái bǐjìběn diànnǎo sānqiān líng wǔshí kuài.',
        translationDe: 'Dieses Notebook kostet 3.050 Yuan (Dreitausend-Null-Fünfzig).',
        translationEn: 'This laptop is 3,050 yuan (three-thousand-zero-fifty).'
      }
    ]
  },
  // TEIL VI
  {
    id: 'pivot-sentence-jianyu',
    titleDe: '24. Der Kupplungssatz (兼语句 / Pivotsatz) mit 请 & 让',
    titleEn: '24. Telescopic / Pivot Sentences with 请 and 让',
    part: 'Teil VI: Termine & Pivotsätze',
    lesson: 'Lektion 9',
    tags: ['Pivot', 'Syntax', 'Aufforderung'],
    category: 'syntax',
    formula: '[Subjekt] + 请 / 让 / 叫 + [Pivot-Person] + [Zweitverb-Aktion]',
    summaryDe: 'Das Objekt des ersten Verbs (请/让) fungiert gleichzeitig als Subjekt des nachfolgenden Verbs („Ich lade dich ein, essen zu gehen“).',
    summaryEn: 'The object of the causer verb (请/让) doubles simultaneously as the subject of the ensuing action clause.',
    examples: [
      {
        hanzi: '星期天我请大家吃四川火锅。',
        pinyin: 'Xīngqītiān wǒ qǐng dàjiā chī Sìchuān huǒguō.',
        translationDe: 'Am Sonntag lade ich euch alle zum Sichuan-Feuertopf-Essen ein.',
        translationEn: 'On Sunday I invite everyone to eat Sichuan hotpot.'
      }
    ]
  },
  {
    id: 'progressive-aspect-zhengzai',
    titleDe: '25. Die Verlaufsform (Progressive Aspect) mit （正）在',
    titleEn: '25. Ongoing Action Aspect with （正）在',
    part: 'Teil VI: Termine & Pivotsätze',
    lesson: 'Lektion 9',
    tags: ['Aspekt', 'Verlaufsform', 'Zeit'],
    category: 'aspect-particles',
    formula: '[Subjekt] + 正在 / 在 + [Verb] + [Objekt] + [呢]',
    summaryDe: 'Drückt aus, dass eine Handlung genau im aktuellen Moment im Gange ist (entspricht dem englischen „-ing“).',
    summaryEn: 'Expresses that an activity is actively in progress right at the reference moment (analogous to "-ing").',
    examples: [
      {
        hanzi: '工程师们正在二号车间测试新机器呢。',
        pinyin: 'Gōngchéngshīmen zhèngzài èr hào chējiān cèshì xīn jīqì ne.',
        translationDe: 'Die Ingenieure testen gerade in Werkstatt 2 die neue Maschine.',
        translationEn: 'The engineers are currently testing the new machine in Workshop 2.'
      }
    ]
  },
  // TEIL VII
  {
    id: 'bi-comparison-rule',
    titleDe: '26. Der Vergleichssatz mit 比 (bǐ – verglichen mit)',
    titleEn: '26. Comparison Sentences with 比 (Compared to)',
    part: 'Teil VII: Restaurant & Vergleiche',
    lesson: 'Lektion 10',
    tags: ['Vergleich', 'Adjektiv', 'Syntax'],
    category: 'comparisons',
    formula: 'A + 比 + B + [Adjektiv] + [Differenzbetrag] | Verneinung: A 没有 B + [Adj]',
    summaryDe: 'A ist [Adjektiv]-er als B. Kein „很“ vor dem Adjektiv im 比-Satz! Verneint wird mit 没有 („A ist nicht so ... wie B“).',
    summaryEn: 'A is more [adjective] than B. Never place “很” before the adjective in 比-clauses! Negation uses 没有 ("A is not as ... as B").',
    nuancesDe: [
      'Genaue Differenzen stehen hinter dem Adjektiv: 这条鱼比那条贵二十块 (Dieser Fisch ist um 20 Yuan teurer als jener).',
      'Zur Steigerung nutzt man 更 oder 还: 这家菜比那家更辣 (Das Essen hier ist noch schärfer als dort).'
    ],
    examples: [
      {
        hanzi: '今天这道水煮牛肉比上次更地道。',
        pinyin: 'Jīntiān zhè dào shuǐzhǔ niúròu bǐ shàng cì gèng dìdao.',
        translationDe: 'Das gekochte Rindfleisch heute ist noch authentischer als beim letzten Mal.',
        translationEn: 'Today\'s poached beef is even more authentic than last time.'
      },
      {
        hanzi: '坐出租车没有坐地铁快。',
        pinyin: 'Zuò chūzūchē méiyǒu zuò dìtiě kuài.',
        translationDe: 'Taxifahren ist nicht so schnell wie U-Bahn-Fahren.',
        translationEn: 'Taking a taxi is not as fast as taking the subway.'
      }
    ]
  }
];
