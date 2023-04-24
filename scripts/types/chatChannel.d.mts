// This is an auto generated file

// Types: ChatChannel

// Type imports
import type { ChannelType } from "./channelType.d.mjs"
import type { ChatMessage } from "./chatMessage.d.mjs"
import type { CurrentUserAttributes } from "./commentableMeta.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "channel_id": 1337,
 *   "current_user_attributes": {
 *     "can_message": true,
 *     "can_message_error": null,
 *     "last_read_id": 9150005005,
 *   },
 *   "name": "test channel",
 *   "description": "wheeeee",
 *   "icon": "/images/layout/avatar-guest@2x.png",
 *   "type": "GROUP",
 *   "last_read_id": 9150005005,
 *   "last_message_id": 9150005005,
 *   "moderated": false,
 *   "users": [
 *     2,
 *     3,
 *     102
 *   ]
 * }
 * ```
 * Represents an individual chat "channel" in the game.
 * [Source](https://osu.ppy.sh/docs/index.html#chatchannel)
 */
export interface ChatChannel {
    channel_id: number
    /**
     * only present on some responses
     * Updated types: `CurrentUserAttributes` -> CurrentUserAttributes
     */
    current_user_attributes?: CurrentUserAttributes
    description?: string
    /**
     * display icon for the channel
     */
    icon?: string
    /**
     * `message_id` of last known message (only returned in presence responses)
     */
    last_message_id?: number
    /**
     * Deprecated; use `current_user_attributes.last_read_id`.
     */
    last_read_id?: number
    /**
     * user can't send message when the value is `true`
     */
    moderated: boolean
    name: string
    /**
     * Deprecated; up to 50 most recent messages
     * Updated types: ChatMessage[] -> ChatMessage[]
     */
    recent_messages?: ChatMessage[]
    /**
     * type of channel
     * Updated types: `ChannelType` -> ChannelType
     */
    type: ChannelType
    /**
     * array of `user_id` that are in the channel (not included for `PUBLIC` channels)
     * Updated types: number[] -> number[]
     */
    users?: number[]
    /**
     * value from requests that is relayed back to the sender.
     */
    uuid?: string
}
