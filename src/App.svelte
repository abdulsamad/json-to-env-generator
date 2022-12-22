<script lang="ts">
	import { showResult } from './stores';

	import Navbar from './lib/Navbar.svelte';
	import Form from './lib/Form.svelte';
	import Footer from './lib/Footer.svelte';
	import Result from './lib/Result.svelte';
</script>

<main>
	<Navbar />
	<Form />
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
