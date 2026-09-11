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

	let visiblePlanets = 15;
	const maxPlanets = 15;
	const orbitalRings = [
		[
			{ number: 1, angle: -65, size: 14, tone: 'sage' },
			{ number: 2, angle: 20, size: 12, tone: 'gold' },
			{ number: 10, angle: 95, size: 18, tone: 'gold' },
			{ number: 11, angle: 160, size: 16, tone: 'sage' }
		],
		[
			{ number: 3, angle: -115, size: 20, tone: 'sage' },
			{ number: 4, angle: -70, size: 8, tone: 'gold' },
			{ number: 5, angle: 35, size: 11, tone: 'sage' },
			{ number: 12, angle: 90, size: 12, tone: 'sage' },
			{ number: 13, angle: 145, size: 18, tone: 'purple' }
		],
		[
			{ number: 6, angle: -90, size: 22, tone: 'purple' },
			{ number: 7, angle: -35, size: 14, tone: 'sage' },
			{ number: 8, angle: 25, size: 23, tone: 'purple' },
			{ number: 9, angle: 80, size: 16, tone: 'gold' },
			{ number: 14, angle: 155, size: 11, tone: 'gold' },
			{ number: 15, angle: 205, size: 8, tone: 'gold' }
		]
	];
</script>

<main class="layout">
	<section class="hero" aria-labelledby="hero-title">
		<div class="hero__text">
			<p class="hero__eyebrow">Conversational Shum</p>
			<h1 id="hero-title">A language for <em>your inner life.</em></h1>
			<p class="hero__subtitle">The Conversational Shum Primer</p>
			<p class="hero__description">
				Explore a mystical language for clear, simple communication of inner life. Build your
				understanding one lesson at a time, through vocabulary, syntax, and practice.
			</p>
			<div class="hero__actions">
				<button class:is-complete={isFirstLessonCompleted} on:click={handleBegin}>
					Start Lesson 1 <span aria-hidden="true">&rarr;</span>
				</button>
				<a href="#lesson-overview">Explore the primer <span aria-hidden="true">&rarr;</span></a>
			</div>
			<p class="hero__note">Begin with the essentials. Progress at your own pace.</p>
		</div>
		<div class="hero__image">
			<div class="orbital-system">
				{#each orbitalRings as planets, ringIndex (ringIndex)}
					<div class="orbit-ring orbit-ring-{ringIndex + 1}" aria-hidden="true">
						{#each planets as planet (planet.number)}
							{#if visiblePlanets >= planet.number}
								<div
									class="planet planet--{planet.tone}"
									style="--planet-size: {planet.size}px; left: {50 +
										50 * Math.cos((planet.angle * Math.PI) / 180)}%; top: {50 +
										50 * Math.sin((planet.angle * Math.PI) / 180)}%;"
								></div>
							{/if}
						{/each}
					</div>
				{/each}

				<!-- Central Meditator Image -->
				<img
					src="/images/circle-meditator.png"
					alt="Meditator illustration"
					class="meditator-center"
					fetchpriority="high"
				/>
			</div>

			<div class="planet-slider">
				<label for="planet-count">Planets: {visiblePlanets}</label>
				<input
					id="planet-count"
					type="range"
					min="0"
					max={maxPlanets}
					bind:value={visiblePlanets}
					class="slider"
				/>
			</div>
		</div>
	</section>

	<section class="lessons" id="lesson-overview">
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
		</div>
		<div class="concept-of-i">
			<h3>Concept of I</h3>
			<p class="concept-intro">{languageNotes.conceptOfI.introduction}</p>
			<div class="i-concepts-grid">
				{#each languageNotes.conceptOfI.terms as term}
					<div class="i-concept-card">
						<h4>{term.term}</h4>
						<p>{term.definition}</p>
					</div>
				{/each}
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
		position: relative;
		display: grid;
		grid-template-columns: 1.06fr 1fr;
		align-items: center;
		align-self: center;
		gap: clamp(2rem, 4vw, 4.5rem);
		width: min(1480px, calc(100vw - 96px));
		min-height: min(850px, calc(100svh - 96px));
		padding: 2rem 0;
		isolation: isolate;
		background: transparent;
		border: 0;
		border-radius: 0;
		box-shadow: none;
		backdrop-filter: none;
	}

	.hero__text {
		position: relative;
		z-index: 1;
		min-width: 0;
	}

	.hero__eyebrow {
		margin: 0 0 1.8rem;
		color: #6d7d58;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.32em;
		text-transform: uppercase;
	}

	.hero__text h1 {
		margin: 0 0 1.7rem;
		color: #25232c;
		font-size: clamp(3.5rem, 5.9vw, 6.1rem);
		font-weight: 500;
		letter-spacing: -0.045em;
		line-height: 1.02;
	}

	.hero__text h1 em {
		display: block;
		color: var(--hero-purple);
		font-weight: 500;
	}

	.hero__subtitle {
		margin: 0 0 1.25rem;
		color: #302d38;
		font-size: clamp(1.1rem, 1.6vw, 1.5rem);
		line-height: 1.5;
		letter-spacing: -0.025em;
	}

	.hero__description {
		max-width: 33rem;
		margin: 0;
		color: #6b6873;
		font-size: 1.0625rem;
		line-height: 1.85;
	}

	.hero__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem 2.5rem;
		margin-top: 2.2rem;
	}

	.hero__actions button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		min-height: 3.4rem;
		padding: 0.9rem 2rem;
		border: 1px solid transparent;
		border-radius: 50px;
		background: var(--hero-purple);
		color: white;
		font: inherit;
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		box-shadow: 0 4px 10px rgba(111, 57, 129, 0.12);
		transition:
			background 180ms ease,
			transform 180ms ease,
			box-shadow 180ms ease;
	}

	.hero__actions button:hover {
		transform: translateY(-2px);
		background: var(--hero-purple-hover);
		box-shadow: 0 6px 16px rgba(111, 57, 129, 0.18);
	}

	.hero__actions button:active {
		transform: translateY(0);
	}

	.hero__actions a {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		min-height: 44px;
		color: var(--hero-purple-hover);
		font-size: 0.875rem;
		font-weight: 500;
		text-decoration-thickness: 1px;
		text-underline-offset: 5px;
	}

	.hero__actions a:hover {
		color: var(--hero-purple);
	}

	.hero__actions span {
		font-size: 1.35rem;
		line-height: 1;
	}

	.hero__actions button:focus-visible,
	.hero__actions a:focus-visible,
	.planet-slider .slider:focus-visible {
		outline: 2px solid var(--hero-purple);
		outline-offset: 5px;
	}

	.hero__note {
		margin: 1rem 0 0;
		color: #78737d;
		font-size: 0.75rem;
		line-height: 1.7;
	}

	.hero__image {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: min(100%, max(380px, calc(100svh - 240px)));
		justify-self: center;
		min-width: 0;
		padding: 1rem;
	}

	.hero__image::before {
		content: '';
		position: absolute;
		inset: -8%;
		z-index: -1;
		border-radius: 50%;
		background:
			radial-gradient(ellipse at 34% 58%, rgba(200, 158, 208, 0.17), transparent 54%),
			radial-gradient(ellipse at 72% 40%, rgba(169, 197, 147, 0.17), transparent 57%);
		filter: blur(25px);
		pointer-events: none;
	}

	.orbital-system {
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		aspect-ratio: 1;
		isolation: isolate;
	}

	.orbit-ring {
		position: absolute;
		top: 50%;
		left: 50%;
		aspect-ratio: 1;
		border: 1px solid rgba(178, 151, 89, 0.3);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		animation: rotate 100s linear infinite;
		pointer-events: none;
	}

	.orbit-ring-1 {
		width: 80%;
		border-color: rgba(139, 164, 112, 0.33);
		animation-duration: 70s;
	}

	.orbit-ring-2 {
		width: 90%;
		animation-duration: 90s;
		animation-direction: reverse;
	}

	.orbit-ring-3 {
		width: 100%;
	}

	.planet {
		position: absolute;
		width: var(--planet-size);
		height: var(--planet-size);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 2px 4px rgba(57, 49, 44, 0.2);
	}

	.planet--sage {
		background: radial-gradient(circle at 30% 25%, #d1dec5, #96b28b 55%, #68865e);
	}

	.planet--purple {
		background: radial-gradient(circle at 30% 25%, #d7b7df, #aa75b9 55%, #80528e);
	}

	.planet--gold {
		background: radial-gradient(circle at 30% 25%, #e9deaf, #bea15e 55%, #8e743c);
	}

	.meditator-center {
		width: 68%;
		height: 68%;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 10px 28px rgba(81, 103, 70, 0.14);
	}

	@keyframes rotate {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	.planet-slider {
		display: flex;
		flex-direction: column;
		align-self: flex-end;
		gap: 0.25rem;
		width: 150px;
		margin-top: 1.5rem;
		margin-right: -0.5rem;
	}

	.planet-slider label {
		color: #77707d;
		font-size: 0.7rem;
		line-height: 1.5;
	}

	.planet-slider .slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 24px;
		margin: 0;
		border-radius: 3px;
		background: transparent;
		cursor: pointer;
	}

	.planet-slider .slider::-webkit-slider-runnable-track {
		height: 4px;
		border-radius: 3px;
		background: linear-gradient(90deg, #e6e0e7, #b181be);
	}

	.planet-slider .slider::-moz-range-track {
		height: 4px;
		border-radius: 3px;
		background: linear-gradient(90deg, #e6e0e7, #b181be);
	}

	.planet-slider .slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		margin-top: -6px;
		border: none;
		border-radius: 50%;
		background: var(--hero-purple);
		box-shadow: 0 2px 4px rgba(111, 57, 129, 0.16);
	}

	.planet-slider .slider::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border: none;
		border-radius: 50%;
		background: var(--hero-purple);
		box-shadow: 0 2px 4px rgba(111, 57, 129, 0.16);
	}

	.lessons {
		scroll-margin-top: 2rem;
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
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-bottom: 3rem;
	}

	.concept-of-i {
		text-align: center;
	}

	.concept-of-i h3 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: #1a202c;
		font-weight: 600;
		background: var(--gradient-primary);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.concept-intro {
		font-size: 1.1rem;
		color: #4a5568;
		margin-bottom: 2rem;
		max-width: 600px;
		margin-left: auto;
		margin-right: auto;
	}

	.i-concepts-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	.i-concept-card {
		background: rgba(255, 255, 255, 0.9);
		border-radius: 16px;
		padding: 1.5rem;
		box-shadow: 0 10px 30px rgba(var(--sky-magenta-rgb), 0.12);
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.2);
		transition: all 0.3s ease;
		backdrop-filter: blur(5px);
	}

	.i-concept-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 35px rgba(var(--sky-magenta-rgb), 0.2);
		background: rgba(255, 255, 255, 0.95);
	}

	.i-concept-card h4 {
		font-size: 1.3rem;
		margin: 0 0 0.75rem 0;
		color: var(--sky-magenta);
		font-weight: 600;
	}

	.i-concept-card p {
		margin: 0;
		line-height: 1.6;
		color: #4a5568;
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

	@media (min-width: 700px) {
		.tips ul {
			grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		}

		.language-notes .cards-grid {
			grid-template-columns: 1fr 1fr;
		}

		.i-concepts-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 699px) {
		.language-notes .cards-grid {
			grid-template-columns: 1fr;
		}

		.i-concepts-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 939px) {
		.hero {
			grid-template-columns: 1fr;
			gap: 2.5rem;
			width: min(640px, calc(100vw - 64px));
			min-height: auto;
			padding: 2.5rem 0 1rem;
		}

		.hero__text h1 {
			font-size: clamp(3.5rem, 9vw, 5rem);
		}

		.hero__image {
			width: min(100%, 500px);
			max-width: none;
		}
	}

	@media (max-width: 600px) {
		.hero {
			width: calc(100vw - 48px);
			padding-top: 0.5rem;
			gap: 2rem;
		}

		.hero__eyebrow {
			margin-bottom: 1.5rem;
			font-size: 0.625rem;
			letter-spacing: 0.26em;
		}

		.hero__text h1 {
			font-size: clamp(2.8rem, 11.8vw, 4.5rem);
			margin-bottom: 1.4rem;
		}

		.hero__subtitle {
			font-size: 1.025rem;
		}

		.hero__description {
			font-size: 0.9375rem;
			line-height: 1.8;
		}

		.hero__actions {
			gap: 0.65rem 1.5rem;
			margin-top: 1.75rem;
		}

		.hero__actions button {
			padding-inline: 1.5rem;
		}

		.hero__note {
			font-size: 0.7rem;
		}

		.hero__image {
			padding: 0.75rem;
		}

		.planet {
			width: calc(var(--planet-size) * 0.8);
			height: calc(var(--planet-size) * 0.8);
		}

		.planet-slider {
			width: 125px;
			margin-top: 1.25rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.orbit-ring {
			animation: none;
		}

		.hero__actions button {
			transition: none;
		}
	}
</style>
