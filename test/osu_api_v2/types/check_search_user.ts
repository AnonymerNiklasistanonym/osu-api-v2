// Package imports
import { expect } from "chai"
// Local imports
import {
    checkUserCompactObject,
    CheckUserObjectEndpointSearch,
} from "./check_user"
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type { SearchResult, UserEndpointSearchUser } from "../../../src"

export const checkSearchResultEndpointSearchUserObject = (
    searchResultEndpointSearchUser: Readonly<
        SearchResult<UserEndpointSearchUser>
    >,
): void => {
    expect(searchResultEndpointSearchUser).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("data")
    expect(searchResultEndpointSearchUser.data).to.be.an("array")
    for (const element of searchResultEndpointSearchUser.data) {
        checkUserCompactObject(element, {
            endpointSearch: CheckUserObjectEndpointSearch.USER,
        })
    }

    checkedKeys.push("total")
    expect(searchResultEndpointSearchUser.total)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(
        searchResultEndpointSearchUser,
        checkedKeys,
    )
}
