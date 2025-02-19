<!-- +page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import Post from '$lib/components/Post.svelte';
	import type { TextThought } from '$lib/types/thought';

	export let data;

	$: indexHtml = marked.parse(data.indexContent) as string;
	$: posts = data.posts.map(
		(post) =>
			({
				type: 'text' as const,
				content: post.content,
				timestamp: post.date,
				tags: ['blog'],
				id: post.date.toISOString()
			}) satisfies TextThought
	);
</script>

<svelte:head>
	<title>My Site</title>
	<meta name="description" content="My personal website and blog" />
</svelte:head>

<main class="min-h-screen bg-gray-950 text-gray-100">
	<div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
		<!-- About section -->
		<section class="prose prose-lg prose-invert mb-16 max-w-none">
			{@html indexHtml}
			<hr class="mt-8 border-gray-800" />
		</section>

		<!-- Blog posts as cards -->
		<section class="mx-auto grid w-full place-items-center gap-6 sm:gap-8">
			{#each posts as post, i}
				<Post thought={post} />
				{#if i !== posts.length - 1}
					<hr class="w-full border-gray-800" />
				{/if}
			{:else}
				<div class="prose prose-invert prose-lg">
					<p>No posts yet. Add markdown files to <code>src/content/posts/</code> to get started.</p>
				</div>
			{/each}
		</section>
	</div>
</main>

<style lang="postcss">
	:global(body) {
		background: theme(colors.gray.950);
		color: theme(colors.gray.100);
	}

	/* Basic markdown styles */
	:global(.prose) {
		@apply text-gray-100;
	}

	:global(.prose a) {
		@apply text-blue-400 no-underline hover:underline;
	}

	:global(.prose code) {
		@apply rounded bg-gray-800/50 px-1 py-0.5 text-sm backdrop-blur-sm;
	}

	:global(.prose pre) {
		@apply rounded bg-gray-800/50 p-4 backdrop-blur-sm;
	}

	:global(.prose img) {
		@apply mx-auto rounded-lg;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-gray-700 pl-4 italic;
	}
</style>
