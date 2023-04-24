// This is an auto generated file

// Types: UserStatistics, UserStatisticsGradeCounts, UserStatisticsLevel

// Type imports
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "count_100": 0,
 *   "count_300": 0,
 *   "count_50": 0,
 *   "count_miss": 0,
 *   "grade_counts": {
 *       "a": 3,
 *       "s": 2,
 *       "sh": 6,
 *       "ss": 2,
 *       "ssh": 3
 *   },
 *   "hit_accuracy": 92.19,
 *   "is_ranked": true,
 *   "level": {
 *       "current": 30,
 *       "progress": 0
 *   },
 *   "maximum_combo": 3948,
 *   "play_count": 228050,
 *   "play_time": null,
 *   "pp": 990,
 *   "global_rank": 87468,
 *   "ranked_score": 1502995536,
 *   "replays_watched_by_others": 0,
 *   "total_hits": 5856573,
 *   "total_score": 2104193750,
 *   "user": {
 *       "avatar_url": "https://a.ppy.sh/2?1519081077.png",
 *       "country": {
 *           "code": "AU",
 *           "name": "Australia"
 *       },
 *       "country_code": "AU",
 *       "cover": {
 *           "custom_url": null,
 *           "id": "3",
 *           "url": "https://assets.ppy.sh/user-profile-covers/2/baba245ef60834b769694178f8f6d4f6166c5188c740de084656ad2b80f1eea7.jpeg"
 *       },
 *       "default_group": "ppy",
 *       "id": 2,
 *       "is_active": false,
 *       "is_bot": false,
 *       "is_online": false,
 *       "is_supporter": true,
 *       "last_visit": "2019-02-22T11:07:10+00:00",
 *       "pm_friends_only": false,
 *       "profile_colour": "#3366FF",
 *       "username": "peppy"
 *   }
 * }
 * ```
 * A summary of various gameplay statistics for a User. Specific to a GameMode
 * [Source](https://osu.ppy.sh/docs/index.html#userstatistics)
 */
export interface UserStatistics {
    count_100: number
    count_300: number
    count_50: number
    count_miss: number
    /**
     * Current rank according to pp.
     */
    global_rank?: number
    /**
     * Number of A ranked scores.
     */
    grade_counts: UserStatisticsGradeCounts
    /**
     * Hit accuracy percentage
     */
    hit_accuracy: number
    /**
     * Is actively ranked
     */
    is_ranked: boolean
    /**
     * Current level.
     */
    level: UserStatisticsLevel
    /**
     * Highest maximum combo.
     */
    maximum_combo: number
    /**
     * Number of maps played.
     */
    play_count: number
    /**
     * Cumulative time played.
     */
    play_time: number
    /**
     * Performance points
     */
    pp: number
    /**
     * Current ranked score.
     */
    ranked_score: number
    /**
     * Number of replays watched by other users.
     */
    replays_watched_by_others: number
    /**
     * Total number of hits.
     */
    total_hits: number
    /**
     * Total score.
     */
    total_score: number
    /**
     * The associated user.
     * Updated types: `UserCompact` -> UserCompact
     */
    user: UserCompact
}

export interface UserStatisticsGradeCounts {
    /**
     * Number of A ranked scores.
     */
    a: number
    /**
     * Number of S ranked scores.
     */
    s: number
    /**
     * Number of Silver S ranked scores.
     */
    sh: number
    /**
     * Number of SS ranked scores.
     */
    ss: number
    /**
     * Number of Silver SS ranked scores.
     */
    ssh: number
}

export interface UserStatisticsLevel {
    /**
     * Current level.
     */
    current: number
    /**
     * Progress to next level.
     */
    progress: number
}
