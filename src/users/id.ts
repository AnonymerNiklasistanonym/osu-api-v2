import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { Fetch } from "../types/fetch"
import type { User } from "../types/user"

import { baseUrlApiV2 } from "../types/api_info"
import { GameMode } from "../types/game_mode"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

declare const fetch: Fetch

export const id = async (
    oauthAccessToken: OAuthAccessToken,
    userId: number,
    mode?: GameMode,
): Promise<User> => {
    const params = urlParameterGenerator([
        {
            name: "mode",
            value: mode !== undefined ? GameMode[mode] : undefined,
        },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await fetch(`${baseUrlApiV2}/users/${userId}${params}`, {
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
    } catch (err) {
        throw err
    }
}
