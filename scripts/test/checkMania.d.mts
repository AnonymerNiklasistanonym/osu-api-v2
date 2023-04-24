// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Mania } from "../types/beatmapDifficultyAttributes.d.mjs"

export const checkManiaObject = (mania: Readonly<Mania>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(mania).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(mania.great_hit_window, { checkedKey: "great_hit_window", checkedKeys })
    genericCheckIfNumber(mania.score_multiplier, { checkedKey: "score_multiplier", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(mania, checkedKeys, options)
}
