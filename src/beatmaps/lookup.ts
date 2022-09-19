import type { Beatmap } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

import { baseUrlApiV2 } from "../types/api_info"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"

export const lookup = async (
    oauthAccessToken: OAuthAccessToken,
    checksum?: string,
    filename?: string,
    id?: number,
): Promise<Beatmap> => {
    const params = urlParameterGenerator([
        { name: "checksum", value: checksum },
        { name: "filename", value: filename },
        { name: "id", value: id !== undefined ? `${id}` : undefined },
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(`${baseUrlApiV2}/beatmaps/lookup${params}`, {
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
