// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { UserCompactPage } from "../types/userCompact.d.mjs"

export const checkUserCompactPageObject = (userCompactPage: Readonly<UserCompactPage>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(userCompactPage).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(userCompactPage.html, { checkedKey: "html", checkedKeys })
    genericCheckIfString(userCompactPage.raw, { checkedKey: "raw", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(userCompactPage, checkedKeys, options)
}
