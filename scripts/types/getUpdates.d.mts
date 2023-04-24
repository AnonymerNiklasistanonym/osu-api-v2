// This is an auto generated file

// Types: GetUpdatesResponseFormat

// Type imports
import type { ChatChannel } from "./chatChannel.d.mjs"
import type { UserSilence } from "./userSilence.d.mjs"

/**
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetUpdatesResponseFormat {
    messages: Thisfieldisnotusedandwillberemoved.
    /**
     * Updated types: `ChatChannel`[] -> ChatChannel[]
     */
    presence?: ChatChannel[]
    /**
     * Updated types: `UserSilence`[] -> UserSilence[]
     */
    silences?: UserSilence[]
}
