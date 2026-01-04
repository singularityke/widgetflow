<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { toaster } from '$lib/toaster';
	import { Toast } from '@skeletonlabs/skeleton-svelte';
	import Navbar from '../components/Navbar.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Navbar />

{@render children()}

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
