<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import PageLayout from '$lib/components/PageLayout.svelte';

	// Placeholder photo data
	const photos = [
		{ id: 1, url: 'https://picsum.photos/800/600?random=1', alt: 'Random photo 1' },
		{ id: 2, url: 'https://picsum.photos/800/600?random=2', alt: 'Random photo 2' },
		{ id: 3, url: 'https://picsum.photos/800/600?random=3', alt: 'Random photo 3' },
		{ id: 4, url: 'https://picsum.photos/800/600?random=4', alt: 'Random photo 4' },
		{ id: 5, url: 'https://picsum.photos/800/600?random=5', alt: 'Random photo 5' }
	];

	let container: HTMLElement;
	let currentPhotoIndex = 0;

	function handleScroll(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY;
		container.scrollLeft += delta;
	}

	function nextPhoto() {
		if (currentPhotoIndex < photos.length - 1) {
			currentPhotoIndex++;
			scrollToPhoto(currentPhotoIndex);
		}
	}

	function prevPhoto() {
		if (currentPhotoIndex > 0) {
			currentPhotoIndex--;
			scrollToPhoto(currentPhotoIndex);
		}
	}

	function scrollToPhoto(index: number) {
		if (container) {
			const photoWidth = container.clientWidth;
			container.scrollTo({
				left: photoWidth * index,
				behavior: 'smooth'
			});
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') {
			nextPhoto();
		} else if (e.key === 'ArrowLeft') {
			prevPhoto();
		}
	}

	onMount(() => {
		if (container) {
			container.addEventListener('wheel', handleScroll, { passive: false });
			window.addEventListener('keydown', handleKeydown);
		}

		return () => {
			if (container) {
				container.removeEventListener('wheel', handleScroll);
				window.removeEventListener('keydown', handleKeydown);
			}
		};
	});
</script>

<PageLayout title="Photos" description="Photo gallery showcasing my work and experiences.">
	<div class="gallery-container">
		<button class="nav-button prev" on:click={prevPhoto} disabled={currentPhotoIndex === 0}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>

		<div class="photos-container" bind:this={container}>
			{#each photos as photo, i}
				<div
					class="photo-wrapper"
					class:active={i === currentPhotoIndex}
					in:fade={{ duration: 300, delay: i * 100 }}
				>
					<img src={photo.url} alt={photo.alt} loading="lazy" />
				</div>
			{/each}
		</div>

		<button
			class="nav-button next"
			on:click={nextPhoto}
			disabled={currentPhotoIndex === photos.length - 1}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>

		<div class="photo-counter">
			{currentPhotoIndex + 1} / {photos.length}
		</div>
	</div>
</PageLayout>

<style lang="postcss">
	.gallery-container {
		height: calc(100vh - 16rem);
		display: flex;
		align-items: center;
		position: relative;
		background-color: color-mix(in srgb, var(--border) 30%, transparent);
		backdrop-filter: blur(8px);
		border-radius: 1rem;
		border: 1px solid var(--border);
	}

	.photos-container {
		width: 100%;
		height: 100%;
		display: flex;
		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.photos-container::-webkit-scrollbar {
		display: none;
	}

	.photo-wrapper {
		flex: 0 0 100%;
		height: 100%;
		scroll-snap-align: start;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		transition: all 0.3s ease;
	}

	.photo-wrapper img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
		border-radius: 8px;
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.photo-wrapper.active img {
		transform: scale(1.02);
	}

	.nav-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background: rgba(0, 0, 0, 0.6);
		border: none;
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		z-index: 10;
		color: white;
		padding: 0.75rem;
	}

	.nav-button:hover {
		background: rgba(0, 0, 0, 0.8);
	}

	.nav-button:disabled {
		opacity: 0.3;
		cursor: not-allowed;
	}

	.nav-button.prev {
		left: 1rem;
	}

	.nav-button.next {
		right: 1rem;
	}

	.nav-button svg {
		width: 24px;
		height: 24px;
	}

	.photo-counter {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.6);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		font-size: 0.875rem;
		backdrop-filter: blur(4px);
	}
</style>
