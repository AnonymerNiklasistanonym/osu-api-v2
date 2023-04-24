// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { ChatChannelUserAttributes } from "../types/currentUserAttributes.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkChatChannelUserAttributesObject = (chatChannelUserAttributes: Readonly<ChatChannelUserAttributes>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(chatChannelUserAttributes).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfBoolean(chatChannelUserAttributes.can_message, { checkedKey: "can_message", checkedKeys })
    genericCheckIfNumber(chatChannelUserAttributes.last_read_id, { checkedKey: "last_read_id", checkedKeys })
    // Check optional keys
    genericCheckIfString(chatChannelUserAttributes.can_message_error, { checkedKey: "can_message_error", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(chatChannelUserAttributes, checkedKeys, options)
}
