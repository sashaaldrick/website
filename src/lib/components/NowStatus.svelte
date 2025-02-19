<script lang="ts">
	import { onMount } from 'svelte';

	export let focusAreas = [
		{
			name: 'Current Project',
			description: 'Building my personal site',
			progress: 0.7,
			color: '#60a5fa'
		},
		{
			name: 'Learning',
			description: 'Diving deep into Rust',
			progress: 0.4,
			color: '#818cf8'
		},
		{
			name: 'Writing',
			description: 'Technical blog posts',
			progress: 0.3,
			color: '#a78bfa'
		}
	];

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let hoveredArea: number | null = null;

	function drawRing(
		centerX: number,
		centerY: number,
		radius: number,
		progress: number,
		color: string,
		thickness: number,
		isHovered: boolean
	) {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, -Math.PI / 2, Math.PI * 2 * progress - Math.PI / 2);
		ctx.strokeStyle = color;
		ctx.lineWidth = thickness;
		ctx.lineCap = 'round';
		ctx.globalAlpha = isHovered ? 1 : 0.6;
		ctx.stroke();
		ctx.globalAlpha = 1;

		// Draw background ring
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
		ctx.strokeStyle = `${color}33`;
		ctx.lineWidth = thickness;
		ctx.stroke();
	}

	function draw() {
		if (!ctx) return;

		// Clear canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;

		// Draw rings from outer to inner
		focusAreas.forEach((area, i) => {
			const radius = 45 - i * 12;
			drawRing(centerX, centerY, radius, area.progress, area.color, 4, hoveredArea === i);
		});
	}

	onMount(() => {
		if (canvas) {
			ctx = canvas.getContext('2d')!;

			// Set up high DPI canvas
			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.getBoundingClientRect();

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			ctx.scale(dpr, dpr);

			draw();
		}
	});
</script>

<div class="now-rings">
	<canvas bind:this={canvas} width="120" height="120" />
	<div class="focus-areas">
		{#each focusAreas as area, i}
			<div
				class="focus-area"
				on:mouseenter={() => {
					hoveredArea = i;
					draw();
				}}
				on:mouseleave={() => {
					hoveredArea = null;
					draw();
				}}
			>
				<div class="focus-header">
					<span class="dot" style="background: {area.color}" />
					<span class="name">{area.name}</span>
					<span class="progress">{Math.round(area.progress * 100)}%</span>
				</div>
				<p class="description">{area.description}</p>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.now-rings {
		display: flex;
		align-items: flex-start;
		gap: 2rem;
		padding: 2rem;
		background: theme(colors.gray.900 / 30%);
		backdrop-filter: blur(8px);
		border-radius: 1rem;
		border: 1px solid theme(colors.gray.800);
	}

	canvas {
		width: 120px;
		height: 120px;
		flex-shrink: 0;
	}

	.focus-areas {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex-grow: 1;
	}

	.focus-area {
		padding: 0.75rem;
		border-radius: 0.5rem;
		background: theme(colors.gray.900 / 30%);
		border: 1px solid theme(colors.gray.800 / 50%);
		transition: all 0.2s ease;
	}

	.focus-area:hover {
		background: theme(colors.gray.900 / 50%);
		border-color: theme(colors.gray.700);
	}

	.focus-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.name {
		font-weight: 500;
		color: theme(colors.gray.100);
	}

	.progress {
		margin-left: auto;
		font-size: 0.875rem;
		color: theme(colors.gray.400);
	}

	.description {
		margin: 0;
		font-size: 0.875rem;
		color: theme(colors.gray.400);
	}
</style>
