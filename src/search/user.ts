// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { UserSearchResult } from "../types/user"

export const user = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    query: string,
): Promise<UserSearchResult> =>
    genericWebRequest<UserSearchResult>(
        "get",
        "/search",
        true,
        [
            { name: "mode", value: "user" },
            { name: "query", value: query },
        ],
        oauthAccessToken,
    )
