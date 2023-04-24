// This is an auto generated file

// Types: MultiplayerScoresCursor

/**
 * An object which contains pointer for fetching further results of a request. It depends on the sort option.
 * [Source](https://osu.ppy.sh/docs/index.html#multiplayerscorescursor)
 */
export interface MultiplayerScoresCursor {
    /**
     * Last score id of current result (`score_asc`, `score_desc`).
     * Updated types: `number` -> "number"
     */
    `score_id`: "number"
    /**
     * Last score's total score of current result (`score_asc`, `score_desc`).
     * Updated types: `number` -> "number"
     */
    `total_score`: "number"
}
