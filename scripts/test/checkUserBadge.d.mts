// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserBadge } from "../types/userCompact.d.mjs"

export const checkUserBadgeObject = (userBadge: Readonly<UserBadge>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userBadge).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfEnum(userBadge.awarded_at, Object.values(Timestamp), { checkedKey: "awarded_at", checkedKeys })
    genericCheckIfString(userBadge.description, { checkedKey: "description", checkedKeys })
    genericCheckIfString(userBadge.image_url, { checkedKey: "image_url", checkedKeys })
    genericCheckIfString(userBadge.url, { checkedKey: "url", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userBadge, checkedKeys, options)
}
