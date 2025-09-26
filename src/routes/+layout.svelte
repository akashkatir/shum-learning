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
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		background-attachment: fixed;
		color: #1a202c;
		line-height: 1.6;
		min-height: 100vh;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}
</style>
