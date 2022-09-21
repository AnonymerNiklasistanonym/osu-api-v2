// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { Beatmap } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

export const get = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    beatmapId: number,
): Promise<Beatmap> =>
    genericWebRequest<Beatmap>(
        "get",
        `/beatmaps/${beatmapId}`,
        true,
        undefined,
        oauthAccessToken,
    )
