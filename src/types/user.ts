// Local imports
import { GameMode } from "./game_mode"
// Type imports
import type { Timestamp } from "./timestamp"

export interface UserCompactCover {
    custom_url: null | unknown
    id: string
    url: string
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#user-profilepage))
 */
export interface ProfilePage {
    beatmaps: unknown
    historical: unknown
    kudosu: unknown
    me: unknown
    medals: unknown
    recent_activity: unknown
    top_ranks: unknown
}

export interface UserStatisticsRulesets {
    todo?: boolean
}

export interface UserMonthlyPlaycount {
    todo?: boolean
}

export interface UserGroup {
    todo?: boolean
}

export interface UserAccountHistory {
    todo?: boolean
}

export interface UserCompactProfileBanner {
    todo?: boolean
}

export interface UserBadge {
    todo?: boolean
}

export interface UserCompactCountry {
    code: string
    name: string
}

export interface UserCompactStatisticsLevel {
    current: number
    progress: number
}

export interface UserCompactStatisticsGradeCounts {
    a: number
    s: number
    sh: number
    ss: number
    ssh: number
}

export interface UserCompactStatistics {
    country_rank: number
    global_rank: number
    grade_counts: UserCompactStatisticsGradeCounts
    hit_accuracy: number
    is_ranked: true
    level: UserCompactStatisticsLevel
    maximum_combo: number
    play_count: number
    play_time: number
    pp: number
    ranked_score: number
    replays_watched_by_others: number
    total_hits: number
    total_score: number
}

export interface UserAchievement {
    achieved_at: Timestamp
    achievement_id: number
}

/**
 * Mainly used for embedding in certain responses to save additional api lookups.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#usercompact))
 */
export interface UserCompactBase {
    // Optional:
    account_history?: UserAccountHistory[]
    active_tournament_banner?: UserCompactProfileBanner
    /**
     * Url of user's avatar.
     */
    avatar_url: string
    badges?: UserBadge[]
    beatmap_playcounts_count?: number
    blocks?: unknown
    /**
     * Two-letter code representing user's country.
     */
    country_code: string
    /**
     * Identifier of the default Group the user belongs to.
     */
    default_group: string
    favourite_beatmapset_count?: number
    follower_count?: number
    friends?: unknown
    graveyard_beatmapset_count?: number
    groups?: UserGroup[]
    /**
     * Unique identifier for user.
     */
    id: number
    /**
     * Has this account been active in the last x months?
     */
    is_active: boolean
    /**
     * Is this a bot account?
     */
    is_bot: boolean
    is_deleted: boolean
    /**
     * Is the user currently online? (either on lazer or the new website).
     */
    is_online: boolean
    /**
     * Does this user have supporter?
     */
    is_supporter: boolean
    /**
     * Last access time. Null if the user hides online presence.
     */
    last_visit?: null | Timestamp
    loved_beatmapset_count?: number
    monthly_playcounts?: UserMonthlyPlaycount[]
    page?: unknown
    pending_beatmapset_count?: unknown
    /**
     * Whether or not the user allows PM from other than friends.
     */
    pm_friends_only: boolean
    previous_usernames?: unknown
    /**
     * Colour of username/profile highlight, hex code (e.g. #333333).
     */
    profile_colour: string
    rank_history?: UserRankHistory
    ranked_beatmapset_count?: unknown
    replays_watched_counts?: unknown
    scores_best_count?: number
    scores_first_count?: number
    scores_recent_count?: number
    statistics?: UserCompactStatistics
    statistics_rulesets: UserStatisticsRulesets
    support_level?: unknown
    unread_pm_count?: unknown
    user_achievements?: UserAchievement[]
    user_preferences?: unknown
    /**
     * User's display name.
     */
    username: string
}

export interface UserRankHistory {
    data: number[]
    mode: GameMode
}

/**
 * Mainly used for embedding in certain responses to save additional api lookups.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#usercompact))
 */
export interface UserCompact extends UserCompactBase {
    /** This is included in a {@link User} object. */
    country?: UserCompactCountry
    /** This is included in a {@link User} object. */
    cover?: UserCompactCover
    /** This is included in a {@link User} object. */
    is_restricted?: boolean
}

export interface UserCompactKusodo {
    available: number
    total: number
}

export interface UserCompactCountry {
    code: string
    name: string
}

/**
 * Represents a User. Extends UserCompact object with additional attributes.
 *
 * Https://osu.ppy.sh/docs/index.html#user.
 */
export interface User extends UserCompactBase {
    country: UserCompactCountry
    cover: UserCompactCover
    discord?: string
    /**
     * Whether or not ever being a supporter in the past.
     */
    has_supported: boolean
    interests?: string
    is_restricted: boolean
    join_date: Timestamp
    kudosu: UserCompactKusodo
    location?: string
    /**
     * Maximum number of users allowed to be blocked.
     */
    max_blocks?: number
    /**
     * Maximum number of friends allowed to be added.
     */
    max_friends: number
    occupation?: string
    playmode: GameMode
    /**
     * Device choices of the user.
     */
    playstyle: null | string[]
    /**
     * Number of forum posts.
     *
     * Integer
     */
    post_count: number
    /**
     * Ordered array of sections in user profile page.
     */
    profile_order: ProfilePage[]
    /**
     * User-specific title.
     */
    title?: string
    title_url?: string
    twitter?: string
    website?: string
}

export interface UserSearchResult {
    user: UserSearchResultUserSection
}

export interface UserSearchResultUserSection {
    data: User[]
    total: number
}
