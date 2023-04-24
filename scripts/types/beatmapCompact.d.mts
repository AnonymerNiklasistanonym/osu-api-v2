// This is an auto generated file

// Types: BeatmapCompact, Failtimes

// Type imports
import type { Beatmapset } from "./beatmapset.d.mjs"
import type { BeatmapsetCompact } from "./beatmapsetCompact.d.mjs"
import type { GameMode } from "./gameMode.d.mjs"

/**
 * Represent a beatmap.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapcompact)
 */
export interface BeatmapCompact {
    /**
     * `Beatmapset` for `Beatmap` object, `BeatmapsetCompact` for `BeatmapCompact` object. `null` if the beatmap doesn't have associated beatmapset (e.g. deleted).
     * Updated types: `Beatmapset` -> Beatmapset, `BeatmapsetCompact` -> BeatmapsetCompact
     */
    beatmapset?: Beatmapset | BeatmapsetCompact | null
    /**
     * Updated types: integer -> number
     */
    beatmapset_id: number
    checksum?: string
    /**
     * Updated types: float -> number
     */
    difficulty_rating: number
    /**
     * Updated types: `Failtimes` -> Failtimes
     */
    failtimes?: Failtimes
    /**
     * Updated types: integer -> number
     */
    id: number
    /**
     * Updated types: integer -> number
     */
    max_combo?: number
    /**
     * Updated types: `GameMode` -> GameMode
     */
    mode: GameMode
    /**
     * See `Rank status` for list of possible values.
     */
    status: string
    /**
     * Updated types: integer -> number
     */
    total_length: number
    /**
     * Updated types: integer -> number
     */
    user_id: number
    version: string
}

/**
 * All fields are optional but there's always at least one field returned.
 * [Source](https://osu.ppy.sh/docs/index.html#failtimes)
 */
export interface Failtimes {
    /**
     * Array of length 100.
     * Updated types: integer[] -> number[]
     */
    exit?: number[]
    /**
     * Array of length 100.
     * Updated types: integer[] -> number[]
     */
    fail?: number[]
}
