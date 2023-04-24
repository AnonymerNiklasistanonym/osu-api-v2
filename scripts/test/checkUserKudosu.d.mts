// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserKudosu } from "../types/user.d.mjs"

export const checkUserKudosuObject = (userKudosu: Readonly<UserKudosu>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userKudosu).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(userKudosu.available, { checkedKey: "available", checkedKeys })
    genericCheckIfNumber(userKudosu.total, { checkedKey: "total", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userKudosu, checkedKeys, options)
}
