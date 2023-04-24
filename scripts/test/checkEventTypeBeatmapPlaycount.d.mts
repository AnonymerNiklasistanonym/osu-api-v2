// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeBeatmapPlaycount } from "../types/event.d.mjs"

export const checkEventTypeBeatmapPlaycountObject = (eventTypeBeatmapPlaycount: Readonly<EventTypeBeatmapPlaycount>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeBeatmapPlaycount).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeBeatmapPlaycount, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfObject(eventTypeBeatmapPlaycount.beatmap, { checkedKey: "beatmap", checkedKeys })
    genericCheckIfNumber(eventTypeBeatmapPlaycount.count, { checkedKey: "count", checkedKeys })
    genericCheckIfString(eventTypeBeatmapPlaycount.type, { checkedKey: "type", checkedKeys, value: "beatmapPlaycount" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeBeatmapPlaycount, checkedKeys, options)
}
