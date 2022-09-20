// Local imports
import { baseUrlApiV2 } from "../types/api_info"
import { GameMode } from ".."
import { OsuApiV2WebRequestError } from "../helpers/custom_errors"
import { urlParameterGenerator } from "../helpers/url_parameter_generator"
// Type imports
import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { Score } from ".."

/**
 * The type of score that can be requested.
 */
export enum ScoresType {
    /** The best scores of the user. */
    BEST = "best",
    /** The first place scores of the user. */
    FIRST_PLACE = "firsts",
    /** The recent scores of the user. */
    RECENT = "recent",
}

/**
 * Get a list of a type of scores ({@link ScoresType}) of a user.
 *
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
 *     GameMode.osu,
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
 *     GameMode.osu,
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
    oauthAccessToken: OAuthAccessToken,
    userId: number,
    type: ScoresType = ScoresType.BEST,
    mode: GameMode = GameMode.osu,
    limit?: number,
    offset?: number,
    includeFails?: boolean,
): Promise<Score[]> => {
    const params = urlParameterGenerator([
        {
            name: "mode",
            value: mode !== undefined ? GameMode[mode] : undefined,
        },
        {
            name: "limit",
            value: limit !== undefined ? limit.toString() : undefined,
        },
        {
            name: "offset",
            value: offset !== undefined ? offset.toString() : undefined,
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
    ])
    const method = "get"
    const headers = {
        Authorization: `${oauthAccessToken.token_type} ${oauthAccessToken.access_token}`,
        "Content-Type": "application/json",
    }

    const res = await fetch(
        `${baseUrlApiV2}/users/${userId}/scores/${type}${params}`,
        {
            headers,
            method,
        },
    )
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

    const events = (await res.json()) as Score[]
    return events
}
