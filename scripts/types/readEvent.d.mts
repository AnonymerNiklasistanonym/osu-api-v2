// This is an auto generated file

// Types: ReadEvent

/**
 * Sent when a notification has been read.
 * TODO: ids should be moved to data to match other events.
 * [Source](https://osu.ppy.sh/docs/index.html#readevent)
 */
export interface ReadEvent {
    /**
     * `read`
     */
    event: string
    /**
     * id of Notifications which are read
     * Updated types: number[] -> number[]
     */
    ids: number[]
}
