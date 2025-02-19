<!-- +page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import Post from '$lib/components/Post.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Title from '$lib/components/Title.svelte';
	import type { TextThought } from '$lib/types/thought';

	export let data;
	let indexHtml = marked.parse(data.indexContent) as string;

	$: posts = data.posts.map((post) => ({
		type: 'text' as const,
		content: post.content,
		timestamp: post.date,
		tags: ['blog'],
		id: post.date.toISOString()
	}));
</script>

<svelte:head>
	<title>My Site</title>
	<meta name="description" content="My personal website and blog" />
</svelte:head>

<div class="min-h-screen bg-background text-text">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-8">
			<Title />
			<Nav />

			<div class="space-y-12">
				<section class="prose prose-lg max-w-none">
					{@html indexHtml}
				</section>

				<section>
					{#each posts as post, i}
						<div class="animate-fade-in">
							<Post thought={post} />
							{#if i !== posts.length - 1}
								<hr class="my-8 border-border" />
							{/if}
						</div>
					{:else}
						<div class="prose prose-lg">
							<p>
								No posts yet. Add markdown files to <code>src/content/posts/</code> to get started.
							</p>
						</div>
					{/each}
				</section>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		background: var(--background);
		color: var(--text);
	}

	:global(body.custom-cursor),
	:global(body.custom-cursor *) {
		cursor: none !important;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
	}

	:global(.prose) {
		color: var(--text);
	}

	:global(.prose h1, .prose h2, .prose h3, .prose h4) {
		@apply gradient-text;
		color: var(--text);
	}

	:global(.gradient-text) {
		background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 100% 100%;
	}

	:global(.prose a) {
		@apply relative transition-all duration-200;
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

	:global(.prose code) {
		@apply rounded px-1 py-0.5 text-sm;
		background-color: color-mix(in srgb, var(--border) 30%, transparent);
		color: var(--text);
	}

	:global(.prose pre) {
		@apply rounded p-4;
		background-color: color-mix(in srgb, var(--border) 30%, transparent);
		backdrop-filter: blur(8px);
	}

	:global(.prose img) {
		@apply mx-auto rounded-lg;
	}

	:global(.prose blockquote) {
		@apply border-l-4 pl-4 italic;
		border-color: var(--border);
		color: var(--text-secondary);
	}
</style>
