// Local imports
import { baseUrl } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { RefreshTokenGrant } from "../types/refresh_token_grant"
// Type imports
import type { OAuthAccessTokenWithRefreshToken } from "../types/oauth_access_token"

export const refreshTokenGrant = async (
    clientId: number,
    clientSecret: string,
    redirectUri: string,
    refreshToken: string,
): Promise<OAuthAccessTokenWithRefreshToken> => {
    const requestBody: RefreshTokenGrant = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        redirect_uri: redirectUri,
        refresh_token: refreshToken,
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

    const oauthAccessToken =
        (await res.json()) as OAuthAccessTokenWithRefreshToken
    return oauthAccessToken
}
