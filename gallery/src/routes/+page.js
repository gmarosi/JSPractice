export async function load() {
    const rand = Math.floor(Math.random() * 100);
    const resp = await fetch(`https://picsum.photos/seed/${rand}/500/500`);

    if(resp.ok) {
        const img = await resp.blob();

        return {
            img
        }
    }
}