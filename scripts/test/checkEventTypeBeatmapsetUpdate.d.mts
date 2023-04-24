// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeBeatmapsetUpdate } from "../types/event.d.mjs"

export const checkEventTypeBeatmapsetUpdateObject = (eventTypeBeatmapsetUpdate: Readonly<EventTypeBeatmapsetUpdate>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeBeatmapsetUpdate).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeBeatmapsetUpdate, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeBeatmapsetUpdate.beatmapset, { checkedKey: "beatmapset", checkedKeys })
    genericCheckIfObject(eventTypeBeatmapsetUpdate.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeBeatmapsetUpdate.type, { checkedKey: "type", checkedKeys, value: "beatmapsetUpdate" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeBeatmapsetUpdate, checkedKeys, options)
}
