// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ResponseFormat } from "../types/getUsers.d.mjs"

export const checkResponseFormatObject = (responseFormat: Readonly<ResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(responseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(responseFormat.users, { checkedKey: "users", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(responseFormat, checkedKeys, options)
}
