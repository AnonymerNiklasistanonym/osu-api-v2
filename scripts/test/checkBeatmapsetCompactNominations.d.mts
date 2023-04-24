// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetCompactNominations } from "../types/beatmapsetCompact.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetCompactNominationsObject = (beatmapsetCompactNominations: Readonly<BeatmapsetCompactNominations>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetCompactNominations).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(beatmapsetCompactNominations.current, { checkedKey: "current", checkedKeys })
    genericCheckIfObject(beatmapsetCompactNominations.required, { checkedKey: "required", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetCompactNominations, checkedKeys, options)
}
