<script>
    export let imgs;
</script>

<div class="thumbbar">
    {#each imgs as img}
        <img src={img} alt="randomly generated" />
    {/each}
</div>

<style>
    .thumbbar {
        display: flex;
        flex-wrap: nowrap;
        width: 100%;
        overflow-y: hidden;
        overflow-x: auto;
    }

    img {
        flex: 1;
        max-width: 250px;
        max-height: 250px;
        border: 2px solid black;
    }
</style>