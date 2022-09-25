// Package imports
import { expect } from "chai"
// Local imports
import { checkWikiPageObject } from "./check_wiki_page"
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type { SearchResult, WikiPage } from "../../../src"

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
