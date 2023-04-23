// Local imports
import { GameMode } from "../../../types/game_mode.mjs"
import { genericWebRequest } from "../../../helpers/web_request.mjs"
// Type imports
import type { BeatmapUserScore } from "../../../types/score.mjs"
import type { OAuthAccessToken } from "../../../types/oauth_access_token.mjs"

export const users = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    beatmapId: number,
    userId: number,
    mode?: GameMode,
    mods?: ReadonlyArray<string>,
): Promise<BeatmapUserScore> =>
    genericWebRequest<BeatmapUserScore>(
        "get",
        ["beatmaps", beatmapId, "scores", "users", userId],
        {
            apiCall: true,
            authorizationAccessToken: oauthAccessToken,
            urlParameters: [
                {
                    name: "mode",
                    value: mode !== undefined ? mode : undefined,
                },
                { name: "mods", value: mods },
            ],
        },
    )
