// Local imports
import { GameMode } from "../../../types/game_mode"
import { genericWebRequest } from "../../../helpers/web_request"
// Type imports
import type { BeatmapUserScore } from "../../../types/score"
import type { OAuthAccessToken } from "../../../types/oauth_access_token"

export const users = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    beatmapId: number,
    userId: number,
    mode?: GameMode,
    mods?: readonly string[],
): Promise<BeatmapUserScore> =>
    genericWebRequest<BeatmapUserScore>(
        "get",
        `/beatmaps/${beatmapId}/scores/users/${userId}`,
        true,
        [
            {
                name: "mode",
                value: mode !== undefined ? mode : undefined,
            },
            { name: "mods", value: mods },
        ],
        oauthAccessToken,
    )
