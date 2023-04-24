// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ResponseFormatNewsSidebar } from "../types/getNewsListing.d.mjs"

export const checkResponseFormatNewsSidebarObject = (responseFormatNewsSidebar: Readonly<ResponseFormatNewsSidebar>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(responseFormatNewsSidebar).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(responseFormatNewsSidebar.current_year, { checkedKey: "current_year", checkedKeys })
    genericCheckIfArray(responseFormatNewsSidebar.news_posts, { checkedKey: "news_posts", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfArray(responseFormatNewsSidebar.years, { checkedKey: "years", checkedKeys, elementCheckFunc: (a) => genericCheckIfNumber(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(responseFormatNewsSidebar, checkedKeys, options)
}
