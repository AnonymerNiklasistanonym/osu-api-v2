// This is an auto generated file

// Types: Spotlight

/**
 * @example
 * ```json
 * {
 *   "end_date": "2019-03-22T00:00:00+00:00",
 *   "id": 1,
 *   "mode_specific": false,
 *   "name": "Best spinning circles 2019",
 *   "start_date": "2019-02-22T00:00:00+00:00",
 *   "type": "yearly",
 * }
 * ```
 * The details of a spotlight.
 * [Source](https://osu.ppy.sh/docs/index.html#spotlight)
 */
export interface Spotlight {
    /**
     * The end date of the spotlight.
     */
    end_date: DateTime
    /**
     * The ID of this spotlight.
     */
    id: number
    /**
     * If the spotlight has different mades specific to each `GameMode`.
     */
    mode_specific: boolean
    /**
     * The name of the spotlight.
     */
    name: string
    /**
     * The number of users participating in this spotlight. This is only shown when viewing a single spotlight.
     */
    participant_count?: number
    /**
     * The starting date of the spotlight.
     */
    start_date: DateTime
    /**
     * The type of spotlight.
     */
    type: string
}
