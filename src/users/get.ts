// Local imports
import { OsuApiV2Error, OsuApiV2ErrorCode } from "../helpers/custom_errors"
import { GameMode } from "../types/game_mode"
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { UserEndpointGet } from "../types/user"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OsuApiV2WebRequestError } from "../helpers/custom_errors"

interface UserList {
    users: UserEndpointGet[]
}

/**
 * Get a user by their ID or username.
 *
 * @param oauthAccessToken The OAuth Access token.
 * @param userIdOrName Either the osu! user name or ID of the user to get.
 * @param mode Per default (ranking) statistics are returned regarding the
 * default game mode of the user, to request statistics of the user regarding a
 * specific game mode this argument can be supplied.
 * @throws If the web request fails like for example when no user was found with
 * the provided user ID a {@link OsuApiV2WebRequestError} is being thrown.
 * This also happens if a restricted user is fetched.
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
 * [[include:example_output/users_get_9096716.md]]
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.get(
 *     oauthAccessToken,
 *     "Ooi",
 * )
 * ```
 * [[include:example_output/users_get_Ooi.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#get-user))
 */
export const get = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    userIdOrName: number | string,
    mode?: GameMode,
): Promise<UserEndpointGet> => {
    const possibleUser = await genericWebRequest<UserEndpointGet | UserList>(
        "get",
        ["users", userIdOrName, mode],
        {
            apiCall: true,
            authorizationAccessToken: oauthAccessToken,
            urlParameters: [
                {
                    name: "key",
                    value: typeof userIdOrName === "number" ? "id" : "username",
                },
            ],
        },
    )
    // Detect unexpected UserList request response and throw an API error.
    if (Array.isArray((possibleUser as UserList).users)) {
        if ((possibleUser as UserList).users.length === 0) {
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
    return possibleUser as UserEndpointGet
}
