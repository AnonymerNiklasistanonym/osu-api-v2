// This is an auto generated file

// Types: SearchResponseFormat, SearchResult

// Type imports
import type { UserCompact } from "./userCompact.d.mjs"
import type { WikiPage } from "./wikiPage.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface SearchResponseFormat {
    /**
     * For `all` or `user` mode. Only first 100 results are accessible
     * Updated types: SearchResult<UserCompact> -> SearchResult<UserCompact>
     */
    user?: SearchResult<UserCompact>
    /**
     * For `all` or `wiki_page` mode
     * Updated types: SearchResult<WikiPage> -> SearchResult<WikiPage>
     */
    wiki_page?: SearchResult<WikiPage>
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#searchresult<t>)
 */
export interface SearchResult {
    /**
     * Updated types: T[] -> T[]
     */
    data: T[]
    total: number
}
