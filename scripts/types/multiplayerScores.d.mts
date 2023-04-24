// This is an auto generated file

// Types: MultiplayerScores

/**
 * An object which contains scores and related data for fetching next page of the result.
 * [Source](https://osu.ppy.sh/docs/index.html#multiplayerscores)
 */
export interface MultiplayerScores {
    /**
     * To be used to fetch the next page.
     * Updated types: `CursorString` -> CursorString
     */
    `cursor_string`: CursorString
    /**
     * Parameters used for score listing.
     * Updated types: `object` -> "object"
     */
    `params`: "object"
    /**
     * Updated types: `MultiplayerScore[]` -> MultiplayerScore[]
     */
    `scores`: MultiplayerScore[]
    /**
     * Index only. Total scores of the specified playlist item.
     * Updated types: `number?` -> "number?"
     */
    `total`: "number?"
    /**
     * Index only. Score of the accessing user if exists.
     * Updated types: `MultiplayerScore?` -> MultiplayerScore?
     */
    `user_score`: MultiplayerScore?
}
