// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeAchievement } from "../types/event.d.mjs"

export const checkEventTypeAchievementObject = (eventTypeAchievement: Readonly<EventTypeAchievement>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeAchievement).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeAchievement, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeAchievement.achievement, { checkedKey: "achievement", checkedKeys })
    genericCheckIfObject(eventTypeAchievement.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeAchievement.type, { checkedKey: "type", checkedKeys, value: "achievement" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeAchievement, checkedKeys, options)
}
