// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { CurrentUserAttributes } from "../types/commentableMeta.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCurrentUserAttributesObject = (currentUserAttributes: Readonly<CurrentUserAttributes>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(currentUserAttributes).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfString(currentUserAttributes.can_new_comment_reason, { checkedKey: "can_new_comment_reason", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(currentUserAttributes, checkedKeys, options)
}
