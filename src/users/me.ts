// Local imports
import { GameMode } from "../types/game_mode"
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { UserEndpointMe } from "../types/user"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { get } from "./get"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OAuthAuthorizeScope } from "../types/oauth_scopes"

/**
 * Similar to {@link get} but with authenticated user (token owner) as user id.
 *
 * You need to have the {@link OAuthAuthorizeScope.IDENTIFY} to use this
 * endpoint.
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
    oauthAccessToken: Readonly<OAuthAccessToken>,
    mode?: GameMode,
): Promise<UserEndpointMe> =>
    genericWebRequest<UserEndpointMe>("get", ["me", mode], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
    })
