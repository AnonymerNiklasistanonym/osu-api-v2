// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetNewsListingResponseFormat } from "../types/getNewsListing.d.mjs"

export const checkGetNewsListingResponseFormatObject = (getNewsListingResponseFormat: Readonly<GetNewsListingResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getNewsListingResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getNewsListingResponseFormat.cursor_string, { checkedKey: "cursor_string", checkedKeys })
    genericCheckIfArray(getNewsListingResponseFormat.news_posts, { checkedKey: "news_posts", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(getNewsListingResponseFormat.news_sidebar, { checkedKey: "news_sidebar", checkedKeys })
    genericCheckIfObject(getNewsListingResponseFormat.search, { checkedKey: "search", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getNewsListingResponseFormat, checkedKeys, options)
}
