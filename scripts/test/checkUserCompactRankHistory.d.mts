// Package imports
import { expect } from "chai"
// Relative imports
import { GameMode } from "../types/gameMode.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserCompactRankHistory } from "../types/userCompact.d.mjs"

export const checkUserCompactRankHistoryObject = (userCompactRankHistory: Readonly<UserCompactRankHistory>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userCompactRankHistory).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(userCompactRankHistory.data, { checkedKey: "data", checkedKeys })
    genericCheckIfEnum(userCompactRankHistory.mode, Object.values(GameMode), { checkedKey: "mode", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userCompactRankHistory, checkedKeys, options)
}
