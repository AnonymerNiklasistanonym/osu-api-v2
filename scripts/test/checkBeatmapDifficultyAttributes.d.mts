// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapDifficultyAttributes } from "../types/beatmapDifficultyAttributes.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapDifficultyAttributesObject = (beatmapDifficultyAttributes: Readonly<BeatmapDifficultyAttributes>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapDifficultyAttributes).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapDifficultyAttributes.max_combo, { checkedKey: "max_combo", checkedKeys })
    genericCheckIfNumber(beatmapDifficultyAttributes.star_rating, { checkedKey: "star_rating", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapDifficultyAttributes, checkedKeys, options)
}
