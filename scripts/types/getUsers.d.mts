// This is an auto generated file

// Types: ResponseFormat

// Type imports
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface ResponseFormat {
    /**
     * Includes: country, cover, groups, statistics_rulesets.
     * Updated types: `UserCompact`[] -> UserCompact[]
     */
    users: UserCompact[]
}
