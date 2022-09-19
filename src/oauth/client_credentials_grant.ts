import type { ClientCredentialsGrant } from "../types/client_credentials_grant"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import { baseUrl } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

export const clientCredentialsGrant = async (
    client_id: number,
    client_secret: string,
): Promise<OAuthAccessToken> => {
    const requestBody: ClientCredentialsGrant = {
        client_id,
        client_secret,
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
