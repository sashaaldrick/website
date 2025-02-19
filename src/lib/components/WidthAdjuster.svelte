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
		class="relative h-0.5 w-3 rounded-full transition-all duration-300"
		class:active={isActive(0)}
		class:inactive={!isActive(0)}
	>
		<div
			class="absolute inset-0 -z-10 h-3 -translate-y-1 blur-sm transition-opacity duration-300"
			class:glow={isActive(0)}
		/>
	</div>
	<div
		class="relative h-0.5 w-5 rounded-full transition-all duration-300"
		class:active={isActive(1)}
		class:inactive={!isActive(1)}
	>
		<div
			class="absolute inset-0 -z-10 h-3 -translate-y-1 blur-sm transition-opacity duration-300"
			class:glow={isActive(1)}
		/>
	</div>
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
		opacity: 1;
		transform: scale(1.1);
	}

	.inactive {
		@apply bg-text;
		opacity: 0.5;
	}

	.glow {
		@apply bg-text;
		opacity: 0.2;
	}

	/* Improve hover state feedback */
	button:hover .inactive {
		opacity: 0.7;
	}
</style>
