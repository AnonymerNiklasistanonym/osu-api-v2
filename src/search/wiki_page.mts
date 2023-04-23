// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
// Type imports
import type { Search, SearchResult } from "../types/search.mjs"
import type { OAuthAccessToken } from "../types/oauth_access_token.mjs"
import type { WikiPage } from "../types/wiki_page.mjs"

/**
 * Search for a wiki page using a query.
 * @param oauthAccessToken The OAuth Access token.
 * @param query Search keyword.
 * @param page Search result page.
 * @returns Wiki page search result
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.search.wikiPage(
 *     oauthAccessToken,
 *     "sotarks",
 * )
 * ```
 * [[include:example_output/search_wiki_page_sotarks.md]]
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.search.wikiPage(
 *     oauthAccessToken,
 *     "sotarks",
 *     2,
 * )
 * ```
 * [[include:example_output/search_wiki_page_sotarks_2.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#search))
 */
export const wikiPage = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    query: string,
    page?: number,
): Promise<SearchResult<WikiPage>> => {
    const searchResultUser = await genericWebRequest<
        Search<undefined, WikiPage>
    >("get", ["search"], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
        urlParameters: [
            { name: "mode", value: "wiki_page" },
            { name: "query", value: query },
            { name: "page", value: page },
        ],
    })
    return searchResultUser.wiki_page
}
