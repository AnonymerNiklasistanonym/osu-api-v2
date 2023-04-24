// This is an auto generated file

// Types: GetChangelogListingResponseFormat, ResponseFormatSearch

// Type imports
import type { Build } from "./build.d.mjs"
import type { UpdateStream } from "./updateStream.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetChangelogListingResponseFormat {
    /**
     * Updated types: `Build`[] -> Build[]
     */
    builds: Build[]
    search?: ResponseFormatSearch
    /**
     * Updated types: `UpdateStream`[] -> UpdateStream[]
     */
    streams: UpdateStream[]
}

export interface ResponseFormatSearch {
    from?: string
    limit: number
    max_id?: number
    stream?: string
    to?: string
}
