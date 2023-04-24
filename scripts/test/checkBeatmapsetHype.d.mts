// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetHype } from "../types/beatmapset.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetHypeObject = (beatmapsetHype: Readonly<BeatmapsetHype>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetHype).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapsetHype.current, { checkedKey: "current", checkedKeys })
    genericCheckIfNumber(beatmapsetHype.required, { checkedKey: "required", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetHype, checkedKeys, options)
}
