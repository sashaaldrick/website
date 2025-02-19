<script lang="ts">
	import '../app.postcss';
	import Cursor from '$lib/components/Cursor.svelte';
	import { textWidth } from '$lib/stores/layout';
</script>

<Cursor />

<div class="app">
	<div class="container" style="max-width: {$textWidth}ch">
		<slot />
	</div>
</div>

<style lang="postcss">
	/* Basic CSS reset */
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(html, body) {
		min-height: 100vh;
	}

	.app {
		display: grid;
		grid-template-rows: 1fr;
		min-height: 100vh;
	}

	.container {
		width: 100%;
		margin: 0 auto;
		padding: 2rem;
		transition: max-width 0.3s ease;
	}
</style>
