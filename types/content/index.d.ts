
export type TContentItem = {
    thumbnail: string;
    title: string;
    type?: TContentType;
    contentType?: TContentFormat;
    link?: string;
};

export type TContentType = 'website' | 'webgame' | 'playablead' | 'etc';

export type TContentFormat = 'file' | 'link';