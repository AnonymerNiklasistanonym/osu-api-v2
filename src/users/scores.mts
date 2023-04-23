// Local imports
import { GameMode } from "../types/game_mode.mjs"
import { genericWebRequest } from "../helpers/web_request.mjs"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token.mjs"
import type { Score } from "../index.mjs"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { OsuApiV2WebRequestError } from "../helpers/custom_errors.mjs"

/**
 * The type of score that can be requested.
 */
export enum ScoresType {
    /** The best scores of the user. */
    BEST = "best",
    /** The first place scores of the user. */
    FIRST = "firsts",
    /** The recent scores of the user. */
    RECENT = "recent",
}

/**
 * Get a list of a type of scores ({@link ScoresType}) of a user.
 * @param oauthAccessToken The OAuth Access token.
 * @param userId The osu! user ID of the account from which scores should be
 * fetched.
 * @param type The type of scores that should be fetched.
 * @param mode The game mode for which the scores should be fetched.
 * @param limit Maximum number of results.
 * @param offset Result offset for pagination.
 * @param includeFails Only for recent scores, include scores of failed plays.
 * Is off per default.
 * @throws If the web request fails like for example when no user was found with
 * the provided user ID a {@link OsuApiV2WebRequestError} is being thrown.
 * @example
 * ```ts
 * import osuApiV2, { GameMode, ScoresType } from "osu-api-v2"
 *
 * const user = await osuApiV2.users.scores(
 *     oauthAccessToken,
 *     9096716,
 *     ScoresType.BEST,
 *     GameMode.OSU_STANDARD,
 *     2,
 *     1,
 * )
 * ```
 * [[include:example_output/users_scores_9096716_best_osu_2_1.md]]
 * @example
 * ```ts
 * import osuApiV2, { GameMode, ScoresType } from "osu-api-v2"
 *
 * const user = await osuApiV2.users.scores(
 *     oauthAccessToken,
 *     2927048,
 *     ScoresType.RECENT,
 *     GameMode.OSU_STANDARD,
 *     2,
 *     0,
 *     true,
 * )
 * ```
 * [[include:example_output/users_scores_2927048_recent_osu_2_0_true.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#get-user-scores))
 */
export const scores = async (
    oauthAccessToken: Readonly<OAuthAccessToken>,
    userId: number,
    type: ScoresType = ScoresType.BEST,
    mode: GameMode = GameMode.OSU_STANDARD,
    limit?: number,
    offset?: number,
    includeFails?: boolean,
): Promise<Score[]> =>
    genericWebRequest<Score[]>("get", ["users", userId, "scores", type], {
        apiCall: true,
        authorizationAccessToken: oauthAccessToken,
        urlParameters: [
            {
                name: "mode",
                value: mode,
            },
            {
                name: "limit",
                value: limit,
            },
            {
                name: "offset",
                value: offset,
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
        ],
    })
