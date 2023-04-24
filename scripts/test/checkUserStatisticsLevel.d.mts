// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserStatisticsLevel } from "../types/userStatistics.d.mjs"

export const checkUserStatisticsLevelObject = (userStatisticsLevel: Readonly<UserStatisticsLevel>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userStatisticsLevel).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(userStatisticsLevel.current, { checkedKey: "current", checkedKeys })
    genericCheckIfNumber(userStatisticsLevel.progress, { checkedKey: "progress", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userStatisticsLevel, checkedKeys, options)
}
