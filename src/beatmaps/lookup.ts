// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { Beatmap } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

export const lookup = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    checksum?: string,
    filename?: string,
    id?: number,
): Promise<Beatmap> =>
    genericWebRequest<Beatmap>("get", ["beatmaps", "lookup"], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
        urlParameters: [
            { name: "checksum", value: checksum },
            { name: "filename", value: filename },
            { name: "id", value: id },
        ],
    })
