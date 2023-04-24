// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeUserSupportFirst } from "../types/event.d.mjs"

export const checkEventTypeUserSupportFirstObject = (eventTypeUserSupportFirst: Readonly<EventTypeUserSupportFirst>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeUserSupportFirst).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeUserSupportFirst, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeUserSupportFirst.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeUserSupportFirst.type, { checkedKey: "type", checkedKeys, value: "userSupportFirst" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeUserSupportFirst, checkedKeys, options)
}
