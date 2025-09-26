<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { progressStore } from '$lib/stores/progress';

	export let data: PageData;

	const { lessons, learningTips, languageNotes } = data;

	const handleBegin = () => {
		if (!lessons.length) return;
		progressStore.start();
		goto(`/lessons/${lessons[0].lessonNumber}`);
	};

	$: firstLessonNumber = lessons[0]?.lessonNumber ?? null;
	$: isFirstLessonCompleted = firstLessonNumber
		? $progressStore.completedLessons.includes(firstLessonNumber)
		: false;
</script>

<main class="layout">
	<section class="hero">
		<div class="hero__text">
			<h1>Conversational <span class="shum-title">Shum Primer</span></h1>
			<p>
				This primer introduces conversational Shum, a mystical language designed for clear and
				simple communication of inner life. Each lesson builds on the previous one, covering
				essential vocabulary, syntax, and phrases. Practice pronouncing words phonetically as
				written.
			</p>
			<button class:is-complete={isFirstLessonCompleted} on:click={handleBegin}>
				{isFirstLessonCompleted ? 'Review Lesson 1' : 'Begin Lesson 1'}
			</button>
		</div>
		<div class="hero__image">
			<img src="/images/circle-meditator.png" alt="Meditator illustration" />
		</div>
	</section>

	<section class="lessons">
		<h2>Lesson Overview</h2>
		<ul>
			{#each lessons as lesson}
				<li>
					<div class="lesson__heading">
						<span class="lesson__number">Lesson {lesson.lessonNumber}</span>
						<h3>{lesson.title}</h3>
					</div>
					<p>{lesson.objective}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="tips">
		<h2>Learning Tips</h2>
		<ul>
			{#each learningTips as tip}
				<li>{tip}</li>
			{/each}
		</ul>
	</section>

	<section class="language-notes">
		<h2>Language Notes</h2>
		<div class="cards-grid">
			<div class="card">
				<h3>Summary</h3>
				<p>{languageNotes.summary}</p>
			</div>
			<div class="card">
				<h3>Deeper Study</h3>
				<p>{languageNotes.deeperStudy}</p>
			</div>
			<div class="card">
				<h3>Concept of I</h3>
				<p>{languageNotes.conceptOfI.introduction}</p>
				<ul>
					{#each languageNotes.conceptOfI.terms as term}
						<li>
							<strong>{term.term}</strong>
							<span>{term.definition}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
</main>

<style>
	.layout {
		max-width: 1200px;
		margin: 0 auto;
		padding: 3rem 2rem 5rem;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 4rem;
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		align-items: center;
		justify-content: center;
		min-height: 80vh;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 24px;
		padding: 3rem 2rem;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.hero__text {
		max-width: 680px;
		text-align: center;
	}

	.hero__text h1 {
		font-size: clamp(2.8rem, 4vw, 4rem);
		margin-bottom: 1.5rem;
		color: #1a202c;
		letter-spacing: -0.02em;
		font-weight: 700;
	}

	.shum-title {
		font-size: 1.2em;
		font-weight: 800;
		background: var(--gradient-brand);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		letter-spacing: -0.03em;
	}

	.hero__text p {
		font-size: 1.2rem;
		line-height: 1.75;
		margin-bottom: 2.5rem;
		color: #4a5568;
		font-weight: 400;
	}

	.hero__text button {
		padding: 1rem 3rem;
		font-size: 1.1rem;
		font-weight: 600;
		border: none;
		border-radius: 50px;
		background: var(--gradient-primary);
		color: white;
		cursor: pointer;
		box-shadow: 0 15px 35px rgba(var(--cambridge-blue-rgb), 0.35);
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.hero__text button:hover {
		transform: translateY(-3px);
		box-shadow: 0 20px 40px rgba(var(--cambridge-blue-rgb), 0.45);
		background: var(--gradient-primary-hover);
	}

	.hero__text button:active {
		transform: translateY(-1px);
	}

	.hero__text button.is-complete {
		background: var(--gradient-primary);
	}

	.hero__text button.is-complete:hover {
		background: var(--gradient-primary-hover);
	}

	.hero__image {
		position: relative;
		max-width: 280px;
	}

	.hero__image img {
		width: 100%;
		height: auto;
		display: block;
		border-radius: 50%;
		filter: drop-shadow(0 15px 35px rgba(102, 126, 234, 0.3));
		object-fit: cover;
		aspect-ratio: 1;
		border: 4px solid rgba(255, 255, 255, 0.8);
		transition:
			transform 0.3s ease,
			filter 0.3s ease;
	}

	.hero__image img:hover {
		transform: scale(1.05);
		filter: drop-shadow(0 20px 40px rgba(102, 126, 234, 0.4));
	}

	section {
		margin: 0;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20px;
		padding: 2.5rem;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.lessons h2,
	.tips h2,
	.language-notes h2 {
		font-size: 2.2rem;
		margin-bottom: 2rem;
		text-align: center;
		color: #1a202c;
		font-weight: 600;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.lessons ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.lessons li {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 20px;
		box-shadow: 0 15px 40px rgba(var(--sky-magenta-rgb), 0.15);
		padding: 2rem;
		box-sizing: border-box;
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.22);
		transition: all 0.3s ease;
		backdrop-filter: blur(10px);
	}

	.lessons li:hover {
		transform: translateY(-5px);
		box-shadow: 0 20px 50px rgba(var(--sky-magenta-rgb), 0.25);
		background: rgba(255, 255, 255, 0.95);
	}

	.lesson__heading {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		margin-bottom: 1rem;
	}

	.lesson__number {
		font-size: 0.95rem;
		font-weight: 600;
		color: var(--sky-magenta);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.lessons h3 {
		margin: 0;
		font-size: 1.35rem;
		color: #1a202c;
		font-weight: 600;
	}

	.lessons p {
		margin: 0;
		line-height: 1.65;
		color: #4a5568;
		font-weight: 400;
	}

	.tips ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.5rem;
	}

	.tips li {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16px;
		padding: 1.5rem 2rem;
		box-shadow: 0 10px 30px rgba(102, 126, 234, 0.1);
		line-height: 1.7;
		border: 1px solid rgba(102, 126, 234, 0.15);
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
	}

	.tips li:hover {
		transform: translateY(-2px);
		box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
		background: rgba(255, 255, 255, 0.9);
	}

	.language-notes {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.language-notes .cards-grid {
		display: grid;
		gap: 2rem;
	}

	.language-notes .card {
		background: rgba(255, 255, 255, 0.8);
		border-radius: 18px;
		padding: 2rem;
		box-shadow: 0 12px 35px rgba(102, 126, 234, 0.12);
		line-height: 1.7;
		border: 1px solid rgba(102, 126, 234, 0.15);
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
	}

	.language-notes .card:hover {
		transform: translateY(-3px);
		box-shadow: 0 18px 40px rgba(102, 126, 234, 0.18);
		background: rgba(255, 255, 255, 0.9);
	}

	.language-notes .card ul {
		list-style: none;
		margin: 1.25rem 0 0;
		padding: 0;
		display: grid;
		gap: 0.75rem;
	}

	.language-notes .card li {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.language-notes .card strong {
		font-size: 1.1rem;
		color: #667eea;
		font-weight: 600;
	}

	@media (min-width: 940px) {
		.hero {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			min-height: 85vh;
			padding: 4rem 3rem;
		}

		.hero__text {
			text-align: left;
			max-width: 600px;
		}

		.hero__image {
			max-width: 320px;
		}
	}

	@media (min-width: 700px) {
		.tips ul {
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		}

		.language-notes .cards-grid {
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		}
	}
</style>
