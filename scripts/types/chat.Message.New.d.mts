// This is an auto generated file

// Types: PayloadFormat

// Type imports
import type { ChatMessage } from "./chatMessage.d.mjs"
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#payloadformat)
 */
export interface PayloadFormat {
    /**
     * The messages received.
     * Updated types: `ChatMessage`[] -> ChatMessage[]
     */
    messages: ChatMessage[]
    /**
     * The related users who sent the messages.
     * Updated types: `UserCompact`[] -> UserCompact[]
     */
    users: UserCompact[]
}
