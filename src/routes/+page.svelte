<!-- +page.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import Post from '$lib/components/Post.svelte';
	import type { TextThought } from '$lib/types/thought';
	import { onMount } from 'svelte';

	export let data;

	let cursor: HTMLDivElement;
	let cursorDot: HTMLDivElement;
	let mouseX = 0;
	let mouseY = 0;
	let targetX = 0;
	let targetY = 0;
	let isHovering = false;
	let rafId: number;
	let indexHtml = marked.parse(data.indexContent) as string;

	function updateCursor() {
		// Smooth interpolation
		mouseX += (targetX - mouseX) * 0.2;
		mouseY += (targetY - mouseY) * 0.2;

		const transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
		cursor.style.transform = transform;
		cursorDot.style.transform = transform;

		rafId = requestAnimationFrame(updateCursor);
	}

	function handleMouseMove(e: MouseEvent) {
		targetX = e.clientX;
		targetY = e.clientY;
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
		document.documentElement.style.scrollBehavior = 'smooth';
		document.body.classList.add('js-loaded', 'custom-cursor');

		// Initialize cursor
		if (cursor && cursorDot) {
			targetX = mouseX = window.innerWidth / 2;
			targetY = mouseY = window.innerHeight / 2;
			const transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
			cursor.style.transform = transform;
			cursorDot.style.transform = transform;
			requestAnimationFrame(() => {
				cursor.classList.add('ready');
				cursorDot.classList.add('ready');
			});
		}

		document.querySelectorAll('a').forEach((link) => {
			link.addEventListener('mouseenter', () => handleLinkHover(true));
			link.addEventListener('mouseleave', () => handleLinkHover(false));
		});

		// Set up animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('show');
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
		);

		requestAnimationFrame(() => {
			document.querySelectorAll('.animate-on-scroll').forEach((el) => {
				el.classList.add('ready');
				el.getBoundingClientRect().top < window.innerHeight
					? el.classList.add('show')
					: observer.observe(el);
			});
		});

		document.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('focus', () => cursor?.classList.add('ready'));
		window.addEventListener('blur', () => cursor?.classList.remove('ready'));

		// Start the animation loop
		rafId = requestAnimationFrame(updateCursor);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			cancelAnimationFrame(rafId);
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
	<div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
		<section class="animate-on-scroll ready show prose prose-lg prose-invert mb-16 max-w-none">
			{@html indexHtml}
			<hr class="mt-8 border-gray-800" />
		</section>

		<section class="mx-auto grid w-full place-items-center gap-6 sm:gap-8">
			{#each posts as post, i}
				<div class="animate-on-scroll ready show w-full">
					<Post thought={post} />
					{#if i !== posts.length - 1}
						<hr class="w-full border-gray-800" />
					{/if}
				</div>
			{:else}
				<div class="prose prose-invert prose-lg animate-on-scroll ready show">
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

	.animate-on-scroll {
		opacity: 1;
		transform: translateY(0);
		transition: all 0.6s ease-out;
		will-change: opacity, transform;
	}

	.animate-on-scroll.ready:not(.show) {
		opacity: 0;
		transform: translateY(20px);
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
		animation: gradient 8s ease infinite;
		background-size: 200% 200%;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	:global(.prose a) {
		@apply relative text-blue-400 transition-all duration-200;
		text-decoration: none;
		background: linear-gradient(to right, theme(colors.blue.400), theme(colors.purple.400));
		background-size: 0 2px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: all 0.3s ease;
		z-index: 2;
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

	:global(body.custom-cursor),
	:global(body.custom-cursor *) {
		cursor: none;
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
		transform-origin: center;
		z-index: 9999;
		margin: -18px 0 0 -18px;
		background: theme(colors.blue.400 / 5%);
		will-change: transform;
	}

	.cursor.hover {
		width: 48px;
		height: 48px;
		margin: -24px 0 0 -24px;
		border-color: theme(colors.blue.400);
		background-color: theme(colors.blue.400 / 10%);
		transition:
			width 0.3s ease,
			height 0.3s ease,
			margin 0.3s ease,
			border-color 0.3s ease,
			background-color 0.3s ease;
	}

	.cursor-dot {
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 4px;
		height: 4px;
		background: theme(colors.blue.400 / 90%);
		border-radius: 50%;
		transform-origin: center;
		z-index: 9999;
		margin: -2px 0 0 -2px;
		will-change: transform;
	}

	.cursor-dot.hover {
		width: 8px;
		height: 8px;
		margin: -4px 0 0 -4px;
		transition:
			width 0.3s ease,
			height 0.3s ease,
			margin 0.3s ease;
	}
</style>
