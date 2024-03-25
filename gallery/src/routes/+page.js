export async function load() {
    const imgArr = [];
    const resp = await fetch('https://picsum.photos/seed/picsum/500/500');

    if(resp.ok) {
        const img = await resp.blob();

        return {
            img
        }
    }
}