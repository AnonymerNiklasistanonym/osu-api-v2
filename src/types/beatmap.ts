import { RankedStatus } from "./ranked_status"
import type { Failtimes } from "./failtimes"
import type { Timestamp } from "./timestamp"
import type { User } from "./user"

export interface Covers {
    cover: string
    "cover@2x": string
    card: string
    "card@2x": string
    list: string
    "list@2x": string
    slimcover: string
    "slimcover@2x": string
}

/**
 * Represents a beatmapset
 *
 * https://osu.ppy.sh/docs/index.html#beatmapsetcompact
 */
export interface BeatmapsetCompactBase {
    artist: string
    artist_unicode: string
    covers: Covers
    creator: string
    favourite_count: number
    id: number
    nsfw: boolean
    play_count: number
    preview_url: string
    status: string
    title: string
    title_unicode: string
    user_id: number
    video: boolean
    // Optional:
    beatmaps?: Beatmap[]
    converts?: unknown
    current_user_attributes?: unknown
    description?: unknown
    discussions?: unknown
    events?: unknown
    genre?: unknown
    language?: unknown
    nominations?: unknown
    ratings?: number[]
    recent_favourites?: unknown
    related_users?: unknown
    user?: User
}

/**
 * Represents a beatmapset
 *
 * https://osu.ppy.sh/docs/index.html#beatmapsetcompact
 */
export interface BeatmapsetCompact extends BeatmapsetCompactBase {
    source: string
    /** Always included in Betmapset */
    has_favourited?: boolean
}

export interface BeatmapsetCompactAvailability {
    download_disabled: boolean
    more_information?: string
}

export interface BeatmapsetCompactHype {
    /** integer */
    current?: number
    /** integer */
    required?: number
}

export interface BeatmapsetCompactNominationsSummary {
    /** integer */
    current?: number
    /** integer */
    required?: number
}

export interface Beatmapset extends BeatmapsetCompactBase {
    availability: BeatmapsetCompactAvailability
    /** float */
    bpm: number
    can_be_hyped: boolean
    /**
     * Username of the mapper at the time of beatmapset creation
     */
    creator: string
    discussion_enabled: boolean
    discussion_locked: boolean
    hype: null | BeatmapsetCompactHype
    is_scoreable: boolean
    last_updated: Timestamp
    legacy_thread_url?: string
    nominations_summary: BeatmapsetCompactNominationsSummary
    /**
     * See Rank status for list of possible values
     */
    ranked?: RankedStatus
    ranked_date?: Timestamp
    source?: string
    storyboard: boolean
    submitted_date?: Timestamp
    tags: string

    has_favourited: boolean
}

/**
 * Represent a beatmap.
 *
 * https://osu.ppy.sh/docs/index.html#beatmapcompact
 */
export interface BeatmapCompact {
    /** float */
    difficulty_rating: number
    /** integer */
    id: number
    mode: string
    /**
     * See Rank status for list of possible values.
     */
    status: string
    total_length: number // integer
    version: string
    // Optional attributes:
    /**
     * Beatmapset for Beatmap object, BeatmapsetCompact for
     * BeatmapCompact object. null if the beatmap doesn't
     * have associated beatmapset (e.g. deleted).
     */
    beatmapset?: null | Beatmapset // | BeatmapCompact
    checksum?: string
    failtimes?: Failtimes
    /** integer */
    max_combo?: number
}

/**
 * Represent a beatmap.
 * This extends BeatmapCompact with additional attributes.
 *
 * https://osu.ppy.sh/docs/index.html#beatmap
 */
export interface Beatmap extends BeatmapCompact {
    /** float */
    accuracy: number
    /** float */
    ar: number
    /** integer */
    beatmapset_id: number
    /** float */
    bpm: number
    convert: boolean
    /** integer */
    count_circles: number
    /** integer */
    count_sliders: number
    /** integer */
    count_spinners: number
    /** float */
    cs: number
    deleted_at?: Timestamp
    /** float */
    drain: number
    /** integer */
    hit_length: number
    is_scoreable: boolean
    last_updated: Timestamp
    /** integer */
    mode_int: number
    /** integer */
    passcount: number
    /** integer */
    playcount: number
    /**
     * See Rank status for list of possible values.
     *
     * integer
     */
    ranked: RankedStatus
    url: string
}
