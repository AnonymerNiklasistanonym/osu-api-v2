import type { OAuthAccessToken } from "../../../types/oauth_access_token"
import type { BeatmapUserScore } from "../../../types/score"

import { baseUrlApiV2 } from "../../../types/api_info"
import { GameMode } from "../../../types/game_mode"
import { urlParameterGenerator } from "../../../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../../../helpers/custom_errors"

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
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(
        `${baseUrlApiV2}/beatmaps/${beatmapId}/scores/users/${userId}${params}`,
        {
            headers,
            method,
        },
    )
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

    const beatmapUserScore = (await res.json()) as BeatmapUserScore
    return beatmapUserScore
}
