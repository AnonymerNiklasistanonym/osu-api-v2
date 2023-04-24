// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Failtimes } from "../types/beatmapCompact.d.mjs"

export const checkFailtimesObject = (failtimes: Readonly<Failtimes>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(failtimes).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfArray(failtimes.exit, { checkedKey: "exit", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfNumber(a, {  }) })
    genericCheckIfArray(failtimes.fail, { checkedKey: "fail", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfNumber(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(failtimes, checkedKeys, options)
}
