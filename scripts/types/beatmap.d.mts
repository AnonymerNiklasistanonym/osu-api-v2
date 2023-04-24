// This is an auto generated file

// Types: Beatmap

// Type imports
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * Represent a beatmap. This extends BeatmapCompact with additional attributes.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmap)
 */
export interface Beatmap extends BeatmapCompact {
    /**
     * Updated types: float -> number
     */
    accuracy: number
    /**
     * Updated types: float -> number
     */
    ar: number
    /**
     * Updated types: integer -> number
     */
    beatmapset_id: number
    /**
     * Updated types: float -> number
     */
    bpm?: number
    convert: boolean
    /**
     * Updated types: integer -> number
     */
    count_circles: number
    /**
     * Updated types: integer -> number
     */
    count_sliders: number
    /**
     * Updated types: integer -> number
     */
    count_spinners: number
    /**
     * Updated types: float -> number
     */
    cs: number
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    deleted_at?: Timestamp
    /**
     * Updated types: float -> number
     */
    drain: number
    /**
     * Updated types: integer -> number
     */
    hit_length: number
    is_scoreable: boolean
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    last_updated: Timestamp
    /**
     * Updated types: integer -> number
     */
    mode_int: number
    /**
     * Updated types: integer -> number
     */
    passcount: number
    /**
     * Updated types: integer -> number
     */
    playcount: number
    /**
     * See `Rank status` for list of possible values.
     * Updated types: integer -> number
     */
    ranked: number
    url: string
}
