// Local imports
import { GameMode } from "../types/game_mode.mjs"
import { genericWebRequest } from "../helpers/web_request.mjs"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token.mjs"
import type { UserEndpointMe } from "../types/user.mjs"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { get } from "./get.mjs"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OAuthAuthorizeScope } from "../types/oauth_scopes.mjs"

/**
 * Similar to {@link get} but with authenticated user (token owner) as user id.
 *
 * You need to have the {@link OAuthAuthorizeScope.IDENTIFY} scope to use this
 * endpoint.
 * @param oauthAccessToken The OAuth Access token.
 * @param mode Per default (ranking) statistics are returned regarding the
 * default game mode of the user, to request statistics of the user regarding a
 * specific game mode this argument can be supplied.
 * @returns User object.
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const user = await osuApiV2.users.me(
 *     oauthAccessToken,
 * )
 * ```
 * [[include:example_output/users_me_nothing.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#get-own-data))
 */
export const me = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    mode?: GameMode,
): Promise<UserEndpointMe> =>
    genericWebRequest<UserEndpointMe>("get", ["me", mode], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
    })
