// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
import { GrantType } from "../types/grant_type.mjs"
import { OAuthAuthorizeScope } from "../types/oauth_scopes.mjs"
// Type imports
import type { ClientCredentialsGrant } from "../types/client_credentials_grant.mjs"
import type { OAuthAccessTokenResponse } from "../types/oauth_access_token.mjs"

/**
 * The client credential flow provides a way for developers to get access tokens
 * that do not have associated user permissions; as such, these tokens are
 * considered as guest users.
 * @param clientId The Client ID you received when you
 * [registered](https://osu.ppy.sh/home/account/edit#new-oauth-application).
 * @param clientSecret The client secret of your application.
 * @returns Successful requests will be issued an access token.
 * @example
 * ```ts
 * const oAuthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
 *     1234,
 *     "fsdjfhdsjklfhlsjdkhfldskfsdf",
 * )
 * ```
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#client-credentials-grant))
 */
export const clientCredentialsGrant = async (
    clientId: number,
    clientSecret: string,
): Promise<OAuthAccessTokenResponse> =>
    genericWebRequest<OAuthAccessTokenResponse, ClientCredentialsGrant>(
        "post",
        ["oauth", "token"],
        {
            postRequestBody: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: GrantType.CLIENT_CREDENTIALS,
                scope: OAuthAuthorizeScope.PUBLIC,
            },
        },
    )
