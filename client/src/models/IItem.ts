interface IPageMap {
        metatags: IMetaTag[];
        cse_image: ICseImage[]
}

interface ICseImage {
    src: string
}

interface IMetaTag {
    "og:image": string,
    "og:title": string,
}

export interface IItem {
    kind: string;
    title: string;
    htmlTitle: string;
    link: string;
    displayLink: string;
    snippet: string;
    htmlSnippet: string;
    cacheId: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    pagemap: IPageMap;
}