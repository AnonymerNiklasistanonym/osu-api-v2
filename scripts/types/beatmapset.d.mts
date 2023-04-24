// This is an auto generated file

// Types: Beatmapset, BeatmapsetAvailability, BeatmapsetHype, BeatmapsetNominations

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * Represents a beatmapset. This extends BeatmapsetCompact with additional attributes.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset)
 */
export interface Beatmapset extends BeatmapsetCompact {
    availability: BeatmapsetAvailability
    /**
     * Updated types: float -> number
     */
    bpm: number
    can_be_hyped: boolean
    /**
     * Username of the mapper at the time of beatmapset creation.
     */
    creator: string
    deleted_at?: string
    discussion_locked: boolean
    has_favourited: boolean
    hype: BeatmapsetHype
    is_scoreable: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    last_updated: Timestamp
    legacy_thread_url?: string
    nominations: BeatmapsetNominations
    /**
     * See `Rank status` for list of possible values.
     * Updated types: integer -> number
     */
    ranked: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    ranked_date?: Timestamp
    source: string
    storyboard: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    submitted_date?: Timestamp
    tags: string
}

export interface BeatmapsetAvailability {
    download_disabled: boolean
    more_information?: string
}

export interface BeatmapsetHype {
    /**
     * Updated types: integer -> number
     */
    current: number
    /**
     * Updated types: integer -> number
     */
    required: number
}

export interface BeatmapsetNominations {
    /**
     * Updated types: integer -> number
     */
    current: number
    /**
     * Updated types: integer -> number
     */
    required: number
}
