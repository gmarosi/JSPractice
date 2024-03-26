import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
    const imgs = [];

    for(let i = 0; i <= 10; i++) {
        const rand = Math.floor(Math.random() * 1000);
        const resp = await fetch(`https://picsum.photos/seed/${rand}/1000`);

        if(!resp.ok) {
            throw error(500, 'Image fetch request failed');
        }

        imgs.push(resp.blob().then((blob) => URL.createObjectURL(blob)));
    }

    return {
        imgs
    };
}