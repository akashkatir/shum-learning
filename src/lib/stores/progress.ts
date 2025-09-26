import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type ProgressState = {
    started: boolean;
    completedLessons: number[];
};

const STORAGE_KEY = 'shum-learning-progress';

const createProgressStore = () => {
    const { subscribe, update, set } = writable<ProgressState>({
        started: false,
        completedLessons: []
    });

    const persist = (state: ProgressState) => {
        if (browser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
    };

    return {
        subscribe,
        initialize: () => {
            if (!browser) return;
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored) as ProgressState;
                    set(parsed);
                    return;
                } catch (error) {
                    console.error('Failed to parse stored progress', error);
                }
            }

            const initialState: ProgressState = {
                started: false,
                completedLessons: []
            };
            set(initialState);
        },
        start: () =>
            update((state) => {
                const nextState = { ...state, started: true };
                persist(nextState);
                return nextState;
            }),
        toggleLesson: (lessonNumber: number) =>
            update((state) => {
                const exists = state.completedLessons.includes(lessonNumber);
                const nextState: ProgressState = {
                    started: true,
                    completedLessons: exists
                        ? state.completedLessons.filter((value) => value !== lessonNumber)
                        : [...state.completedLessons, lessonNumber].sort((a, b) => a - b)
                };
                persist(nextState);
                return nextState;
            }),
        reset: () => {
            const resetState: ProgressState = {
                started: false,
                completedLessons: []
            };
            set(resetState);
            persist(resetState);
        }
    };
};

export const progressStore = createProgressStore();

