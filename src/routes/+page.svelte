<!-- +page.svelte -->
<script lang="ts">
	import { marked } from 'marked';

	export let data;

	$: indexHtml = marked.parse(data.indexContent) as string;
	$: posts = data.posts.map((post) => ({
		...post,
		html: marked.parse(post.content) as string
	}));
</script>

<svelte:head>
	<title>My Site</title>
	<meta name="description" content="My personal website and blog" />
</svelte:head>

<main class="min-h-screen bg-gray-950 text-gray-100">
	<div class="container mx-auto px-4 py-16">
		<!-- About section -->
		<section class="prose prose-lg prose-invert mb-16 max-w-none">
			{@html indexHtml}
			<hr class="mt-8 border-gray-800" />
		</section>

		<!-- Blog posts -->
		<section>
			<h2 class="mb-8 text-2xl font-bold">Latest Posts</h2>
			{#each posts as post}
				<article class="prose prose-lg prose-invert mb-16 max-w-none">
					{@html post.html}
					<div class="mt-4 text-sm text-gray-400">
						Posted on {post.date.toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</div>
					<hr class="mt-8 border-gray-800" />
				</article>
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
		@apply rounded bg-gray-800 px-1 py-0.5 text-sm;
	}

	:global(.prose pre) {
		@apply rounded bg-gray-800 p-4;
	}

	:global(.prose img) {
		@apply mx-auto rounded-lg;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-gray-700 pl-4 italic;
	}
</style>
