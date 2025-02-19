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
	let isHovering = false;
	let indexHtml: string;
	let lastCursorLog = 0;

	function updateCursor(e: MouseEvent) {
		// Get the actual mouse coordinates relative to the viewport
		mouseX = e.clientX;
		mouseY = e.clientY;

		// Log every few seconds to avoid spam
		const now = Date.now();
		if (now - lastCursorLog > 2000) {
			console.log('Cursor position:', {
				mouseX,
				mouseY,
				pageX: e.pageX,
				pageY: e.pageY,
				screenX: e.screenX,
				screenY: e.screenY,
				scrollX: window.scrollX,
				scrollY: window.scrollY
			});
			lastCursorLog = now;
		}

		// Apply the transform directly to both elements
		const transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
		cursor.style.transform = transform;
		cursorDot.style.transform = transform;
	}

	function handleMouseEnter(e: MouseEvent) {
		if ((e.target as HTMLElement).tagName === 'A') {
			isHovering = true;
		}
	}

	function handleMouseLeave(e: MouseEvent) {
		if ((e.target as HTMLElement).tagName === 'A') {
			isHovering = false;
		}
	}

	$: {
		console.log('Parsing markdown content');
		indexHtml = marked.parse(data.indexContent) as string;
		console.log('Sample of parsed HTML:', indexHtml.substring(0, 200));
	}

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

	onMount(() => {
		console.log('Component mounted');
		// Add smooth scrolling to the whole page
		document.documentElement.style.scrollBehavior = 'smooth';

		// Add a class to body when JS is available
		document.body.classList.add('js-loaded');
		document.body.classList.add('custom-cursor');

		// Initialize cursor position and visibility
		if (cursor && cursorDot) {
			console.log('Initializing cursor elements:', {
				cursor: cursor.className,
				cursorDot: cursorDot.className
			});

			// Set initial position to center of screen
			mouseX = window.innerWidth / 2;
			mouseY = window.innerHeight / 2;
			cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
			cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

			// Make cursors visible
			requestAnimationFrame(() => {
				cursor.classList.add('ready');
				cursorDot.classList.add('ready');
				console.log('Added ready classes:', {
					cursor: cursor.className,
					cursorDot: cursorDot.className
				});
			});
		}

		// Log all link elements for debugging
		const links = document.querySelectorAll('a');
		console.log('Found links:', links.length);
		links.forEach((link) => {
			console.log('Link href:', link.href, 'Text:', link.textContent?.trim());
		});

		// Add event listeners directly to all links
		links.forEach((link) => {
			link.addEventListener('mouseenter', handleMouseEnter);
			link.addEventListener('mouseleave', handleMouseLeave);
		});

		document.addEventListener('mousemove', updateCursor);

		// Show/hide cursor when window loses/gains focus
		window.addEventListener('focus', () => {
			cursor?.classList.add('ready');
			cursorDot?.classList.add('ready');
			console.log('Window focus - adding ready class');
		});

		window.addEventListener('blur', () => {
			cursor?.classList.remove('ready');
			cursorDot?.classList.remove('ready');
			console.log('Window blur - removing ready class');
		});

		// Set up intersection observer for fade-in animations
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						requestAnimationFrame(() => {
							entry.target.classList.add('show');
						});
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px'
			}
		);

		// Initialize animations with a slight delay to ensure proper initial state
		requestAnimationFrame(() => {
			document.querySelectorAll('.animate-on-scroll').forEach((el) => {
				el.classList.add('ready');
				if (el.getBoundingClientRect().top < window.innerHeight) {
					el.classList.add('show');
				} else {
					observer.observe(el);
				}
			});
		});

		return () => {
			document.removeEventListener('mousemove', updateCursor);
			links.forEach((link) => {
				link.removeEventListener('mouseenter', handleMouseEnter);
				link.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	});
</script>

<svelte:head>
	<title>My Site</title>
	<meta name="description" content="My personal website and blog" />
</svelte:head>

<!-- Custom cursor elements -->
<div bind:this={cursor} class="cursor" class:hover={isHovering} />
<div bind:this={cursorDot} class="cursor-dot" class:hover={isHovering} />

<main class="min-h-screen bg-gray-950 text-gray-100">
	<div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
		<!-- About section -->
		<section class="animate-on-scroll ready show prose prose-lg prose-invert mb-16 max-w-none">
			{@html indexHtml}
			<hr class="mt-8 border-gray-800" />
		</section>

		<!-- Blog posts as cards -->
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

	/* Animation styles */
	.animate-on-scroll {
		opacity: 1;
		transform: translateY(0);
		transition:
			opacity 0.6s ease-out,
			transform 0.6s ease-out;
		will-change: opacity, transform;
	}

	.animate-on-scroll.ready:not(.show) {
		opacity: 0;
		transform: translateY(20px);
	}

	.animate-on-scroll.show {
		opacity: 1;
		transform: translateY(0);
	}

	/* Basic markdown styles */
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
		position: relative;
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

	/* Custom cursor styles */
	:global(body.custom-cursor) {
		cursor: none;
	}

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
		transform-origin: 0 0;
		transition:
			width 0.3s ease,
			height 0.3s ease;
		z-index: 9999;
		margin-left: -18px; /* Half the width */
		margin-top: -18px; /* Half the height */
		backdrop-filter: blur(4px);
		background: theme(colors.blue.400 / 5%);
	}

	.cursor.hover {
		width: 48px;
		height: 48px;
		margin-left: -24px; /* Half the hover width */
		margin-top: -24px; /* Half the hover height */
		border-color: theme(colors.blue.400);
		background-color: theme(colors.blue.400 / 10%);
		backdrop-filter: none;
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
		transform-origin: 0 0;
		transition:
			width 0.3s ease,
			height 0.3s ease;
		z-index: 9999;
		margin-left: -2px; /* Half the width */
		margin-top: -2px; /* Half the height */
		backdrop-filter: blur(2px);
	}

	.cursor-dot.hover {
		width: 8px;
		height: 8px;
		margin-left: -4px; /* Half the hover width */
		margin-top: -4px; /* Half the hover height */
		backdrop-filter: none;
	}
</style>
