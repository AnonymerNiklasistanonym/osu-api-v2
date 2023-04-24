// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeUserSupportGift } from "../types/event.d.mjs"

export const checkEventTypeUserSupportGiftObject = (eventTypeUserSupportGift: Readonly<EventTypeUserSupportGift>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeUserSupportGift).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeUserSupportGift, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeUserSupportGift.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeUserSupportGift.type, { checkedKey: "type", checkedKeys, value: "userSupportGift" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeUserSupportGift, checkedKeys, options)
}
