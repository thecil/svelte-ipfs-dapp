import App from './App.svelte';

// initialize moralis server
const serverUrl = "https://tmwi1tgjrcrj.usemoralis.com:2053/server";
const appId = "1xRIuI0LpcCsFE107BCQhJaJyiOU2htUklGysxpW";	
Moralis.start({ serverUrl, appId });

const app = new App({
	target: document.body,
});

export default app;