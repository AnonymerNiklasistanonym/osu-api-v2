// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
// Type imports
import type { Beatmap } from "../types/beatmap.mjs"
import type { OAuthAccessToken } from "../types/oauth_access_token.mjs"

export const get = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    beatmapId: number,
): Promise<Beatmap> =>
    genericWebRequest<Beatmap>("get", ["beatmaps", beatmapId], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
    })
