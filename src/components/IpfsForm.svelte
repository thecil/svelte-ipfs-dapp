<script>
    import {
      Form,
      FormGroup,
      Button,
      ImageLoader,
      FileUploader,
      FileUploaderItem,
      FileUploaderButton,
      TextInput,
      InlineNotification,
      Link,
    } from "carbon-components-svelte";
    import { saveFile, saveImgFile } from "../utils/ipfs"

    // status when uploading, for fileUploader and form submit button
    let uploadStatus = {img:"waiting", object:"waiting"};
    // object structure 
    let tokenObj = {name:"", description:"", image:"", external_url:"", attributes:[]};
    // when file upload succeed
    let fileSuccess = {status:false, url:""}
    // file uploader object name
    let imgName;

    // Upload image to ipfs, returns the url
    const uploadImageIpfs = async (_object) => {
        // get img file from object
        imgName = _object.files[0].name; 
        // change status to uploading
        uploadStatus.img = "uploading"; 
        // upload img to ipfs, returns upload metadata
        let save = await saveImgFile(_object); 
        // if file upload succeed, will have a hash
        if(save.hash){
            // change upload status to complete
            uploadStatus.img = "complete";
            // get img url for tokenObj
            let url = save._ipfs;
            // set url img for object
            tokenObj.image = url;
        }
    }

    // Upload the entire object which include all tokenObj fields
    const uploadObjectToIpfs = async (_object) => {
        // set form button status to loading
        uploadStatus.object = "uploading"
        // upload file to ipfs, returns upload metadata
        let result = await saveFile(_object);
        // if file upload succeed, will have a hash
        if(result){
            // inline Notification show
            fileSuccess.status = true;
            // inline Notification url
            fileSuccess.url = result._ipfs;
            // set form button status to waiting
            uploadStatus.object = "waiting"
        }
    }
</script>


<div class="ipfsForm">
    <h2>IPFS Form</h2>
    <br>

    <Form on:submit={uploadObjectToIpfs(tokenObj)}>
        {#if fileSuccess.status}
        <InlineNotification
        lowContrast
        timeout=10000
        kind="success"
        title="Success:"
        subtitle={`File successfully uploaded to: ${fileSuccess.url}`}
        />
        {/if}
    
        <FormGroup>
            {#if uploadStatus.img === "waiting"}
                <FileUploaderButton 
                labelText="Add file" 
                accept={['.jpg', '.jpeg']}
                on:change={async ({target}) => await uploadImageIpfs(target)}
                />
            {:else if uploadStatus.img === "uploading"}
                <FileUploaderItem style="margin:auto;" name={imgName} status="uploading" />
            {:else if uploadStatus.img === "complete"}
                <FileUploaderItem style="margin:auto;" name={imgName} status="complete" />
                <br>
                <ImageLoader
                style="width: 20%;"
                src={tokenObj.image}
                />
            {:else if uploadStatus.img === "error"}
                <FileUploaderItem style="margin:auto;" invalid name={imgName} status="edit" />
            {/if}
    
        </FormGroup>
    
        <FormGroup>
            <TextInput inline labelText="Name" placeholder="Enter nft name..." bind:value={tokenObj.name}/>
            <TextInput inline labelText="Description" placeholder="Enter nft description..." bind:value={tokenObj.description}/>
        </FormGroup>
        
        {#if uploadStatus.object === "waiting"}
            <Button type="submit">Submit</Button>
        {:else if uploadStatus.object === "uploading"}
            <Button skeleton size="small" />
        {/if}
    
    </Form>
</div>


<style>
    .ipfsForm{
        width: 50%;
        margin: auto;
    }
</style>
  