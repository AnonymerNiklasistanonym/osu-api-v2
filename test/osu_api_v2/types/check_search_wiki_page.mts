// Package imports
import { expect } from "chai"
// Local imports
import { checkWikiPageObject } from "./check_wiki_page.mjs"
import { genericCheckObjectForUncheckedKeys } from "./check_generic.mjs"
// Type imports
import type { SearchResult } from "../../../src/types/search.mjs"
import type { WikiPage } from "../../../src/types/wiki_page.mjs"

export const checkSearchResultWikiPageObject = (
    searchResultWikiPage: Readonly<SearchResult<WikiPage>>,
): void => {
    expect(searchResultWikiPage).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("data")
    expect(searchResultWikiPage.data).to.be.an("array")
    for (const element of searchResultWikiPage.data) {
        checkWikiPageObject(element)
    }

    checkedKeys.push("total")
    expect(searchResultWikiPage.total).to.be.a("number").greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(searchResultWikiPage, checkedKeys)
}
