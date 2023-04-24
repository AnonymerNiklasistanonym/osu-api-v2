// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventBeatmapset } from "../types/event.d.mjs"

export const checkEventBeatmapsetObject = (eventBeatmapset: Readonly<EventBeatmapset>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventBeatmapset).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(eventBeatmapset.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(eventBeatmapset.url, { checkedKey: "url", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventBeatmapset, checkedKeys, options)
}
