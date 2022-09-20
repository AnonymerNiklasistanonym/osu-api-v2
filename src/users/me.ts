// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { GameMode } from "../types/game_mode"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { User } from "../types/user"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { get } from "./get"

/**
 * Similar to {@link get} but with authenticated user (token owner) as user id.
 *
 * @param oauthAccessToken The OAuth Access token.
 * @param mode Per default (ranking) statistics are returned regarding the
 * default game mode of the user, to request statistics of the user regarding a
 * specific game mode this argument can be supplied.
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.me(
 *     oauthAccessToken,
 * )
 * ```
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#get-own-data))
 */
export const me = async (
    oauthAccessToken: OAuthAccessToken,
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
