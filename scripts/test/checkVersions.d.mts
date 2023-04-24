// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Versions } from "../types/build.d.mjs"

export const checkVersionsObject = (versions: Readonly<Versions>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(versions).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfObject(versions.next, { checkedKey: "next", checkedKeys, orUndef: true })
    genericCheckIfObject(versions.previous, { checkedKey: "previous", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(versions, checkedKeys, options)
}
