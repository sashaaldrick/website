export type ThoughtType = 'text' | 'code' | 'embed' | 'gallery';

export interface BaseThought {
    id: string;
    timestamp: Date;
    type: ThoughtType;
    tags?: string[];
}

export interface TextThought extends BaseThought {
    type: 'text';
    content: string;
    mood?: string;
    isMarkdown?: boolean;
}

export interface CodeThought extends BaseThought {
    type: 'code';
    language: string;
    code: string;
    description?: string;
}

export interface EmbedThought extends BaseThought {
    type: 'embed';
    embedType: 'youtube' | 'spotify' | 'twitter';
    embedId: string;
    title?: string;
}

export interface GalleryThought extends BaseThought {
    type: 'gallery';
    images: {
        url: string;
        caption?: string;
        alt: string;
    }[];
}

export type Thought = TextThought | CodeThought | EmbedThought | GalleryThought;

export type ThoughtStore = {
    thoughts: Thought[];
    loading: boolean;
    error: string | null;
}; 