// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { RankHighest } from "../types/userCompact.d.mjs"

export const checkRankHighestObject = (rankHighest: Readonly<RankHighest>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(rankHighest).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(rankHighest.rank, { checkedKey: "rank", checkedKeys })
    genericCheckIfEnum(rankHighest.updated_at, Object.values(Timestamp), { checkedKey: "updated_at", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(rankHighest, checkedKeys, options)
}
