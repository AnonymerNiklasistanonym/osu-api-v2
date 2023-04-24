// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapScores } from "../types/beatmapScores.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapScoresObject = (beatmapScores: Readonly<BeatmapScores>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapScores).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(beatmapScores.scores, { checkedKey: "scores", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check optional keys
    genericCheckIfObject(beatmapScores.userScore, { checkedKey: "userScore", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapScores, checkedKeys, options)
}
