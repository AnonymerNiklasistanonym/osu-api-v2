// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ResponseFormatSearch } from "../types/getNewsListing.d.mjs"

export const checkResponseFormatSearchObject = (responseFormatSearch: Readonly<ResponseFormatSearch>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(responseFormatSearch).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(responseFormatSearch.limit, { checkedKey: "limit", checkedKeys })
    genericCheckIfString(responseFormatSearch.sort, { checkedKey: "sort", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(responseFormatSearch, checkedKeys, options)
}
