// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeBeatmapsetDelete } from "../types/event.d.mjs"

export const checkEventTypeBeatmapsetDeleteObject = (eventTypeBeatmapsetDelete: Readonly<EventTypeBeatmapsetDelete>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeBeatmapsetDelete).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeBeatmapsetDelete, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeBeatmapsetDelete.beatmapset, { checkedKey: "beatmapset", checkedKeys })
    genericCheckIfString(eventTypeBeatmapsetDelete.type, { checkedKey: "type", checkedKeys, value: "beatmapsetDelete" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeBeatmapsetDelete, checkedKeys, options)
}
