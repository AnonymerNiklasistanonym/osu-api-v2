// This is an auto generated file

// Types: Rankings

// Type imports
import type { Beatmapset } from "./beatmapset.d.mjs"
import type { Spotlight } from "./spotlight.d.mjs"
import type { UserStatistics } from "./userStatistics.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "cursor": {
 * 
 *   },
 *   "ranking": [
 *     {
 *       "grade_counts": {
 *           "a": 3,
 *           "s": 2,
 *           "sh": 6,
 *           "ss": 2,
 *           "ssh": 3
 *       },
 *       "hit_accuracy": 92.19,
 *       "is_ranked": true,
 *       "level": {
 *           "current": 30,
 *           "progress": 0
 *       },
 *       "maximum_combo": 3948,
 *       "play_count": 228050,
 *       "play_time": null,
 *       "pp": 990,
 *       "global_rank": 87468,
 *       "ranked_score": 1502995536,
 *       "replays_watched_by_others": 0,
 *       "total_hits": 5856573,
 *       "total_score": 2104193750,
 *       "user": {
 *           "avatar_url": "/images/layout/avatar-guest.png",
 *           "country": {
 *               "code": "GF",
 *               "name": "French Guiana"
 *           },
 *           "country_code": "GF",
 *           "cover": {
 *               "custom_url": null,
 *               "id": "3",
 *               "url": "http://osuweb.test/images/headers/profile-covers/c3.jpg"
 *           },
 *           "default_group": "default",
 *           "id": 458402,
 *           "is_active": false,
 *           "is_bot": false,
 *           "is_online": false,
 *           "is_supporter": true,
 *           "last_visit": "2017-02-22T11:07:10+00:00",
 *           "pm_friends_only": false,
 *           "profile_colour": null,
 *           "username": "serdman"
 *       }
 *     }
 *   ],
 *   "total": 100
 * }
 * ```
 * [Source](https://osu.ppy.sh/docs/index.html#rankings)
 */
export interface Rankings {
    /**
     * The list of beatmaps in the requested spotlight for the given `mode`; only available if `type` is `charts`
     * Updated types: `Beatmapset`[] -> Beatmapset[]
     */
    beatmapsets?: Beatmapset[]
    /**
     * A cursor
     * Updated types: `Cursor` -> Cursor
     */
    cursor: Cursor
    /**
     * Score details ordered by rank in descending order.
     * Updated types: `UserStatistics`[] -> UserStatistics[]
     */
    ranking: UserStatistics[]
    /**
     * Spotlight details; only available if `type` is `charts`
     * Updated types: `Spotlight` -> Spotlight
     */
    spotlight?: Spotlight
    /**
     * An approximate count of ranks available
     */
    total: number
}
