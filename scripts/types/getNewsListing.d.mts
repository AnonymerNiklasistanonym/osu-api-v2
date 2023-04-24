// This is an auto generated file

// Types: GetNewsListingResponseFormat, ResponseFormatNewsSidebar, ResponseFormatSearch

// Type imports
import type { NewsPost } from "./newsPost.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetNewsListingResponseFormat {
    /**
     * Updated types: `CursorString` -> CursorString
     */
    cursor_string: CursorString
    /**
     * Updated types: `NewsPost`[] -> NewsPost[]
     */
    news_posts: NewsPost[]
    news_sidebar: ResponseFormatNewsSidebar
    search: ResponseFormatSearch
}

export interface ResponseFormatNewsSidebar {
    current_year: number
    /**
     * Updated types: `NewsPost`[] -> NewsPost[]
     */
    news_posts: NewsPost[]
    /**
     * Updated types: number[] -> number[]
     */
    years: number[]
}

export interface ResponseFormatSearch {
    limit: number
    sort: string
}
