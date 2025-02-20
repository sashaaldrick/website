<script lang="ts">
	import { marked } from 'marked';
	import NowStatus from '$lib/components/NowStatus.svelte';
	import PageLayout from '$lib/components/PageLayout.svelte';

	export let data;
</script>

<PageLayout
	title="Now"
	description="What I'm currently working on and focused on."
	markdownContent={data.content}
>
	<NowStatus />
</PageLayout>

<style lang="postcss">
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
	}
</style>
