<!-- ThoughtCard.svelte -->
<script lang="ts">
	import { fade } from '@motionone/svelte';
	import type { Thought } from '$lib/types/thought';
	import TextThought from './thoughts/TextThought.svelte';
	import CodeThought from './thoughts/CodeThought.svelte';
	import EmbedThought from './thoughts/EmbedThought.svelte';
	import GalleryThought from './thoughts/GalleryThought.svelte';
	import { scaleIn } from '$lib/utils/animations';

	export let thought: Thought;
	export let index: number = 0;

	const components = {
		text: TextThought,
		code: CodeThought,
		embed: EmbedThought,
		gallery: GalleryThought
	};

	$: Component = components[thought.type];
</script>

<div
	class="thought-card container"
	use:fade={scaleIn}
	data-index={index}
	role="article"
	tabindex="0"
>
	<div class="glass-morphism rounded-xl p-6 backdrop-blur-sm">
		<svelte:component this={Component} {thought} />

		{#if thought.tags && thought.tags.length > 0}
			<div class="mt-4 flex gap-2">
				{#each thought.tags as tag}
					<span class="tag">#{tag}</span>
				{/each}
			</div>
		{/if}

		<time class="mt-4 block text-sm opacity-60">
			{new Date(thought.timestamp).toLocaleDateString()}
		</time>
	</div>
</div>

<style lang="postcss">
	.thought-card {
		container-type: inline-size;
		margin-bottom: 2rem;
	}

	.glass-morphism {
		background: color-mix(in srgb, var(--card-bg, theme(colors.gray.800)) 80%, transparent);
		border: 1px solid color-mix(in srgb, white 15%, transparent);
		box-shadow:
			0 4px 6px -1px rgb(0 0 0 / 0.1),
			0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.tag {
		font-size: 0.875rem;
		color: theme(colors.gray.300);
		background: color-mix(in srgb, theme(colors.gray.700) 50%, transparent);
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
	}

	/* Container queries */
	@container (min-width: 640px) {
		.glass-morphism {
			padding: 2rem;
		}
	}
</style>
