import type { GameMode } from "./game_mode"
import type { Failtimes } from "./failtimes"
import type { Timestamp } from "./timestamp"

export interface BeatmapsetCompact {
    a: string
}

export interface Beatmapset extends BeatmapsetCompact {
    b: string
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
    mode: GameMode
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
    beatmapset?: null | BeatmapsetCompact | Beatmapset
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
    ranked: number
    url: string
}
