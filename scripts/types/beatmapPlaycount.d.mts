// This is an auto generated file

// Types: BeatmapPlaycount

// Type imports
import type { BeatmapCompact } from "./beatmapCompact.d.mjs"
import type { BeatmapsetCompact } from "./beatmapsetCompact.d.mjs"

/**
 * Represent the playcount of a beatmap.
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapplaycount)
 */
export interface BeatmapPlaycount {
    /**
     * Updated types: `BeatmapCompact` -> BeatmapCompact
     */
    beatmap?: BeatmapCompact
    beatmap_id: number
    /**
     * Updated types: `BeatmapsetCompact` -> BeatmapsetCompact
     */
    beatmapset?: BeatmapsetCompact
    count: number
}
