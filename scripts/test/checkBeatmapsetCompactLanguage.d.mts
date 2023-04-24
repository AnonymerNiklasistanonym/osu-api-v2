// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetCompactLanguage } from "../types/beatmapsetCompact.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetCompactLanguageObject = (beatmapsetCompactLanguage: Readonly<BeatmapsetCompactLanguage>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetCompactLanguage).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapsetCompactLanguage.id, { checkedKey: "id", checkedKeys })
    genericCheckIfString(beatmapsetCompactLanguage.name, { checkedKey: "name", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetCompactLanguage, checkedKeys, options)
}
