<script lang="ts">
	import { onMount } from 'svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { progressStore } from '$lib/stores/progress';

	let { children } = $props();

	onMount(() => {
		progressStore.initialize();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{@render children?.()}

<style>
	:global(:root) {
		/* Palette - HEX */
		--tea-green: #d5e9c7;
		--sky-magenta: #b865af;
		--yellow-green: #c0d361;
		--cambridge-blue: #8cc29a;
		--olivine: #8eb561;

		/* Palette - RGB for alpha usage */
		--tea-green-rgb: 213, 233, 199;
		--sky-magenta-rgb: 184, 101, 175;
		--yellow-green-rgb: 192, 211, 97;
		--cambridge-blue-rgb: 140, 194, 154;
		--olivine-rgb: 142, 181, 97;

		/* Gradients */
		--gradient-brand: linear-gradient(
			135deg,
			var(--tea-green),
			var(--sky-magenta),
			var(--yellow-green),
			var(--cambridge-blue),
			var(--olivine)
		);
		--gradient-primary: linear-gradient(135deg, var(--sky-magenta), var(--cambridge-blue));
		--gradient-primary-hover: linear-gradient(135deg, var(--cambridge-blue), var(--sky-magenta));
		--gradient-success: linear-gradient(135deg, var(--olivine), var(--yellow-green));
		--gradient-success-hover: linear-gradient(135deg, var(--yellow-green), var(--olivine));
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		background: var(--gradient-brand);
		background-attachment: fixed;
		color: #1a202c;
		line-height: 1.6;
		min-height: 100vh;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
</style>
