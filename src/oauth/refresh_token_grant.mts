// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
import { GrantType } from "../types/grant_type.mjs"
// Type imports
import type { OAuthAccessTokenWithRefreshTokenResponse } from "../types/oauth_access_token.mjs"
import type { OAuthAuthorizeScope } from "../types/oauth_scopes.mjs"
import type { RefreshTokenGrant } from "../types/refresh_token_grant.mjs"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { authorizationCodeGrant } from "./authorization_code_grant.mjs"

/**
 * Request a new refresh token.
 *
 * Upon successful response this will invalidate your current refresh token
 * and needs to be updated with the in the response contained new refresh token.
 * @param clientId The Client ID you received when you
 * [registered](https://osu.ppy.sh/home/account/edit#new-oauth-application).
 * @param clientSecret The client secret of your application.
 * @param redirectUri The redirect URI of your application.
 * @param refreshToken The current granted refresh token (from either this
 * method or from {@link authorizationCodeGrant}).
 * @param scopes Specifying fewer scopes than existing access token is allowed
 * but subsequent refresh tokens can't re-add removed scopes. If this isn't
 * specified, existing access token scopes will be used.
 * @returns An O-Auth access token with refresh token that was granted response.
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
    scopes?: ReadonlyArray<OAuthAuthorizeScope>,
): Promise<OAuthAccessTokenWithRefreshTokenResponse> =>
    genericWebRequest<
        OAuthAccessTokenWithRefreshTokenResponse,
        RefreshTokenGrant
    >("post", ["oauth", "token"], {
        postRequestBody: {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: GrantType.REFRESH_TOKEN,
            redirect_uri: redirectUri,
            refresh_token: refreshToken,
            scope: scopes?.join(" "),
        },
    })
