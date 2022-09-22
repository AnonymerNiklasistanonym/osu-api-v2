// Local imports
import { GameMode } from "./game_mode"
// Type imports
import type { Timestamp } from "./timestamp"

export interface UserCompactCover {
    custom_url: null | unknown
    id: null | string
    url: string
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#user-profilepage))
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

export interface UserStatisticsRulesets {
    fruits: UserStatistics
    mania: UserStatistics
    osu: UserStatistics
    taiko: UserStatistics
}

export interface UserMonthlyPlaycount {
    count: number
    start_date: string
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

export interface UserStatisticsLevel {
    current: number
    progress: number
}

export interface UserStatisticsGradeCounts {
    a: number
    s: number
    sh: number
    ss: number
    ssh: number
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#userstatistics))
 */
export interface UserStatistics {
    country_rank?: number
    global_rank?: number
    grade_counts: UserStatisticsGradeCounts
    hit_accuracy: number
    is_ranked: boolean
    level: UserStatisticsLevel
    maximum_combo: number
    play_count: number
    play_time: number
    pp: number
    ranked_score: number
    replays_watched_by_others: number
    total_hits: number
    total_score: number
    variants?: UserGameModeVariant[]
}

export interface UserAchievement {
    achieved_at: Timestamp
    achievement_id: number
}

export interface UserCompactPage {
    /** The me page HTML content. */
    html: string
    /** The me page raw text content. */
    raw: string
}

export interface UserReplaysWatchedCount {
    count: number
    /**
     * @example "2017-01-01"
     */
    start_date: string
}

export enum Playstyle {
    KEYBOARD = "keyboard",
    MOUSE = "mouse",
    TABLET = "tablet",
    TOUCH = "touch",
}

/**
 * Mainly used for embedding in certain responses to save additional api lookups.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#usercompact))
 */
export interface UserCompactBase {
    // Optional:
    account_history?: UserAccountHistory[]
    active_tournament_banner?: UserCompactProfileBanner | null
    /**
     * Url of user's avatar.
     */
    avatar_url: string
    badges?: UserBadge[]
    beatmap_playcounts_count?: number
    blocks?: unknown
    /**
     * (Undocumented)
     */
    comments_count?: number
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
     * (Undocumented)
     */
    guest_beatmapset_count?: number
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
    last_visit?: Timestamp | null
    loved_beatmapset_count?: number
    mapping_follower_count?: number
    monthly_playcounts?: UserMonthlyPlaycount[]
    page?: UserCompactPage
    pending_beatmapset_count?: number
    /**
     * Whether or not the user allows PM from other than friends.
     */
    pm_friends_only: boolean
    previous_usernames?: string[]
    /**
     * Colour of username/profile highlight, hex code (e.g. #333333).
     */
    profile_colour?: string | null
    rank_history?: UserRankHistory
    ranked_beatmapset_count?: number
    replays_watched_counts?: UserReplaysWatchedCount[]
    scores_best_count?: number
    scores_first_count?: number
    scores_pinned_count?: number
    scores_recent_count?: number
    statistics?: UserStatistics
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

export enum GameModeVariant {
    MANIA_4K = "4k",
    MANIA_7K = "7k",
}

export interface UserGameModeVariant {
    country_rank: number | null
    global_rank: number | null
    mode: GameMode
    pp: number
    variant: GameModeVariant
}

/**
 * Represents a User. Extends UserCompact object with additional attributes.
 *
 * [[include:example_output/users_get_9096716.md]]
 * [[include:example_output/users_get_Ooi.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#user))
 */
export interface User extends UserCompactBase {
    country: UserCompactCountry
    cover: UserCompactCover
    discord?: string | null
    /**
     * Whether or not ever being a supporter in the past.
     */
    has_supported: boolean
    interests?: string | null
    is_restricted?: boolean
    join_date: Timestamp
    kudosu: UserCompactKusodo
    location?: string | null
    /**
     * Maximum number of users allowed to be blocked.
     */
    max_blocks?: number
    /**
     * Maximum number of friends allowed to be added.
     */
    max_friends: number
    occupation?: string | null
    playmode: GameMode
    /**
     * Device choices of the user.
     */
    playstyle: Playstyle[] | null
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
    title?: string | null
    title_url?: string | null
    twitter?: string | null
    /**
     * Exists for profiles that have mania as their default game mode.
     */
    variants?: UserGameModeVariant[]
    website?: string | null
}

export interface UserSearchResult {
    user: UserSearchResultUserSection
}

export interface UserSearchResultUserSection {
    data: User[]
    total: number
}
