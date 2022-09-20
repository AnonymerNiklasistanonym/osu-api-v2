// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
// Type imports
import type { Beatmap } from "../types/beatmap"
import type { Fetch } from "../types/fetch"
import type { OAuthAccessToken } from "../types/oauth_access_token"

declare const fetch: Fetch

export const get = async (
    oauthAccessToken: OAuthAccessToken,
    beatmapId: number,
): Promise<Beatmap> => {
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(`${baseUrlApiV2}/beatmaps/${beatmapId}`, {
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

    const beatmap = (await res.json()) as Beatmap
    return beatmap
}
