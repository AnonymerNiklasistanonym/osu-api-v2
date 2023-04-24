// This is an auto generated file

// Types: MultiplayerScore

// Type imports
import type { User } from "./user.d.mjs"

/**
 * Score data.
 * [Source](https://osu.ppy.sh/docs/index.html#multiplayerscore)
 */
export interface MultiplayerScore {
    /**
     * Updated types: `number` -> "number"
     */
    `accuracy`: "number"
    /**
     * Updated types: `number` -> "number"
     */
    `beatmap_id`: "number"
    /**
     * Updated types: `number` -> "number"
     */
    `id`: "number"
    /**
     * Updated types: `number` -> "number"
     */
    `max_combo`: "number"
    /**
     * Updated types: `Mod[]` -> Mod[]
     */
    `mods`: Mod[]
    /**
     * Updated types: `bool` -> "bool"
     */
    `passed`: "bool"
    /**
     * Updated types: `number` -> "number"
     */
    `playlist_item_id`: "number"
    /**
     * Updated types: `number?` -> "number?"
     */
    `position`: "number?"
    /**
     * Updated types: `rank` -> "rank"
     */
    `rank`: "rank"
    /**
     * Updated types: `number` -> "number"
     */
    `room_id`: "number"
    /**
     * Scores around the specified score.
     * Updated types: `MultiplayerScoresAround?` -> MultiplayerScoresAround?
     */
    `scores_around`: MultiplayerScoresAround?
    /**
     * Updated types: `Statistics` -> Statistics
     */
    `statistics`: Statistics
    /**
     * Updated types: `number` -> "number"
     */
    `total_score`: "number"
    /**
     * Updated types: `number` -> "number"
     */
    `user_id`: "number"
    /**
     * Updated types: `User` -> User
     */
    `user`: User
}
