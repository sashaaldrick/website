<!-- EmbedThought.svelte -->
<script lang="ts">
	import type { EmbedThought } from '$lib/types/thought';

	export let thought: EmbedThought;

	$: embedUrl = getEmbedUrl(thought.embedType, thought.embedId);

	function getEmbedUrl(type: string, id: string): string {
		switch (type) {
			case 'youtube':
				return `https://www.youtube.com/embed/${id}`;
			case 'spotify':
				return `https://open.spotify.com/embed/${id}`;
			case 'twitter':
				return `https://platform.twitter.com/embed/Tweet.html?id=${id}`;
			default:
				return '';
		}
	}
</script>

<div class="embed-thought">
	{#if thought.title}
		<h3 class="mb-4 text-xl font-medium">{thought.title}</h3>
	{/if}

	<div class="embed-container relative overflow-hidden rounded-lg">
		{#if thought.embedType === 'youtube'}
			<div class="aspect-w-16 aspect-h-9">
				<iframe
					src={embedUrl}
					title="YouTube video"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		{:else if thought.embedType === 'spotify'}
			<iframe src={embedUrl} title="Spotify embed" allow="encrypted-media" class="h-[152px] w-full"
			></iframe>
		{:else if thought.embedType === 'twitter'}
			<iframe src={embedUrl} title="Twitter Tweet" class="min-h-[300px] w-full"></iframe>
		{/if}
	</div>
</div>

<style lang="postcss">
	.embed-container {
		background: theme(colors.gray.900);
		border: 1px solid theme(colors.gray.700);
	}

	iframe {
		border: none;
	}

	/* Aspect ratio container for YouTube */
	.aspect-w-16.aspect-h-9 {
		position: relative;
		padding-bottom: 56.25%;
	}

	.aspect-w-16.aspect-h-9 iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
