// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { GameMode } from ".."
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type { Fetch } from "../types/fetch"
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { Score } from ".."

declare const fetch: Fetch

export enum ScoresType {
    Best = "best",
    FirstPlace = "firsts",
    Recent = "recent",
}

export const scores = async (
    oauthAccessToken: OAuthAccessToken,
    userId: number,
    type: ScoresType,
    mode?: GameMode,
    limit?: number,
    offset?: number,
    includeFails?: boolean,
): Promise<Score[]> => {
    const params = urlParameterGenerator([
        {
            name: "mode",
            value: mode !== undefined ? GameMode[mode] : undefined,
        },
        {
            name: "limit",
            value: limit !== undefined ? limit.toString() : undefined,
        },
        {
            name: "offset",
            value: offset !== undefined ? offset.toString() : undefined,
        },
        {
            name: "include_fails",
            value:
                includeFails !== undefined
                    ? includeFails
                        ? "1"
                        : "0"
                    : undefined,
        },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(
        `${baseUrlApiV2}/users/${userId}/scores/${type}${params}`,
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

    const events = (await res.json()) as Score[]
    return events
}
