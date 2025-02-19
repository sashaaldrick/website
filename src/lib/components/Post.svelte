<!-- ThoughtCard.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import type { TextThought } from '$lib/types/thought';
	import { onMount } from 'svelte';
	import { textWidth } from '$lib/stores/layout';

	export let thought: TextThought;

	let article: HTMLElement;
	let isInCenter = false;

	$: html = marked.parse(thought.content) as string;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					// Calculate how close to center the element is
					const elementCenter = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
					const viewportCenter = window.innerHeight / 2;
					const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
					const threshold = window.innerHeight * 0.2; // 20% of viewport height

					// Check if this is the last post and we're near the bottom of the page
					const isLastPost = !article.nextElementSibling;
					const isNearBottom =
						window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

					if (entry.isIntersecting) {
						if (isLastPost && isNearBottom) {
							isInCenter = true;
						} else {
							isInCenter = distanceFromCenter < threshold;
						}
					} else {
						// Only keep focus for the last post at bottom
						isInCenter = isLastPost && isNearBottom;
					}
				});
			},
			{
				threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
				rootMargin: '-20% 0px -20% 0px'
			}
		);

		if (article) {
			observer.observe(article);
		}

		// Add scroll event listener to handle last post focus
		const handleScroll = () => {
			if (article && !article.nextElementSibling) {
				const isNearBottom =
					window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
				if (isNearBottom) {
					isInCenter = true;
				} else {
					// Allow the last post to lose focus when scrolling up
					const elementCenter =
						article.getBoundingClientRect().top + article.getBoundingClientRect().height / 2;
					const viewportCenter = window.innerHeight / 2;
					const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
					const threshold = window.innerHeight * 0.2;
					isInCenter = distanceFromCenter < threshold;
				}
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			if (article) {
				observer.unobserve(article);
			}
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<article
	bind:this={article}
	class="group relative mx-auto w-full overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-500"
	class:in-center={isInCenter}
	style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); max-width: {$textWidth}ch;"
>
	<div class="p-4 sm:p-6">
		<div class="mb-4 text-sm text-text-secondary">
			{thought.timestamp.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</div>
		<div class="prose prose-sm max-w-none">
			{@html html}
		</div>
		{#if thought.tags?.length}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each thought.tags as tag}
					<span class="rounded-full bg-border px-3 py-1 text-xs text-text-secondary">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-500"
		class:opacity-100={isInCenter}
	/>
</article>

<style lang="postcss">
	:global(.prose pre) {
		background-color: color-mix(in srgb, var(--border) 50%, transparent);
		@apply backdrop-blur-sm;
	}

	article {
		transform: scale(0.98);
		filter: brightness(0.8);
	}

	article.in-center {
		transform: scale(1);
		filter: brightness(1);
	}

	/* Smooth transition for non-centered cards */
	article:not(.in-center) {
		transition:
			transform 0.5s ease-out,
			filter 0.5s ease-out,
			max-width 0.3s ease;
	}
</style>
