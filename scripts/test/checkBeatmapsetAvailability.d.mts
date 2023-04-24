// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetAvailability } from "../types/beatmapset.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetAvailabilityObject = (beatmapsetAvailability: Readonly<BeatmapsetAvailability>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetAvailability).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfBoolean(beatmapsetAvailability.download_disabled, { checkedKey: "download_disabled", checkedKeys })
    // Check optional keys
    genericCheckIfString(beatmapsetAvailability.more_information, { checkedKey: "more_information", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetAvailability, checkedKeys, options)
}
