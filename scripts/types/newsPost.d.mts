// This is an auto generated file

// Types: Navigation, NewsPost

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#navigation)
 */
export interface Navigation {
    /**
     * Next post.
     * Updated types: `NewsPost` -> NewsPost
     */
    newer?: NewsPost
    /**
     * Previous post.
     * Updated types: `NewsPost` -> NewsPost
     */
    older?: NewsPost
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#newspost)
 */
export interface NewsPost {
    author: string
    /**
     * HTML post content.
     */
    content?: string
    /**
     * Link to the file view on GitHub.
     */
    edit_url: string
    /**
     * Link to the first image in the document.
     */
    first_image?: string
    id: number
    /**
     * Navigation metadata.
     * Updated types: `Navigation` -> Navigation
     */
    navigation?: Navigation
    /**
     * First paragraph of `content` with HTML markup stripped.
     */
    preview?: string
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    published_at: Timestamp
    /**
     * Filename without the extension, used in URLs.
     */
    slug: string
    title: string
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    updated_at: Timestamp
}
