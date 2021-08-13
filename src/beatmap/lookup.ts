import type { Beatmap } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import fetch from "node-fetch"
import { baseUrlApiV2 } from "../types/api_info"

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
            throw Error(`Bad request (${res.status}, ${JSON.stringify(res)})`)
        }

        const beatmap: Beatmap = await res.json()
        return beatmap
    } catch (err) {
        throw err
    }
}
