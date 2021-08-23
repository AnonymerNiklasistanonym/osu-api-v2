import type { Beatmap } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import fetch, { HeaderInit } from "node-fetch"
import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

export const lookup = async (
    oauthAccessToken: OAuthAccessToken,
    beatmapId: number,
): Promise<Beatmap> => {
    const method = "get"
    const headers: HeaderInit = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }
    // eslint-disable-next-line no-useless-catch
    try {
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

        const beatmap: Beatmap = await res.json()
        return beatmap
    } catch (err) {
        throw err
    }
}
