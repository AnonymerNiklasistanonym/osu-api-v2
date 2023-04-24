// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserCompactAchievement } from "../types/userCompact.d.mjs"

export const checkUserCompactAchievementObject = (userCompactAchievement: Readonly<UserCompactAchievement>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userCompactAchievement).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfEnum(userCompactAchievement.achieved_at, Object.values(Timestamp), { checkedKey: "achieved_at", checkedKeys })
    genericCheckIfObject(userCompactAchievement.achievement_id, { checkedKey: "achievement_id", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userCompactAchievement, checkedKeys, options)
}
