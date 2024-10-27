
export type TContentItem = {
    thumbnail: string;
    title: string;
    customTitle?: string;
    contentType?: TContentFormat;
    link?: string;
};

export type TContentType = 'website' | 'webgame' | 'playablead' | 'etc';

export type TContentFormat = 'file' | 'link';