// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { KudosuHistory } from "../types/kudosuHistory.d.mjs"

export const checkKudosuHistoryObject = (kudosuHistory: Readonly<KudosuHistory>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(kudosuHistory).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(kudosuHistory.id, { checkedKey: "id", checkedKeys })
    genericCheckIfString(kudosuHistory.action, { checkedKey: "action", checkedKeys })
    genericCheckIfNumber(kudosuHistory.amount, { checkedKey: "amount", checkedKeys })
    genericCheckIfString(kudosuHistory.model, { checkedKey: "model", checkedKeys })
    genericCheckIfEnum(kudosuHistory.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfObject(kudosuHistory.post, { checkedKey: "post", checkedKeys })
    // Check optional keys
    genericCheckIfObject(kudosuHistory.giver, { checkedKey: "giver", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(kudosuHistory, checkedKeys, options)
}
