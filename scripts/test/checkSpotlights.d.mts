// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Spotlights } from "../types/spotlights.d.mjs"

export const checkSpotlightsObject = (spotlights: Readonly<Spotlights>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(spotlights).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(spotlights.spotlights, { checkedKey: "spotlights", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(spotlights, checkedKeys, options)
}
