// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ReadEvent } from "../types/readEvent.d.mjs"

export const checkReadEventObject = (readEvent: Readonly<ReadEvent>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(readEvent).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(readEvent.event, { checkedKey: "event", checkedKeys })
    genericCheckIfArray(readEvent.ids, { checkedKey: "ids", checkedKeys, elementCheckFunc: (a) => genericCheckIfNumber(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(readEvent, checkedKeys, options)
}
