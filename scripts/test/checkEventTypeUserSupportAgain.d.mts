// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeUserSupportAgain } from "../types/event.d.mjs"

export const checkEventTypeUserSupportAgainObject = (eventTypeUserSupportAgain: Readonly<EventTypeUserSupportAgain>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeUserSupportAgain).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeUserSupportAgain, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeUserSupportAgain.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeUserSupportAgain.type, { checkedKey: "type", checkedKeys, value: "userSupportAgain" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeUserSupportAgain, checkedKeys, options)
}
