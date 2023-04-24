// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetAUserBeatmapScoresResponseFormat } from "../types/getAUserBeatmapScores.d.mjs"

export const checkGetAUserBeatmapScoresResponseFormatObject = (getAUserBeatmapScoresResponseFormat: Readonly<GetAUserBeatmapScoresResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getAUserBeatmapScoresResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(getAUserBeatmapScoresResponseFormat.scores, { checkedKey: "scores", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getAUserBeatmapScoresResponseFormat, checkedKeys, options)
}
