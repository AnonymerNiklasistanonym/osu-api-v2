// Local imports
import { genericWebRequest } from "../helpers/web_request.mjs"
// Type imports
import type { Beatmapset } from "../types/beatmap.mjs"
import type { OAuthAccessToken } from "../types/oauth_access_token.mjs"

export const get = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    beatmapsetId: number,
): Promise<Beatmapset> =>
    genericWebRequest<Beatmapset>("get", ["beatmapsets", beatmapsetId], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
    })
