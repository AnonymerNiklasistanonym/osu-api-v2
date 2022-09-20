// Local imports
import {
    OsuApiV2Error,
    OsuApiV2ErrorCode,
    OsuApiV2WebRequestError,
} from "../helpers/custom_errors"
import { baseUrlApiV2 } from "../types/api_info"
import { GameMode } from "../types/game_mode"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { User } from "../types/user"

/**
 * Get a user by their ID or username.
 *
 * @param oauthAccessToken The OAuth Access token.
 * @param userIdOrName Either the osu! User name or id of the user to get.
 * @param mode Per default (ranking) statistics are returned regarding the
 * default game mode of the user, to request statistics of the user regarding a
 * specific game mode this argument can be supplied.
 * @throws If the web request fails like for example when no user was found with
 * the provided user ID a {@link OsuApiV2WebRequestError} is being thrown.
 * @throws If the web request returns an unexpected type or no user but doesn't
 * throw a web request error a {@link OsuApiV2Error} is being thrown.
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.get(
 *     oauthAccessToken,
 *     9096716,
 * )
 * ```
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.get(
 *     oauthAccessToken,
 *     "Ooi",
 * )
 * ```
 */
export const get = async (
    oauthAccessToken: OAuthAccessToken,
    userIdOrName: number | string,
    mode?: GameMode,
): Promise<User> => {
    const params = urlParameterGenerator([
        {
            name: "key",
            value: typeof userIdOrName === "number" ? "id" : "username",
        },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }
    const modeString = mode === undefined ? "" : `/${mode}`

    const res = await fetch(
        `${baseUrlApiV2}/users/${userIdOrName}${modeString}${params}`,
        {
            headers,
            method,
        },
    )
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
    if (Array.isArray((user as unknown as UserList).users)) {
        if ((user as unknown as UserList).users.length === 0) {
            throw new OsuApiV2Error(
                "No user was found",
                OsuApiV2ErrorCode.NOT_FOUND,
            )
        } else {
            throw new OsuApiV2Error(
                "Array of users was returned but only user was expected",
                OsuApiV2ErrorCode.UNEXPECTED_RETURN_TYPE,
            )
        }
    }
    return user
}

interface UserList {
    users: User[]
}
