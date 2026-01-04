<script lang="ts">
	import { goto } from '$app/navigation';
	import { register, verifyEmail, initiateGoogleLogin } from './api';
	import { toaster } from '$lib/toaster';
	import { Mail, Lock, User, Loader2, Hash } from 'lucide-svelte';
	import { GoogleLogo } from '@selemondev/svgl-svelte';

	let email = $state('');
	let password = $state('');
	let name = $state('');
	let confirmPassword = $state('');
	let verificationCode = $state('');
	let isLoading = $state(false);
	let isGoogleLoading = $state(false);
	let showVerification = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();

		if (password !== confirmPassword) {
			toaster.error({ title: 'Error', description: 'Passwords do not match' });
			return;
		}

		if (password.length < 8) {
			toaster.error({ title: 'Error', description: 'Password must be at least 8 characters' });
			return;
		}

		isLoading = true;

		try {
			await register(email, password, name);
			toaster.success({ title: 'Success', description: 'Verification code sent to your email!' });
			showVerification = true;
		} catch (err: any) {
			toaster.error({
				title: 'Registration Failed',
				description: err.error || 'Registration failed. Please try again.'
			});
		} finally {
			isLoading = false;
		}
	}

	async function handleVerification(e: Event) {
		e.preventDefault();

		if (verificationCode.length !== 6) {
			toaster.error({ title: 'Error', description: 'Please enter a valid 6-digit code' });
			return;
		}

		isLoading = true;

		try {
			await verifyEmail(email, verificationCode);
			toaster.success({ title: 'Success', description: 'Account created successfully!' });
			goto('/dashboard');
		} catch (err: any) {
			toaster.error({
				title: 'Verification Failed',
				description: err.error || 'Invalid or expired verification code.'
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
				alt="Register illustration"
				class="h-auto w-full drop-shadow-2xl"
			/>
			<h2 class="mt-12 mb-4 text-5xl leading-tight font-bold">
				Start engaging with your customers
			</h2>
			<p class="text-xl leading-relaxed opacity-70">
				Join businesses using WidgetFlow to deliver exceptional customer experiences through
				powerful live chat and support tools.
			</p>
		</div>
	</div>

	<div class="flex flex-col items-center justify-center p-6 lg:p-12">
		<div class="w-full max-w-md">
			<div class="mb-10 text-center">
				<h1 class="mb-3 text-5xl font-bold">
					{showVerification ? 'Verify your email' : 'Create your account'}
				</h1>
				<p class="text-surface-600-300-token text-lg">
					{showVerification
						? 'Enter the code we sent to your email'
						: 'Get started with WidgetFlow today'}
				</p>
			</div>

			<div class="variant-ghost-surface card p-8 shadow-xl">
				{#if !showVerification}
					<form onsubmit={handleSubmit} class="space-y-5">
						<label class="label">
							<span class="mb-2 block text-sm font-semibold">Full Name</span>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
									<User class="h-5 w-5 opacity-50" />
								</div>
								<input
									class="input h-12 pl-12"
									type="text"
									bind:value={name}
									placeholder="John Doe"
									required
								/>
							</div>
						</label>

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
								/>
							</div>
						</label>

						<label class="label">
							<span class="mb-2 block text-sm font-semibold">Password</span>
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
								/>
							</div>
						</label>

						<label class="label">
							<span class="mb-2 block text-sm font-semibold">Confirm Password</span>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
									<Lock class="h-5 w-5 opacity-50" />
								</div>
								<input
									class="input h-12 pl-12"
									type="password"
									bind:value={confirmPassword}
									placeholder="••••••••"
									required
								/>
							</div>
						</label>

						<button
							type="submit"
							class="w-full rounded-lg bg-primary-600 p-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:scale-105 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40"
							disabled={isLoading}
						>
							{#if isLoading}
								<Loader2 class="mr-2 inline h-5 w-5 animate-spin" />
								<span>Creating account...</span>
							{:else}
								<span>Create Account</span>
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
				{:else}
					<form onsubmit={handleVerification} class="space-y-5">
						<div class="mb-6 text-center">
							<p class="text-surface-600-300-token mb-4 text-sm">
								We sent a 6-digit code to<br />
								<span class="font-semibold text-primary-600">{email}</span>
							</p>
						</div>

						<label class="label">
							<span class="mb-2 block text-sm font-semibold">Verification Code</span>
							<div class="relative">
								<div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
									<Hash class="h-5 w-5 opacity-50" />
								</div>
								<input
									class="input h-12 pl-12 text-center font-mono text-2xl tracking-widest"
									type="text"
									bind:value={verificationCode}
									placeholder="000000"
									maxlength="6"
									required
								/>
							</div>
						</label>

						<button
							type="submit"
							class="w-full rounded-lg bg-primary-600 p-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition-all hover:scale-105 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-500/40"
							disabled={isLoading}
						>
							{#if isLoading}
								<Loader2 class="mr-2 inline h-5 w-5 animate-spin" />
								<span>Verifying...</span>
							{:else}
								<span>Verify Email</span>
							{/if}
						</button>

						<button
							type="button"
							onclick={() => (showVerification = false)}
							class="text-surface-600-300-token hover:text-surface-900-50-token w-full text-sm transition-colors"
						>
							← Back to registration
						</button>
					</form>
				{/if}
			</div>

			<p class="text-surface-600-300-token mt-8 text-center">
				Already have an account?
				<a href="/signin" class="anchor font-semibold hover:underline">Sign in</a>
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
