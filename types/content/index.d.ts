
export type TContentItem = {
    thumbnail: string;
    title: string;
    type?: 'website' | 'webgame' | 'playablead';
    contentType?: 'file' | 'link';
    link?: string;
};