// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { WikiPage } from "../types/wikiPage.d.mjs"

export const checkWikiPageObject = (wikiPage: Readonly<WikiPage>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(wikiPage).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(wikiPage.available_locales, { checkedKey: "available_locales", checkedKeys, elementCheckFunc: (a) => genericCheckIfString(a, {  }) })
    genericCheckIfString(wikiPage.layout, { checkedKey: "layout", checkedKeys })
    genericCheckIfString(wikiPage.locale, { checkedKey: "locale", checkedKeys })
    genericCheckIfString(wikiPage.markdown, { checkedKey: "markdown", checkedKeys })
    genericCheckIfString(wikiPage.path, { checkedKey: "path", checkedKeys })
    genericCheckIfArray(wikiPage.tags, { checkedKey: "tags", checkedKeys, elementCheckFunc: (a) => genericCheckIfString(a, {  }) })
    genericCheckIfString(wikiPage.title, { checkedKey: "title", checkedKeys })
    // Check optional keys
    genericCheckIfString(wikiPage.subtitle, { checkedKey: "subtitle", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(wikiPage, checkedKeys, options)
}
