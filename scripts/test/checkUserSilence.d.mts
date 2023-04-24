// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserSilence } from "../types/userSilence.d.mjs"

export const checkUserSilenceObject = (userSilence: Readonly<UserSilence>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userSilence).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(userSilence.id, { checkedKey: "id", checkedKeys })
    genericCheckIfNumber(userSilence.user_id, { checkedKey: "user_id", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userSilence, checkedKeys, options)
}
