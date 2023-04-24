// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Osu } from "../types/beatmapDifficultyAttributes.d.mjs"

export const checkOsuObject = (osu: Readonly<Osu>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(osu).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(osu.aim_difficulty, { checkedKey: "aim_difficulty", checkedKeys })
    genericCheckIfNumber(osu.approach_rate, { checkedKey: "approach_rate", checkedKeys })
    genericCheckIfNumber(osu.flashlight_difficulty, { checkedKey: "flashlight_difficulty", checkedKeys })
    genericCheckIfNumber(osu.overall_difficulty, { checkedKey: "overall_difficulty", checkedKeys })
    genericCheckIfNumber(osu.slider_factor, { checkedKey: "slider_factor", checkedKeys })
    genericCheckIfNumber(osu.speed_difficulty, { checkedKey: "speed_difficulty", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(osu, checkedKeys, options)
}
