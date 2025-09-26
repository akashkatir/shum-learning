import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import type { LessonsFile } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
    const response = await fetch('/lessons/lessons.json');

    if (!response.ok) {
        throw error(response.status, 'Unable to load lessons data');
    }

    const data = (await response.json()) as LessonsFile;
    const lessons = [...data.lessons].sort((a, b) => a.lessonNumber - b.lessonNumber);

    return {
        lessons,
        learningTips: data.learningTips,
        languageNotes: data.languageNotes
    };
};

