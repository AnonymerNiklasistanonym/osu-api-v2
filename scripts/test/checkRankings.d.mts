// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Rankings } from "../types/rankings.d.mjs"

export const checkRankingsObject = (rankings: Readonly<Rankings>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(rankings).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(rankings.cursor, { checkedKey: "cursor", checkedKeys })
    genericCheckIfArray(rankings.ranking, { checkedKey: "ranking", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfNumber(rankings.total, { checkedKey: "total", checkedKeys })
    // Check optional keys
    genericCheckIfArray(rankings.beatmapsets, { checkedKey: "beatmapsets", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(rankings.spotlight, { checkedKey: "spotlight", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(rankings, checkedKeys, options)
}
