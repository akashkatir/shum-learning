<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { progressStore } from '$lib/stores/progress';
	import { onDestroy } from 'svelte';

	export let data: PageData;

	$: ({ lesson, nextLessonNumber, previousLessonNumber, lessonPosition } = data);

	const markComplete = () => {
		progressStore.toggleLesson(lesson.lessonNumber);
	};

	const goToLesson = (lessonNumber: number | null) => {
		if (!lessonNumber) return;
		goto(`/lessons/${lessonNumber}`);
	};

	const goToNextLesson = () => {
		if (!nextLessonNumber) return;
		// Save to local storage when clicking next
		if (typeof localStorage !== 'undefined') {
			console.log('Saving to local storage', lesson.lessonNumber);
			localStorage.setItem(`${lesson.lessonNumber}`, 'true');
		}
		goto(`/lessons/${nextLessonNumber}`);
	};

	// Check if a lesson is completed based on localStorage
	const isLessonCompletedInStorage = (lessonNum: number): boolean => {
		if (typeof localStorage === 'undefined') return false;
		return localStorage.getItem(`${lessonNum}`) === 'true';
	};

	const unsubscribe = progressStore.subscribe((state) => {
		if (!state.started) {
			progressStore.start();
		}
	});

	onDestroy(() => {
		unsubscribe();
	});

	const isLessonCompleted = () => $progressStore.completedLessons.includes(lesson.lessonNumber);

	// Helper function to convert **text** to <strong>text</strong>
	const formatBold = (text: string | undefined): string => {
		if (!text) return '';
		return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	};
</script>

{#key lesson.lessonNumber}
	<main class="lesson">
		<header class="lesson__header">
			<div>
				<div class="lesson__index-container">
					<p class="lesson__index">Lesson {lesson.lessonNumber} of {lessonPosition.total}</p>
					<div class="progress-bubbles">
						{#each Array(lessonPosition.total) as _, index}
							{#if index > 0}
								<div class="progress-line" class:active={isLessonCompletedInStorage(index)}></div>
							{/if}
							<button
								class="progress-bubble"
								class:active={index + 1 === lesson.lessonNumber}
								class:completed={isLessonCompletedInStorage(index + 1)}
								on:click={() => goToLesson(index + 1)}
								aria-label="Go to lesson {index + 1}"
								title="Lesson {index + 1}"
							>
								{index + 1}
							</button>
						{/each}
					</div>
				</div>
				<h1>{lesson.title}</h1>
				<p class="lesson__objective">{@html formatBold(lesson.objective)}</p>
			</div>
			<!-- <button class:completed={isLessonCompleted()} on:click={markComplete}>
				{isLessonCompleted() ? 'Mark as Incomplete' : 'Mark Lesson Complete'}
			</button> -->
		</header>

		<section class="section vocabulary">
			<h2>Vocabulary</h2>
			<div class="vocabulary__grid">
				{#each lesson.vocabulary as entry}
					<article class="card vocabulary__entry">
						<h3>{entry.shum}</h3>
						<p class="pronunciation">{entry.pronunciation}</p>
						<p class="english">{@html formatBold(entry.english)}</p>
						{#if entry.literalMeaning}
							<p class="literal">{@html formatBold(entry.literalMeaning)}</p>
						{/if}
					</article>
				{/each}
			</div>
		</section>

		<section class="section syntax">
			<h2>Syntax Notes</h2>
			<ul>
				{#each lesson.syntaxNotes as note}
					<li>{@html formatBold(note)}</li>
				{/each}
			</ul>
		</section>

		<section class="section examples">
			<h2>Example Phrases</h2>
			<div class="examples__grid">
				{#each lesson.examplePhrases as example}
					<article class="card example__entry">
						<h3>{example.shum}</h3>
						<p class="english">{@html formatBold(example.english)}</p>
						{#if example.explanation}
							<p class="explanation">{@html formatBold(example.explanation)}</p>
						{/if}
					</article>
				{/each}
			</div>
		</section>

		<section class="section practice">
			<h2>Practice</h2>
			<ul>
				{#each lesson.practice as item}
					<li>{@html formatBold(item)}</li>
				{/each}
			</ul>
		</section>

		<section class="section tip">
			<h2>Tip</h2>
			<p>{@html formatBold(lesson.tip)}</p>
		</section>

		<nav class="lesson-nav">
			<button on:click={() => goto('/')}>Back to Primer</button>
			<div class="lesson-nav__links">
				<button
					class="secondary"
					disabled={!previousLessonNumber}
					on:click={() => goToLesson(previousLessonNumber)}
				>
					Previous
				</button>
				<div class="lesson-nav__tooltip-wrapper">
					<button class="primary" disabled={!nextLessonNumber} on:click={goToNextLesson}>
						Next
					</button>
					{#if !nextLessonNumber}
						<div class="lesson-nav__tooltip" role="tooltip">
							Lesson {previousLessonNumber + 2} coming soon
						</div>
					{/if}
				</div>
			</div>
		</nav>
	</main>
{/key}

<style>
	.lesson {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem 5rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.lesson__header {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		align-items: flex-start;
		border-bottom: 2px solid rgba(var(--sky-magenta-rgb), 0.15);
		padding-bottom: 2rem;
	}

	.lesson__index-container {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		flex-wrap: wrap;
	}

	.lesson__index {
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.95rem;
		color: var(--sky-magenta);
		margin: 0;
	}

	.progress-bubbles {
		display: flex;
		align-items: center;
		gap: 0;
	}

	.progress-bubble {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 2px solid rgba(var(--sky-magenta-rgb), 0.3);
		background: white;
		color: #718096;
		font-size: 0.85rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		z-index: 2;
		flex-shrink: 0;
	}

	.progress-bubble:hover {
		transform: scale(1.15);
		border-color: var(--sky-magenta);
		background: rgba(var(--sky-magenta-rgb), 0.1);
		box-shadow: 0 4px 12px rgba(var(--sky-magenta-rgb), 0.3);
	}

	.progress-bubble.active {
		background: var(--gradient-primary);
		border-color: transparent;
		color: white;
		box-shadow: 0 4px 15px rgba(var(--cambridge-blue-rgb), 0.4);
		transform: scale(1.2);
	}

	.progress-bubble.completed {
		background: rgba(var(--sky-magenta-rgb), 0.15);
		border-color: var(--sky-magenta);
		color: var(--sky-magenta);
	}

	.progress-line {
		width: 24px;
		height: 2px;
		background: rgba(var(--sky-magenta-rgb), 0.2);
		transition: all 0.3s ease;
		position: relative;
		z-index: 1;
		flex-shrink: 0;
	}

	.progress-line.active {
		background: var(--sky-magenta);
	}

	.lesson__header h1 {
		margin: 0;
		font-size: clamp(2.4rem, 4vw, 3.2rem);
		color: #1a202c;
		font-weight: 700;
	}

	.lesson__objective {
		font-size: 1.15rem;
		line-height: 1.75;
		margin: 0.5rem 0 0;
		color: #4a5568;
		font-weight: 400;
	}

	.section {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 20px;
		padding: 2rem;
		box-shadow: 0 12px 35px rgba(var(--sky-magenta-rgb), 0.12);
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.18);
		backdrop-filter: blur(5px);
		transition: all 0.3s ease;
	}

	.section:hover {
		transform: translateY(-2px);
		box-shadow: 0 18px 40px rgba(var(--sky-magenta-rgb), 0.18);
		background: rgba(255, 255, 255, 0.9);
	}

	.section h2 {
		margin-top: 0;
		margin-bottom: 1.5rem;
		font-size: 1.7rem;
		color: #1a202c;
		font-weight: 600;
	}

	.vocabulary__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.vocabulary__entry {
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 18px;
		box-shadow: 0 8px 25px rgba(var(--sky-magenta-rgb), 0.1);
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.16);
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
	}

	.vocabulary__entry:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 30px rgba(var(--sky-magenta-rgb), 0.2);
		background: rgba(255, 255, 255, 0.95);
	}

	.vocabulary__entry h3 {
		margin: 0;
		font-size: 1.4rem;
		color: #1a202c;
		font-weight: 600;
	}

	.vocabulary__entry .pronunciation {
		margin: 0;
		font-weight: 600;
		color: #4a5568;
		font-style: italic;
	}

	.vocabulary__entry .english {
		margin: 0;
		color: #2d3748;
		font-weight: 500;
	}

	.vocabulary__entry .literal {
		margin: 0;
		font-size: 0.9rem;
		color: #718096;
		font-style: italic;
		opacity: 0.8;
	}

	.section ul {
		margin: 0;
		padding-left: 1.5rem;
		line-height: 1.75;
		color: #4a5568;
	}

	.section ul li + li {
		margin-top: 1rem;
	}

	.examples__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.example__entry {
		padding: 1.5rem;
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.22);
		box-shadow: 0 8px 25px rgba(var(--sky-magenta-rgb), 0.16);
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
	}

	.example__entry:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 30px rgba(var(--sky-magenta-rgb), 0.24);
		background: rgba(255, 255, 255, 0.95);
	}

	.example__entry h3 {
		margin: 0;
		font-size: 1.3rem;
		color: #1a202c;
		font-weight: 600;
	}

	.example__entry .english {
		margin: 0;
		font-weight: 500;
		color: #2d3748;
	}

	.example__entry .explanation {
		margin: 0;
		color: #718096;
		font-size: 0.9rem;
		font-style: italic;
		opacity: 0.8;
	}

	.practice ul {
		padding-left: 0;
		list-style: none;
		display: grid;
		gap: 1rem;
	}

	.practice li {
		padding: 1.2rem 1.5rem;
		border-radius: 16px;
		background: rgba(var(--cambridge-blue-rgb), 0.1);
		color: #1a202c;
		border: 1px solid rgba(var(--cambridge-blue-rgb), 0.18);
		transition: all 0.3s ease;
	}

	.practice li:hover {
		transform: translateY(-1px);
		background: rgba(var(--cambridge-blue-rgb), 0.16);
		box-shadow: 0 4px 15px rgba(var(--cambridge-blue-rgb), 0.12);
	}

	.tip p {
		margin: 0;
		line-height: 1.75;
		color: #1a202c;
		font-size: 1.05rem;
		font-weight: 400;
	}

	.lesson-nav {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: flex-start;
		border-top: 2px solid rgba(var(--sky-magenta-rgb), 0.15);
		padding-top: 2rem;
	}

	.lesson-nav button {
		padding: 1rem 2rem;
		font-size: 1rem;
		font-weight: 600;
		border-radius: 50px;
		border: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.lesson-nav button.primary {
		background: var(--gradient-primary);
		color: white;
		box-shadow: 0 12px 30px rgba(var(--cambridge-blue-rgb), 0.3);
	}

	.lesson-nav button.primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 15px 35px rgba(var(--cambridge-blue-rgb), 0.4);
		background: var(--gradient-primary-hover);
	}

	.lesson-nav button.primary:disabled {
		background: rgba(var(--cambridge-blue-rgb), 0.3);
		cursor: not-allowed;
		box-shadow: none;
		transform: none;
	}

	.lesson-nav button.secondary {
		background: rgba(var(--sky-magenta-rgb), 0.12);
		color: var(--sky-magenta);
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.22);
	}

	.lesson-nav button.secondary:hover {
		transform: translateY(-1px);
		background: rgba(var(--sky-magenta-rgb), 0.18);
		box-shadow: 0 8px 20px rgba(var(--sky-magenta-rgb), 0.2);
	}

	.lesson-nav button.secondary:disabled {
		background: rgba(var(--sky-magenta-rgb), 0.08);
		color: rgba(var(--sky-magenta-rgb), 0.5);
		cursor: not-allowed;
		transform: none;
		box-shadow: none;
	}

	.lesson-nav__links {
		display: flex;
		gap: 1rem;
	}

	/* Tooltip wrapper ensures positioning context */
	.lesson-nav__tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	/* Tooltip bubble */
	.lesson-nav__tooltip {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		transform: translateX(-50%);
		/* Allow wrapping on small screens to avoid overflow */
		white-space: normal;
		max-width: min(90vw, 260px);
		background: rgba(17, 24, 39, 0.95);
		color: #fff;
		padding: 0.5rem 0.75rem;
		border-radius: 8px;
		font-size: 0.9rem;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
		pointer-events: none;
		opacity: 0;
		transition:
			opacity 0.15s ease,
			transform 0.15s ease;
		transform-origin: bottom center;
	}

	.lesson-nav__tooltip::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 6px solid transparent;
		border-top-color: rgba(17, 24, 39, 0.95);
	}

	/* Show tooltip on hover of wrapper or disabled button */
	.lesson-nav__tooltip-wrapper:hover .lesson-nav__tooltip,
	.lesson-nav__tooltip-wrapper:focus-within .lesson-nav__tooltip {
		opacity: 1;
		transform: translateX(-50%) translateY(-2px);
	}

	@media (min-width: 900px) {
		.lesson__header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.lesson-nav {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.lesson-nav__links {
			margin-left: auto;
		}
	}
</style>
