// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserGroup } from "../types/userGroup.d.mjs"

export const checkUserGroupObject = (userGroup: Readonly<UserGroup>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userGroup).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfArray(userGroup.playmodes, { checkedKey: "playmodes", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfString(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userGroup, checkedKeys, options)
}
