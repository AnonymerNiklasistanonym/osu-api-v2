import { GameMode } from "./game_mode"
import type { Timestamp } from "./timestamp"

export enum EventType {
    ACHIEVEMENT = "achievement",
    BEATMAPSET_APPROVE = "beatmapsetApprove",
    BEATMAPSET_DELETE = "beatmapsetDelete",
    BEATMAPSET_REVIVE = "beatmapsetRevive",
    BEATMAPSET_UPDATE = "beatmapsetUpdate",
    BEATMAPSET_UPLOAD = "beatmapsetUpload",
    BEATMAP_PLAYCOUNT = "beatmapPlaycount",
    RANK = "rank",
    RANK_LOST = "rankLost",
    USERNAME_CHANGE = "usernameChange",
    USER_SUPPORT_AGAIN = "userSupportAgain",
    USER_SUPPORT_FIRST = "userSupportFirst",
    USER_SUPPORT_GIFT = "userSupportGift",
}

export type Events =
    | EventAchievement
    | EventBeatmapPlayCount
    | EventBeatmapsetApprove
    | EventBeatmapsetDelete
    | EventBeatmapsetRevive
    | EventBeatmapsetUpload
    | EventBeatmapsetUpdate
    | EventRank
    | EventRankLost
    | EventUserSupportAgain
    | EventUserSupportFirst
    | EventUserSupportGift
    | EventUsernameChange

/**
 * [[include:example_output/users_recent_activity_9096716_20_1.md]]
 * [[include:example_output/users_recent_activity_2927048_10.md]]
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event))
 */
export interface Event {
    created_at: Timestamp
    id: number
    type: EventType
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#event-user))
 */
export interface EventObjectUser {
    /** Only for usernameChange event. */
    previousUsername?: string
    url: string
    username: string
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#event-beatmap))
 */
export interface EventObjectBeatmap {
    title: string
    url: string
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#event-beatmapset))
 */
export interface EventObjectBeatmapset {
    title: string
    url: string
}

/**
 * (Undocumented)
 */
export interface EventObjectAchievement {
    /** @example "As all things should be." */
    description: string
    /** @example "Hush-Hush" */
    grouping: string
    /** @example "https://assets.ppy.sh/medals/web/all-secret-deadcenter.png" */
    icon_url: string
    /** @example 276 */
    id: number
    /** @example "<i>Perfect balance.</i>" */
    instructions: string
    mode: null
    /** @example "Dead Center" */
    name: string
    ordering: number
    /** @example "all-secret-deadcenter" */
    slug: string
}

/**
 * When user obtained an achievement.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventAchievement extends Event {
    achievement: EventObjectAchievement
    type: EventType.ACHIEVEMENT
    user: EventObjectUser
}

/**
 * When a beatmap has been played for certain number of times.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventBeatmapPlayCount extends Event {
    beatmap: EventObjectBeatmap
    count: number
    type: EventType.BEATMAP_PLAYCOUNT
}

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export enum EventBeatmapsetApproveApproval {
    APPROVED = "approved",
    LOVED = "loved",
    QUALIFIED = "qualified",
    RANKED = "ranked",
}

/**
 * When a beatmapset changes state.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventBeatmapsetApprove extends Event {
    approval: EventBeatmapsetApproveApproval
    beatmapset: EventObjectBeatmapset
    type: EventType.BEATMAPSET_APPROVE
    /** Beatmapset owner. */
    user: EventObjectUser
}

/**
 * When a beatmapset is deleted.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventBeatmapsetDelete extends Event {
    beatmapset: EventObjectBeatmapset
    type: EventType.BEATMAPSET_DELETE
}

/**
 * When a beatmapset in graveyard state is updated.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventBeatmapsetRevive extends Event {
    beatmapset: EventObjectBeatmapset
    type: EventType.BEATMAPSET_REVIVE
    /** Beatmapset owner. */
    user: EventObjectUser
}

/**
 * When a beatmapset is updated.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventBeatmapsetUpdate extends Event {
    beatmapset: EventObjectBeatmapset
    type: EventType.BEATMAPSET_UPDATE
    /** Beatmapset owner. */
    user: EventObjectUser
}

/**
 * When a new beatmapset is uploaded.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventBeatmapsetUpload extends Event {
    beatmapset: EventObjectBeatmapset
    type: EventType.BEATMAPSET_UPLOAD
    /** Beatmapset owner. */
    user: EventObjectUser
}

/** (Undocumented) */
export enum EventRankScoreRank {
    A = "A",
    B = "B",
    C = "C",
    F = "F",
    S = "S",
    SH = "SH",
    X = "X",
    XH = "XH",
}

/**
 * When a user achieves a certain rank on a beatmap.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventRank extends Event {
    beatmap: EventObjectBeatmap
    mode: GameMode
    rank: number
    scoreRank: EventRankScoreRank
    type: EventType.RANK
    user: EventObjectUser
}

/**
 * When a user loses first place to another user.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventRankLost extends Event {
    beatmap: EventObjectBeatmap
    mode: GameMode
    type: EventType.RANK_LOST
    user: EventObjectUser
}

/**
 * When a user supports osu! for the second and onwards.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventUserSupportAgain extends Event {
    type: EventType.USER_SUPPORT_AGAIN
    user: EventObjectUser
}

/**
 * When a user becomes a supporter for the first time.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventUserSupportFirst extends Event {
    type: EventType.USER_SUPPORT_FIRST
    user: EventObjectUser
}

/**
 * When a user is gifted a supporter tag by another user.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventUserSupportGift extends Event {
    type: EventType.USER_SUPPORT_GIFT
    /** Recipient user. */
    user: EventObjectUser
}

/**
 * When a user changes their username.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#event-type))
 */
export interface EventUsernameChange extends Event {
    type: EventType.USERNAME_CHANGE
    /** (Includes previous user name)*/
    user: EventObjectUser
}
