// This is an auto generated file

// Types: BeatmapScores

// Type imports
import type { BeatmapUserScore } from "./beatmapUserScore.d.mjs"
import type { Score } from "./score.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "scores": [],
 *   "userScore": {}
 * }
 * ```
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapscores)
 */
export interface BeatmapScores {
    /**
     * The list of top scores for the beatmap in descending order.
     * Updated types: `Score`[] -> Score[]
     */
    scores: Score[]
    /**
     * The score of the current user. This is not returned if the current user does not have a score. Note: will be moved to `user_score` in the future
     * Updated types: `BeatmapUserScore` -> BeatmapUserScore
     */
    userScore?: BeatmapUserScore
}
