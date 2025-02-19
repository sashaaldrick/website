<script lang="ts">
	import '../app.postcss';
</script>

<div class="app">
	<slot />
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
</style>
