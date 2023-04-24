// This is an auto generated file

// Types: Spotlights

// Type imports
import type { Spotlight } from "./spotlight.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "spotlights": [
 *     {
 *       "end_date": "2019-03-22T00:00:00+00:00",
 *       "id": 1,
 *       "mode_specific": false,
 *       "name": "Best spinning circles 2019",
 *       "start_date": "2019-02-22T00:00:00+00:00",
 *       "type": "yearly",
 *     },
 *     {
 *       "end_date": "2019-03-22T00:00:00+00:00",
 *       "id": 2,
 *       "mode_specific": true,
 *       "name": "Ultimate fruit collector February 2019",
 *       "start_date": "2019-02-22T00:00:00+00:00",
 *       "type": "monthly",
 *     }
 *   ],
 * }
 * ```
 * [Source](https://osu.ppy.sh/docs/index.html#spotlights)
 */
export interface Spotlights {
    /**
     * An array of spotlights
     * Updated types: `Spotlight`[] -> Spotlight[]
     */
    spotlights: Spotlight[]
}
