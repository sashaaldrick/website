<script lang="ts">
	import Nav from './Nav.svelte';
	import Title from './Title.svelte';
	import { marked } from 'marked';

	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let markdownContent: string | undefined = undefined;

	$: parsedMarkdown = markdownContent ? marked.parse(markdownContent) : '';
</script>

<svelte:head>
	{#if title}
		<title>{title} | My Site</title>
	{/if}
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div class="min-h-screen bg-background text-text">
	<div class="mx-auto px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-8">
			<Title />
			<Nav />

			{#if markdownContent}
				<section class="prose prose-lg max-w-none">
					{@html parsedMarkdown}
				</section>
			{/if}

			<slot />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(.prose) {
		color: var(--text);
	}

	:global(.prose h1, .prose h2, .prose h3, .prose h4) {
		background: linear-gradient(135deg, theme(colors.blue.400), theme(colors.purple.400));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 100% 100%;
		color: var(--text);
	}

	:global(.prose a) {
		position: relative;
		transition: all 0.2s;
		color: theme(colors.blue.400);
		text-decoration: none;
		background: linear-gradient(to right, theme(colors.blue.400), theme(colors.purple.400));
		background-size: 0 2px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: all 0.3s ease;
	}

	:global(.prose a:hover) {
		color: theme(colors.blue.300);
		background-size: 100% 2px;
	}
</style>
