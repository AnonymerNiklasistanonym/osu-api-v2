// Local imports
import { GameMode, GameModeInt } from "./game_mode"
import { RankStatus } from "./rank_status"
// Type imports
import type { Failtimes } from "./failtimes"
import type { Timestamp } from "./timestamp"
import type { User } from "./user"

/**
 * ([Source](https://osu.ppy.sh/docs/index.html#beatmapsetcompact-covers))
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
 * Represents a beatmapset.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#beatmapsetcompact))
 */
interface BeatmapsetCompactBase {
    artist: string
    artist_unicode: string
    beatmaps?: Beatmap[]
    converts?: unknown
    covers: Covers
    creator: string
    current_user_attributes?: unknown
    description?: unknown
    discussions?: unknown
    events?: unknown
    favourite_count: number
    genre?: unknown
    id: number
    language?: unknown
    nominations?: unknown
    nsfw: boolean
    play_count: number
    preview_url: string
    ratings?: number[]
    recent_favourites?: unknown
    related_users?: unknown
    status: string
    title: string
    title_unicode: string
    user?: User
    user_id: number
    video: boolean
}

/**
 * Represents a beatmapset.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#beatmapsetcompact))
 */
export interface BeatmapsetCompact extends BeatmapsetCompactBase {
    /** Always included in {@link Beatmapset} but optional in {@link BeatmapsetCompact}. */
    has_favourited?: boolean
    source: string
}

export interface BeatmapsetCompactAvailability {
    download_disabled: boolean
    more_information?: string
}

export interface BeatmapsetCompactHype {
    /** Integer */
    current?: number
    /** Integer */
    required?: number
}

export interface BeatmapsetCompactNominationsSummary {
    /** Integer */
    current?: number
    /** Integer */
    required?: number
}

export interface Beatmapset extends BeatmapsetCompactBase {
    availability: BeatmapsetCompactAvailability
    /** Float */
    bpm: number
    can_be_hyped: boolean
    /**
     * Username of the mapper at the time of beatmapset creation.
     */
    creator: string
    discussion_enabled: boolean
    discussion_locked: boolean
    has_favourited: boolean
    hype: null | BeatmapsetCompactHype
    is_scoreable: boolean
    last_updated: Timestamp
    legacy_thread_url?: string
    nominations_summary: BeatmapsetCompactNominationsSummary
    /**
     * See Rank status for list of possible values.
     */
    ranked?: RankStatus
    ranked_date?: Timestamp
    source?: string
    storyboard: boolean
    submitted_date?: Timestamp
    tags: string
}

/**
 * Represent a beatmap.
 *
 * Https://osu.ppy.sh/docs/index.html#beatmapcompact.
 */
export interface BeatmapCompact {
    // Optional attributes:
    /**
     * Beatmapset for Beatmap object, BeatmapsetCompact for
     * BeatmapCompact object. Null if the beatmap doesn't
     * have associated beatmapset (e.g. Deleted).
     */
    beatmapset?: null | Beatmapset
    // | BeatmapCompact
    checksum?: string
    /** Float */
    difficulty_rating: number
    failtimes?: Failtimes
    /** Integer */
    id: number
    /** Integer */
    max_combo?: number
    mode: GameMode
    /**
     * See Rank status for list of possible values.
     */
    status: string
    total_length: number
    // integer
    version: string
}

/**
 * Represent a beatmap.
 * This extends BeatmapCompact with additional attributes.
 *
 * Https://osu.ppy.sh/docs/index.html#beatmap.
 */
export interface Beatmap extends BeatmapCompact {
    /** Float */
    accuracy: number
    /** Float */
    ar: number
    /** Integer */
    beatmapset_id: number
    /** Float */
    bpm: number
    convert: boolean
    /** Integer */
    count_circles: number
    /** Integer */
    count_sliders: number
    /** Integer */
    count_spinners: number
    /** Float */
    cs: number
    deleted_at?: Timestamp
    /** Float */
    drain: number
    /** Integer */
    hit_length: number
    is_scoreable: boolean
    last_updated: Timestamp
    /** Integer */
    mode_int: GameModeInt
    /** Integer */
    passcount: number
    /** Integer */
    playcount: number
    /**
     * See Rank status for list of possible values.
     *
     * Integer.
     */
    ranked: RankStatus
    url: string
}

export interface BeatmapsetSearchResult {
    beatmapsets: Beatmapset[]
}
