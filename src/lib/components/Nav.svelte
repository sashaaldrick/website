<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isDark = true;

	onMount(() => {
		// Check for stored preference first
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			isDark = storedTheme === 'dark';
		} else {
			// If no stored preference, use system preference
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		updateTheme();

		// Listen for system theme changes
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', (e) => {
			// Only update if user hasn't set a preference
			if (!localStorage.getItem('theme')) {
				isDark = e.matches;
				updateTheme();
			}
		});
	});

	function toggleTheme() {
		isDark = !isDark;
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
		updateTheme();
	}

	function updateTheme() {
		// Remove both classes first
		document.documentElement.classList.remove('dark', 'light');
		// Then add the correct one
		document.documentElement.classList.add(isDark ? 'dark' : 'light');
	}

	$: isHomePage = $page.url.pathname === '/';
</script>

<nav>
	<ul class="flex items-center space-x-8">
		{#if isHomePage}
			<li>
				<a href="/now" class="nav-link text-lg">Now</a>
			</li>
			<li>
				<a href="/photos" class="nav-link text-lg">Photos</a>
			</li>
		{:else}
			<li>
				<a href="/" class="nav-link text-lg">Home</a>
			</li>
			<li>
				<a href="/photos" class="nav-link text-lg">Photos</a>
			</li>
		{/if}
		<li class="ml-auto">
			<button
				on:click={toggleTheme}
				class="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-text-secondary transition-all hover:text-text"
				aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			>
				{#if isDark}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
						/>
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-5 w-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
						/>
					</svg>
				{/if}
			</button>
		</li>
	</ul>
</nav>

<style>
	.nav-link {
		@apply relative text-text-secondary transition-all hover:text-text;
		text-decoration: none;
	}

	.nav-link::after {
		content: '';
		@apply absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300;
	}

	.nav-link:hover::after {
		@apply w-full;
	}
</style>
