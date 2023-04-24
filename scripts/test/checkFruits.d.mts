// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Fruits } from "../types/beatmapDifficultyAttributes.d.mjs"

export const checkFruitsObject = (fruits: Readonly<Fruits>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(fruits).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(fruits.approach_rate, { checkedKey: "approach_rate", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(fruits, checkedKeys, options)
}
