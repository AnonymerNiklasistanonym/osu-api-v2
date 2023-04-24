// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Taiko } from "../types/beatmapDifficultyAttributes.d.mjs"

export const checkTaikoObject = (taiko: Readonly<Taiko>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(taiko).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(taiko.stamina_difficulty, { checkedKey: "stamina_difficulty", checkedKeys })
    genericCheckIfNumber(taiko.rhythm_difficulty, { checkedKey: "rhythm_difficulty", checkedKeys })
    genericCheckIfNumber(taiko.colour_difficulty, { checkedKey: "colour_difficulty", checkedKeys })
    genericCheckIfNumber(taiko.approach_rate, { checkedKey: "approach_rate", checkedKeys })
    genericCheckIfNumber(taiko.great_hit_window, { checkedKey: "great_hit_window", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(taiko, checkedKeys, options)
}
