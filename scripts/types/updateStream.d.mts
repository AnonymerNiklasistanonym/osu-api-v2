// This is an auto generated file

// Types: UpdateStream

// Type imports
import type { Build } from "./build.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "id": 7,
 *   "name": "lazer",
 *   "display_name": "Lazer",
 *   "is_featured": false
 * }
 * ```
 * The following are attributes which may be additionally included in responses. Relevant endpoints should list them if applicable.
 * [Source](https://osu.ppy.sh/docs/index.html#updatestream)
 */
export interface UpdateStream {
    display_name?: string
    id: number
    is_featured: boolean
    /**
     * Updated types: `Build` -> Build
     */
    latest_build?: Build
    name: string
    user_count?: number
}
