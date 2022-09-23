// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { OAuthAccessTokenWithRefreshToken } from "../types/oauth_access_token"
import type { RefreshTokenGrant } from "../types/refresh_token_grant"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { authorizationCodeGrant } from "./authorization_code_grant"

/**
 * Request a new refresh token.
 *
 * Upon successful response this will invalidate your current refresh token
 * and needs to be updated with the in the response contained new refresh token.
 *
 * @param clientId The Client ID you received when you
 * [registered](https://osu.ppy.sh/home/account/edit#new-oauth-application).
 * @param clientSecret The client secret of your application.
 * @param redirectUri The redirect URI of your application.
 * @param refreshToken The current granted refresh token (from either this
 * method or from {@link authorizationCodeGrant}).
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const oAuthAccessTokenWithRefreshToken =
 *     await osuApiV2.oauth.refreshTokenGrant(
 *         1234,
 *         "sjasnfkjdsnfjkasnfköjsdnfösdkfnsf",
 *         "http://localhost:8888",
 *         "sdadasdsadasdasdafdsfsfsfsfsfsads",
 *     )
 * ```
 */
export const refreshTokenGrant = async (
    clientId: number,
    clientSecret: string,
    redirectUri: string,
    refreshToken: string,
): Promise<OAuthAccessTokenWithRefreshToken> =>
    genericWebRequest<OAuthAccessTokenWithRefreshToken, RefreshTokenGrant>(
        "post",
        ["oauth", "token"],
        {
            postRequestBody: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: "refresh_token",
                redirect_uri: redirectUri,
                refresh_token: refreshToken,
            },
        },
    )
