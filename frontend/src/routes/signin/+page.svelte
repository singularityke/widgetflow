<script lang="ts">
	import { goto } from '$app/navigation';

	import { toaster } from '$lib/toaster';
	import { Mail, Lock, Loader2 } from 'lucide-svelte';
	import { GoogleLogo } from '@selemondev/svgl-svelte';
	import { initiateGoogleLogin, login } from '../register/api';

	let email = $state('');
	let password = $state('');
	let isLoading = $state(false);
	let isGoogleLoading = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isLoading = true;

		try {
			await login(email, password);
			toaster.success({ title: 'Success', description: 'Logged in successfully!' });
			goto('/dashboard');
		} catch (err: any) {
			toaster.error({
				title: 'Login Failed',
				description: err.error || 'Login failed. Please check your credentials.'
			});
		} finally {
			isLoading = false;
		}
	}

	async function handleGoogleLogin() {
		isGoogleLoading = true;

		try {
			await initiateGoogleLogin();
		} catch (err: any) {
			toaster.error({
				title: 'Google Login Failed',
				description: err.error || 'Google login failed. Please try again.'
			});
			isGoogleLoading = false;
		}
	}
</script>

<div class="grid min-h-screen lg:grid-cols-2">
	<div
		class="via-surface-50-900-token relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-12 lg:flex"
	>
		<div class="bg-grid-pattern absolute inset-0 opacity-5"></div>
		<div class="relative z-10 max-w-lg">
			<img
				src="/illustrations/register.svg"
				alt="Login illustration"
				class="h-auto w-full drop-shadow-2xl"
			/>
			<h2 class="mt-12 mb-4 text-5xl leading-tight font-bold">Welcome back to WidgetFlow</h2>
			<p class="text-xl leading-relaxed opacity-70">
				Sign in to continue managing your customer conversations and delivering exceptional support
				experiences.
			</p>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center p-6 lg:p-12">
		<div class="w-full max-w-md">
			<div class="mb-10 text-center">
				<h1 class="mb-3 text-5xl font-bold">Sign in</h1>
				<p class="text-surface-600-300-token text-lg">Welcome back! Please enter your details</p>
			</div>

			<div class="variant-ghost-surface card p-8 shadow-xl">
				<form onsubmit={handleSubmit} class="space-y-5">
					<label class="label">
						<span class="mb-2 block text-sm font-semibold">Email Address</span>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
								<Mail class="h-5 w-5 opacity-50" />
							</div>
							<input
								class="input h-12 pl-12"
								type="email"
								bind:value={email}
								placeholder="you@example.com"
								required
								autocomplete="email"
							/>
						</div>
					</label>

					<label class="label">
						<div class="mb-2 flex items-center justify-between">
							<span class="text-sm font-semibold">Password</span>
							<a href="/forgot-password" class="anchor text-sm hover:underline">
								Forgot password?
							</a>
						</div>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
								<Lock class="h-5 w-5 opacity-50" />
							</div>
							<input
								class="input h-12 pl-12"
								type="password"
								bind:value={password}
								placeholder="••••••••"
								required
								autocomplete="current-password"
							/>
						</div>
					</label>

					<button
						type="submit"
						class="variant-filled-primary btn h-12 w-full rounded-lg bg-primary-600 px-6 py-2.5 text-base text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:scale-105 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40"
						disabled={isLoading}
					>
						{#if isLoading}
							<Loader2 class="h-5 w-5 animate-spin" />
							<span>Signing in...</span>
						{:else}
							<span>Sign In</span>
						{/if}
					</button>
				</form>

				<div class="my-6 flex items-center gap-4">
					<div class="bg-surface-300-600-token h-px flex-1"></div>
					<span class="text-surface-600-300-token text-sm font-medium">or continue with</span>
					<div class="bg-surface-300-600-token h-px flex-1"></div>
				</div>

				<button
					onclick={handleGoogleLogin}
					disabled={isGoogleLoading}
					class="variant-ringed-surface hover:variant-ghost-surface btn h-12 w-full transition-all"
				>
					{#if isGoogleLoading}
						<Loader2 class="h-5 w-5 animate-spin" />
						<span class="font-semibold">Connecting...</span>
					{:else}
						<GoogleLogo height="20" width="20" />
						<span class="font-semibold">Continue with Google</span>
					{/if}
				</button>
			</div>

			<p class="text-surface-600-300-token mt-8 text-center">
				Don't have an account?
				<a href="/register" class="anchor font-semibold hover:underline">Sign up</a>
			</p>
		</div>
	</div>
</div>

<style>
	.bg-grid-pattern {
		background-image:
			linear-gradient(to right, currentColor 1px, transparent 1px),
			linear-gradient(to bottom, currentColor 1px, transparent 1px);
		background-size: 40px 40px;
	}
</style>
