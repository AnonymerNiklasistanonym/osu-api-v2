// This is an auto generated file

// Types: ProfileBanner, RankHighest, UserAccountHistory, UserBadge, UserCompact

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"
import type { UserGroup } from "./userGroup.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#profilebanner)
 */
export interface ProfileBanner {
    id: number
    image: string
    tournament_id: number
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#rankhighest)
 */
export interface RankHighest {
    rank: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    updated_at: Timestamp
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#useraccounthistory)
 */
export interface UserAccountHistory {
    description?: string
    id: number
    /**
     * In seconds.
     */
    length: number
    permanent: boolean
    timestamp: Timestamp
    /**
     * `note`, `restriction`, or `silence`.
     */
    type: string
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#userbadge)
 */
export interface UserBadge {
    awarded_at: Timestamp
    description: string
    image_url: string
    url: string
}

/**
 * @example
 * ```json
 * {
 *   "id": 2,
 *   "username": "peppy",
 *   "profile_colour": "#3366FF",
 *   "avatar_url": "https://a.ppy.sh/2?1519081077.png",
 *   "country_code": "AU",
 *   "is_active": true,
 *   "is_bot": false,
 *   "is_deleted": false,
 *   "is_online": true,
 *   "is_supporter": true
 * }
 * ```
 * Mainly used for embedding in certain responses to save additional api lookups.
 * Following are attributes which may be additionally included in the response. Relevant endpoints should list them if applicable.
 * [Source](https://osu.ppy.sh/docs/index.html#usercompact)
 */
export interface UserCompact {
    /**
     * Updated types: `UserAccountHistory`[] -> UserAccountHistory[]
     */
    account_history?: UserAccountHistory[]
    /**
     * Updated types: `UserCompact.ProfileBanner` -> UserCompact.ProfileBanner
     */
    active_tournament_banner?: UserCompact.ProfileBanner
    /**
     * url of user's avatar
     */
    avatar_url: string
    /**
     * Updated types: `UserBadge`[] -> UserBadge[]
     */
    badges?: UserBadge[]
    beatmap_playcounts_count?: number
    blocks?: unknown
    country?: unknown
    /**
     * two-letter code representing user's country
     */
    country_code: string
    cover?: unknown
    /**
     * Identifier of the default `Group` the user belongs to.
     */
    default_group: string
    favourite_beatmapset_count?: number
    follower_count?: number
    friends?: unknown
    graveyard_beatmapset_count?: number
    /**
     * Updated types: `UserGroup`[] -> UserGroup[]
     */
    groups?: UserGroup[]
    /**
     * unique identifier for user
     */
    id: number
    /**
     * has this account been active in the last x months?
     */
    is_active: boolean
    /**
     * is this a bot account?
     */
    is_bot: boolean
    is_deleted: boolean
    /**
     * is the user currently online? (either on lazer or the new website)
     */
    is_online: boolean
    is_restricted?: boolean
    /**
     * does this user have supporter?
     */
    is_supporter: boolean
    /**
     * last access time. `null` if the user hides online presence
     * Updated types: `Timestamp` -> Timestamp
     */
    last_visit?: Timestamp
    loved_beatmapset_count?: number
    /**
     * Updated types: `UserMonthlyPlaycount`[] -> UserMonthlyPlaycount[]
     */
    monthly_playcounts?: UserMonthlyPlaycount[]
    page?: unknown
    pending_beatmapset_count?: unknown
    /**
     * whether or not the user allows PM from other than friends
     */
    pm_friends_only: boolean
    previous_usernames?: unknown
    /**
     * colour of username/profile highlight, hex code (e.g. `#333333`)
     */
    profile_colour?: string
    /**
     * Updated types: `RankHighest` -> RankHighest
     */
    rank_highest?: RankHighest
    rank_history?: unknown
    ranked_beatmapset_count?: unknown
    replays_watched_counts?: unknown
    scores_best_count?: number
    scores_first_count?: number
    scores_recent_count?: number
    statistics?: unknown
    statistics_rulesets?: UserStatisticsRulesets
    support_level?: unknown
    unread_pm_count?: unknown
    user_achievements?: unknown
    user_preferences?: unknown
    /**
     * user's display name
     */
    username: string
}
