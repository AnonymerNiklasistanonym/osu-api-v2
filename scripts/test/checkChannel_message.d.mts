// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Channel_message } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkChannel_messageObject = (channel_message: Readonly<Channel_message>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(channel_message).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(channel_message.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(channel_message.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(channel_message.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(channel_message.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(channel_message.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(channel_message.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(channel_message, checkedKeys, options)
}
