// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
// Type imports
import type { Search, SearchResult } from "../types/search.mjs"
import type { OAuthAccessToken } from "../types/oauth_access_token.mjs"
import type { UserEndpointSearchUser } from "../types/user.mjs"

/**
 * Search for a user using a query.
 * @param oauthAccessToken The OAuth Access token.
 * @param query Search keyword.
 * @param page
 * @returns User
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.search.user(
 *     oauthAccessToken,
 *     "niklas616",
 * )
 * ```
 * [[include:example_output/search_user_niklas616.md]]
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.search.user(
 *     oauthAccessToken,
 *     "Ooi",
 *     2,
 * )
 * ```
 * [[include:example_output/search_user_Ooi_2.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#search))
 */
export const user = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    query: string,
    page?: number,
): Promise<SearchResult<UserEndpointSearchUser>> => {
    const searchResultUser = await genericWebRequest<
        Search<UserEndpointSearchUser, undefined>
    >("get", ["search"], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
        urlParameters: [
            { name: "mode", value: "user" },
            { name: "query", value: query },
            { name: "page", value: page },
        ],
    })
    return searchResultUser.user
}
