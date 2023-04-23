// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
import { GrantType } from "../types/grant_type.mjs"
// Type imports
import type { AuthorizationCodeGrant } from "../types/authorization_code_grant.mjs"
import type { OAuthAccessTokenWithRefreshTokenResponse } from "../types/oauth_access_token.mjs"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { authorizeRedirectUrlGenerator } from "./authorize.mjs"

/**
 * Exchange the received code after successful authorization (via the
 * {@link authorizeRedirectUrlGenerator} created redirect URI) for an access
 * token that also contains a refresh token.
 * @param clientId The client ID of your application.
 * @param clientSecret The client secret of your application.
 * @param redirectUri The URL in your application where users will be sent
 * after authorization.
 * @param code The code you received.
 * @returns Successful requests will be issued an access token.
 * @example
 * ```ts
 * import osuApiV2 from "osu-api-v2"
 *
 * const receivedCode = "fsjdkfndskjfndsjkfnsdkjfnsdkfns"
 * const oAuthAccessTokenWithRefreshToken =
 *     await osuApiV2.oauth.authorizationCodeGrant(
 *         1234,
 *         "sjasnfkjdsnfjkasnfköjsdnfösdkfnsf",
 *         "http://localhost:8888",
 *         receivedCode,
 *     )
 * ```
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#authorization-code-grant))
 */
export const authorizationCodeGrant = async (
    clientId: number,
    clientSecret: string,
    redirectUri: string,
    code: string,
): Promise<OAuthAccessTokenWithRefreshTokenResponse> =>
    genericWebRequest<
        OAuthAccessTokenWithRefreshTokenResponse,
        AuthorizationCodeGrant
    >("post", ["oauth", "token"], {
        postRequestBody: {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            grant_type: GrantType.AUTHORIZATION_CODE,
            redirect_uri: redirectUri,
        },
    })
