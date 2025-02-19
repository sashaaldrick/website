<!-- ThoughtStream.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from '@motionone/svelte';
	import ThoughtCard from './ThoughtCard.svelte';
	import type { Thought } from '$lib/types/thought';

	export let thoughts: Thought[] = [];
	export let loading = false;
	export let onLoadMore: () => Promise<void>;

	let container: HTMLElement;
	let observer: IntersectionObserver;
	let loadingMore = false;
	let selectedIndex = 0;

	$: if (selectedIndex >= 0 && selectedIndex < thoughts.length) {
		const card = document.querySelector(`[data-index="${selectedIndex}"]`);
		if (card) {
			card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
		}
	}

	onMount(() => {
		observer = new IntersectionObserver(
			async (entries) => {
				const target = entries[0];
				if (target.isIntersecting && !loadingMore && !loading) {
					loadingMore = true;
					await onLoadMore();
					loadingMore = false;
				}
			},
			{ rootMargin: '200px' }
		);

		const sentinel = document.querySelector('.sentinel');
		if (sentinel) observer.observe(sentinel);

		// Keyboard navigation
		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowDown' || e.key === 'j') {
				e.preventDefault();
				selectedIndex = Math.min(selectedIndex + 1, thoughts.length - 1);
			} else if (e.key === 'ArrowUp' || e.key === 'k') {
				e.preventDefault();
				selectedIndex = Math.max(selectedIndex - 1, 0);
			}
		};

		window.addEventListener('keydown', handleKeydown);

		return () => {
			observer.disconnect();
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<div class="thought-stream" bind:this={container} role="feed" aria-busy={loading}>
	<div class="mx-auto max-w-3xl px-4 py-8">
		{#each thoughts as thought, index (thought.id)}
			<div
				use:fade={{
					duration: 0.3,
					delay: index * 0.1
				}}
			>
				<ThoughtCard {thought} {index} />
			</div>
		{/each}

		<div class="sentinel h-4" aria-hidden="true" />

		{#if loading || loadingMore}
			<div class="loading flex justify-center py-8" aria-label="Loading more thoughts">
				<div class="loader" />
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.thought-stream {
		min-height: 100vh;
		background: theme(colors.gray.950);
		color: theme(colors.gray.100);
	}

	.loader {
		@apply h-8 w-8 rounded-full border-4 border-gray-600;
		border-top-color: theme(colors.blue.500);
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* Scroll-driven animations */
	@supports (animation-timeline: scroll()) {
		.thought-stream :global(.thought-card) {
			animation: fade-up linear both;
			animation-timeline: view();
			animation-range: entry 10% cover 20%;
		}

		@keyframes fade-up {
			from {
				opacity: 0;
				transform: translateY(20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}

	/* Container queries for responsive layout */
	@container (min-width: 768px) {
		.thought-stream {
			padding: 2rem;
		}
	}
</style>
