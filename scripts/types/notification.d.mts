// This is an auto generated file

// Types: Beatmapset_discussion_lock, Beatmapset_discussion_post_new, Beatmapset_discussion_unlock, Beatmapset_disqualify, Beatmapset_love, Beatmapset_nominate, Beatmapset_qualify, Beatmapset_remove_from_loved, Beatmapset_reset_nominations, Channel_message, EventNames, Forum_topic_reply, Notification

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_discussion_lock)
 */
export interface Beatmapset_discussion_lock {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who locked discussion
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_discussion_post_new)
 */
export interface Beatmapset_discussion_post_new {
    /**
     * `null` if posted to general all
     */
    beatmap_id?: number
    /**
     * Beatmap cover
     */
    cover_url: string
    discussion_id: number
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    post_id: number
    /**
     * Poster of the discussion
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_discussion_unlock)
 */
export interface Beatmapset_discussion_unlock {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who unlocked discussion
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_disqualify)
 */
export interface Beatmapset_disqualify {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who disqualified beatmapset
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_love)
 */
export interface Beatmapset_love {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who promoted beatmapset to loved
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_nominate)
 */
export interface Beatmapset_nominate {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who nominated beatmapset
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_qualify)
 */
export interface Beatmapset_qualify {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User whom beatmapset nomination triggered qualification
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_remove_from_loved)
 */
export interface Beatmapset_remove_from_loved {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who removed beatmapset from Loved
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#beatmapset_reset_nominations)
 */
export interface Beatmapset_reset_nominations {
    /**
     * Beatmap cover
     */
    cover_url: string
    /**
     * Beatmapset id
     */
    object_id: number
    /**
     * `beatmapset`
     */
    object_type: string
    /**
     * User who triggered nomination reset
     */
    source_user_id: number
    /**
     * Beatmap title
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#channel_message)
 */
export interface Channel_message {
    /**
     * Avatar of `source_user_id`
     */
    cover_url: string
    /**
     * Channel id
     */
    object_id: number
    /**
     * `channel`
     */
    object_type: string
    /**
     * User who posted message
     */
    source_user_id: number
    /**
     * Up to 36 characters of the message (ends with `...` when exceeding 36 characters)
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username: string
}

/**
 * [Source](https://osu.ppy.sh/docs/index.html#eventnames)
 */
export enum EventNames {
    /**
     * Description
     */
    BEATMAPSET_DISCUSSION_LOCK = "beatmapset_discussion_lock",
    /**
     * Description
     */
    BEATMAPSET_DISCUSSION_POST_NEW = "beatmapset_discussion_post_new",
    /**
     * Description
     */
    BEATMAPSET_DISCUSSION_UNLOCK = "beatmapset_discussion_unlock",
    /**
     * Description
     */
    BEATMAPSET_DISQUALIFY = "beatmapset_disqualify",
    /**
     * Description
     */
    BEATMAPSET_LOVE = "beatmapset_love",
    /**
     * Description
     */
    BEATMAPSET_NOMINATE = "beatmapset_nominate",
    /**
     * Description
     */
    BEATMAPSET_QUALIFY = "beatmapset_qualify",
    /**
     * Description
     */
    BEATMAPSET_REMOVE_FROM_LOVED = "beatmapset_remove_from_loved",
    /**
     * Description
     */
    BEATMAPSET_RESET_NOMINATIONS = "beatmapset_reset_nominations",
    /**
     * Description
     */
    CHANNEL_MESSAGE = "channel_message",
    /**
     * Description
     */
    FORUM_TOPIC_REPLY = "forum_topic_reply",
}

/**
 * Details object:
 * [Source](https://osu.ppy.sh/docs/index.html#forum_topic_reply)
 */
export interface Forum_topic_reply {
    /**
     * Topic cover
     */
    cover_url: string
    /**
     * Topic id
     */
    object_id: number
    /**
     * `forum_topic`
     */
    object_type: string
    /**
     * Post id
     */
    post_id: number
    /**
     * User who posted message
     */
    source_user_id: number
    /**
     * Title of the replied topic
     */
    title: string
    /**
     * Username of `source_user_id`
     */
    username?: string
}

/**
 * @example
 * ```json
 * {
 *   "id": 1,
 *   "name": "channel_message",
 *   "created_at": "2019-04-24T07:12:43+00:00",
 *   "object_type": "channel",
 *   "object_id": 1,
 *   "source_user_id": 1,
 *   "is_read": true,
 *   "details": {
 *     "username": "someone",
 *     ...
 *   }
 * }
 * ```
 * Represents a notification object.
 * [Source](https://osu.ppy.sh/docs/index.html#notification)
 */
export interface Notification {
    /**
     * ISO 8601 date
     */
    created_at: string
    /**
     * `message_id` of last known message (only returned in presence responses)
     */
    details: object
    id: number
    is_read: boolean
    /**
     * Name of the event
     */
    name: string
    object_id: number
    object_type: string
    source_user_id?: number
}
