<!-- +page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import Post from '$lib/components/Post.svelte';
	import NowStatus from '$lib/components/NowStatus.svelte';
	import type { TextThought } from '$lib/types/thought';
	import { onMount } from 'svelte';

	export let data;

	let cursor: HTMLDivElement;
	let cursorDot: HTMLDivElement;
	let mouseX = 0;
	let mouseY = 0;
	let isHovering = false;
	let indexHtml = marked.parse(data.indexContent) as string;

	function handleMouseMove(e: MouseEvent) {
		if (!cursor || !cursorDot) return;
		mouseX = e.clientX;
		mouseY = e.clientY;
		cursor.style.transform = `translate3d(${mouseX - 18}px, ${mouseY - 18}px, 0)`;
		cursorDot.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
	}

	function handleLinkHover(isEntering: boolean) {
		isHovering = isEntering;
	}

	$: posts = data.posts.map((post) => ({
		type: 'text' as const,
		content: post.content,
		timestamp: post.date,
		tags: ['blog'],
		id: post.date.toISOString()
	}));

	onMount(() => {
		document.body.classList.add('js-loaded', 'custom-cursor');

		document.querySelectorAll('a').forEach((link) => {
			link.addEventListener('mouseenter', () => handleLinkHover(true));
			link.addEventListener('mouseleave', () => handleLinkHover(false));
		});

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<svelte:head>
	<title>My Site</title>
	<meta name="description" content="My personal website and blog" />
</svelte:head>

<div bind:this={cursor} class="cursor" class:hover={isHovering} />
<div bind:this={cursorDot} class="cursor-dot" class:hover={isHovering} />

<main class="min-h-screen bg-gray-950 text-gray-100">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<section class="prose prose-lg prose-invert max-w-none">
				{@html indexHtml}
			</section>

			<section>
				<NowStatus />
			</section>

			<section>
				{#each posts as post, i}
					<div class="animate-fade-in">
						<Post thought={post} />
						{#if i !== posts.length - 1}
							<hr class="my-8 border-gray-800" />
						{/if}
					</div>
				{:else}
					<div class="prose prose-invert prose-lg">
						<p>
							No posts yet. Add markdown files to <code>src/content/posts/</code> to get started.
						</p>
					</div>
				{/each}
			</section>
		</div>
	</div>
</main>

<style lang="postcss">
	:global(body) {
		background: theme(colors.gray.950);
		color: theme(colors.gray.100);
	}

	:global(body.custom-cursor),
	:global(body.custom-cursor *) {
		cursor: none !important;
	}

	.cursor {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 36px;
		height: 36px;
		border: 1px solid theme(colors.blue.400 / 40%);
		border-radius: 50%;
		z-index: 9999;
		background: theme(colors.blue.400 / 5%);
		backdrop-filter: blur(8px);
		will-change: transform;
		transition:
			width 0.3s ease,
			height 0.3s ease,
			backdrop-filter 0.3s ease,
			border-color 0.3s ease,
			background 0.3s ease;
	}

	.cursor.hover {
		width: 48px;
		height: 48px;
		border-color: theme(colors.blue.400);
		background: theme(colors.blue.400 / 10%);
		backdrop-filter: none;
	}

	.cursor-dot {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 4px;
		height: 4px;
		background: theme(colors.blue.400);
		border-radius: 50%;
		z-index: 9999;
		will-change: transform;
		transition:
			width 0.3s ease,
			height 0.3s ease;
	}

	.cursor-dot.hover {
		width: 6px;
		height: 6px;
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
		@apply text-gray-100;
	}

	:global(.prose h1, .prose h2, .prose h3, .prose h4) {
		@apply gradient-text;
	}

	:global(.gradient-text) {
		background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 100% 100%;
	}

	:global(.prose a) {
		@apply relative text-blue-400 transition-all duration-200;
		text-decoration: none;
		background: linear-gradient(to right, theme(colors.blue.400), theme(colors.purple.400));
		background-size: 0 2px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: all 0.3s ease;
	}

	:global(.prose a:hover) {
		@apply text-blue-300;
		background-size: 100% 2px;
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
