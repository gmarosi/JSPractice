<script>
    import ImageBar from '$lib/ImageBar.svelte';

    export let data;
    const imgs = data.imgs.map((img) => URL.createObjectURL(img));

    let selected;
</script>

<div class="container">
    <h1>Image Gallery</h1>

    <img src={imgs[selected]} alt="randomly generated" />
    <div class="imagebar">
        <ImageBar {imgs} bind:selected={selected}/>
    </div>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 5% 75% 20%;
    }

    .container h1 {
        grid-column: 2;
        grid-row: 1;
        font-family: Arial, Helvetica, sans-serif;
    }

    .container img {
        grid-column: 2;
        grid-row: 2;
        border: 2px solid black;
        border-radius: 5%;
    }

    .imagebar {
        grid-column: 1 / 4;
        grid-row: 3;
    }
</style>