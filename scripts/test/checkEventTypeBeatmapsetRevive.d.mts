// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeBeatmapsetRevive } from "../types/event.d.mjs"

export const checkEventTypeBeatmapsetReviveObject = (eventTypeBeatmapsetRevive: Readonly<EventTypeBeatmapsetRevive>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeBeatmapsetRevive).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeBeatmapsetRevive, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeBeatmapsetRevive.beatmapset, { checkedKey: "beatmapset", checkedKeys })
    genericCheckIfObject(eventTypeBeatmapsetRevive.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeBeatmapsetRevive.type, { checkedKey: "type", checkedKeys, value: "beatmapsetRevive" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeBeatmapsetRevive, checkedKeys, options)
}
