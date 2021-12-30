<script>
    import {
      Button,
    } from "carbon-components-svelte";
    let user = {status:"disconnected", data:{}};

    const isUser = () => {
        const _user =  Moralis.User.current();
        if(_user){
            console.log("isUser", _user);
            user.data = JSON.parse(JSON.stringify(_user));
            user.status = "connected"
        }
        else{
            console.log("isUser false")
        }
    }
    isUser();

    // web3 logout, clear all user data (storages)
    const web3Logout = async () => {
        console.log('web3Logout');
        await Moralis.User.logOut();
        user = {status:"disconnected", data:{}};
        isUser();
    }
    // web3 login, fetch user data
    const web3Login = async () => {
        try{
            const _user = await Moralis.Web3.authenticate({signingMessage:" IPFS FORM, must sign to login "});

            console.log('_user logged', _user);
            user.data = JSON.parse(JSON.stringify(_user));
            user.status = "connected"
            console.log('_user user', user);
        } catch (error){
            const code = error.code;
            const message = error.messag;
        }
        
    }

</script>

{#if user.status === "connected"}
    <h2>Welcome {user.data.username}</h2>
    <Button on:click={web3Logout}>Logout</Button>
{:else}
    <Button on:click={web3Login}>Login MetaMask</Button>
{/if}