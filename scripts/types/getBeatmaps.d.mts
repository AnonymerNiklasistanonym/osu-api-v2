// This is an auto generated file

// Types: ResponseFormat

// Type imports
import type { Beatmap } from "./beatmap.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface ResponseFormat {
    /**
     * Includes `beatmapset` (with `ratings`), `failtimes`, and `max_combo`.
     * Updated types: `Beatmap`[] -> Beatmap[]
     */
    beatmaps: Beatmap[]
}
