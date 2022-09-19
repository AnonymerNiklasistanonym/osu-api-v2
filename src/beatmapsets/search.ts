import type { Beatmapset } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import { baseUrlApiV2 } from "../types/api_info"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

export interface BeatmapsetSearchResult {
    beatmapsets: Beatmapset[]
}

export const search = async (
    oauthAccessToken: OAuthAccessToken,
    query: string,
    onlyBeatmapsetWithLeaderboard = true,
): Promise<BeatmapsetSearchResult> => {
    const params = urlParameterGenerator([
        { name: "query", value: query },
        {
            name: "s",
            value: onlyBeatmapsetWithLeaderboard === false ? "any" : undefined,
        },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(`${baseUrlApiV2}/beatmapsets/search/${params}`, {
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

    const beatmapsetSearchResult = (await res.json()) as BeatmapsetSearchResult
    return beatmapsetSearchResult
}
