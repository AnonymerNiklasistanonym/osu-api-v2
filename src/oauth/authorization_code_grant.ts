import type { OauthAccessTokenWithRefresh } from "../types/oauth_access_token"
import type { Fetch } from "../types/fetch"

import { baseUrl } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { AuthorizationCodeGrant } from "../types/authorization_code_grant"

declare const fetch: Fetch

export const authorizationCodeGrant = async (
    client_id: number,
    client_secret: string,
    redirect_uri: string,
    code: string,
): Promise<OauthAccessTokenWithRefresh> => {
    const requestBody: AuthorizationCodeGrant = {
        client_id,
        client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri,
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
            body,
        )
    }

    const oauthAccessToken = (await res.json()) as OauthAccessTokenWithRefresh
    return oauthAccessToken
}
