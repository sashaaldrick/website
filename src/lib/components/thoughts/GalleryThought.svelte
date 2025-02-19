<!-- GalleryThought.svelte -->
<script lang="ts">
	import { animate } from '@motionone/svelte';
	import type { GalleryThought } from '$lib/types/thought';

	export let thought: GalleryThought;

	let currentIndex = 0;
	let touchStartX = 0;
	let isDragging = false;

	$: currentImage = thought.images[currentIndex];

	function nextImage() {
		currentIndex = (currentIndex + 1) % thought.images.length;
	}

	function prevImage() {
		currentIndex = (currentIndex - 1 + thought.images.length) % thought.images.length;
	}

	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.touches[0].clientX;
		isDragging = true;
	}

	function handleTouchMove(event: TouchEvent) {
		if (!isDragging) return;
		const touchEndX = event.touches[0].clientX;
		const diff = touchEndX - touchStartX;

		if (Math.abs(diff) > 50) {
			if (diff > 0) {
				prevImage();
			} else {
				nextImage();
			}
			isDragging = false;
		}
	}

	function handleTouchEnd() {
		isDragging = false;
	}
</script>

<div
	class="gallery-thought"
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
>
	<div class="gallery-container relative overflow-hidden rounded-lg">
		<div class="aspect-w-16 aspect-h-9">
			<img
				src={currentImage.url}
				alt={currentImage.alt}
				class="h-full w-full object-cover"
				use:animate={{
					opacity: [0, 1],
					scale: [0.95, 1],
					duration: 0.3,
					easing: 'ease-out'
				}}
			/>
		</div>

		{#if currentImage.caption}
			<div class="caption absolute right-0 bottom-0 left-0 bg-black/60 p-4 backdrop-blur-sm">
				<p class="text-sm text-white/90">{currentImage.caption}</p>
			</div>
		{/if}

		{#if thought.images.length > 1}
			<button class="nav-button left-2" on:click={prevImage} aria-label="Previous image">
				←
			</button>
			<button class="nav-button right-2" on:click={nextImage} aria-label="Next image"> → </button>

			<div class="dots absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
				{#each thought.images as _, i}
					<button
						class="h-2 w-2 rounded-full transition-colors"
						class:active={i === currentIndex}
						on:click={() => (currentIndex = i)}
						aria-label={`Go to image ${i + 1}`}
					></button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.gallery-container {
		background: theme(colors.gray.900);
		border: 1px solid theme(colors.gray.700);
	}

	.nav-button {
		@apply absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center;
		@apply rounded-full bg-black/40 text-white backdrop-blur-sm;
		@apply transition-colors hover:bg-black/60;
		@apply focus:ring-2 focus:ring-blue-500 focus:outline-none;
	}

	.dots button {
		background: theme(colors.gray.500/40);
	}

	.dots button.active {
		background: theme(colors.white);
	}

	/* Keyboard focus styles */
	:global(.gallery-thought:focus-within) {
		@apply ring-opacity-50 rounded-lg ring-2 ring-blue-500;
	}
</style>
