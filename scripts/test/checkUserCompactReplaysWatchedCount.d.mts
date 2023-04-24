// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserCompactReplaysWatchedCount } from "../types/userCompact.d.mjs"

export const checkUserCompactReplaysWatchedCountObject = (userCompactReplaysWatchedCount: Readonly<UserCompactReplaysWatchedCount>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userCompactReplaysWatchedCount).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(userCompactReplaysWatchedCount.count, { checkedKey: "count", checkedKeys })
    genericCheckIfEnum(userCompactReplaysWatchedCount.start_date, Object.values(Timestamp), { checkedKey: "start_date", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userCompactReplaysWatchedCount, checkedKeys, options)
}
