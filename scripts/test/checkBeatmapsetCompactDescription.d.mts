// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetCompactDescription } from "../types/beatmapsetCompact.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetCompactDescriptionObject = (beatmapsetCompactDescription: Readonly<BeatmapsetCompactDescription>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetCompactDescription).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(beatmapsetCompactDescription.description, { checkedKey: "description", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetCompactDescription, checkedKeys, options)
}
