// This is an auto generated file

// Types: BeatmapsetDiscussionPermissions, ChatChannelUserAttributes

/**
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapsetdiscussionpermissions)
 */
export enum BeatmapsetDiscussionPermissions {
    /**
     * Description
     */
    CAN_DESTROY = "can_destroy",
    /**
     * Description
     */
    CAN_MODERATE_KUDOSU = "can_moderate_kudosu",
    /**
     * Description
     */
    CAN_REOPEN = "can_reopen",
    /**
     * Description
     */
    CAN_RESOLVE = "can_resolve",
    /**
     * Description
     */
    VOTE_SCORE = "vote_score",
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#chatchanneluserattributes)
 */
export interface ChatChannelUserAttributes {
    /**
     * Can send messages to this channel.
     */
    can_message: boolean
    /**
     * Reason messages cannot be sent to this channel
     */
    can_message_error?: string
    /**
     * `message_id` of last message read.
     */
    last_read_id: number
}
