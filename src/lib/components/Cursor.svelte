<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let cursor: HTMLDivElement;
	let cursorDot: HTMLDivElement;
	let mouseX = browser ? window.innerWidth / 2 : 0;
	let mouseY = browser ? window.innerHeight / 2 : 0;
	let isHovering = false;

	function handleMouseMove(e: MouseEvent) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		updateCursorPosition();
	}

	function updateCursorPosition() {
		if (!cursor || !cursorDot) return;

		requestAnimationFrame(() => {
			cursor.style.transform = `translate3d(${mouseX - 18}px, ${mouseY - 18}px, 0)`;
			cursorDot.style.transform = `translate3d(${mouseX - 2}px, ${mouseY - 2}px, 0)`;
		});
	}

	function handleLinkHover(isEntering: boolean) {
		isHovering = isEntering;
	}

	onMount(() => {
		if (!browser) return;

		document.body.classList.add('js-loaded', 'custom-cursor');

		const interactiveElements = document.querySelectorAll('a, button');
		interactiveElements.forEach((element) => {
			element.addEventListener('mouseenter', () => handleLinkHover(true));
			element.addEventListener('mouseleave', () => handleLinkHover(false));
		});

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			interactiveElements.forEach((element) => {
				element.removeEventListener('mouseenter', () => handleLinkHover(true));
				element.removeEventListener('mouseleave', () => handleLinkHover(false));
			});
		};
	});
</script>

<div bind:this={cursor} class="cursor" class:hover={isHovering} />
<div bind:this={cursorDot} class="cursor-dot" class:hover={isHovering} />

<style lang="postcss">
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
</style>
