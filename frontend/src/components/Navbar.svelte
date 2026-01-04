<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { Menu, X } from 'lucide-svelte';

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav
	class="sticky top-0 z-50 border-b border-surface-200 bg-white/80 shadow-sm backdrop-blur-xl dark:border-surface-700 dark:bg-surface-900/80"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="flex h-20 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="group flex items-center gap-3">
					<span class="text-2xl font-bold text-surface-900 dark:text-surface-50">WidgetFlow</span>
				</a>
			</div>

			<div class="hidden lg:block">
				<div class="flex items-center gap-1">
					<a
						href="/features"
						class="rounded-lg px-4 py-2 text-sm font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
					>
						Features
					</a>
					<a
						href="/pricing"
						class="rounded-lg px-4 py-2 text-sm font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
					>
						Pricing
					</a>
					<a
						href="/about"
						class="rounded-lg px-4 py-2 text-sm font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
					>
						About
					</a>
					<a
						href="/contact"
						class="rounded-lg px-4 py-2 text-sm font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
					>
						Contact
					</a>
					<div class="ml-4 flex items-center gap-3">
						<a
							href="/signin"
							class="rounded-lg px-5 py-2.5 text-sm font-semibold text-surface-700 transition-all hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
						>
							Sign In
						</a>
						<a
							href="/register"
							class="rounded-lg bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:scale-105 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40"
						>
							Get Started
						</a>
					</div>
				</div>
			</div>

			<div class="lg:hidden">
				<button
					onclick={toggleMobileMenu}
					class="rounded-lg p-2 text-surface-700 transition-all hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
				>
					{#if mobileMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div
			class="border-t border-surface-200 bg-white/95 backdrop-blur-xl lg:hidden dark:border-surface-700 dark:bg-surface-900/95"
		>
			<div class="space-y-1 px-6 pt-4 pb-6">
				<a
					href="/features"
					onclick={closeMobileMenu}
					class="block rounded-xl px-4 py-3 text-base font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
				>
					Features
				</a>
				<a
					href="/pricing"
					onclick={closeMobileMenu}
					class="block rounded-xl px-4 py-3 text-base font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
				>
					Pricing
				</a>
				<a
					href="/about"
					onclick={closeMobileMenu}
					class="block rounded-xl px-4 py-3 text-base font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
				>
					About
				</a>
				<a
					href="/contact"
					onclick={closeMobileMenu}
					class="block rounded-xl px-4 py-3 text-base font-semibold text-surface-700 transition-all hover:bg-surface-100 hover:text-primary-600 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-primary-400"
				>
					Contact
				</a>
				<div class="flex flex-col gap-3 pt-4">
					<a
						href="/signin"
						onclick={closeMobileMenu}
						class="block rounded-xl px-4 py-3 text-center text-base font-semibold text-surface-700 transition-all hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
					>
						Sign In
					</a>
					<a
						href="/register"
						onclick={closeMobileMenu}
						class="block rounded-xl bg-primary-600 px-4 py-3 text-center text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:bg-primary-700"
					>
						Get Started
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
