// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserStatisticsGradeCounts } from "../types/userStatistics.d.mjs"

export const checkUserStatisticsGradeCountsObject = (userStatisticsGradeCounts: Readonly<UserStatisticsGradeCounts>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userStatisticsGradeCounts).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(userStatisticsGradeCounts.a, { checkedKey: "a", checkedKeys })
    genericCheckIfNumber(userStatisticsGradeCounts.s, { checkedKey: "s", checkedKeys })
    genericCheckIfNumber(userStatisticsGradeCounts.sh, { checkedKey: "sh", checkedKeys })
    genericCheckIfNumber(userStatisticsGradeCounts.ss, { checkedKey: "ss", checkedKeys })
    genericCheckIfNumber(userStatisticsGradeCounts.ssh, { checkedKey: "ssh", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userStatisticsGradeCounts, checkedKeys, options)
}
