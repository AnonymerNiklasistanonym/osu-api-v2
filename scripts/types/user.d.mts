// This is an auto generated file

// Types: ProfilePage, User, UserKudosu

// Type imports
import type { GameMode } from "./gameMode.d.mjs"
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#profilepage)
 */
export enum ProfilePage {
    BEATMAPS = "beatmaps",
    HISTORICAL = "historical",
    KUDOSU = "kudosu",
    ME = "me",
    MEDALS = "medals",
    RECENT_ACTIVITY = "recent_activity",
    TOP_RANKS = "top_ranks",
}

/**
 * @example
 * ```json
 * {
 *   "avatar_url": "https://a.ppy.sh/1?1501234567.jpeg",
 *   "country_code": "AU",
 *   "default_group": "default",
 *   "id": 1,
 *   "is_active": true,
 *   "is_bot": false,
 *   "is_deleted": false,
 *   "is_online": false,
 *   "is_supporter": true,
 *   "last_visit": "2020-01-01T00:00:00+00:00",
 *   "pm_friends_only": false,
 *   "profile_colour": "#000000",
 *   "username": "osuuser",
 *   "cover_url": "https://assets.ppy.sh/user-profile-covers/1/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef.jpeg",
 *   "discord": "osuuser#1337",
 *   "has_supported": true,
 *   "interests": null,
 *   "join_date": "2010-01-01T00:00:00+00:00",
 *   "kudosu": {
 *     "total": 20,
 *     "available": 10
 *   },
 *   "location": null,
 *   "max_blocks": 50,
 *   "max_friends": 500,
 *   "occupation": null,
 *   "playmode": "osu",
 *   "playstyle": [
 *     "mouse",
 *     "touch"
 *   ],
 *   "post_count": 100,
 *   "profile_order": [
 *     "me",
 *     "recent_activity",
 *     "beatmaps",
 *     "historical",
 *     "kudosu",
 *     "top_ranks",
 *     "medals"
 *   ],
 *   "title": null,
 *   "twitter": "osuuser",
 *   "website": "https://osu.ppy.sh",
 *   "country": {
 *     "code": "AU",
 *     "name": "Australia"
 *   },
 *   "cover": {
 *     "custom_url": "https://assets.ppy.sh/user-profile-covers/1/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef.jpeg",
 *     "url": "https://assets.ppy.sh/user-profile-covers/1/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef.jpeg",
 *     "id": null
 *   },
 *   "is_restricted": false,
 *   "account_history": [],
 *   "active_tournament_banner": null,
 *   "badges": [
 *     {
 *       "awarded_at": "2015-01-01T00:00:00+00:00",
 *       "description": "Test badge",
 *       "image_url": "https://assets.ppy.sh/profile-badges/test.png",
 *       "url": ""
 *     }
 *   ],
 *   "favourite_beatmapset_count": 10,
 *   "follower_count": 100,
 *   "graveyard_beatmapset_count": 10,
 *   "groups": [
 *     {
 *       "id": 1,
 *       "identifier": "gmt",
 *       "name": "gmt",
 *       "short_name": "GMT",
 *       "description": "",
 *       "colour": "#FF0000"
 *     }
 *   ],
 *   "loved_beatmapset_count": 0,
 *   "monthly_playcounts": [
 *     {
 *       "start_date": "2019-11-01",
 *       "count": 100
 *     },
 *     {
 *       "start_date": "2019-12-01",
 *       "count": 150
 *     },
 *     {
 *       "start_date": "2020-01-01",
 *       "count": 20
 *     }
 *   ],
 *   "page": {
 *     "html": "Hello",
 *     "raw": "[centre]Hello[/centre]"
 *   },
 *   "pending_beatmapset_count": 0,
 *   "previous_usernames": [],
 *   "ranked_beatmapset_count": 10,
 *   "replays_watched_counts": [
 *     {
 *       "start_date": "2019-11-01",
 *       "count": 10
 *     },
 *     {
 *       "start_date": "2019-12-01",
 *       "count": 12
 *     },
 *     {
 *       "start_date": "2020-01-01",
 *       "count": 1
 *     }
 *   ],
 *   "scores_first_count": 0,
 *   "statistics": {
 *     "level": {
 *       "current": 60,
 *       "progress": 55
 *     },
 *     "pp": 100,
 *     "global_rank": 2000,
 *     "ranked_score": 2000000,
 *     "hit_accuracy": 90.5,
 *     "play_count": 1000,
 *     "play_time": 100000,
 *     "total_score": 3000000,
 *     "total_hits": 6000,
 *     "maximum_combo": 500,
 *     "replays_watched_by_others": 270,
 *     "is_ranked": true,
 *     "grade_counts": {
 *       "ss": 10,
 *       "ssh": 5,
 *       "s": 50,
 *       "sh": 0,
 *       "a": 40
 *     },
 *     "rank": {
 *       "global": 15000,
 *       "country": 30000
 *     }
 *   },
 *   "support_level": 3,
 *   "user_achievements": [
 *     {
 *       "achieved_at": "2020-01-01T00:00:00+00:00",
 *       "achievement_id": 1
 *     }
 *   ],
 *   "rank_history": {
 *     "mode": "osu",
 *     "data": [
 *       16200,
 *       15500,
 *       15000
 *     ]
 *   }
 * }
 * ```
 * Represents a User. Extends UserCompact object with additional attributes.
 * In addition, the following optional attributes on UserCompact are included:
 * [Source](https://osu.ppy.sh/docs/index.html#user)
 */
export interface User {
    /**
     * url of profile cover. Deprecated, use cover.url instead.
     */
    cover_url: string
    discord?: string
    /**
     * whether or not ever being a supporter in the past
     */
    has_supported: boolean
    interests?: string
    join_date: Timestamp
    kudosu: UserKudosu
    location?: string
    /**
     * maximum number of users allowed to be blocked
     */
    max_blocks: number
    /**
     * maximum number of friends allowed to be added
     */
    max_friends: number
    occupation?: string
    /**
     * Updated types: `GameMode` -> GameMode
     */
    playmode: GameMode
    /**
     * Device choices of the user.
     */
    playstyle: UserPlaystyle[]
    /**
     * number of forum posts
     */
    post_count: number
    /**
     * ordered array of sections in user profile page
     * Updated types: `ProfilePage`[] -> ProfilePage[]
     */
    profile_order: ProfilePage[]
    /**
     * user-specific title
     */
    title?: string
    title_url?: string
    twitter?: string
    website?: string
}

export interface UserKudosu {
    available: number
    total: number
}
