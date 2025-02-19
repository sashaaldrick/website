<!-- TextThought.svelte -->
<script lang="ts">
	import { marked } from 'marked';
	import type { TextThought } from '$lib/types/thought';

	export let thought: TextThought;

	$: content = thought.isMarkdown ? marked(thought.content) : thought.content;

	$: moodEmoji = thought.mood ? getMoodEmoji(thought.mood) : '';

	function getMoodEmoji(mood: string): string {
		const moods: Record<string, string> = {
			happy: '😊',
			excited: '🎉',
			thoughtful: '🤔',
			sad: '😢',
			angry: '😠'
		};
		return moods[mood.toLowerCase()] || '';
	}
</script>

<article class="text-thought">
	{#if thought.isMarkdown}
		<div class="prose prose-invert max-w-none">
			{@html content}
		</div>
	{:else}
		<p class="text-lg leading-relaxed">
			{content}
		</p>
	{/if}

	{#if moodEmoji}
		<div class="mood mt-4 text-2xl" aria-label="mood indicator">
			{moodEmoji}
		</div>
	{/if}
</article>

<style lang="postcss">
	.text-thought {
		:global(a) {
			color: theme(colors.blue.400);
			text-decoration: underline;
			text-decoration-thickness: 0.1em;
			text-underline-offset: 0.2em;
			transition: color 0.2s ease;
		}

		:global(a:hover) {
			color: theme(colors.blue.300);
		}

		:global(p) {
			margin-bottom: 1rem;
		}

		:global(p:last-child) {
			margin-bottom: 0;
		}
	}

	.mood {
		opacity: 0.8;
		transition: opacity 0.2s ease;
	}

	.mood:hover {
		opacity: 1;
	}
</style>
