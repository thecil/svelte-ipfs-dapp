import App from './App.svelte';

// initialize moralis server
const serverUrl = "https://ggm3aiqacseo.usemoralis.com:2053/server";
const appId = "I0EFxtLRi1UUla4kCbaJ5ZsiLgiHFjpfXEvz1H6Y";	
Moralis.start({ serverUrl, appId });

const app = new App({
	target: document.body,
});

export default app;