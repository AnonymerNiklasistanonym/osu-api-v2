// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetUpdatesResponseFormat } from "../types/getUpdates.d.mjs"

export const checkGetUpdatesResponseFormatObject = (getUpdatesResponseFormat: Readonly<GetUpdatesResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getUpdatesResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getUpdatesResponseFormat.messages, { checkedKey: "messages", checkedKeys })
    // Check optional keys
    genericCheckIfArray(getUpdatesResponseFormat.presence, { checkedKey: "presence", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfArray(getUpdatesResponseFormat.silences, { checkedKey: "silences", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getUpdatesResponseFormat, checkedKeys, options)
}
