// This is an auto generated file

// Types: UserSilence

/**
 * @example
 * ```json
 * {
 *   "id": 1,
 *   "user_id": 5
 * }
 * ```
 * A record indicating a User was silenced.
 * [Source](https://osu.ppy.sh/docs/index.html#usersilence)
 */
export interface UserSilence {
    /**
     * id of this object.
     */
    id: number
    /**
     * id of the `User` that was silenced
     */
    user_id: number
}
