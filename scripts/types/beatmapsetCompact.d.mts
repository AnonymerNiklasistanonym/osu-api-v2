// This is an auto generated file

// Types: BeatmapsetCompact, Covers, RankStatusInteger, RankStatusString

// Type imports
import type { Beatmap } from "./beatmap.d.mjs"
import type { BeatmapsetCompactDescription } from "./beatmapsetCompact.d.mjs"
import type { BeatmapsetCompactGenre } from "./beatmapsetCompact.d.mjs"
import type { BeatmapsetCompactLanguage } from "./beatmapsetCompact.d.mjs"
import type { BeatmapsetCompactNominations } from "./beatmapsetCompact.d.mjs"
import type { User } from "./user.d.mjs"

/**
 * Represents a beatmapset.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetcompact)
 */
export interface BeatmapsetCompact {
    artist: string
    artist_unicode: string
    /**
     * Updated types: `Beatmap`[] -> Beatmap[]
     */
    beatmaps?: Beatmap[]
    converts?: Beatmap[]
    /**
     * Updated types: `Covers` -> Covers
     */
    covers: Covers
    creator: string
    current_user_attributes?: unknown
    description?: BeatmapsetCompactDescription
    discussions?: unknown
    events?: unknown
    favourite_count: number
    genre?: BeatmapsetCompactGenre
    has_favourited?: boolean
    id: number
    language?: BeatmapsetCompactLanguage
    nominations?: BeatmapsetCompactNominations
    nsfw: boolean
    /**
     * Updated types: string[] -> string[]
     */
    pack_tags?: string[]
    play_count: number
    preview_url: string
    ratings?: number[]
    recent_favourites?: UserCompact[]
    related_users?: UserCompact[]
    source: string
    status: string
    title: string
    title_unicode: string
    user?: User
    user_id: number
    video: boolean
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#covers)
 */
export interface Covers {
    card: string
    "card@2x": string
    cover: string
    "cover@2x": string
    list: string
    "list@2x": string
    slimcover: string
    "slimcover@2x": string
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#rankstatus)
 */
export enum RankStatusInteger {
    APPROVED = 2,
    GRAVEYARD = -2,
    LOVED = 4,
    PENDING = 0,
    QUALIFIED = 3,
    RANKED = 1,
    WIP = -1,
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#rankstatus)
 */
export enum RankStatusString {
    /**
     * (2)
     */
    APPROVED = "approved",
    /**
     * (-2)
     */
    GRAVEYARD = "graveyard",
    /**
     * (4)
     */
    LOVED = "loved",
    /**
     * (0)
     */
    PENDING = "pending",
    /**
     * (3)
     */
    QUALIFIED = "qualified",
    /**
     * (1)
     */
    RANKED = "ranked",
    /**
     * (-1)
     */
    WIP = "wip",
}
