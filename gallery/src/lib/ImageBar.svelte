<script>
    export let imgs;
    export let selected = 0;
</script>

<div class="thumbbar">
    {#each imgs as img, id}
        <img
            src={img} alt="randomly generated"
            class="{selected === id ? 'selected' : ''}"
            on:click={() => {selected = id;}}
        />
    {/each}
</div>

<style>
    .thumbbar {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
        scrollbar-width: thin;
    }

    img {
        flex: 1;
        max-width: 250px;
        max-height: 250px;
        border: 2px solid black;
        border-radius: 5%;
        margin: 0 5px;
    }

    img:hover {
        cursor: pointer;
    }

    img.selected {
        border: 2px solid gold;
    }
</style>