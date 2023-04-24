// This is an auto generated file

// Types: ChatMessage

// Type imports
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "channel_id": 5,
 *   "content": "i am a lazerface",
 *   "is_action": false,
 *   "message_id": 9150005004,
 *   "sender_id": 2,
 *   "timestamp": "2018-07-06T06:33:34+00:00",
 *   "type": "plain",
 *   "uuid": "some-uuid-string",
 *   "sender": {
 *     "id": 2,
 *     "username": "peppy",
 *     "profile_colour": "#3366FF",
 *     "avatar_url": "https://a.ppy.sh/2?1519081077.png",
 *     "country_code": "AU",
 *     "is_active": true,
 *     "is_bot": false,
 *     "is_online": true,
 *     "is_supporter": true
 *   }
 * }
 * ```
 * Represents an individual Message within a ChatChannel.
 * [Source](https://osu.ppy.sh/docs/index.html#chatmessage)
 */
export interface ChatMessage {
    /**
     * `channel_id` of where the message was sent
     */
    channel_id: number
    /**
     * message content
     */
    content: string
    /**
     * Deprecated. Markdown message content as HTML
     */
    content_html?: string
    /**
     * was this an action? i.e. `/me dances`
     */
    is_action: boolean
    /**
     * unique identifier for message
     */
    message_id: number
    /**
     * embedded UserCompact object to save additional api lookups
     * Updated types: `UserCompact` -> UserCompact
     */
    sender?: UserCompact
    /**
     * `user_id` of the sender
     */
    sender_id: number
    /**
     * when the message was sent, ISO-8601
     */
    timestamp: string
    /**
     * type of message; 'action', 'markdown' or 'plain'
     */
    type: string
    /**
     * message identifier originally sent by client
     */
    uuid?: string
}
