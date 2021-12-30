<script>
    import { Grid, Row, Column, Loading, ImageLoader , Button  } from "carbon-components-svelte";
    let gallery = {name:"IPFS_images", items:[], status:"waiting"};

    const queryGallery = async() => {
        try {
            gallery.status = "loading";
            const Gallery = Moralis.Object.extend(gallery.name);
            const query = new Moralis.Query(Gallery);
            const results = await query.find(); // [ Gallery, Gallery, ...]
            
            results.forEach(element => {
                console.log("element.attributes.resume", element.attributes.resume)
                gallery.items.push(JSON.parse(JSON.stringify(element.attributes.resume)));
                
            });

            if (gallery.items.length > 0) {
                gallery.status = "loaded"
            }
            

        } catch (error) {
            console.error("queryGallery:ERROR", error);
        }
    }

</script>

<div class="container">
    
    <Grid condensed>
        <h2>IPFS Moralis Gallery</h2>
        <Row>
            {#if gallery.status === "waiting"}
                <Button style="margin: auto;" kind="secondary" on:click={queryGallery}>Fetch Gallery</Button>
            {:else if gallery.status === "loading"}
                <Loading style="margin: auto;" withOverlay={false} />
            {:else}
                {#each gallery.items as item}
                <Column
                aspectRatio="2x1"
                style="margin: 5px;"
                >
                <ImageLoader
                ratio="2x1"
                src={item.url}
                />
                </Column>
                {/each}
            {/if}
        </Row>
    </Grid>
</div>

<style>
    .container{
        width: 50%;
        margin: auto;
    }
</style>