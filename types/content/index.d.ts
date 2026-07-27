
export type TContentItem = {
    thumbnail: string;
    title: string;
    customTitle?: string;
    contentType?: TContentFormat;
    link?: string;
    subIdx?: 1 | 2;
};

export type TContentType = 'website' | 'webgame' | 'playablead' | 'etc';

export type TContentFormat = 'file' | 'link';

export type TWebsiteContentInfo = {
    title: string;
    description?: string;
    company: string;
    companyLink: string;
    links: string[];
    productLinks: string[];
    category: 'corporate' | 'landing' | 'event' | 'portfolio' | 'shopping';
    devices?: ('mobile' | 'desktop' | 'tablet')[];
    /** 있으면 iframe에 사용, 없으면 로컬 path */
    url?: string;
    /** 'YYYY-MM-DD' */
    startDate?: string;
    /** 'YYYY-MM-DD' */
    endDate?: string;
    /** 커스텀 유의사항 목록 */
    notice?: string[];
};

export type TPlayableAdContentInfo = {
    title: string;
    company: string;
    companyLink: string;
    links: string[];
    productLinks: string[];
    orientation: 'portrait' | 'landscape' | 'responsive';
    networkTypes: string[];
    devType: ('code' | 'video')[];
    category: 'game' | 'shopping' | 'music' | 'travel';
};
