// Package imports
import { expect } from "chai"
// Local imports
import {
    checkUserCompactObject,
    CheckUserObjectEndpointSearch,
} from "./check_user"
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type {
    EndpointSearchUserResponse,
    EndpointSearchUserResponseUsers,
} from "../../../src"

export const checkEndpointSearchUserResponseUsersObject = (
    endpointSearchUserResponseUsers: Readonly<EndpointSearchUserResponseUsers>,
): void => {
    expect(endpointSearchUserResponseUsers).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("data")
    expect(endpointSearchUserResponseUsers.data).to.be.an("array")
    for (const element of endpointSearchUserResponseUsers.data) {
        checkUserCompactObject(element, {
            endpointSearch: CheckUserObjectEndpointSearch.USER,
        })
    }

    checkedKeys.push("total")
    expect(endpointSearchUserResponseUsers.total)
        .to.be.a("number")
        .greaterThanOrEqual(0)
}

export const checkEndpointSearchUserResponseObject = (
    endpointSearchUserResponse: Readonly<EndpointSearchUserResponse>,
): void => {
    expect(endpointSearchUserResponse).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("user")
    checkEndpointSearchUserResponseUsersObject(endpointSearchUserResponse.user)

    genericCheckObjectForUncheckedKeys(endpointSearchUserResponse, checkedKeys)
}
