// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Navigation } from "../types/newsPost.d.mjs"

export const checkNavigationObject = (navigation: Readonly<Navigation>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(navigation).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfObject(navigation.newer, { checkedKey: "newer", checkedKeys, orUndef: true })
    genericCheckIfObject(navigation.older, { checkedKey: "older", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(navigation, checkedKeys, options)
}
