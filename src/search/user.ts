// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { UserSearchResult } from "../types/user"

export const user = async (
    oauthAccessToken: OAuthAccessToken,
    query: string,
): Promise<UserSearchResult> => {
    const params = urlParameterGenerator([
        { name: "mode", value: "user" },
        { name: "query", value: query },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(`${baseUrlApiV2}/search${params}`, {
        headers,
        method,
    })
    if (res.status !== 200) {
        throw new OsuApiV2WebRequestError(
            `Bad web request (${res.status}=${res.statusText}, url=${res.url})`,
            res.status,
            res.statusText,
            res.url,
            method,
            headers,
        )
    }

    const userSearchResult = (await res.json()) as UserSearchResult
    return userSearchResult
}
