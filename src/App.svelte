<script>
	// carbon themes
	import "carbon-components-svelte/css/all.css";

	// my components
	import IpfsForm from './components/IpfsForm.svelte';
	import Gallery from "./components/Gallery.svelte";
</script>

<main>

	<h1>IPFS Uploader!</h1>
	<p>Visit the <a href="https://docs.moralis.io/moralis-server/files/ipfs">Moralis IPFS tutorial</a></p>
	<br>

	<IpfsForm />
	<br>
	<Gallery />
</main>

<style>

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}


	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>