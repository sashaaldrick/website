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
