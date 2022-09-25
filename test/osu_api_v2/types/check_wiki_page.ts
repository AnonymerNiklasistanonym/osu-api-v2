// Package imports
import { expect } from "chai"
// Local imports
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type { WikiPage } from "../../../src"

export const checkWikiPageObject = (wikiPage: Readonly<WikiPage>): void => {
    expect(wikiPage).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("available_locales")
    expect(wikiPage.available_locales).to.be.an("array")
    for (const element of wikiPage.available_locales) {
        expect(element).to.be.a("string").with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("layout")
    expect(wikiPage.layout).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("locale")
    expect(wikiPage.locale).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("markdown")
    expect(wikiPage.markdown).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("path")
    expect(wikiPage.path).to.be.a("string").with.a.lengthOf.greaterThan(0)

    if (wikiPage.subtitle !== undefined) {
        if (wikiPage.subtitle !== null) {
            checkedKeys.push("subtitle")
            expect(wikiPage.subtitle)
                .to.be.a("string")
                .with.a.lengthOf.greaterThan(0)
        } else {
            checkedKeys.push("subtitle")
            expect(wikiPage.subtitle).to.be.null
        }
    }

    checkedKeys.push("tags")
    expect(wikiPage.tags).to.be.an("array")
    for (const element of wikiPage.tags) {
        if (typeof element === "string") {
            expect(element).to.be.a("string").with.a.lengthOf.greaterThan(0)
        } else {
            expect(element).to.be.a("number")
        }
    }

    checkedKeys.push("title")
    expect(wikiPage.title).to.be.a("string").with.a.lengthOf.greaterThan(0)

    genericCheckObjectForUncheckedKeys(wikiPage, checkedKeys)
}
