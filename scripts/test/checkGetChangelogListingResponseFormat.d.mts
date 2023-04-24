// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetChangelogListingResponseFormat } from "../types/getChangelogListing.d.mjs"

export const checkGetChangelogListingResponseFormatObject = (getChangelogListingResponseFormat: Readonly<GetChangelogListingResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getChangelogListingResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(getChangelogListingResponseFormat.builds, { checkedKey: "builds", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfArray(getChangelogListingResponseFormat.streams, { checkedKey: "streams", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check optional keys
    genericCheckIfObject(getChangelogListingResponseFormat.search, { checkedKey: "search", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getChangelogListingResponseFormat, checkedKeys, options)
}
