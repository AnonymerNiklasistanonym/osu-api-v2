// Package imports
import { expect } from "chai"
// Relative imports
import { ChannelType } from "../types/channelType.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { ChatChannel } from "../types/chatChannel.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkChatChannelObject = (chatChannel: Readonly<ChatChannel>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(chatChannel).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(chatChannel.channel_id, { checkedKey: "channel_id", checkedKeys })
    genericCheckIfString(chatChannel.name, { checkedKey: "name", checkedKeys })
    genericCheckIfEnum(chatChannel.type, Object.values(ChannelType), { checkedKey: "type", checkedKeys })
    genericCheckIfBoolean(chatChannel.moderated, { checkedKey: "moderated", checkedKeys })
    // Check optional keys
    genericCheckIfString(chatChannel.description, { checkedKey: "description", checkedKeys, orUndef: true })
    genericCheckIfString(chatChannel.icon, { checkedKey: "icon", checkedKeys, orUndef: true })
    genericCheckIfString(chatChannel.uuid, { checkedKey: "uuid", checkedKeys, orUndef: true })
    genericCheckIfObject(chatChannel.current_user_attributes, { checkedKey: "current_user_attributes", checkedKeys, orUndef: true })
    genericCheckIfNumber(chatChannel.last_read_id, { checkedKey: "last_read_id", checkedKeys, orUndef: true })
    genericCheckIfNumber(chatChannel.last_message_id, { checkedKey: "last_message_id", checkedKeys, orUndef: true })
    genericCheckIfArray(chatChannel.recent_messages, { checkedKey: "recent_messages", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfArray(chatChannel.users, { checkedKey: "users", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfNumber(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(chatChannel, checkedKeys, options)
}
