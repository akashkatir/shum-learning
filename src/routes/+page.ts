import type { PageLoad } from './$types';

type LessonSummary = {
	lessonNumber: number;
	title: string;
	objective: string;
};

type LessonsPayload = {
	lessons: Array<LessonSummary>;
};

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/lessons/lessons.json');
	if (!response.ok) {
		throw new Error('Unable to load lessons');
	}

	const data = (await response.json()) as LessonsPayload;
	const lessons = data.lessons.map(({ lessonNumber, title, objective }) => ({
		lessonNumber,
		title,
		objective
	}));

	return {
		lessons
	};
};

