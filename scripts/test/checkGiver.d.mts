// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Giver } from "../types/kudosuHistory.d.mjs"

export const checkGiverObject = (giver: Readonly<Giver>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(giver).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(giver.url, { checkedKey: "url", checkedKeys })
    genericCheckIfString(giver.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(giver, checkedKeys, options)
}
