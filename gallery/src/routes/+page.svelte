<script>
    import ImageBar from '$lib/ImageBar.svelte';

    export let data;
    const imgURL = URL.createObjectURL(data.img);

    let selected;
</script>

<h1>Image Gallery</h1>

<div class="largeimage">
    <img src={imgURL} alt="randomly generated image">
</div>

<ImageBar {selected}/>