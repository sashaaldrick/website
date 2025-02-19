<script lang="ts">
	import { marked } from 'marked';
	import NowStatus from '$lib/components/NowStatus.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Title from '$lib/components/Title.svelte';

	export let data;
</script>

<svelte:head>
	<title>Now | My Site</title>
	<meta name="description" content="What I'm currently working on and focused on." />
</svelte:head>

<main class="min-h-screen bg-background text-text">
	<div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
		<div class="space-y-8">
			<Title />
			<Nav />

			<div class="space-y-12">
				<section class="prose prose-lg max-w-none">
					{@html marked.parse(data.content)}
				</section>

				<section class="animate-fade-in">
					<NowStatus />
				</section>
			</div>
		</div>
	</div>
</main>

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

	:global(.prose) {
		color: var(--text);
	}

	:global(.prose h1, .prose h2, .prose h3, .prose h4) {
		@apply gradient-text;
		color: var(--text);
	}

	:global(.gradient-text) {
		background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-size: 100% 100%;
	}

	:global(.prose a) {
		@apply relative transition-all duration-200;
		color: theme(colors.blue.400);
		text-decoration: none;
		background: linear-gradient(to right, theme(colors.blue.400), theme(colors.purple.400));
		background-size: 0 2px;
		background-position: 0 100%;
		background-repeat: no-repeat;
		transition: all 0.3s ease;
	}

	:global(.prose a:hover) {
		color: theme(colors.blue.300);
		background-size: 100% 2px;
	}
</style>
