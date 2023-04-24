// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { SearchResponseFormat } from "../types/search.d.mjs"

export const checkSearchResponseFormatObject = (searchResponseFormat: Readonly<SearchResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(searchResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfObject(searchResponseFormat.user, { checkedKey: "user", checkedKeys, orUndef: true })
    genericCheckIfObject(searchResponseFormat.wiki_page, { checkedKey: "wiki_page", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(searchResponseFormat, checkedKeys, options)
}
