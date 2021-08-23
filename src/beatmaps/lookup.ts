import type { Beatmap } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import fetch from "node-fetch"
import { baseUrlApiV2 } from "../types/api_info"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

export const lookup = async (
    oauthAccessToken: OAuthAccessToken,
    beatmapId: number,
): Promise<Beatmap> => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await fetch(`${baseUrlApiV2}/beatmaps/${beatmapId}`, {
            headers: {
                Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
                "Content-Type": "application/json",
            },
            method: "get",
        })
        if (res.status !== 200) {
            throw new OsuApiV2WebRequestError(
                res.status,
                res.statusText,
                res.url,
                `Bad web request (${res.status}=${res.statusText}, url=${res.url})`,
            )
        }

        const beatmap: Beatmap = await res.json()
        return beatmap
    } catch (err) {
        throw err
    }
}
