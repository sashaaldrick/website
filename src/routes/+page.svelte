<!-- +page.svelte -->
<script lang="ts">
	let title = 'Welcome to my site';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="My personal website" />
</svelte:head>

<main class="min-h-screen bg-gray-950 text-gray-100">
	<div class="container mx-auto px-4 py-16">
		<h1 class="mb-4 text-4xl font-bold">{title}</h1>
		<p class="text-xl text-gray-300">
			This is a simple personal website built with SvelteKit and Tailwind CSS.
		</p>
	</div>
</main>

<style lang="postcss">
	:global(body) {
		background: theme(colors.gray.950);
		color: theme(colors.gray.100);
	}
</style>
