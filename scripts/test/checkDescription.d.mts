// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Description } from "../types/group.d.mjs"

export const checkDescriptionObject = (description: Readonly<Description>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(description).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(description.html, { checkedKey: "html", checkedKeys })
    genericCheckIfString(description.markdown, { checkedKey: "markdown", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(description, checkedKeys, options)
}
