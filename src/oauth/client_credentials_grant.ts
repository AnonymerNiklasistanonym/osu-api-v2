import type { ClientCredentialsGrant } from "../types/client_credentials_grant"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import fetch from "node-fetch"
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
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await fetch(`${baseUrl}/oauth/token`, {
            body: JSON.stringify(requestBody),
            headers: { "Content-Type": "application/json" },
            method: "post",
        })
        if (res.status !== 200) {
            throw new OsuApiV2WebRequestError(
                res.status,
                res.statusText,
                res.url,
                `Bad web request (${res.status}=${res.statusText}, url=${res.url})`,
            )
        }

        const oauthAccessToken: OAuthAccessToken = await res.json()
        return oauthAccessToken
    } catch (err) {
        throw err
    }
}
