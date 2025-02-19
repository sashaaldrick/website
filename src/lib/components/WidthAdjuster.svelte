<!-- WidthAdjuster.svelte -->
<script lang="ts">
	import { textWidth } from '$lib/stores/layout';

	const widths = [65, 85]; // ch units for medium and wide
	let currentIndex = 1; // Start with wide width (85ch)

	function cycleWidth() {
		currentIndex = (currentIndex + 1) % widths.length;
		$textWidth = widths[currentIndex];
	}

	$: isActive = (index: number) => widths[currentIndex] === widths[index];
</script>

<button
	on:click={cycleWidth}
	class="flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-lg border border-border bg-background text-text-secondary transition-all hover:text-text"
	aria-label="Adjust text width"
>
	<div
		class="h-0.5 w-3 rounded-full bg-text-secondary transition-colors duration-300"
		class:active={isActive(0)}
	/>
	<div
		class="h-0.5 w-5 rounded-full bg-text-secondary transition-colors duration-300"
		class:active={isActive(1)}
	/>
</button>

<style lang="postcss">
	button {
		backdrop-filter: blur(8px);
	}

	button:hover {
		border-color: color-mix(in srgb, var(--border) 80%, transparent);
	}

	.active {
		@apply bg-text;
	}
</style>
