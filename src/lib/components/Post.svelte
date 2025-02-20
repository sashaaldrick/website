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
		const isLastPost = !article.nextElementSibling;

		function updateFocus() {
			const rect = article.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			const scrollY = window.scrollY;

			if (isLastPost) {
				// If we're near the bottom of the page
				if (scrollY + viewportHeight > documentHeight - 50) {
					isInCenter = true;
					return;
				}
			}

			// Standard center-based focus for all other cases
			const elementCenter = rect.top + rect.height / 2;
			const viewportCenter = viewportHeight / 2;
			isInCenter = Math.abs(elementCenter - viewportCenter) < viewportHeight * 0.2;
		}

		window.addEventListener('scroll', updateFocus);
		updateFocus();

		return () => {
			window.removeEventListener('scroll', updateFocus);
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
