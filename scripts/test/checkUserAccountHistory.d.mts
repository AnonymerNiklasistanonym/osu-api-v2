// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserAccountHistory } from "../types/userCompact.d.mjs"

export const checkUserAccountHistoryObject = (userAccountHistory: Readonly<UserAccountHistory>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userAccountHistory).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(userAccountHistory.id, { checkedKey: "id", checkedKeys })
    genericCheckIfNumber(userAccountHistory.length, { checkedKey: "length", checkedKeys })
    genericCheckIfBoolean(userAccountHistory.permanent, { checkedKey: "permanent", checkedKeys })
    genericCheckIfEnum(userAccountHistory.timestamp, Object.values(Timestamp), { checkedKey: "timestamp", checkedKeys })
    genericCheckIfString(userAccountHistory.type, { checkedKey: "type", checkedKeys })
    // Check optional keys
    genericCheckIfString(userAccountHistory.description, { checkedKey: "description", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userAccountHistory, checkedKeys, options)
}
