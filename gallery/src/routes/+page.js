import { error } from '@sveltejs/kit';

export async function load() {
    const imgs = [];

    for(let i = 0; i < 10; i++) {
        const rand = Math.floor(Math.random() * 100);
        const resp = await fetch(`https://picsum.photos/seed/${rand}/500`);

        if(!resp.ok) {
            throw error(500, 'Image fetch request failed');
        }

        resp.blob().then((blob) => {
            imgs.push(blob);
        });
    }

    return {
        imgs
    };
}