<!-- CodeThought.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { getHighlighter } from 'shiki';
	import type { CodeThought } from '$lib/types/thought';

	export let thought: CodeThought;

	let highlightedCode = '';
	let loading = true;

	onMount(async () => {
		try {
			const highlighter = await getHighlighter({
				theme: 'github-dark',
				langs: [thought.language]
			});

			highlightedCode = highlighter.codeToHtml(thought.code, {
				lang: thought.language
			});
			loading = false;
		} catch (error) {
			console.error('Failed to highlight code:', error);
			highlightedCode = `<pre><code>${thought.code}</code></pre>`;
			loading = false;
		}
	});
</script>

<div class="code-thought">
	{#if thought.description}
		<p class="description mb-4 text-gray-300">
			{thought.description}
		</p>
	{/if}

	<div class="code-block relative overflow-hidden rounded-lg">
		{#if loading}
			<div class="h-32 animate-pulse rounded-lg bg-gray-700" />
		{:else}
			<div class="code-content">
				{@html highlightedCode}
			</div>
		{/if}

		<div class="absolute top-2 right-2 rounded bg-gray-700/50 px-2 py-1 text-xs">
			{thought.language}
		</div>
	</div>
</div>

<style lang="postcss">
	.code-block {
		background: theme(colors.gray.900);
		border: 1px solid theme(colors.gray.700);
	}

	.code-content {
		:global(pre) {
			margin: 0;
			padding: 1rem;
			overflow-x: auto;
		}

		:global(code) {
			font-family: 'JetBrains Mono', ui-monospace, monospace;
			font-size: 0.9rem;
			line-height: 1.5;
		}
	}

	/* Custom scrollbar for code blocks */
	.code-content :global(pre)::-webkit-scrollbar {
		height: 4px;
	}

	.code-content :global(pre)::-webkit-scrollbar-track {
		background: theme(colors.gray.800);
	}

	.code-content :global(pre)::-webkit-scrollbar-thumb {
		background: theme(colors.gray.600);
		border-radius: 2px;
	}
</style>
