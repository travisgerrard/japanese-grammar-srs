
/* ===========================
   Grammar Lessons Data
=========================== */
const RAW_LESSONS = [
    {
      id: 1,
      level: 'N5',
      jlptLevel: 'Beginner',
      title: 'Introducing Basic Particles は and が',
      grammarPoints: [
        'は (wa) - Topic marker',
        'が (ga) - Subject marker'
      ],
      explanation: `
  In Japanese, particles play a crucial role in sentence structure.
  
  は (wa) indicates the topic of the sentence, what you're talking about.
  が (ga) marks the subject performing an action.
      `,
      examples: [
        {
          japanese: '私は学生です。',
          romanji: 'Watashi wa gakusei desu.',
          english: 'I am a student.'
        },
        {
          japanese: '猫が走っています。',
          romanji: 'Neko ga hashitte imasu.',
          english: 'The cat is running.'
        }
      ],
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Which particle indicates the topic?',
          options: ['は', 'が', 'を', 'に'],
          correctAnswer: 'は',
          explanation: 'は (wa) marks the topic of the sentence.'
        },
        {
          type: 'translation',
          question: 'Translate: 私は日本語を勉強します。',
          correctAnswer: 'I study Japanese.',
          explanation:
            'The sentence 私は日本語を勉強します means "I study Japanese." Particles: は marks the topic, を marks the direct object.'
        },
        {
          type: 'multiple-choice',
          question: 'Which particle marks the subject performing an action?',
          options: ['に', 'が', 'で', 'を'],
          correctAnswer: 'が',
          explanation: 'が is used to mark the subject that is performing an action.'
        }
      ],
      difficulty: 5,
      estimatedStudyTime: 15
    },
    {
      id: 2,
      level: 'N5',
      jlptLevel: 'Beginner',
      title: 'Basic Verb Conjugations - Present Tense',
      grammarPoints: ['Ru-verbs conjugation', 'U-verbs conjugation'],
      explanation: `
  Japanese verbs change based on their type and the tense.
  
  Ru-verbs: Remove る and add ます
  U-verbs: Change last vowel sound and add ます
      `,
      examples: [
        {
          japanese: '食べます (Tabemasu)',
          english: 'Eat (polite form)'
        },
        {
          japanese: '話します (Hanashimasu)',
          english: 'Speak (polite form)'
        }
      ],
      quiz: [
        {
          type: 'conjugation',
          question: 'Conjugate 食べる (taberu) to polite present tense',
          correctAnswer: '食べます',
          explanation: 'Remove る and add ます for ru-verbs.'
        },
        {
          type: 'translation',
          question: 'Translate: 話します。',
          correctAnswer: 'I speak.',
          explanation:
            '話します (hanashimasu) is the polite present form of 話す (to speak). "I speak." or "He/She speaks." (depending on context).'
        }
      ],
      difficulty: 6,
      estimatedStudyTime: 20
    },
    {
      id: 3,
      level: 'N4',
      jlptLevel: 'Lower Intermediate',
      title: 'Using 〜て Form',
      grammarPoints: ['〜て form usage in commands', '〜て form for connecting verbs'],
      explanation: `
  The 〜て form has multiple uses in Japanese:
  - Making requests and commands (e.g., ここに来てください = "Please come here.")
  - Connecting verbs in a series (e.g., 食べて、寝る = "Eat and then sleep.")
      `,
      examples: [
        {
          japanese: 'ドアを開けてください。',
          romanji: 'Doa o akete kudasai.',
          english: 'Please open the door.'
        },
        {
          japanese: '本を読んで、勉強します。',
          romanji: 'Hon o yonde, benkyou shimasu.',
          english: 'I read a book and then study.'
        }
      ],
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Which form is used to connect verbs in a series?',
          options: ['ない形', '〜て形', '辞書形', 'た形'],
          correctAnswer: '〜て形',
          explanation: '〜て形 (te-form) is used to link actions or verbs in a sentence.'
        },
        {
          type: 'translation',
          question: 'Translate: 学校へ行って、友達に会いました。',
          correctAnswer: 'I went to school and met my friend.',
          explanation: 'The 〜て form of 行く is 行って, used here to connect actions.'
        },
        {
          type: 'conjugation',
          question: 'Conjugate the verb 食べる into 〜て form',
          correctAnswer: '食べて',
          explanation: 'For ru-verbs, just remove る and add て.'
        }
      ],
      difficulty: 7,
      estimatedStudyTime: 30
    },
    {
      id: 4,
      level: 'N5',
      jlptLevel: 'Beginner',
      title: 'Basic Grammatical Structures',
      grammarPoints: [
        'Sentence Order: Subject + Object + Verb',
        'Particles: Defining grammatical roles',
        'Topic Marker は vs Subject Marker が'
      ],
      explanation: `
  Japanese follows the sentence structure Subject + Object + Verb. Unlike English, verbs always come at the end of the sentence. Particles define the grammatical role of each word:
  
  1. Subject + は (topic marker): Indicates the topic of the sentence.
     Example: 私は学生です (Watashi wa gakusei desu) - "I am a student."
  
  2. Subject + が (subject marker): Emphasizes the subject performing an action.
     Example: 猫がいます (Neko ga imasu) - "There is a cat."
  
  3. Object + を (object marker): Indicates the object receiving the action.
     Example: 本を読む (Hon o yomu) - "Read a book."
      `,
      examples: [
        {
          japanese: '私は日本語を勉強します。',
          romanji: 'Watashi wa nihongo o benkyou shimasu.',
          english: 'I study Japanese.'
        },
        {
          japanese: '犬が走っています。',
          romanji: 'Inu ga hashitte imasu.',
          english: 'The dog is running.'
        }
      ],
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Which particle marks the topic of a sentence?',
          options: ['は', 'が', 'を', 'に'],
          correctAnswer: 'は',
          explanation: 'The topic marker は indicates the topic of the sentence.'
        },
        {
          type: 'translation',
          question: 'Translate: 私は先生です。',
          correctAnswer: 'I am a teacher.',
          explanation: 'The sentence 私は先生です means "I am a teacher." は marks the topic.'
        },
        {
          type: 'multiple-choice',
          question: 'What is the correct sentence structure in Japanese?',
          options: ['Subject + Object + Verb', 'Subject + Verb + Object', 'Object + Subject + Verb'],
          correctAnswer: 'Subject + Object + Verb',
          explanation: 'Japanese sentences always end with the verb.'
        }
      ],
      difficulty: 4,
      estimatedStudyTime: 15
    },
  
    // Lesson 5: Adjectives (i-adjectives and na-adjectives)
    {
      id: 5,
      level: 'N5',
      jlptLevel: 'Beginner',
      title: 'Adjectives: i-adjectives and na-adjectives',
      grammarPoints: [
        'i-adjectives: End with い',
        'na-adjectives: Require な before nouns'
      ],
      explanation: `
  Adjectives in Japanese are divided into two types:
  
  1. i-adjectives: These end with the character い. They can directly modify nouns or form predicates without additional particles.
     Example: 大きい家 (Ookii ie) - "A big house."
  
  2. na-adjectives: These require な when modifying a noun. Without a noun, they function like a state-of-being.
     Example: 静かな場所 (Shizuka na basho) - "A quiet place."
      `,
      examples: [
        {
          japanese: 'この本は面白いです。',
          romanji: 'Kono hon wa omoshiroi desu.',
          english: 'This book is interesting.'
        },
        {
          japanese: '彼は親切な人です。',
          romanji: 'Kare wa shinsetsu na hito desu.',
          english: 'He is a kind person.'
        }
      ],
      quiz: [
        {
          type: 'multiple-choice',
          question: 'Which type of adjective requires な before a noun?',
          options: ['i-adjectives', 'na-adjectives', 'verb adjectives'],
          correctAnswer: 'na-adjectives',
          explanation: 'na-adjectives require な when modifying nouns.'
        },
        {
          type: 'translation',
          question: 'Translate: 大きい犬',
          correctAnswer: 'A big dog.',
          explanation: '大きい (ookii) is an i-adjective meaning "big."'
        },
        {
          type: 'multiple-choice',
          question: 'Which sentence uses an i-adjective correctly?',
          options: ['静かい部屋', '大きい家', '親切い人'],
          correctAnswer: '大きい家',
          explanation: '大きい家 (Ookii ie) means "A big house." 静か is a na-adjective.'
        }
      ],
      difficulty: 5,
      estimatedStudyTime: 20
    }
  ];
  
  RAW_LESSONS.push({
    id: 6,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'The 「も」 Inclusive Topic Particle',
    grammarPoints: [
      '「も」 is used to include or add information to a previously mentioned topic.'
    ],
    explanation: `
  The 「も」 particle replaces 「は」 or 「が」 to add inclusion or emphasize "also" or "too."
  
  Example:
  - 私は学生です。 (Watashi wa gakusei desu.) - I am a student.
  - 彼も学生です。 (Kare mo gakusei desu.) - He is also a student.
      `,
    examples: [
      {
        japanese: '猫が好きです。犬も好きです。',
        romanji: 'Neko ga suki desu. Inu mo suki desu.',
        english: 'I like cats. I also like dogs.'
      },
      {
        japanese: '私は日本に行きました。彼も行きました。',
        romanji: 'Watashi wa Nihon ni ikimashita. Kare mo ikimashita.',
        english: 'I went to Japan. He also went.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Which particle means "also" or "too"?',
        options: ['も', 'は', 'が', 'を'],
        correctAnswer: 'も',
        explanation: '「も」 is used to express inclusion.'
      },
      {
        type: 'translation',
        question: 'Translate: 彼も学生です。',
        correctAnswer: 'He is also a student.',
        explanation: '「も」 indicates inclusion or "also."'
      }
    ],
    difficulty: 4,
    estimatedStudyTime: 15
  });
  
  RAW_LESSONS.push({
    id: 7,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Adjective Conjugation - i-Adjectives',
    grammarPoints: [
      'Conjugating i-adjectives to past, negative, and past-negative forms.'
    ],
    explanation: `
  i-Adjectives are conjugated as follows:
  1. Positive: Keep the base form.
     Example: 高い (takai) - Tall.
  2. Negative: Remove 「い」 and add 「くない」.
     Example: 高くない (takakunai) - Not tall.
  3. Past: Remove 「い」 and add 「かった」.
     Example: 高かった (takakatta) - Was tall.
  4. Past Negative: Remove 「い」 and add 「くなかった」.
     Example: 高くなかった (takakunakatta) - Was not tall.
      `,
    examples: [
      {
        japanese: 'このビルは高いです。',
        romanji: 'Kono biru wa takai desu.',
        english: 'This building is tall.'
      },
      {
        japanese: 'このビルは高くないです。',
        romanji: 'Kono biru wa takakunai desu.',
        english: 'This building is not tall.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What is the past form of 高い?',
        options: ['高かった', '高くない', '高い', '高くなかった'],
        correctAnswer: '高かった',
        explanation: 'The past form of 高い is 高かった.'
      },
      {
        type: 'translation',
        question: 'Translate: この車は高くないです。',
        correctAnswer: 'This car is not expensive.',
        explanation: '「高くない」 is the negative form of 高い.'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });
  
  RAW_LESSONS.push({
    id: 8,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Using the 「の」 Particle for Possession',
    grammarPoints: [
      '「の」 indicates possession or describes a relationship.'
    ],
    explanation: `
  The particle 「の」 is used to show possession or describe a relationship between nouns.
  
  Examples:
  - 私の本 (Watashi no hon) - My book.
  - 日本の文化 (Nihon no bunka) - Japanese culture.
      `,
    examples: [
      {
        japanese: '彼の車は新しいです。',
        romanji: 'Kare no kuruma wa atarashii desu.',
        english: 'His car is new.'
      },
      {
        japanese: 'これは私のペンです。',
        romanji: 'Kore wa watashi no pen desu.',
        english: 'This is my pen.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「の」 indicate?',
        options: ['Direction', 'Possession', 'Subject', 'Object'],
        correctAnswer: 'Possession',
        explanation: '「の」 indicates possession or relationship between nouns.'
      },
      {
        type: 'translation',
        question: 'Translate: 日本の文化は面白いです。',
        correctAnswer: 'Japanese culture is interesting.',
        explanation: '「日本の文化」 means "Japanese culture."'
      }
    ],
    difficulty: 4,
    estimatedStudyTime: 15
  });
  
  RAW_LESSONS.push({
    id: 9,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Polite Negative Verbs',
    grammarPoints: [
      'Forming polite negative verbs by adding 「ません」.'
    ],
    explanation: `
  To make a verb polite and negative, conjugate it into the negative form by adding 「ません」.
  
  Example:
  - 食べます (tabemasu) - Eat (polite).
  - 食べません (tabemasen) - Do not eat (polite).
      `,
    examples: [
      {
        japanese: '私はご飯を食べません。',
        romanji: 'Watashi wa gohan o tabemasen.',
        english: 'I do not eat rice.'
      },
      {
        japanese: '彼は本を読みません。',
        romanji: 'Kare wa hon o yomimasen.',
        english: 'He does not read books.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What is the polite negative form of 飲む?',
        options: ['飲みません', '飲まない', '飲みます', '飲みませんでした'],
        correctAnswer: '飲みません',
        explanation: 'The polite negative form of 飲む is 飲みません.'
      },
      {
        type: 'translation',
        question: 'Translate: 彼はコーヒーを飲みません。',
        correctAnswer: 'He does not drink coffee.',
        explanation: '「飲みません」 means "does not drink."'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });
  
  RAW_LESSONS.push({
    id: 10,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'The 「で」 Context Particle',
    grammarPoints: [
      '「で」 is used to indicate the location where an action occurs or the means by which something is done.'
    ],
    explanation: `
  The 「で」 particle specifies the context or means of an action:
  
  1. Location of action:
     Example: 学校で勉強します。 (Gakkou de benkyou shimasu.) - "Study at school."
  
  2. Means or method:
     Example: バスで行きます。 (Basu de ikimasu.) - "Go by bus."
      `,
    examples: [
      {
        japanese: '図書館で本を読みます。',
        romanji: 'Toshokan de hon o yomimasu.',
        english: 'Read a book at the library.'
      },
      {
        japanese: 'ナイフで野菜を切ります。',
        romanji: 'Naifu de yasai o kirimasu.',
        english: 'Cut vegetables with a knife.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「で」 indicate?',
        options: ['Location of existence', 'Means of action', 'Context of an action', 'All of the above'],
        correctAnswer: 'All of the above',
        explanation: '「で」 indicates location of action, means, or context.'
      },
      {
        type: 'translation',
        question: 'Translate: 公園で遊びます。',
        correctAnswer: 'Play at the park.',
        explanation: '「公園で」 means "at the park."'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });
  
  RAW_LESSONS.push({
    id: 11,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'The 「に」 Particle - Time',
    grammarPoints: [
      '「に」 is used to indicate specific points in time.'
    ],
    explanation: `
  The 「に」 particle is used to indicate a specific time when an action takes place. 
  
  Examples:
  - 午後3時に会いましょう。 (Gogo sanji ni aimashou.) - "Let's meet at 3 PM."
  - 毎朝7時に起きます。 (Maiasa shichiji ni okimasu.) - "I wake up at 7 AM every morning."
      `,
    examples: [
      {
        japanese: '月曜日に学校へ行きます。',
        romanji: 'Getsuyoubi ni gakkou e ikimasu.',
        english: 'Go to school on Monday.'
      },
      {
        japanese: '8時に出発します。',
        romanji: 'Hachiji ni shuppatsu shimasu.',
        english: 'Depart at 8 o’clock.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Which particle is used to indicate a specific time?',
        options: ['で', 'に', 'を', 'へ'],
        correctAnswer: 'に',
        explanation: '「に」 is used for specific times.'
      },
      {
        type: 'translation',
        question: 'Translate: 毎朝6時に走ります。',
        correctAnswer: 'I run every morning at 6 o’clock.',
        explanation: '「毎朝6時に」 means "every morning at 6 o’clock."'
      }
    ],
    difficulty: 4,
    estimatedStudyTime: 15
  });
  
  RAW_LESSONS.push({
    id: 12,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Counting with Japanese Counters',
    grammarPoints: [
      'Counters are used with numbers to count objects, people, or events.'
    ],
    explanation: `
  In Japanese, specific counters are used depending on the item being counted:
  
  Examples:
  - General objects: ～つ
    Example: 3つ (mittsu) - Three things.
  - People: ～人
    Example: 二人 (futari) - Two people.
  - Flat objects: ～枚
    Example: 一枚 (ichimai) - One sheet of paper.
      `,
    examples: [
      {
        japanese: 'リンゴを2つください。',
        romanji: 'Ringo o futatsu kudasai.',
        english: 'Please give me two apples.'
      },
      {
        japanese: '写真を三枚撮りました。',
        romanji: 'Shashin o sanmai torimashita.',
        english: 'I took three pictures.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What is the counter for flat objects?',
        options: ['つ', '人', '枚', '個'],
        correctAnswer: '枚',
        explanation: '「枚」 is used for flat objects like paper.'
      },
      {
        type: 'translation',
        question: 'Translate: 猫が五匹います。',
        correctAnswer: 'There are five cats.',
        explanation: '「匹」 is the counter for small animals.'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 25
  });
  
  RAW_LESSONS.push({
    id: 13,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Using the 「から」 Particle for Reason',
    grammarPoints: [
      '「から」 is used to indicate a reason or cause.'
    ],
    explanation: `
  The 「から」 particle explains why something happened or will happen. 
  
  Examples:
  - 忙しいから、行けません。 (Isogashii kara, ikemasen.) - "I’m busy, so I can’t go."
  - 雨だから、外に出ません。 (Ame dakara, soto ni demasen.) - "It’s raining, so I won’t go outside."
      `,
    examples: [
      {
        japanese: '勉強するから、遊べません。',
        romanji: 'Benkyou suru kara, asobemasen.',
        english: 'I have to study, so I can’t play.'
      },
      {
        japanese: '疲れたから、早く寝ます。',
        romanji: 'Tsukareta kara, hayaku nemasu.',
        english: 'I’m tired, so I’ll sleep early.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'Which particle is used to indicate a reason?',
        options: ['から', 'で', 'に', 'が'],
        correctAnswer: 'から',
        explanation: '「から」 is used to indicate a reason or cause.'
      },
      {
        type: 'translation',
        question: 'Translate: 雨だから、傘を持ってきました。',
        correctAnswer: 'It’s raining, so I brought an umbrella.',
        explanation: '「雨だから」 explains the reason for bringing an umbrella.'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });

  RAW_LESSONS.push({
    id: 14,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'The 「が」 Identifier Particle',
    grammarPoints: [
      '「が」 identifies the subject when emphasizing it or distinguishing it.'
    ],
    explanation: `
  The 「が」 particle is used to emphasize or distinguish the subject of a sentence. It is different from 「は」, which indicates the topic.
  
  Examples:
  - 猫がいます。 (Neko ga imasu.) - "There is a cat."
  - 誰が来ましたか？ (Dare ga kimashita ka?) - "Who came?"
      `,
    examples: [
      {
        japanese: '先生が教室にいます。',
        romanji: 'Sensei ga kyoushitsu ni imasu.',
        english: 'The teacher is in the classroom.'
      },
      {
        japanese: '誰がこの本を読みましたか？',
        romanji: 'Dare ga kono hon o yomimashita ka?',
        english: 'Who read this book?'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「が」 emphasize?',
        options: ['The topic', 'The subject', 'The object', 'The location'],
        correctAnswer: 'The subject',
        explanation: '「が」 emphasizes or identifies the subject of the sentence.'
      },
      {
        type: 'translation',
        question: 'Translate: 誰が来ましたか？',
        correctAnswer: 'Who came?',
        explanation: '「誰が」 emphasizes "who" as the subject of the question.'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });

  RAW_LESSONS.push({
    id: 15,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Polite Requests with 「〜ください」',
    grammarPoints: [
      'Use 「〜ください」 to make polite requests.'
    ],
    explanation: `
  The expression 「〜ください」 is used to politely ask someone to do something. It follows the 〜て form of a verb.
  
  Examples:
  - ドアを開けてください。 (Doa o akete kudasai.) - "Please open the door."
  - 名前を書いてください。 (Namae o kaite kudasai.) - "Please write your name."
      `,
    examples: [
      {
        japanese: '窓を閉めてください。',
        romanji: 'Mado o shimete kudasai.',
        english: 'Please close the window.'
      },
      {
        japanese: 'ここに座ってください。',
        romanji: 'Koko ni suwatte kudasai.',
        english: 'Please sit here.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What form does a verb take before 「ください」?',
        options: ['Plain form', 'Negative form', '〜て form', 'Past form'],
        correctAnswer: '〜て form',
        explanation: 'The 〜て form is used before 「ください」 to make polite requests.'
      },
      {
        type: 'translation',
        question: 'Translate: 本を読んでください。',
        correctAnswer: 'Please read the book.',
        explanation: '「読んで」 is the 〜て form of 読む, followed by 「ください」 for a polite request.'
      }
    ],
    difficulty: 4,
    estimatedStudyTime: 15
  });

  RAW_LESSONS.push({
    id: 16,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Ability with 「〜ことができる」',
    grammarPoints: [
      'Use 「〜ことができる」 to say you can do something.'
    ],
    explanation: `
  「〜ことができる」 is used to express the ability to perform an action.
  
  Examples:
  - 日本語を話すことができます。 (Nihongo o hanasu koto ga dekimasu.) - "I can speak Japanese."
  - 泳ぐことができません。 (Oyogu koto ga dekimasen.) - "I cannot swim."
      `,
    examples: [
      {
        japanese: '車を運転することができます。',
        romanji: 'Kuruma o unten suru koto ga dekimasu.',
        english: 'I can drive a car.'
      },
      {
        japanese: 'この本を読むことができません。',
        romanji: 'Kono hon o yomu koto ga dekimasen.',
        english: 'I cannot read this book.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「ことができる」 mean?',
        options: ['Cannot do', 'Want to do', 'Can do', 'Must do'],
        correctAnswer: 'Can do',
        explanation: '「ことができる」 expresses the ability to do something.'
      },
      {
        type: 'translation',
        question: 'Translate: 音楽を聴くことができます。',
        correctAnswer: 'I can listen to music.',
        explanation: '「聴くことができます」 means "can listen."'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 25
  });

  RAW_LESSONS.push({
    id: 17,
    level: 'N5',
    jlptLevel: 'Beginner',
    title: 'Using 「〜たい」 to Express Desire',
    grammarPoints: [
      'Attach 「たい」 to the stem of a verb to express desire.'
    ],
    explanation: `
  The suffix 「たい」 is used to express desire to do something.
  
  Examples:
  - 食べたい (Tabetai) - "Want to eat."
  - 行きたい (Ikitai) - "Want to go."
      `,
    examples: [
      {
        japanese: '私は寿司を食べたいです。',
        romanji: 'Watashi wa sushi o tabetai desu.',
        english: 'I want to eat sushi.'
      },
      {
        japanese: '海に行きたいです。',
        romanji: 'Umi ni ikitai desu.',
        english: 'I want to go to the beach.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'How do you express desire with 「〜たい」?',
        options: ['Attach it to the plain form', 'Attach it to the stem of the verb', 'Use it as a particle'],
        correctAnswer: 'Attach it to the stem of the verb',
        explanation: '「〜たい」 is attached to the stem of the verb to express desire.'
      },
      {
        type: 'translation',
        question: 'Translate: 本を読みたいです。',
        correctAnswer: 'I want to read a book.',
        explanation: '「読みたい」 means "want to read."'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });

  RAW_LESSONS.push({
    id: 18,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Obligation with 「〜なければならない」',
    grammarPoints: [
      'Use 「〜なければならない」 to express "must" or "have to."'
    ],
    explanation: `
  「〜なければならない」 is used to indicate an obligation or something that must be done.
  
  Examples:
  - 宿題をしなければならない。 (Shukudai o shinakereba naranai.) - "I must do my homework."
  - 薬を飲まなければならない。 (Kusuri o nomanakereba naranai.) - "I must take medicine."
      `,
    examples: [
      {
        japanese: '早く起きなければならない。',
        romanji: 'Hayaku okinakereba naranai.',
        english: 'I must wake up early.'
      },
      {
        japanese: '会議に行かなければならない。',
        romanji: 'Kaigi ni ikanakereba naranai.',
        english: 'I must go to the meeting.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「〜なければならない」 express?',
        options: ['Desire', 'Prohibition', 'Obligation', 'Permission'],
        correctAnswer: 'Obligation',
        explanation: '「〜なければならない」 expresses obligation or "must do."'
      },
      {
        type: 'translation',
        question: 'Translate: 宿題をしなければならない。',
        correctAnswer: 'I must do my homework.',
        explanation: '「〜なければならない」 indicates that doing homework is a must.'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 25
  });

  RAW_LESSONS.push({
    id: 19,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Prohibition with 「〜てはいけない」',
    grammarPoints: [
      'Use 「〜てはいけない」 to express "must not" or "cannot."'
    ],
    explanation: `
  「〜てはいけない」 is used to express prohibition or something that is not allowed.
  
  Examples:
  - ここでタバコを吸ってはいけない。 (Koko de tabako o sutte wa ikenai.) - "You must not smoke here."
  - 嘘をついてはいけない。 (Uso o tsuite wa ikenai.) - "You must not lie."
      `,
    examples: [
      {
        japanese: 'この部屋に入ってはいけない。',
        romanji: 'Kono heya ni haitte wa ikenai.',
        english: 'You must not enter this room.'
      },
      {
        japanese: '公園でゴミを捨ててはいけない。',
        romanji: 'Kouen de gomi o sutete wa ikenai.',
        english: 'You must not throw trash in the park.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「〜てはいけない」 express?',
        options: ['Permission', 'Prohibition', 'Obligation', 'Possibility'],
        correctAnswer: 'Prohibition',
        explanation: '「〜てはいけない」 expresses prohibition or "must not do."'
      },
      {
        type: 'translation',
        question: 'Translate: 嘘をついてはいけない。',
        correctAnswer: 'You must not lie.',
        explanation: '「〜てはいけない」 is used to prohibit lying.'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 25
  });

  RAW_LESSONS.push({
    id: 20,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Permission with 「〜てもいい」',
    grammarPoints: [
      'Use 「〜てもいい」 to express permission or allowance.'
    ],
    explanation: `
  「〜てもいい」 is used to say that something is allowed or permitted.
  
  Examples:
  - この本を読んでもいいですか？ (Kono hon o yonde mo ii desu ka?) - "May I read this book?"
  - ドアを開けてもいいです。 (Doa o akete mo ii desu.) - "You may open the door."
      `,
    examples: [
      {
        japanese: 'ここに座ってもいいですか？',
        romanji: 'Koko ni suwatte mo ii desu ka?',
        english: 'May I sit here?'
      },
      {
        japanese: '少し休んでもいいです。',
        romanji: 'Sukoshi yasunde mo ii desu.',
        english: 'You may take a short break.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「〜てもいい」 express?',
        options: ['Prohibition', 'Permission', 'Obligation', 'Desire'],
        correctAnswer: 'Permission',
        explanation: '「〜てもいい」 expresses permission or allowance.'
      },
      {
        type: 'translation',
        question: 'Translate: ドアを閉めてもいいです。',
        correctAnswer: 'You may close the door.',
        explanation: '「〜てもいい」 indicates that closing the door is allowed.'
      }
    ],
    difficulty: 5,
    estimatedStudyTime: 20
  });


  RAW_LESSONS.push({
    id: 21,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Potential Form of Verbs',
    grammarPoints: [
      'Use the potential form of verbs to express ability to do something.'
    ],
    explanation: `
  In Japanese, the potential form of a verb is used to express the ability to do something.
  
  Examples:
  - 食べる (taberu) → 食べられる (taberareru) - "Can eat."
  - 書く (kaku) → 書ける (kakeru) - "Can write."
      `,
    examples: [
      {
        japanese: '日本語を話せます。',
        romanji: 'Nihongo o hanasemasu.',
        english: 'I can speak Japanese.'
      },
      {
        japanese: '泳げますか？',
        romanji: 'Oyogemasu ka?',
        english: 'Can you swim?'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does the potential form express?',
        options: ['Obligation', 'Possibility', 'Ability', 'Prohibition'],
        correctAnswer: 'Ability',
        explanation: 'The potential form expresses the ability to do something.'
      },
      {
        type: 'translation',
        question: 'Translate: 私は漢字が書けます。',
        correctAnswer: 'I can write kanji.',
        explanation: '「書けます」 is the potential form of 書く.'
      }
    ],
    difficulty: 7,
    estimatedStudyTime: 25
  });

  RAW_LESSONS.push({
    id: 22,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Making Comparisons with 「より」 and 「のほうが」',
    grammarPoints: [
      '「より」 indicates "less than"',
      '「のほうが」 indicates "more than"'
    ],
    explanation: `
  In Japanese, comparisons are made using 「より」 and 「のほうが」.
  
  1. 「より」 indicates something is less than another:
     Example: 猫より犬が好きです。 (Neko yori inu ga suki desu.) - "I like dogs more than cats."
  
  2. 「のほうが」 emphasizes something being greater:
     Example: 犬のほうが猫よりかわいい。 (Inu no hou ga neko yori kawaii.) - "Dogs are cuter than cats."
      `,
    examples: [
      {
        japanese: '今日は昨日より暑いです。',
        romanji: 'Kyou wa kinou yori atsui desu.',
        english: 'Today is hotter than yesterday.'
      },
      {
        japanese: '日本語のほうが英語より難しいです。',
        romanji: 'Nihongo no hou ga eigo yori muzukashii desu.',
        english: 'Japanese is harder than English.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「より」 indicate?',
        options: ['Greater than', 'Less than', 'Equal to', 'None of the above'],
        correctAnswer: 'Less than',
        explanation: '「より」 is used to indicate something is less than another.'
      },
      {
        type: 'translation',
        question: 'Translate: 犬より猫が静かです。',
        correctAnswer: 'Cats are quieter than dogs.',
        explanation: '「より」 indicates that dogs are noisier than cats.'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 20
  });

  RAW_LESSONS.push({
    id: 23,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Hearsay with 「そうだ」',
    grammarPoints: [
      '「そうだ」 is used to indicate hearsay or something you’ve heard.'
    ],
    explanation: `
  「そうだ」 is used to express something heard or reported. It is attached to the plain form of verbs and adjectives.
  
  Examples:
  - 明日は雨が降るそうだ。 (Ashita wa ame ga furu sou da.) - "I heard it will rain tomorrow."
  - この映画は面白いそうです。 (Kono eiga wa omoshiroi sou desu.) - "I heard this movie is interesting."
      `,
    examples: [
      {
        japanese: '彼は先生だそうです。',
        romanji: 'Kare wa sensei da sou desu.',
        english: 'I heard he is a teacher.'
      },
      {
        japanese: '明日は寒いそうです。',
        romanji: 'Ashita wa samui sou desu.',
        english: 'I heard it will be cold tomorrow.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「そうだ」 indicate?',
        options: ['Desire', 'Hearsay', 'Ability', 'Prohibition'],
        correctAnswer: 'Hearsay',
        explanation: '「そうだ」 indicates something you have heard or reported information.'
      },
      {
        type: 'translation',
        question: 'Translate: 彼は来ないそうです。',
        correctAnswer: 'I heard he isn’t coming.',
        explanation: '「来ないそうです」 means "I heard he isn’t coming."'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 20
  });

  RAW_LESSONS.push({
    id: 24,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Conjecture with 「でしょう」',
    grammarPoints: [
      '「でしょう」 is used to express conjecture or likelihood.'
    ],
    explanation: `
  「でしょう」 indicates likelihood, probability, or conjecture. It is often used when you are somewhat certain but not fully sure.
  
  Examples:
  - 明日は晴れるでしょう。 (Ashita wa hareru deshou.) - "It will probably be sunny tomorrow."
  - 彼は来るでしょうか？ (Kare wa kuru deshou ka?) - "Do you think he will come?"
      `,
    examples: [
      {
        japanese: '午後には雨が降るでしょう。',
        romanji: 'Gogo ni wa ame ga furu deshou.',
        english: 'It will probably rain in the afternoon.'
      },
      {
        japanese: '試験は難しいでしょう。',
        romanji: 'Shiken wa muzukashii deshou.',
        english: 'The exam is probably difficult.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「でしょう」 express?',
        options: ['Certainty', 'Possibility', 'Conjecture', 'Prohibition'],
        correctAnswer: 'Conjecture',
        explanation: '「でしょう」 is used to express conjecture or likelihood.'
      },
      {
        type: 'translation',
        question: 'Translate: 明日は寒いでしょう。',
        correctAnswer: 'It will probably be cold tomorrow.',
        explanation: '「寒いでしょう」 expresses a conjecture about the weather.'
      }
    ],
    difficulty: 6,
    estimatedStudyTime: 20
  });


  RAW_LESSONS.push({
    id: 25,
    level: 'N4',
    jlptLevel: 'Lower Intermediate',
    title: 'Expressing Simultaneous Actions with 「ながら」',
    grammarPoints: [
      '「ながら」 is used to describe two actions happening simultaneously.'
    ],
    explanation: `
  「ながら」 is attached to the stem of a verb to indicate two actions happening at the same time.
  
  Examples:
  - 音楽を聞きながら勉強します。 (Ongaku o kikinagara benkyou shimasu.) - "I study while listening to music."
  - ご飯を食べながらテレビを見ます。 (Gohan o tabenagara terebi o mimasu.) - "I watch TV while eating."
      `,
    examples: [
      {
        japanese: '彼女は歌いながら踊ります。',
        romanji: 'Kanojo wa utainagara odorimasu.',
        english: 'She dances while singing.'
      },
      {
        japanese: 'スマホを見ながら歩かないでください。',
        romanji: 'Sumaho o minagara arukanaide kudasai.',
        english: 'Please don’t walk while looking at your phone.'
      }
    ],
    quiz: [
      {
        type: 'multiple-choice',
        question: 'What does 「ながら」 express?',
        options: ['Past actions', 'Simultaneous actions', 'Desire', 'Permission'],
        correctAnswer: 'Simultaneous actions',
        explanation: '「ながら」 describes two actions happening at the same time.'
      },
      {
        type: 'translation',
        question: 'Translate: 本を読みながらコーヒーを飲みます。',
        correctAnswer: 'I drink coffee while reading a book.',
        explanation: '「読みながら」 means "while reading."'
      }
    ],
    difficulty: 7,
    estimatedStudyTime: 25
  });


/**
 * We create a mutable copy of RAW_LESSONS,
 * ensuring each quiz question has a unique "id".
 */
let questionIdCounter = 1;
RAW_LESSONS.forEach((lesson) => {
  if (!lesson.quiz) return;
  lesson.quiz.forEach((q) => {
    // If the question doesn't have an `id`, assign a new unique one
    if (!q.id) {
      q.id = 'Q' + questionIdCounter++;
    }
  });
});

/** Finally, export the updated lessons array */
export const GRAMMAR_LESSONS = RAW_LESSONS;

/** Optionally, build a global question bank for all quizzes. */
export const QUESTION_BANK = GRAMMAR_LESSONS.flatMap((lesson) => lesson.quiz || []);