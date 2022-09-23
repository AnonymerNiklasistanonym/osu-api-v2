// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { Beatmapset } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

export const get = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    beatmapsetId: number,
): Promise<Beatmapset> =>
    genericWebRequest<Beatmapset>("get", ["beatmapsets", beatmapsetId], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
    })
