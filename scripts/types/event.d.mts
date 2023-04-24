// This is an auto generated file

// Types: Event, EventBeatmap, EventBeatmapset, EventTypeAchievement, EventTypeBeatmapPlaycount, EventTypeBeatmapsetApprove, EventTypeBeatmapsetDelete, EventTypeBeatmapsetRevive, EventTypeBeatmapsetUpdate, EventTypeBeatmapsetUpload, EventTypeRank, EventTypeRankLost, EventTypeUserSupportAgain, EventTypeUserSupportFirst, EventTypeUserSupportGift, EventTypeUsernameChange, EventUser

// Type imports
import type { GameMode } from "./gameMode.d.mjs"
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * The object has different attributes depending on its type. Following are attributes available to all types.
 * [Source](https://osu.ppy.sh/docs/index.html#event)
 */
export interface Event {
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    id: number
    type: "achievement" | "beatmapPlaycount" | "beatmapsetApprove" | "beatmapsetDelete" | "beatmapsetRevive" | "beatmapsetUpdate" | "beatmapsetUpload" | "rank" | "rankLost" | "userSupportAgain" | "userSupportFirst" | "userSupportGift" | "usernameChange"
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#beatmap)
 */
export interface EventBeatmap {
    title: string
    url: string
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset)
 */
export interface EventBeatmapset {
    title: string
    url: string
}

/**
 * When user obtained an achievement.
 * [Source](https://osu.ppy.sh/docs/index.html#achievement)
 */
export interface EventTypeAchievement extends Event {
    achievement: Achievement
    type: "achievement"
    /**
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a beatmap has been played for certain number of times.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapplaycount)
 */
export interface EventTypeBeatmapPlaycount extends Event {
    /**
     * Updated types: `Event.Beatmap` -> EventBeatmap
     */
    beatmap: EventBeatmap
    count: number
    type: "beatmapPlaycount"
}

/**
 * When a beatmapset changes state.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetapprove)
 */
export interface EventTypeBeatmapsetApprove extends Event {
    /**
     * `ranked`, `approved`, `qualified`, `loved`.
     */
    approval: string
    /**
     * Updated types: `Event.Beatmapset` -> EventBeatmapset
     */
    beatmapset: EventBeatmapset
    type: "beatmapsetApprove"
    /**
     * Beatmapset owner.
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a beatmapset is deleted.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetdelete)
 */
export interface EventTypeBeatmapsetDelete extends Event {
    /**
     * Updated types: `Event.Beatmapset` -> EventBeatmapset
     */
    beatmapset: EventBeatmapset
    type: "beatmapsetDelete"
}

/**
 * When a beatmapset in graveyard state is updated.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetrevive)
 */
export interface EventTypeBeatmapsetRevive extends Event {
    /**
     * Updated types: `Event.Beatmapset` -> EventBeatmapset
     */
    beatmapset: EventBeatmapset
    type: "beatmapsetRevive"
    /**
     * Beatmapset owner.
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a beatmapset is updated.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetupdate)
 */
export interface EventTypeBeatmapsetUpdate extends Event {
    /**
     * Updated types: `Event.Beatmapset` -> EventBeatmapset
     */
    beatmapset: EventBeatmapset
    type: "beatmapsetUpdate"
    /**
     * Beatmapset owner.
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a new beatmapset is uploaded.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetupload)
 */
export interface EventTypeBeatmapsetUpload extends Event {
    /**
     * Updated types: `Event.Beatmapset` -> EventBeatmapset
     */
    beatmapset: EventBeatmapset
    type: "beatmapsetUpload"
    /**
     * Beatmapset owner.
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a user achieves a certain rank on a beatmap.
 * [Source](https://osu.ppy.sh/docs/index.html#rank)
 */
export interface EventTypeRank extends Event {
    /**
     * Updated types: `Event.Beatmap` -> EventBeatmap
     */
    beatmap: EventBeatmap
    mode: GameMode
    rank: number
    /**
     * (FIXME)
     */
    scoreRank: string
    type: "rank"
    /**
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a user loses first place to another user.
 * [Source](https://osu.ppy.sh/docs/index.html#ranklost)
 */
export interface EventTypeRankLost extends Event {
    /**
     * Updated types: `Event.Beatmap` -> EventBeatmap
     */
    beatmap: EventBeatmap
    /**
     * Updated types: `GameMode` -> GameMode
     */
    mode: GameMode
    type: "rankLost"
    /**
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a user supports osu! for the second and onwards.
 * [Source](https://osu.ppy.sh/docs/index.html#usersupportagain)
 */
export interface EventTypeUserSupportAgain extends Event {
    type: "userSupportAgain"
    /**
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a user becomes a supporter for the first time.
 * [Source](https://osu.ppy.sh/docs/index.html#usersupportfirst)
 */
export interface EventTypeUserSupportFirst extends Event {
    type: "userSupportFirst"
    /**
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a user is gifted a supporter tag by another user.
 * [Source](https://osu.ppy.sh/docs/index.html#usersupportgift)
 */
export interface EventTypeUserSupportGift extends Event {
    type: "userSupportGift"
    /**
     * Recipient user.
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * When a user changes their username.
 * [Source](https://osu.ppy.sh/docs/index.html#usernamechange)
 */
export interface EventTypeUsernameChange extends Event {
    type: "usernameChange"
    /**
     * Includes `previousUsername`.
     * Updated types: `Event.User` -> EventUser
     */
    user: EventUser
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#user)
 */
export interface EventUser {
    /**
     * Only for `usernameChange` event.
     */
    previousUsername?: string
    url: string
    username: string
}
