// Local imports
import { baseUrl } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
// Type imports
import type { ClientCredentialsGrant } from "../types/client_credentials_grant"
import type { OAuthAccessToken } from "../types/oauth_access_token"

/**
 * The client credential flow provides a way for developers to get access tokens
 * that do not have associated user permissions; as such, these tokens are
 * considered as guest users.
 *
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
): Promise<OAuthAccessToken> => {
    const requestBody: ClientCredentialsGrant = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "public",
    }
    const method = "post"
    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify(requestBody)

    const res = await fetch(`${baseUrl}/oauth/token`, {
        body,
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
            JSON.stringify({
                ...requestBody,
                client_secret: "[redacted]",
            }),
        )
    }

    const oauthAccessToken = (await res.json()) as OAuthAccessToken
    return oauthAccessToken
}
