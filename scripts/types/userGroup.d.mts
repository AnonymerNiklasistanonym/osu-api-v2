// This is an auto generated file

// Types: UserGroup

/**
 * Describes a Group membership of a User. It contains all of the attributes of the Group, in addition to what is listed here.
 * [Source](https://osu.ppy.sh/docs/index.html#usergroup)
 */
export interface UserGroup {
    /**
     * `GameModes` associated with this membership (null if `has_playmodes` is unset).
     * Updated types: string[] -> string[]
     */
    playmodes?: string[]
}
