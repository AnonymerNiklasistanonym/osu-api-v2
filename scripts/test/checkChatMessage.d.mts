// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { ChatMessage } from "../types/chatMessage.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkChatMessageObject = (chatMessage: Readonly<ChatMessage>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(chatMessage).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(chatMessage.channel_id, { checkedKey: "channel_id", checkedKeys })
    genericCheckIfString(chatMessage.content, { checkedKey: "content", checkedKeys })
    genericCheckIfBoolean(chatMessage.is_action, { checkedKey: "is_action", checkedKeys })
    genericCheckIfNumber(chatMessage.message_id, { checkedKey: "message_id", checkedKeys })
    genericCheckIfNumber(chatMessage.sender_id, { checkedKey: "sender_id", checkedKeys })
    genericCheckIfString(chatMessage.timestamp, { checkedKey: "timestamp", checkedKeys })
    genericCheckIfString(chatMessage.type, { checkedKey: "type", checkedKeys })
    // Check optional keys
    genericCheckIfString(chatMessage.content_html, { checkedKey: "content_html", checkedKeys, orUndef: true })
    genericCheckIfString(chatMessage.uuid, { checkedKey: "uuid", checkedKeys, orUndef: true })
    genericCheckIfObject(chatMessage.sender, { checkedKey: "sender", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(chatMessage, checkedKeys, options)
}
