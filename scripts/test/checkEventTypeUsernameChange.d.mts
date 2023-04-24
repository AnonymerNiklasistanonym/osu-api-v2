// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeUsernameChange } from "../types/event.d.mjs"

export const checkEventTypeUsernameChangeObject = (eventTypeUsernameChange: Readonly<EventTypeUsernameChange>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeUsernameChange).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeUsernameChange, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeUsernameChange.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeUsernameChange.type, { checkedKey: "type", checkedKeys, value: "usernameChange" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeUsernameChange, checkedKeys, options)
}
