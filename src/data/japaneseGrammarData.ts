export interface JapaneseGrammarExample {
  kanji: string;
  kana: string;
  en: string;
  de: string;
  note?: string;
}

export interface JapaneseGrammarRule {
  id: string;
  lesson: string;
  lessonNum: number;
  category: 'verbs-aspects' | 'conjugations' | 'modal-particles' | 'advisory-intent' | 'clauses-connectors' | 'particles-contrast';
  titleDe: string;
  titleEn: string;
  formula: string;
  tags: string[];
  summaryDe: string;
  summaryEn: string;
  nuancesDe?: string[];
  nuancesEn?: string[];
  examples: JapaneseGrammarExample[];
}

export interface JapaneseConfusableSide {
  term: string;
  kana: string;
  conceptDe: string;
  conceptEn: string;
  formula: string;
  ruleDe: string;
  ruleEn: string;
  correct: {
    kanji: string;
    kana: string;
    en: string;
    de: string;
  };
  incorrect: {
    kanji: string;
    kana: string;
    explanationDe: string;
    explanationEn: string;
  };
}

export interface JapaneseConfusablePair {
  id: string;
  pairLabel: string;
  topicDe: string;
  topicEn: string;
  lesson: string;
  left: JapaneseConfusableSide;
  right: JapaneseConfusableSide;
  mnemonicDe: string;
  mnemonicEn: string;
}

export const JAPANESE_GRAMMAR_CATEGORIES = [
  { id: 'all', labelDe: 'Alle Regeln (26)', labelEn: 'All Rules (26)', icon: '📚' },
  { id: 'verbs-aspects', labelDe: 'Aspekte & Zustände (て形)', labelEn: 'Aspects & States (て-Form)', icon: '⏳' },
  { id: 'conjugations', labelDe: 'Konjugationen (可能形・意向形)', labelEn: 'Conjugations (Potential & Volitional)', icon: '⚡' },
  { id: 'modal-particles', labelDe: 'Satzenden & Modales (んです・でしょう)', labelEn: 'Sentence Enders & Modals', icon: '💬' },
  { id: 'advisory-intent', labelDe: 'Ratschläge & Absichten (つもり・ほう)', labelEn: 'Advice & Intentions', icon: '🎯' },
  { id: 'clauses-connectors', labelDe: 'Verknüpfungen (ながら・し〜し)', labelEn: 'Clauses & Connectors', icon: '🔗' },
  { id: 'particles-contrast', labelDe: 'Partikeln & Kontrast (しか・は)', labelEn: 'Particles & Contrast', icon: '⚖️' },
] as const;

export const JAPANESE_CONFUSABLE_PAIRS: JapaneseConfusablePair[] = [
  {
    id: 'teiru-vs-tearu',
    pairLabel: '〜ています (自動詞) vs. 〜てあります (他動詞)',
    topicDe: 'Reiner Zustand ohne Akteur vs. Bewusst herbeigeführter Zustand mit Zweck',
    topicEn: 'Natural Resulting State vs. Intentional State Preserved for a Purpose',
    lesson: 'L29 vs. L30',
    left: {
      term: '〜ています',
      kana: '〜ています',
      conceptDe: 'Intransitiver Zustand (自動詞) — Keine handelnde Person im Fokus',
      conceptEn: 'Intransitive State (自動詞) — Focus on state of object alone',
      formula: 'Nが + [自動詞 て形] + います',
      ruleDe: 'Beschreibt das bloße Vorliegen eines Resultats nach einer Zustandsänderung (z. B. Tür ist offen, Lampe brennt). Wer das getan hat, spielt keine Rolle.',
      ruleEn: 'Describes an observed state resulting from an action, focusing solely on the object without implying human intent.',
      correct: {
        kanji: '窓[まど]が 開[あ]いて います。',
        kana: 'まどが あいて います。',
        en: 'The window is open (neutral observation).',
        de: 'Das Fenster ist offen (reine Zustandsbeobachtung).'
      },
      incorrect: {
        kanji: '窓[まど]が 開[あ]けて います。',
        kana: 'まどが あけて います。',
        explanationDe: '開けます ist transitiv (他動詞) und kann nicht mit います einen Zustand bilden!',
        explanationEn: '開けます is transitive and cannot take 〜ています to express an intransitive state!'
      }
    },
    right: {
      term: '〜てあります',
      kana: '〜てあります',
      conceptDe: 'Transitiver Zustand (他動詞) — Absichtliche Handlung mit fortbestehendem Zweck',
      conceptEn: 'Transitive State (他動詞) — Intentional action preserved for a reason',
      formula: 'Nが + [他動詞 て形] + あります',
      ruleDe: 'Jemand hat die Handlung absichtlich zu einem bestimmten Zweck ausgeführt, und das Ergebnis bleibt bestehen (z. B. Fenster wurde zum Lüften geöffnet gelassen).',
      ruleEn: 'An intentional human action was performed for a purpose, and its result is intentionally maintained.',
      correct: {
        kanji: '部屋[へや]を 涼[すず]しく する ために、窓[まど]が 開[あ]けて あります。',
        kana: 'へやを すずしく する ために、まどが あけて あります。',
        en: 'The window has been opened and left open (to keep the room cool).',
        de: 'Das Fenster ist geöffnet worden (und bleibt offen, um das Zimmer zu kühlen).'
      },
      incorrect: {
        kanji: '窓[まど]が 開[あ]いて あります。',
        kana: 'まどが あいて あります。',
        explanationDe: '開きます ist intransitiv (自動詞). Mit 〜てあります dürfen nur transitive Verben stehen!',
        explanationEn: '開きます is intransitive. Only transitive verbs can take 〜てあります!'
      }
    },
    mnemonicDe: 'Merkhilfe: 〜ています = "Es ist so." (Passiv beobachtet) ↔ 〜てあります = "Es wurde so gemacht." (Mit Absicht für später).',
    mnemonicEn: 'Mnemonic: 〜ています = "It is [in state]." ↔ 〜てあります = "Someone put it like this on purpose."'
  },
  {
    id: 'mieru-vs-mirareru',
    pairLabel: '見えます (Spontan) vs. 見られます (Möglichkeit)',
    topicDe: 'Spontane Sinneswahrnehmung im Blickfeld vs. Machbarkeit / Gelegenheit',
    topicEn: 'Spontaneous Sensory Perception vs. Situational Opportunity / Ability',
    lesson: 'Lektion 27',
    left: {
      term: '見えます',
      kana: 'みえます',
      conceptDe: 'Natürliche Wahrnehmung ohne eigenen Willen ("ist sichtbar")',
      conceptEn: 'Spontaneous perception entering eye field naturally',
      formula: 'Nが + 見えます',
      ruleDe: 'Ein Objekt gelangt ohne bewusstes Zutun in das Sichtfeld der Augen (z. B. Ausblick aus dem Fenster).',
      ruleEn: 'The object enters the visual field naturally without deliberate conscious effort.',
      correct: {
        kanji: '窓[まど]から 富士山[ふじさん]が 見[み]えます。',
        kana: 'まどから ふじさんが みえます。',
        en: 'Mt. Fuji is visible from the window.',
        de: 'Vom Fenster aus ist der Fuji zu sehen / sichtbar.'
      },
      incorrect: {
        kanji: 'この 映画館[えいがかん]で 昔[むかし]の 映画[えいが]が 見[み]えます。',
        kana: 'この えいがかんで むかしの えいがが みえます。',
        explanationDe: 'Im Kino einen alten Film zu schauen erfordert eine Gelegenheit/Möglichkeit, keine optische Sinneswahrnehmung!',
        explanationEn: 'Watching old movies in a cinema represents an opportunity/capability, not passive optical sensory reach!'
      }
    },
    right: {
      term: '見られます',
      kana: 'みられます',
      conceptDe: 'Möglichkeitsform von 見ます ("man kann sehen / anschauen")',
      conceptEn: 'Potential form of 見ます (opportunity / access to view)',
      formula: 'Nが + 見られます',
      ruleDe: 'Durch technische Einrichtungen, Geld oder Umstände besteht die Möglichkeit oder Erlaubnis, etwas anzuschauen.',
      ruleEn: 'Viewing is possible due to technological access, conditions, or permission.',
      correct: {
        kanji: 'Netflixで 日本[にほん]の アニメが 見[み]られます。',
        kana: 'ネットフリックスで にほんの アニメが みられます。',
        en: 'You can watch Japanese anime on Netflix.',
        de: 'Auf Netflix kann man japanische Animes schauen.'
      },
      incorrect: {
        kanji: '眼鏡[めがね]を かけると、よく 見[み]られます。',
        kana: 'めがねを かけると、よく みられます。',
        explanationDe: 'Mit Brille schärfer sehen zu können ist physiologische Sehfähigkeit (`よく見えます`)!',
        explanationEn: 'Being able to see clearly with glasses is physiological optical sight (`よく見えます`)!'
      }
    },
    mnemonicDe: 'Merkhilfe: 見えます = Augen auf und es ist da. 見られます = Ticket/Abo gelöst, um es schauen zu können.',
    mnemonicEn: 'Mnemonic: 見えます = Eyes open, it appears. 見られます = You have the ticket/app/ability to watch.'
  },
  {
    id: 'kikoeru-vs-kikeru',
    pairLabel: '聞こえます (Hörfeld) vs. 聞けます (Gelegenheit)',
    topicDe: 'Akustischer Höreindruck dringt ins Ohr vs. Möglichkeit / Erlaubnis zum Hören',
    topicEn: 'Natural Acoustic Sound Reaching Ears vs. Opportunity to Listen',
    lesson: 'Lektion 27',
    left: {
      term: '聞こえます',
      kana: 'きこえます',
      conceptDe: 'Schallwellen dringen von selbst ins Ohr ("ist hörbar")',
      conceptEn: 'Sound reaches ears automatically without conscious listening',
      formula: 'Nが + 聞こえます',
      ruleDe: 'Geräusche oder Stimmen werden wahrgenommen, ohne dass man bewusst zuhören wollte (Lärm, Vogelgezwitscher).',
      ruleEn: 'Sound waves naturally register in the ear canal without active listening.',
      correct: {
        kanji: '隣[となり]の 部屋[へや]から ピアノの 音[おと]が 聞[き]こえます。',
        kana: 'となりの へやから ピアノの おとが きこえます。',
        en: 'The sound of a piano can be heard from the next room.',
        de: 'Aus dem Nebenzimmer ist Klavierspiel zu hören.'
      },
      incorrect: {
        kanji: 'スマートフォンで ラジオが 聞[き]こえます。',
        kana: 'スマートフォンで ラジオが きこえます。',
        explanationDe: 'Radio übers Smartphone zu hören ist eine technische Möglichkeit/Funktion (`聞けます`)!',
        explanationEn: 'Listening to radio via smartphone is a technological capability (`聞けます`)!'
      }
    },
    right: {
      term: '聞けます',
      kana: 'きけます',
      conceptDe: 'Möglichkeitsform von 聞きます ("kann hören / darf zuhören")',
      conceptEn: 'Potential form of 聞きます (opportunity / access to listen)',
      formula: 'Nが + 聞けます',
      ruleDe: 'Man hat die Ausrüstung, Zeit oder Erlaubnis, einer Audioquelle aktiv zuzuhören (Podcast, Musik-Streaming).',
      ruleEn: 'One possesses the device, permission, or circumstance to tune into an audio source.',
      correct: {
        kanji: 'インターネットで 世界[せかい]の ニュースが 聞[き]けます。',
        kana: 'インターネットで せかいの ニュースが きけます。',
        en: 'You can listen to world news on the internet.',
        de: 'Im Internet kann man weltweite Nachrichten hören.'
      },
      incorrect: {
        kanji: '外[そと]で 鳥[とり]の 声[こえ]が 聞[き]けます。',
        kana: 'そとで とりの こえが きけます。',
        explanationDe: 'Vogelgezwitscher von draußen dringt spontan ans Ohr (`聞こえます`)!',
        explanationEn: 'Bird singing outside spontaneously reaches the ears (`聞こえます`)!'
      }
    },
    mnemonicDe: 'Merkhilfe: 聞こえます = Wand ist dünn, Geräusch dringt durch. 聞けます = Kopfhörer aufgesetzt, um Musik zu genießen.',
    mnemonicEn: 'Mnemonic: 聞こえます = Thin wall, sound leaks through. 聞けます = Headphones on, tuning into music.'
  },
  {
    id: 'tsumori-vs-yotei',
    pairLabel: '〜つもりです (Subjektiv) vs. 〜予定です (Offiziell)',
    topicDe: 'Subjektiver persönlicher Entschluss vs. Fester Termin / Fahrplan / Dritte',
    topicEn: 'Subjective Personal Intent vs. Pre-arranged External Schedule',
    lesson: 'Lektion 31',
    left: {
      term: '〜つもりです',
      kana: '〜つもりです',
      conceptDe: 'Subjektiver Wille / Absicht des Sprechers (kann sich ändern)',
      conceptEn: 'Personal subjective conviction or resolve',
      formula: 'V辞書形 / Vない形 + つもりです',
      ruleDe: 'Drückt eine persönliche Entschlossenheit aus. Wirkt bei Fremden unhöflich (nicht den Chef nach seinen "tsumori" fragen!).',
      ruleEn: 'Expresses what the speaker personally intends to do; inappropriate for asking superiors about their schedules.',
      correct: {
        kanji: '大学[だいがく]を 卒業[そつぎょう]したら、日本[にほん]で 働[はたら]く つもりです。',
        kana: 'だいがくを そつぎょうしたら、にほんで はたらく つもりです。',
        en: 'After graduating, I intend to work in Japan (my personal goal).',
        de: 'Nach dem Uni-Abschluss habe ich vor, in Japan zu arbeiten (mein eigener Plan).'
      },
      incorrect: {
        kanji: '明日[あした]の 会議[かいぎ]は 十時[じゅうじ]から 始[はじ]まる つもりです。',
        kana: 'あしたの かいぎは じゅうじから はじまる つもりです。',
        explanationDe: 'Ein Konferenzbeginn ist ein externer Plan ohne eigenes Bewusstsein; er kann keine "Absicht" haben!',
        explanationEn: 'A meeting start time is an external event with no agency; it cannot hold an "intention"!'
      }
    },
    right: {
      term: '〜予定です',
      kana: '〜よていです',
      conceptDe: 'Objektiver Zeitplan / Offizielle Vereinbarung (unabhängig vom Ego)',
      conceptEn: 'Official schedule, itinerary, or organizational event',
      formula: 'V辞書形 / Nの + 予定[よてい]です',
      ruleDe: 'Gibt feste Termine, Abfahrtszeiten, Geschäftsreisen und offizielle Abläufe wieder, die feststehen.',
      ruleEn: 'Used for scheduled timetables, business trips, flight departures, and official agendas.',
      correct: {
        kanji: '新[あたら]しい 工場[こうじょう]は 来年[らいねん]の 三月[さんがつ]に 完成[かんせい]する 予定[よてい]です。',
        kana: 'あたらしい こうじょうは らいねんの さんがつに かんせいする よていです。',
        en: 'The new factory is scheduled to be completed next March.',
        de: 'Die neue Fabrik soll planmäßig nächsten März fertiggestellt werden.'
      },
      incorrect: {
        kanji: '今日[きょう]から たばこを やめる 予定[よてい]です。',
        kana: 'きょうから たばこを やめる よていです。',
        explanationDe: 'Mit dem Rauchen aufzuhören ist ein eigener Willensentschluss (`やめるつもりです`), kein Fahrplan!',
        explanationEn: 'Quitting smoking is personal willpower (`つもりです`), not an external train schedule!'
      }
    },
    mnemonicDe: 'Merkhilfe: つもり = "Ich habe mich dazu entschieden." ↔ 予定 = "Es steht so im Kalender."',
    mnemonicEn: 'Mnemonic: つもり = "In my heart/mind." ↔ 予定 = "On the official printed calendar."'
  },
  {
    id: 'shika-vs-dake',
    pairLabel: '〜しか + 否定 (Mangel) vs. 〜だけ + 肯定 (Neutral)',
    topicDe: 'Nur (mit Bedauern / Mangelgefühl) vs. Nur (reine Mengenaussage)',
    topicEn: 'Only / Nothing but (Regretful/Insufficient) vs. Just / Only (Neutral)',
    lesson: 'Lektion 27',
    left: {
      term: '〜しか + 否定',
      kana: '〜しか ＋ ひてい',
      conceptDe: 'Exklusivität mit negativer Konnotation ("leider nur")',
      conceptEn: 'Exclusivity paired strictly with negative verb ("nothing but")',
      formula: 'Nしか + [Verneintes Prädikat]',
      ruleDe: 'Hebt hervor, dass die vorhandene Menge als unzureichend, zu wenig oder bedauerlich empfunden wird. Das Verb MUSS verneint sein!',
      ruleEn: 'Expresses that the quantity is perceived as inadequate or disappointing. The accompanying verb must strictly be negative.',
      correct: {
        kanji: '財布[さいふ]の 中[なか]に 千円[せんえん]しか ありません。',
        kana: 'さいふの なかに せんえんしか ありません。',
        en: 'I only have 1,000 yen in my wallet (regrettably not enough).',
        de: 'Ich habe nur noch 1.000 Yen im Portemonnaie (leider so wenig).'
      },
      incorrect: {
        kanji: '財布[さいふ]の 中[なか]に 千円[せんえん]しか あります。',
        kana: 'さいふの なかに せんえんしか あります。',
        explanationDe: '〜しか verlangt zwingend ein verneintes Verb (`ありません`)!',
        explanationEn: '〜しか strictly requires a negative verb predicate (`ありません`)!'
      }
    },
    right: {
      term: '〜だけ + 肯定',
      kana: '〜だけ ＋ こうてい',
      conceptDe: 'Neutrale Begrenzung ohne Wertung ("lediglich / genau")',
      conceptEn: 'Neutral limitation without implicit emotional scarcity',
      formula: 'Nだけ + [Bejahtes Prädikat]',
      ruleDe: 'Nennt eine objektive Obergrenze oder Menge, ohne emotionales Bedauern über Mangel auszudrücken.',
      ruleEn: 'States a simple factual boundary without implying that the amount is insufficient.',
      correct: {
        kanji: '今日[きょう]は 一時間[いちじかん]だけ 勉強[べんきょう]しました。',
        kana: 'きょうは いちじかんだけ べんきょうしました。',
        en: 'I studied for just one hour today (factual statement).',
        de: 'Heute habe ich genau eine Stunde gelernt (neutrale Feststellung).'
      },
      incorrect: {
        kanji: 'ひらがなしか 書[か]けます。',
        kana: 'ひらがなしか かけます。',
        explanationDe: 'Mit bejahtem Verb muss だけ stehen (`ひらがなだけ書けます`) oder mit しか verneint werden (`書けません`)!',
        explanationEn: 'Positive predicates require だけ (`ひらがなだけ書けます`), whereas しか demands negation (`書けません`)!'
      }
    },
    mnemonicDe: 'Merkhilfe: しか zieht das Minus an (nur noch X übrig, leider!). だけ bleibt neutral.',
    mnemonicEn: 'Mnemonic: しか attracts a negative verb (only X left, unfortunately!). だけ stays factual.'
  }
];

export const JAPANESE_GRAMMAR_RULES: JapaneseGrammarRule[] = [
  // LESSON 26
  {
    id: 'l26-ndesu',
    lesson: 'Lesson 26',
    lessonNum: 26,
    category: 'modal-particles',
    titleDe: '〜んです / 〜のです (Erklärendes Prädikat)',
    titleEn: '〜んです / 〜のです (Explanatory Predicate)',
    formula: 'Plain Form + んです (な-Adj & N: 〜な + んです)',
    tags: ['ndesu', 'explanation', 'background', 'reason', 'l26'],
    summaryDe: 'Liefert Hintergrundinformationen, drückt Neugier/Verwunderung aus oder begründet eine beobachtbare Tatsache ("Es ist nämlich so, dass...").',
    summaryEn: 'Provides explanatory background context, indicates curiosity, or explains the reason behind an observed reality.',
    nuancesDe: [
      'Achtung bei Nomen und な-Adjektiven im Präsens: Das copuläre だ wird zu な (`好きなんです`, `雨なんです`)!',
      'In Fragen (`〜んですか`): Signalisiert Neugier oder bittet um Erklärung einer sichtbaren Situation (z. B. "Du hast gepackt, fährst du verreisen?").',
      'In Antworten: Begründet Ausreden oder Weigerungen höflich ("Ich habe Kopfschmerzen").'
    ],
    nuancesEn: [
      'Crucial exception: Present affirmative Nouns and な-adjectives change だ to な (`好きなんです`, `雨なんです`)!',
      'In questions (`〜んですか`): Inquires about the rationale behind a visually observed situation.',
      'In answers: Softens explanations, excuses, or refusals.'
    ],
    examples: [
      {
        kanji: 'どうして 遅[おく]れたんですか。— バスが 来[こ]なかったんです。',
        kana: 'どうして おくれたんですか。— バスが こなかったんです。',
        en: 'Why were you late? — The bus did not come (that is why).',
        de: 'Warum hast du dich verspätet? — Der Bus ist nicht gekommen (deshalb).'
      },
      {
        kanji: '気分[きぶん]が 悪[わる]いんですか。— ええ、頭[あたま]が 痛[いた]いんです。',
        kana: 'きぶんが わるいんですか。— ええ、あたまが いたいんです。',
        en: 'Are you not feeling well? — Yes, I have a headache.',
        de: 'Fühlst du dich nicht gut? — Ja, ich habe Kopfschmerzen.'
      }
    ]
  },
  {
    id: 'l26-te-itadakemasenka',
    lesson: 'Lesson 26',
    lessonNum: 26,
    category: 'clauses-connectors',
    titleDe: 'Vていただけませんか (Höfliche Bitte an Respektspersonen)',
    titleEn: 'Vていただけませんか (Polite Request to Superiors)',
    formula: 'Vて形 + いただけませんか',
    tags: ['request', 'polite', 'te-form', 'keigo', 'l26'],
    summaryDe: 'Sehr höfliche Bitte an Vorgesetzte, Fremde oder Dozenten ("Könnten Sie freundlicherweise... für mich tun?"). Noch höflicher als 〜てください.',
    summaryEn: 'Highly polite request directed toward superiors, professors, or unfamiliar people ("Could you please be so kind as to...").',
    nuancesDe: [
      'Deutlich höflicher als `〜てください` und `〜てくれませんか`.',
      'Wird häufig mit `〜んですが、` eingeleitet, um das Problem vorab darzulegen.'
    ],
    nuancesEn: [
      'Significantly more polite than `〜てください` and `〜てくれませんか`.',
      'Typically prefaced by `〜んですが、` to explain the situational context.'
    ],
    examples: [
      {
        kanji: '日本語[にほんご]で 手紙[てがみ]を 書[か]いたんですが、見[み]て いただけませんか。',
        kana: 'にほんごで てがみを かいたんですが、みて いただけませんか。',
        en: 'I wrote a letter in Japanese; would you please be kind enough to take a look at it?',
        de: 'Ich habe einen Brief auf Japanisch geschrieben; könnten Sie ihn bitte einmal durchsehen?'
      }
    ]
  },
  {
    id: 'l26-tara-ii-desuka',
    lesson: 'Lesson 26',
    lessonNum: 26,
    category: 'advisory-intent',
    titleDe: 'Fragewort + Vたらいいですか (Ratschlag / Anleitung erbitten)',
    titleEn: 'Interrogative + Vたらいいですか (Asking for Advice)',
    formula: '[Fragewort] + Vたら いいですか',
    tags: ['advice', 'instructions', 'tara', 'l26'],
    summaryDe: 'Bittet den Gesprächspartner um konkrete Handlungsanweisungen oder eine Empfehlung ("Was / Wo / Wie soll ich am besten...?").',
    summaryEn: 'Asks the listener for concrete instructions or guidance on how best to handle a situation.',
    examples: [
      {
        kanji: 'カメラを 買[か]いたいんですが、どこで 買[か]ったら いいですか。',
        kana: 'カメラを かいたいんですが、どこで かったら いいですか。',
        en: 'I want to buy a camera; where should I buy one?',
        de: 'Ich möchte eine Kamera kaufen; wo kaufe ich sie am besten?'
      }
    ]
  },
  {
    id: 'l26-topical-wa',
    lesson: 'Lesson 26',
    lessonNum: 26,
    category: 'particles-contrast',
    titleDe: 'Nは (Topikalisierung von normalerweise mit が markierten Phrasen)',
    titleEn: 'Nは (Topicalizing が-Marked Objects)',
    formula: 'Nは + [好きです / 嫌いです / 上手です / あります / etc.]',
    tags: ['particles', 'topic', 'wa-vs-ga', 'l26'],
    summaryDe: 'Hebt ein Objekt, das grammatisch eigentlich mit が steht (bei 好き, 上手, あります), als zentrales Thema des Satzes hervor.',
    summaryEn: 'Pulls an object normally taking が (with 好き, 上手, あります) to sentence-initial position as topic.',
    examples: [
      {
        kanji: '運動会[うんどうかい]の ビデオは どこに ありますか。',
        kana: 'うんどうかいの ビデオは どこに ありますか。',
        en: 'As for the sports day video, where is it?',
        de: 'Was das Video vom Sportfest betrifft: Wo ist das?'
      }
    ]
  },

  // LESSON 27
  {
    id: 'l27-potential-form',
    lesson: 'Lesson 27',
    lessonNum: 27,
    category: 'conjugations',
    titleDe: '可能形 (Möglichkeitsform / Potential Form)',
    titleEn: '可能形 (Potential / Capable Verb Form)',
    formula: 'G1: u → eru | G2: stem + られる | G3: する→できる, くる→こられる',
    tags: ['potential', 'kanoukei', 'conjugation', 'ability', 'l27'],
    summaryDe: 'Drückt persönliche Fähigkeit oder äußere Machbarkeit aus ("können"). Das Objekt wird in der Regel mit が markiert!',
    summaryEn: 'Expresses innate human capability or situational feasibility ("can do"). The direct object is generally marked with が instead of を.',
    nuancesDe: [
      'Objektpartikel-Wechsel: Aus `〜を 飲みます` wird `〜が 飲めます`.',
      'Gruppe I: Der Endlaut `u` wandert in die `e`-Reihe (書く → 書ける, 泳ぐ → 泳げる, 話す → 話せる).',
      'Gruppe II: Stamm + られる (食べる → 食べられる).',
      'Gruppe III: する → できる, 来る → こられる.'
    ],
    nuancesEn: [
      'Particle shift: Object `を` regularly shifts to `が` (`日本語が話せます`).',
      'Group I: End vowel changes from `u` to `e` row (`kaku` → `kakeru`).',
      'Group II: Verb stem + `rareru` (`taberu` → `taberareru`).',
      'Group III: `suru` → `dekiru`, `kuru` → `korareru`.'
    ],
    examples: [
      {
        kanji: '私[わたし]は 日本語[にほんご]の 新聞[しんぶん]が 読[よ]めます。',
        kana: 'わたしは にほんごの しんぶんが よめます。',
        en: 'I can read Japanese newspapers.',
        de: 'Ich kann japanische Zeitungen lesen.'
      },
      {
        kanji: '漢字[かんじ]が 一人[ひとり]で 書[か]けますか。',
        kana: 'かんじが ひとりで かけますか。',
        en: 'Can you write kanji by yourself?',
        de: 'Kannst du Kanji alleine schreiben?'
      }
    ]
  },
  {
    id: 'l27-dekimasu',
    lesson: 'Lesson 27',
    lessonNum: 27,
    category: 'verbs-aspects',
    titleDe: 'できます (Entstehen / Fertiggestellt werden)',
    titleEn: 'できます (Completion / Coming into Being)',
    formula: 'Nが + できます',
    tags: ['dekimasu', 'completion', 'building', 'l27'],
    summaryDe: 'Neben "können" bedeutet できます auch: Ein Gebäude, Geschäft, Kleidungsstück oder Essen ist fertiggestellt bzw. neu eröffnet.',
    summaryEn: 'Beyond "can do", できます means that a building, shop, or dish has been constructed, completed, or newly opened.',
    examples: [
      {
        kanji: '駅[えき]の 前[まえ]に 大[おお]きな スーパーが できました。',
        kana: 'えきの まえに おおきな スーパーが できました。',
        en: 'A large supermarket was built/opened in front of the station.',
        de: 'Vor dem Bahnhof ist ein großer Supermarkt entstanden / eröffnet worden.'
      }
    ]
  },
  {
    id: 'l27-shika',
    lesson: 'Lesson 27',
    lessonNum: 27,
    category: 'particles-contrast',
    titleDe: '〜しか + 否定 (Ausschließlichkeit mit Mangelgefühl)',
    titleEn: '〜しか + Negative (Exclusivity with Scarcity)',
    formula: 'N + しか + [否定 / Negative Predicate]',
    tags: ['shika', 'negative', 'limitation', 'scarcity', 'l27'],
    summaryDe: 'Bedeutet "nur / nichts als". Das nachfolgende Verb MUSS verneint sein. Schwingt immer ein Bedauern über zu geringe Menge mit.',
    summaryEn: 'Expresses "only / nothing except". Demands an obligatory negative verb predicate and implies regret or insufficiency.',
    examples: [
      {
        kanji: 'ローマ字[じ]しか 書[か]けません。',
        kana: 'ローマじしか かけません。',
        en: 'I can only write Roman letters (regrettably no kanji/kana).',
        de: 'Ich kann nur lateinische Buchstaben schreiben (leider keine Schriftzeichen).'
      }
    ]
  },
  {
    id: 'l27-contrast-wa',
    lesson: 'Lesson 27',
    lessonNum: 27,
    category: 'particles-contrast',
    titleDe: 'Nは (Kontrastives は zur Gegenüberstellung)',
    titleEn: 'Nは (Contrastive Particle は)',
    formula: 'Aは [肯/否] が、Bは [肯/否]',
    tags: ['contrast', 'wa', 'particles', 'l27'],
    summaryDe: 'Stellt zwei Dinge kontrastiv gegenüber: Was bei A gilt, gilt bei B gerade nicht.',
    summaryEn: 'Contrasts two opposing entities, highlighting that what applies to A does not hold true for B.',
    examples: [
      {
        kanji: 'ひらがなは 書[か]けますが、漢字[かんじ]は 書[か]けません。',
        kana: 'ひらがなは かけますが、かんじは かけません。',
        en: 'I can write Hiragana, but I cannot write Kanji.',
        de: 'Hiragana kann ich schreiben, aber Kanji kann ich nicht schreiben.'
      }
    ]
  },

  // LESSON 28
  {
    id: 'l28-nagara',
    lesson: 'Lesson 28',
    lessonNum: 28,
    category: 'clauses-connectors',
    titleDe: 'V1ます-Stamm + ながら + V2 (Gleichzeitige Handlungen)',
    titleEn: 'V1ます-stem + ながら + V2 (Simultaneous Actions)',
    formula: 'V1ます-Stamm + ながら + V2',
    tags: ['nagara', 'simultaneous', 'while', 'l28'],
    summaryDe: 'Zwei Handlungen werden von demselben Subjekt gleichzeitig ausgeführt. Die Haupttätigkeit liegt immer auf V2!',
    summaryEn: 'Two simultaneous actions performed by the same subject. The primary/dominant focus is always placed on V2.',
    nuancesDe: [
      'V1 ist die Begleithandlung, V2 ist die Haupthandlung (`音楽を聞きながら勉強します` = Haupttätigkeit ist das Lernen!).',
      'Subjekt beider Verben muss zwingend identisch sein.'
    ],
    nuancesEn: [
      'V1 is the secondary background action; V2 is the focal primary action.',
      'Both actions must strictly be conducted by the identical subject.'
    ],
    examples: [
      {
        kanji: '音楽[おんがく]を 聞[き]きながら ご飯[はん]を 食[た]べます。',
        kana: 'おんがくを ききながら ごはんを たべます。',
        en: 'I eat meals while listening to music.',
        de: 'Ich esse, während ich Musik höre.'
      }
    ]
  },
  {
    id: 'l28-habitual-teiru',
    lesson: 'Lesson 28',
    lessonNum: 28,
    category: 'verbs-aspects',
    titleDe: 'Vています (Gewohnheitsmäßige / Regelmäßige Handlung)',
    titleEn: 'Vています (Habitual / Occupational Behavior)',
    formula: 'Vて形 + います',
    tags: ['habitual', 'routine', 'occupation', 'teiru', 'l28'],
    summaryDe: 'Drückt gewohnheitsmäßige, über einen längeren Zeitraum wiederholte Handlungen aus (Hobbys, Sport, Beruf).',
    summaryEn: 'Expresses habitual routines repeated over a prolonged timeframe (occupations, customs, hobbies).',
    examples: [
      {
        kanji: '毎朝[まいあさ] ジョギングを して います。',
        kana: 'まいあさ ジョギングを して います。',
        en: 'I go jogging every morning.',
        de: 'Ich gehe jeden Morgen joggen.'
      }
    ]
  },
  {
    id: 'l28-shi-shi',
    lesson: 'Lesson 28',
    lessonNum: 28,
    category: 'clauses-connectors',
    titleDe: 'Plain Form + し、〜し (Aufzählung mehrerer Gründe)',
    titleEn: 'Plain Form + し、〜し (Listing Multiple Qualities / Reasons)',
    formula: 'Plain Form + し、Plain Form + し、〜',
    tags: ['shi', 'reasons', 'listing', 'conjunction', 'l28'],
    summaryDe: 'Reiht zwei oder mehr Eigenschaften oder Gründe aneinander, die oft zu einem Gesamtfazit oder einer Entscheidung führen.',
    summaryEn: 'Connects two or more complementary qualities or reasons, typically leading to a final conclusion.',
    nuancesDe: [
      'Achtung: Nomen und な-Adjektive im Präsens behalten das `だ` (`熱心だし`, `先生だし`)!'
    ],
    nuancesEn: [
      'Key rule: Present affirmative Nouns and な-adjectives retain `だ` (`熱心だし`, `先生だし`)!'
    ],
    examples: [
      {
        kanji: 'この 店[みせ]は 料理[りょうり]も おいしいし、値段[ねだん]も 安[やす]いし、いつも 混[こ]んで います。',
        kana: 'この みせは りょうりも おいしいし、ねだんも やすいし、いつも こんで います。',
        en: 'The food at this restaurant is delicious, the prices are cheap, and so it is always crowded.',
        de: 'Das Essen in diesem Lokal ist lecker, die Preise sind günstig, und deshalb ist es immer voll.'
      }
    ]
  },

  // LESSON 29
  {
    id: 'l29-jidoushi-teiru',
    lesson: 'Lesson 29',
    lessonNum: 29,
    category: 'verbs-aspects',
    titleDe: 'Nが Vています (Zustand eines intransitiven Verbs / 自動詞)',
    titleEn: 'Nが Vています (Resulting State of Intransitive Verbs)',
    formula: 'Nが + [自動詞 て形] + います',
    tags: ['jidoushi', 'state', 'intransitive', 'teiru', 'l29'],
    summaryDe: 'Beschreibt den andauernden sichtbaren Zustand eines Objekts nach einer Zustandsänderung (Fenster zerbrochen, Tür geschlossen, Lampe an).',
    summaryEn: 'Describes the continuing, visible resulting state of an object following a spontaneous change.',
    examples: [
      {
        kanji: '窓[まど]の ガラスが 割[わ]れて います。',
        kana: 'まどの ガラスが われて います。',
        en: 'The window glass is broken.',
        de: 'Das Fensterglas ist zerbrochen.'
      },
      {
        kanji: '電気[でんき]が ついて います。',
        kana: 'でんきが ついて います。',
        en: 'The light is on.',
        de: 'Das Licht ist an.'
      }
    ]
  },
  {
    id: 'l29-teshimaimashita',
    lesson: 'Lesson 29',
    lessonNum: 29,
    category: 'verbs-aspects',
    titleDe: 'Vてしまいました (Vollendung mit Bedauern / Missgeschick)',
    titleEn: 'Vてしまいました (Completion with Regret / Irreversible Action)',
    formula: 'Vて形 + しまいました / しまいます',
    tags: ['teshimau', 'regret', 'completion', 'accident', 'l29'],
    summaryDe: 'Bedeutet 1. Vollständiges Abschließen einer Handlung ("alles aufgegessen") oder 2. Unbeabsichtigtes Missgeschick mit Bedauern ("leider verloren").',
    summaryEn: 'Signifies either 1. Complete thorough finalization of an action, or 2. An unintentional accident accompanied by deep regret.',
    examples: [
      {
        kanji: 'パスポートを なくして しまいました。',
        kana: 'パスポートを なくして しまいました。',
        en: 'I lost my passport (to my deep regret / by accident).',
        de: 'Ich habe leider meinen Reisepass verloren.'
      },
      {
        kanji: '宿題[しゅくだい]は もう やって しまいました。',
        kana: 'しゅくだいは もう やって しまいました。',
        en: 'I have completely finished my homework already.',
        de: 'Die Hausaufgaben habe ich bereits komplett erledigt.'
      }
    ]
  },

  // LESSON 30
  {
    id: 'l30-tadou-tearu',
    lesson: 'Lesson 30',
    lessonNum: 30,
    category: 'verbs-aspects',
    titleDe: 'Nが Vてあります (Intentionaler Zustand mit 他動詞)',
    titleEn: 'Nが Vてあります (Intentional State Resulting from Transitive Verb)',
    formula: 'Nが + [他動詞 て形] + あります',
    tags: ['tearu', 'intentional', 'transitive', 'state', 'l30'],
    summaryDe: 'Ein Zustand, der durch eine bewusste Handlung eines Akteurs für einen Zweck herbeigeführt wurde und so belassen ist (z. B. Kalender an Wand gehängt).',
    summaryEn: 'A persisting physical state resulting from a deliberate human action performed and maintained for a purpose.',
    examples: [
      {
        kanji: '壁[かべ]に カレンダーが 掛[か]けて あります。',
        kana: 'かべに カレンダーが かけて あります。',
        en: 'A calendar is hung on the wall (intentionally placed there).',
        de: 'An der Wand hängt ein Kalender (wurde dort bewusst aufgehängt).'
      }
    ]
  },
  {
    id: 'l30-teokimasu',
    lesson: 'Lesson 30',
    lessonNum: 30,
    category: 'verbs-aspects',
    titleDe: 'Vておきます / ときます (Vorbereitende Handlung)',
    titleEn: 'Vておきます / ときます (Action in Preparation)',
    formula: 'Vて形 + おきます (Umgangssprachlich: 〜ときます)',
    tags: ['teoku', 'preparation', 'tokimasu', 'l30'],
    summaryDe: 'Eine Handlung im Vorfeld ausführen, um für eine zukünftige Situation gerüstet zu sein (Hotel vorbuchen, Notizen bereitlegen).',
    summaryEn: 'Performing an action in advance to prepare for a future event, or leaving an object in its current state.',
    nuancesDe: [
      'In der gesprochenen Sprache verschmilzt `〜ておきます` zu **`〜ときます`** (`買っときます`).'
    ],
    nuancesEn: [
      'Colloquially contracts to **`〜ときます`** (`買っときます` instead of `買っておきます`).'
    ],
    examples: [
      {
        kanji: '旅行[りょこう]の 前[まえ]に、ホテルを 予約[よやく]して おきます。',
        kana: 'りょこうの まえに、ホテルを よやくして おきます。',
        en: 'Before the trip, I will book a hotel in advance.',
        de: 'Vor der Reise buche ich schon mal das Hotel im Voraus.'
      }
    ]
  },
  {
    id: 'l30-mada-teiru',
    lesson: 'Lesson 30',
    lessonNum: 30,
    category: 'verbs-aspects',
    titleDe: 'まだ Vています (Fortbestehen einer andauernden Handlung)',
    titleEn: 'まだ Vています (Still Continuing State / Action)',
    formula: 'まだ + Vて形 + います',
    tags: ['mada', 'continuation', 'teiru', 'l30'],
    summaryDe: 'Drückt aus, dass ein Zustand oder eine Handlung weiterhin anhält ("immer noch / weiterhin im Gange").',
    summaryEn: 'Indicates that an ongoing action or state is still currently persisting.',
    examples: [
      {
        kanji: 'まだ 雨[あめ]が 降[ふ]って います。',
        kana: 'まだ あめが ふって います。',
        en: 'It is still raining.',
        de: 'Es regnet immer noch.'
      }
    ]
  },

  // LESSON 31
  {
    id: 'l31-volitional-form',
    lesson: 'Lesson 31',
    lessonNum: 31,
    category: 'conjugations',
    titleDe: '意向形 (Volitionalform / "Lass uns...")',
    titleEn: '意向形 (Volitional Form — "Let\'s...")',
    formula: 'G1: u → ō | G2: stem + よう | G3: する→しよう, くる→こよう',
    tags: ['volitional', 'ikoukei', 'invitation', 'intent', 'l31'],
    summaryDe: 'Die informelle Plain-Form von `〜ましょう` ("Lass uns...!"). Dient Aufforderungen unter Freunden oder als Basis für Absichtsstrukturen.',
    summaryEn: 'The plain informal equivalent of `〜ましょう` ("Let\'s...!"). Used among peers or as the basis for expressions of personal intention.',
    examples: [
      {
        kanji: 'ちょっと 休[やす]もう。',
        kana: 'ちょっと やすもう。',
        en: 'Let\'s take a short rest.',
        de: 'Lass uns kurz Pause machen.'
      }
    ]
  },
  {
    id: 'l31-to-omotte-imasu',
    lesson: 'Lesson 31',
    lessonNum: 31,
    category: 'advisory-intent',
    titleDe: '意向形 + と思っています (Bestehende Absicht)',
    titleEn: 'Volitional Form + と思っています (Persisting Intention)',
    formula: '[意向形] + と 思って います',
    tags: ['intent', 'omotteimasu', 'volitional', 'l31'],
    summaryDe: 'Drückt eine persönliche Absicht aus, die der Sprecher schon seit einiger Zeit im Sinn hat ("Ich habe vor... / beabsichtige...").',
    summaryEn: 'Expresses an intention that the speaker has been contemplating for some time.',
    examples: [
      {
        kanji: '週末[しゅうまつ]は 海[うみ]へ 行[い]こうと 思[おも]って います。',
        kana: 'しゅうまつは うみへ いこうと おもって います。',
        en: 'I am planning / intend to go to the sea this weekend.',
        de: 'Ich habe vor, dieses Wochenende ans Meer zu fahren.'
      }
    ]
  },
  {
    id: 'l31-tsumori',
    lesson: 'Lesson 31',
    lessonNum: 31,
    category: 'advisory-intent',
    titleDe: 'V辞書形 / Vない形 + つもりです (Feste Absicht)',
    titleEn: 'V (Dict / ない) + つもりです (Firm Subjective Intention)',
    formula: 'V辞書形 / Vない形 + つもりです',
    tags: ['tsumori', 'intent', 'determination', 'l31'],
    summaryDe: 'Fester subjektiver Entschluss ("Ich habe fest vor, zu tun / nicht zu tun"). Nicht gegenüber Vorgesetzten verwenden!',
    summaryEn: 'Firm personal determination to execute or avoid an action. Inappropriate for asking superiors about their plans.',
    examples: [
      {
        kanji: '国[くに]へ 帰[かえ]っても、日本語[にほんご]の 勉強[べんきょう]を 続[つづ]ける つもりです。',
        kana: 'くにへ かえっても、にほんごの べんきょうを つづける つもりです。',
        en: 'Even after returning home, I intend to continue studying Japanese.',
        de: 'Selbst nach meiner Rückkehr in die Heimat habe ich fest vor, weiter Japanisch zu lernen.'
      }
    ]
  },
  {
    id: 'l31-yotei',
    lesson: 'Lesson 31',
    lessonNum: 31,
    category: 'advisory-intent',
    titleDe: 'V辞書形 / Nの + 予定です (Objektiver Zeitplan)',
    titleEn: 'V (Dict) / Nの + 予定です (Scheduled Event / Plan)',
    formula: 'V辞書形 / Nの + 予定[よてい]です',
    tags: ['yotei', 'schedule', 'timetable', 'l31'],
    summaryDe: 'Offizieller Termin oder Reiseplan, der im Kalender steht und nicht von persönlicher Laune abhängt.',
    summaryEn: 'An objective external itinerary, timetable, or official schedule.',
    examples: [
      {
        kanji: '会議[かいぎ]は 一時間[いちじかん]ぐらいの 予定[よてい]です。',
        kana: 'かいぎは いちじかんぐらいの よていです。',
        en: 'The meeting is scheduled to last about an hour.',
        de: 'Die Besprechung ist für etwa eine Stunde angesetzt.'
      }
    ]
  },
  {
    id: 'l31-mada-teimasen',
    lesson: 'Lesson 31',
    lessonNum: 31,
    category: 'verbs-aspects',
    titleDe: 'まだ Vていません (Noch nicht geschehen)',
    titleEn: 'まだ Vていません (Not Yet Performed)',
    formula: 'まだ + Vて形 + いません',
    tags: ['mada', 'notyet', 'teimasen', 'l31'],
    summaryDe: 'Drückt aus, dass eine erwartete Handlung bislang noch nicht ausgeführt wurde ("noch nicht gemacht").',
    summaryEn: 'Indicates that an expected action has not yet taken place.',
    examples: [
      {
        kanji: '昼[ひる]ご飯[はん]を もう 食[た]べましたか。— いいえ、まだ 食[た]べて いません。',
        kana: 'ひるごはんを もう たべましたか。— いいえ、まだ たべて いません。',
        en: 'Have you eaten lunch yet? — No, I haven\'t eaten yet.',
        de: 'Hast du schon zu Mittag gegessen? — Nein, ich habe noch nicht gegessen.'
      }
    ]
  },

  // LESSON 32
  {
    id: 'l32-hou-ga-ii',
    lesson: 'Lesson 32',
    lessonNum: 32,
    category: 'advisory-intent',
    titleDe: 'Vた / Vない ほうがいいです (Ratschlag / Empfehlung)',
    titleEn: 'V (た / ない) + ほうがいいです (Advice & Suggestion)',
    formula: 'Vた形 / Vない形 + ほうが いいです',
    tags: ['advice', 'suggestion', 'hougaii', 'l32'],
    summaryDe: 'Gibt einen dringenden, wohlmeinenden Ratschlag ("Es wäre besser, wenn du... tust / nicht tust"). Positiv mit た-Form, negativ mit ない-Form!',
    summaryEn: 'Offers direct personal advice ("You had better do / avoid doing..."). Takes the past た-form for affirmative suggestions!',
    nuancesDe: [
      'Bejaht zwingend mit Vergangenheitsform: `Vた ほうがいい` (`休んだほうがいい`).',
      'Verneint mit Präsens-Negation: `Vない ほうがいい` (`無理をしないほうがいい`).'
    ],
    nuancesEn: [
      'Affirmative strictly requires past た-form: `Vた ほうがいい` (`休んだほうがいい`).',
      'Negative pairs with plain negative: `Vない ほうがいい`.'
    ],
    examples: [
      {
        kanji: '熱[ねつ]が あるんです。— じゃ、お風呂[ふろ]に 入[はい]らない ほうが いいですよ。',
        kana: 'ねつが あるんです。— じゃ、おふろに はいらない ほうが いいですよ。',
        en: 'I have a fever. — Well, then you had better not take a bath.',
        de: 'Ich habe Fieber. — Nun, dann solltest du lieber kein Bad nehmen.'
      }
    ]
  },
  {
    id: 'l32-deshou',
    lesson: 'Lesson 32',
    lessonNum: 32,
    category: 'modal-particles',
    titleDe: 'Plain Form + でしょう (Wahrscheinliche Vermutung ~70-80%)',
    titleEn: 'Plain Form + でしょう (High-Probability Conjecture)',
    formula: 'Plain Form + でしょう (な-Adj & N: ohne だ)',
    tags: ['deshou', 'conjecture', 'probability', 'weather', 'l32'],
    summaryDe: 'Drückt eine fundierte Vermutung mit hoher Wahrscheinlichkeit aus ("wird wohl / vermutlich so sein", oft in Wetterberichten).',
    summaryEn: 'Expresses an educated conjecture of high probability (~70-80%), frequently utilized in weather forecasts.',
    nuancesDe: [
      'Nomen und な-Adjektive im Präsens stehen OHNE だ (`明日は雨でしょう`)!'
    ],
    nuancesEn: [
      'Nouns and な-adjectives in present affirmative drop だ entirely (`明日は雨でしょう`)!'
    ],
    examples: [
      {
        kanji: '明日[あした]は 雨[あめ]が 降[ふ]るでしょう。',
        kana: 'あしたは あめが ふるでしょう。',
        en: 'It will probably rain tomorrow.',
        de: 'Morgen wird es vermutlich regnen.'
      }
    ]
  },
  {
    id: 'l32-kamoshiremasen',
    lesson: 'Lesson 32',
    lessonNum: 32,
    category: 'modal-particles',
    titleDe: 'Plain Form + かもしれません (Möglichkeit ~50% / "vielleicht")',
    titleEn: 'Plain Form + かもしれません (Possibility — "Might / May")',
    formula: 'Plain Form + かもしれません (な-Adj & N: ohne だ)',
    tags: ['kamoshiremasen', 'possibility', 'might', 'uncertainty', 'l32'],
    summaryDe: 'Drückt eine vorsichtige Möglichkeit aus, dass etwas zutreffen könnte (~50% oder weniger: "könnte sein / möglicherweise").',
    summaryEn: 'Expresses moderate-to-low possibility (~50% or less: "might / may / possibly").',
    nuancesDe: [
      'Ebenfalls OHNE だ bei Nomen und な-Adjektiven (`先生かもしれません`).',
      'Wird oft durch `もしかしたら` ("möglicherweise / vielleicht") am Satzanfang verstärkt.'
    ],
    nuancesEn: [
      'Also drops だ for present affirmative nouns and な-adjectives (`先生かもしれません`).',
      'Frequently emphasized by sentence-initial `もしかしたら` ("by some chance").'
    ],
    examples: [
      {
        kanji: '約束[やくそく]の 時間[じかん]に 間[ま]に合[あ]わない かもしれません。',
        kana: 'やくそくの じかんに まにあわない かもしれません。',
        en: 'I might not make it in time for our appointment.',
        de: 'Möglicherweise schaffe ich es nicht pünktlich zum Treffen.'
      }
    ]
  }
];
