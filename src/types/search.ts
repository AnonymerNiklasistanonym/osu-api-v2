// Type imports
import type { UserEndpointSearchUser } from "./user"
import type { WikiPage } from "./wiki_page"

/**
 * [[include:example_output/search_user_niklas616.md]]
 * [[include:example_output/search_user_Ooi_2.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#search))
 */
export interface SearchResult<DATA_TYPE> {
    data: DATA_TYPE[]
    total: number
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#search))
 */
export interface Search<
    DATA_TYPE_USER = UserEndpointSearchUser | undefined,
    DATA_TYPE_WIKI_PAGE = WikiPage | undefined,
> {
    user: SearchResult<DATA_TYPE_USER>
    wiki_page: SearchResult<DATA_TYPE_WIKI_PAGE>
}
