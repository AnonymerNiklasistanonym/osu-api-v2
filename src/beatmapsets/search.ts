// Local imports
import { genericWebRequest } from "../helpers/web_request"
// Type imports
import type { BeatmapsetSearchResult } from "../types/beatmap"
import type { OAuthAccessToken } from "../types/oauth_access_token"

export const search = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    query: string,
    onlyBeatmapsetsWithLeaderboard = true,
): Promise<BeatmapsetSearchResult> =>
    genericWebRequest<BeatmapsetSearchResult>(
        "get",
        ["beatmapsets", "search"],
        {
            apiCall: true,
            authorizationAccessToken: oauthAccessToken,
            urlParameters: [
                { name: "query", value: query },
                {
                    name: "s",
                    value:
                        onlyBeatmapsetsWithLeaderboard === false
                            ? "any"
                            : undefined,
                },
            ],
        },
    )
