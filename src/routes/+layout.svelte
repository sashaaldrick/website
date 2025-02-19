<script lang="ts">
	import '../app.postcss';
</script>

<div class="app">
	<div class="container">
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
		max-width: 65ch;
		margin: 0 auto;
		padding: 2rem;
	}
</style>
