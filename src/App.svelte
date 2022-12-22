<script lang="ts">
	import { showResult } from './stores';

	import Navbar from './lib/Navbar.svelte';
	import TextArea from './lib/TextArea.svelte';
	import Footer from './lib/Footer.svelte';
	import Result from './lib/Result.svelte';
</script>

<main>
	<Navbar />
	<TextArea />
	{#if $showResult}
		<Result />
	{/if}
	<Footer />
</main>

<style lang="scss">
	main {
		min-height: 100vh;
		width: 100vw;
	}
</style>
