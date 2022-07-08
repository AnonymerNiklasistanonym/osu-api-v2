import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { Fetch } from "../types/fetch"
import type { Score } from ".."

import { baseUrlApiV2 } from "../types/api_info"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { GameMode } from ".."

declare const fetch: Fetch

export enum ScoresType {
    Recent = "recent",
    Best = "best",
    FirstPlace = "firsts",
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
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await fetch(
            `${baseUrlApiV2}/users/${userId}/scores/${type.toString()}${params}`,
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
    } catch (err) {
        throw err
    }
}
