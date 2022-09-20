import type { OauthAccessTokenWithRefresh } from "../types/oauth_access_token"
import type { User } from "../types/user"

import { baseUrlApiV2 } from "../types/api_info"
import { GameMode } from "../types/game_mode"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

/**
 * Gets own user's data using a token obtained via Authorization Code grant
 */
export const me = async (
    oauthAccessToken: Pick<
        OauthAccessTokenWithRefresh,
        "access_token" | "token_type"
    >,
    mode?: GameMode,
): Promise<User> => {
    const params = urlParameterGenerator([
        {
            name: "mode",
            value: mode,
        },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(`${baseUrlApiV2}/me${params}`, {
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

    const user = (await res.json()) as User
    return user
}
