import type { Beatmapset } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { Fetch } from "../types/fetch"

import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

declare const fetch: Fetch

export const get = async (
    oauthAccessToken: OAuthAccessToken,
    beatmapsetId: number,
): Promise<Beatmapset> => {
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await fetch(`${baseUrlApiV2}/beatmapsets/${beatmapsetId}`, {
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
            )
        }

        const beatmapset = (await res.json()) as Beatmapset
        return beatmapset
    } catch (err) {
        throw err
    }
}
