export type VocabularyEntry = {
    shum: string;
    pronunciation: string;
    english: string;
    literalMeaning: string | null;
    audio?: string;
};

export type ExamplePhrase = {
    shum: string;
    english: string;
    explanation: string | null;
    audio?: string;
};

export type Lesson = {
    lessonNumber: number;
    title: string;
    objective: string;
    vocabulary: VocabularyEntry[];
    syntaxNotes: string[];
    examplePhrases: ExamplePhrase[];
    practice: string[];
    tip: string;
};

export type LanguageNotes = {
    summary: string;
    deeperStudy: string;
    conceptOfI: {
        introduction: string;
        terms: Array<{
            term: string;
            definition: string;
        }>;
    };
};

export type LessonsFile = {
    lessons: Lesson[];
    learningTips: string[];
    languageNotes: LanguageNotes;
};

