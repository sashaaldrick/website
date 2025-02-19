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
				lang: thought.language,
				theme: 'github-dark'
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
		<p class="description mb-4 text-text-secondary">
			{thought.description}
		</p>
	{/if}

	<div class="code-block relative overflow-hidden rounded-lg">
		{#if loading}
			<div class="h-32 animate-pulse rounded-lg bg-border" />
		{:else}
			<div class="code-content">
				{@html highlightedCode}
			</div>
		{/if}

		<div class="bg-border/50 absolute right-2 top-2 rounded px-2 py-1 text-xs">
			{thought.language}
		</div>
	</div>
</div>

<style lang="postcss">
	.code-block {
		background-color: color-mix(in srgb, var(--border) 30%, transparent);
		border: 1px solid var(--border);
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
		background-color: color-mix(in srgb, var(--border) 30%, transparent);
	}

	.code-content :global(pre)::-webkit-scrollbar-thumb {
		background-color: var(--border);
		border-radius: 2px;
	}
</style>
