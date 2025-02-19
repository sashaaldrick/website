<!-- ThoughtCard.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import type { TextThought } from '$lib/types/thought';

	export let thought: TextThought;

	$: html = marked.parse(thought.content) as string;
</script>

<article
	class="group relative mx-auto w-full max-w-lg overflow-hidden rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
	style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05);"
>
	<div class="p-4 sm:p-6">
		<div class="mb-4 text-sm text-gray-400">
			{thought.timestamp.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})}
		</div>
		<div class="prose prose-sm prose-invert max-w-none">
			{@html html}
		</div>
		{#if thought.tags?.length}
			<div class="mt-4 flex flex-wrap gap-2">
				{#each thought.tags as tag}
					<span class="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</div>
	<div
		class="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	/>
</article>

<style lang="postcss">
	:global(.prose pre) {
		@apply bg-gray-900/50 backdrop-blur-sm;
	}
</style>
