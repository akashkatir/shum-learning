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

	// Planet visibility control
	let visiblePlanets = 15; // Default to show all planets
	const maxPlanets = 15;
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
				Start Lesson 1</button
			>
		</div>
		<div class="hero__image">
			<div class="orbital-system">
				<!-- Ring 1 - Innermost -->
				<div class="orbit-ring orbit-ring-1">
					{#if visiblePlanets >= 1}<div class="planet planet-1"></div>{/if}
					{#if visiblePlanets >= 2}<div class="planet planet-2"></div>{/if}
					{#if visiblePlanets >= 10}<div class="planet planet-10"></div>{/if}
					{#if visiblePlanets >= 11}<div class="planet planet-11"></div>{/if}
				</div>

				<!-- Ring 2 - Middle -->
				<div class="orbit-ring orbit-ring-2">
					{#if visiblePlanets >= 3}<div class="planet planet-3"></div>{/if}
					{#if visiblePlanets >= 4}<div class="planet planet-4"></div>{/if}
					{#if visiblePlanets >= 5}<div class="planet planet-5"></div>{/if}
					{#if visiblePlanets >= 12}<div class="planet planet-12"></div>{/if}
					{#if visiblePlanets >= 13}<div class="planet planet-13"></div>{/if}
				</div>

				<!-- Ring 3 - Outermost -->
				<div class="orbit-ring orbit-ring-3">
					{#if visiblePlanets >= 6}<div class="planet planet-6"></div>{/if}
					{#if visiblePlanets >= 7}<div class="planet planet-7"></div>{/if}
					{#if visiblePlanets >= 8}<div class="planet planet-8"></div>{/if}
					{#if visiblePlanets >= 9}<div class="planet planet-9"></div>{/if}
					{#if visiblePlanets >= 14}<div class="planet planet-14"></div>{/if}
					{#if visiblePlanets >= 15}<div class="planet planet-15"></div>{/if}
				</div>

				<!-- Central Meditator Image -->
				<img
					src="/images/circle-meditator.png"
					alt="Meditator illustration"
					class="meditator-center"
				/>
			</div>

			<!-- Planet Visibility Slider -->
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
		max-width: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
	}

	.orbital-system {
		position: relative;
		width: 500px;
		height: 500px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.orbit-ring {
		position: absolute;
		border: 1px solid rgba(var(--sky-magenta-rgb), 0.1);
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* box-shadow:
			0 0 15px rgba(var(--sky-magenta-rgb), 0.1),
			inset 0 0 15px rgba(var(--cambridge-blue-rgb), 0.05); */
	}

	.orbit-ring-1 {
		width: 380px;
		height: 380px;
		animation: rotate 20s linear infinite;
	}

	.orbit-ring-2 {
		width: 440px;
		height: 440px;
		animation: rotate 30s linear infinite reverse;
	}

	.orbit-ring-3 {
		width: 500px;
		height: 500px;
		animation: rotate 40s linear infinite;
	}

	.planet {
		position: absolute;
		border-radius: 50%;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		z-index: 2;
	}

	/* Planet 1, 2, 10, 11 - Ring 1 (190px radius from center) */
	.planet-1 {
		width: 12px;
		height: 12px;
		background: radial-gradient(circle at 30% 30%, var(--tea-green), var(--olivine));
		top: 54px; /* 250 - 190 - 6 */
		left: 244px; /* 250 + 0 - 6 */
	}

	.planet-2 {
		width: 8px;
		height: 8px;
		background: radial-gradient(circle at 30% 30%, var(--sky-magenta), var(--cambridge-blue));
		top: 246px; /* 250 + 0 - 4 */
		left: 436px; /* 250 + 190 - 4 */
	}

	.planet-10 {
		width: 10px;
		height: 10px;
		background: radial-gradient(circle at 30% 30%, var(--yellow-green), var(--sky-magenta));
		top: 435px; /* 250 + 190 - 5 */
		left: 245px; /* 250 + 0 - 5 */
	}

	.planet-11 {
		width: 14px;
		height: 14px;
		background: radial-gradient(circle at 30% 30%, var(--cambridge-blue), var(--olivine));
		top: 243px; /* 250 + 0 - 7 */
		left: 53px; /* 250 - 190 - 7 */
	}

	/* Planet 3, 4, 5, 12, 13 - Ring 2 (220px radius from center) */
	.planet-3 {
		width: 16px;
		height: 16px;
		background: radial-gradient(circle at 30% 30%, var(--yellow-green), var(--tea-green));
		top: 22px; /* 250 - 220 - 8 */
		left: 242px; /* 250 + 0 - 8 */
	}

	.planet-4 {
		width: 10px;
		height: 10px;
		background: radial-gradient(circle at 30% 30%, var(--cambridge-blue), var(--sky-magenta));
		top: 113px; /* 250 - 220*cos(72°) - 5 */
		left: 460px; /* 250 + 220*sin(72°) - 5 */
	}

	.planet-5 {
		width: 14px;
		height: 14px;
		background: radial-gradient(circle at 30% 30%, var(--olivine), var(--yellow-green));
		top: 387px; /* 250 + 220*cos(144°) - 7 */
		left: 393px; /* 250 + 220*sin(144°) - 7 */
	}

	.planet-12 {
		width: 12px;
		height: 12px;
		background: radial-gradient(circle at 30% 30%, var(--olivine), var(--tea-green));
		top: 387px; /* 250 + 220*cos(216°) - 6 */
		left: 101px; /* 250 + 220*sin(216°) - 6 */
	}

	.planet-13 {
		width: 18px;
		height: 18px;
		background: radial-gradient(circle at 30% 30%, var(--sky-magenta), var(--yellow-green));
		top: 113px; /* 250 - 220*cos(288°) - 9 */
		left: 22px; /* 250 + 220*sin(288°) - 9 */
	}

	/* Planet 6, 7, 8, 9, 14, 15 - Ring 3 (250px radius from center) */
	.planet-6 {
		width: 18px;
		height: 18px;
		background: radial-gradient(circle at 30% 30%, var(--sky-magenta), var(--olivine));
		top: -9px; /* 250 - 250 - 9 */
		left: 241px; /* 250 + 0 - 9 */
	}

	.planet-7 {
		width: 12px;
		height: 12px;
		background: radial-gradient(circle at 30% 30%, var(--tea-green), var(--cambridge-blue));
		top: 108px; /* 250 - 250*cos(60°) - 6 */
		left: 460px; /* 250 + 250*sin(60°) - 6 */
	}

	.planet-8 {
		width: 20px;
		height: 20px;
		background: radial-gradient(circle at 30% 30%, var(--yellow-green), var(--sky-magenta));
		top: 365px; /* 250 + 250*cos(120°) - 10 */
		left: 456px; /* 250 + 250*sin(120°) - 10 */
	}

	.planet-9 {
		width: 14px;
		height: 14px;
		background: radial-gradient(circle at 30% 30%, var(--cambridge-blue), var(--tea-green));
		top: 493px; /* 250 + 250 - 7 */
		left: 243px; /* 250 + 0 - 7 */
	}

	.planet-14 {
		width: 16px;
		height: 16px;
		background: radial-gradient(circle at 30% 30%, var(--tea-green), var(--sky-magenta));
		top: 365px; /* 250 + 250*cos(240°) - 8 */
		left: 26px; /* 250 + 250*sin(240°) - 8 */
	}

	.planet-15 {
		width: 22px;
		height: 22px;
		background: radial-gradient(circle at 30% 30%, var(--yellow-green), var(--cambridge-blue));
		top: 108px; /* 250 - 250*cos(300°) - 11 */
		left: 11px; /* 250 + 250*sin(300°) - 11 */
	}

	.meditator-center {
		width: 320px;
		height: 320px;
		border-radius: 50%;
		object-fit: cover;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
		/* border: 4px solid rgba(255, 255, 255, 0.8); */
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		z-index: 1;
	}

	.meditator-center:hover {
		transform: scale(1.05);
		box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
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
		position: absolute;
		bottom: 20px;
		right: 20px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 16px;
		padding: 12px 16px;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		display: flex;
		flex-direction: column;
		gap: 8px;
		min-width: 140px;
		z-index: 10;
	}

	.planet-slider label {
		font-size: 0.85rem;
		font-weight: 600;
		color: #4a5568;
		text-align: center;
		margin: 0;
	}

	.planet-slider .slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 6px;
		border-radius: 3px;
		background: linear-gradient(90deg, #e2e8f0 0%, var(--sky-magenta) 100%);
		outline: none;
		opacity: 0.8;
		transition: opacity 0.3s ease;
	}

	.planet-slider .slider:hover {
		opacity: 1;
	}

	.planet-slider .slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--gradient-primary);
		cursor: pointer;
		box-shadow: 0 2px 8px rgba(var(--cambridge-blue-rgb), 0.3);
		transition: all 0.2s ease;
	}

	.planet-slider .slider::-webkit-slider-thumb:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(var(--cambridge-blue-rgb), 0.4);
	}

	.planet-slider .slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--gradient-primary);
		cursor: pointer;
		border: none;
		box-shadow: 0 2px 8px rgba(var(--cambridge-blue-rgb), 0.3);
		transition: all 0.2s ease;
	}

	.planet-slider .slider::-moz-range-thumb:hover {
		transform: scale(1.1);
		box-shadow: 0 4px 12px rgba(var(--cambridge-blue-rgb), 0.4);
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
			max-width: 500px;
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

	@media (max-width: 600px) {
		.planet-slider {
			bottom: 10px;
			right: 10px;
			padding: 10px 12px;
			min-width: 120px;
		}

		.planet-slider label {
			font-size: 0.8rem;
		}
	}
</style>
