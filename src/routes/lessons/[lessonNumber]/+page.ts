import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
    const lessonNumber = Number(params.lessonNumber);

    if (Number.isNaN(lessonNumber)) {
        throw error(400, 'Invalid lesson number.');
    }

    const { lessons } = await parent();
    const index = lessons.findIndex((lesson) => lesson.lessonNumber === lessonNumber);

    if (index === -1) {
        throw error(404, 'Lesson not found.');
    }

    const nextLesson = lessons[index + 1] ?? null;
    const previousLesson = lessons[index - 1] ?? null;

    return {
        lesson: lessons[index],
        nextLessonNumber: nextLesson?.lessonNumber ?? null,
        previousLessonNumber: previousLesson?.lessonNumber ?? null,
        lessonPosition: {
            index,
            total: lessons.length
        }
    };
};

