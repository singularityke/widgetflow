import { createToaster } from '@skeletonlabs/skeleton-svelte';

export const toaster = createToaster({
	placement: 'top-right',
	overlap: false,
	duration: 4000
});
