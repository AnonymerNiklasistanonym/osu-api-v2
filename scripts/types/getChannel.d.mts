// This is an auto generated file

// Types: GetChannelResponseFormat

// Type imports
import type { ChatChannel } from "./chatChannel.d.mjs"
import type { UserCompact } from "./userCompact.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetChannelResponseFormat {
    /**
     * Updated types: `ChatChannel` -> ChatChannel
     */
    channel: ChatChannel
    /**
     * Users are only visible for PM channels.
     * Updated types: `UserCompact` -> UserCompact
     */
    users: UserCompact
}
