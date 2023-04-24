// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { SearchResult } from "../types/search.d.mjs"

export const checkSearchResultObject = (searchResult: Readonly<SearchResult>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(searchResult).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(searchResult.data, { checkedKey: "data", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfNumber(searchResult.total, { checkedKey: "total", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(searchResult, checkedKeys, options)
}
