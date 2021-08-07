export type Assets = {
    baseUrl: string;
    images: { key: string, url: string }[];
};
export default {
    baseUrl: './assets/',
    images: [
        {
            key: 'wheel',
            url: 'img/wheel.png',
        },
        {
            key: 'arrow',
            url: 'img/arrow.png',
        },
        {
            key: 'back',
            url: 'img/back.jpg',
        },
    ],
};