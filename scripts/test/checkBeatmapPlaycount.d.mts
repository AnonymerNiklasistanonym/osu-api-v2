// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapPlaycount } from "../types/beatmapPlaycount.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapPlaycountObject = (beatmapPlaycount: Readonly<BeatmapPlaycount>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapPlaycount).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapPlaycount.beatmap_id, { checkedKey: "beatmap_id", checkedKeys })
    genericCheckIfNumber(beatmapPlaycount.count, { checkedKey: "count", checkedKeys })
    // Check optional keys
    genericCheckIfObject(beatmapPlaycount.beatmap, { checkedKey: "beatmap", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapPlaycount.beatmapset, { checkedKey: "beatmapset", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapPlaycount, checkedKeys, options)
}
