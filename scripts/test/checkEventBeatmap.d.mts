// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventBeatmap } from "../types/event.d.mjs"

export const checkEventBeatmapObject = (eventBeatmap: Readonly<EventBeatmap>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventBeatmap).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(eventBeatmap.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(eventBeatmap.url, { checkedKey: "url", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventBeatmap, checkedKeys, options)
}
