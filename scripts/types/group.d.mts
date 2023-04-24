// This is an auto generated file

// Types: Description, Group

/**
 * [Source](https://osu.ppy.sh/docs/index.html#description)
 */
export interface Description {
    html: string
    markdown: string
}

/**
 * This object is not returned by any endpoints yet. It is here only as a reference for UserGroup.
 * The following are attributes which may be additionally included in responses. Relevant endpoints should list them if applicable.
 * [Source](https://osu.ppy.sh/docs/index.html#group)
 */
export interface Group {
    colour?: string
    /**
     * Updated types: `Description` -> Description
     */
    description?: Description
    /**
     * Whether this group displays a listing at `/groups/{id}`.
     */
    has_listing: boolean
    /**
     * Whether this group associates `GameModes` with users' memberships.
     */
    has_playmodes: boolean
    id: number
    /**
     * Unique string to identify the group.
     */
    identifier: string
    /**
     * Whether members of this group are considered probationary.
     */
    is_probationary: boolean
    name: string
    /**
     * Short name of the group for display.
     */
    short_name: string
}
