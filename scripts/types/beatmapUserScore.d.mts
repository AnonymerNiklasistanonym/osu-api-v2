// This is an auto generated file

// Types: BeatmapUserScore

// Type imports
import type { Score } from "./score.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "position": 1,
 *   "score": {}
 * }
 * ```
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapuserscore)
 */
export interface BeatmapUserScore {
    /**
     * The position of the score within the requested beatmap ranking.
     */
    position: number
    /**
     * The details of the score.
     * Updated types: `Score` -> Score
     */
    score: Score
}
