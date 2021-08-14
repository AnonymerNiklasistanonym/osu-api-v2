import type { ClientCredentialsGrant } from "../types/client_credentials_grant"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import fetch from "node-fetch"
import { baseUrl } from "../types/api_info"

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
            throw Error(`Bad request (${res.status}, ${JSON.stringify(res)})`)
        }
        if (res.status !== 200) {
            throw Error(
                `Bad request (${res.status}, url=${
                    res.url
                }, headers=${JSON.stringify(
                    res.headers,
                )}, body=${JSON.stringify(res.body)}})`,
            )
        }

        const oauthAccessToken: OAuthAccessToken = await res.json()
        return oauthAccessToken
    } catch (err) {
        throw err
    }
}
