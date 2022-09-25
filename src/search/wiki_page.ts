// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { Search, SearchResult } from "../types/search"
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { WikiPage } from "../types/wiki_page"

/**
 * Search for a wiki page using a query.
 *
 * @param oauthAccessToken The OAuth Access token.
 * @param query Search keyword.
 * @param page Search result page.
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
