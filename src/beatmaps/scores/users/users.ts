import type { OAuthAccessToken } from "../../../types/oauth_access_token"
import type { BeatmapUserScore } from "../../../types/score"

import fetch from "node-fetch"
import { baseUrlApiV2 } from "../../../types/api_info"
import { GameMode } from "../../../types/game_mode"
import { urlParameterGenerator } from "../../../helpers/url_parameter_generator"

export const users = async (
    oauthAccessToken: OAuthAccessToken,
    beatmapId: number,
    userId: number,
    mode?: GameMode,
    mods?: string[],
): Promise<BeatmapUserScore> => {
    const params = urlParameterGenerator([
        {
            name: "mode",
            value: mode !== undefined ? GameMode[mode] : undefined,
        },
        { name: "mods", value: mods },
    ])
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await fetch(
            `${baseUrlApiV2}/beatmaps/${beatmapId}/scores/users/${userId}${params}`,
            {
                headers: {
                    Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
                    "Content-Type": "application/json",
                },
                method: "get",
            },
        )
        if (res.status !== 200) {
            throw Error(
                `Bad request (${res.status}, url=${
                    res.url
                }, headers=${JSON.stringify(res.headers)})`,
            )
        }

        const beatmapUserScore: BeatmapUserScore = await res.json()
        return beatmapUserScore
    } catch (err) {
        throw err
    }
}
