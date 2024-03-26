<script>
    import ImageBar from '$lib/ImageBar.svelte';

    export let data;
    const imgs = data.imgs.map((img) => URL.createObjectURL(img));

    let selected;
</script>

<h1>Image Gallery</h1>

<div class="grid">
    <div class="largeimage">
        <img src={imgs[selected]} alt="randomly generated" />
    </div>

    <ImageBar {imgs} bind:selected={selected}/>
</div>

<style>
    .grid {
        display: grid;
        grid-template-rows: 2fr 1fr;
    }
</style>