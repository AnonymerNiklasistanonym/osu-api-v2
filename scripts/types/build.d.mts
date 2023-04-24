// This is an auto generated file

// Types: Build, Versions

// Type imports
import type { ChangelogEntry } from "./changelogEntry.d.mjs"
import type { Timestamp } from "./timestamp.d.mjs"
import type { UpdateStream } from "./updateStream.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "id": 5778,
 *   "version": "20210520.2",
 *   "display_version": "20210520.2",
 *   "users": 22059,
 *   "created_at": "2021-05-20T14:28:04+00:00",
 *   "update_stream": {
 *     "id": 5,
 *     "name": "stable40",
 *     "display_name": "Stable",
 *     "is_featured": true
 *   }
 * }
 * ```
 * The following are attributes which may be additionally included in responses. Relevant endpoints should list them if applicable.
 * [Source](https://osu.ppy.sh/docs/index.html#build)
 */
export interface Build {
    /**
     * Updated types: `ChangelogEntry`[] -> ChangelogEntry[]
     */
    changelog_entries?: ChangelogEntry[]
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at: Timestamp
    display_version: string
    id: number
    /**
     * Updated types: `UpdateStream` -> UpdateStream
     */
    update_stream?: UpdateStream
    users: number
    version?: string
    /**
     * Updated types: `Versions` -> Versions
     */
    versions?: Versions
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#versions)
 */
export interface Versions {
    /**
     * Updated types: `Build` -> Build
     */
    next?: Build
    /**
     * Updated types: `Build` -> Build
     */
    previous?: Build
}
