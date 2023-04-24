// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Covers } from "../types/beatmapsetCompact.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCoversObject = (covers: Readonly<Covers>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(covers).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(covers.cover, { checkedKey: "cover", checkedKeys })
    genericCheckIfString(covers.cover@2x, { checkedKey: "cover@2x", checkedKeys })
    genericCheckIfString(covers.card, { checkedKey: "card", checkedKeys })
    genericCheckIfString(covers.card@2x, { checkedKey: "card@2x", checkedKeys })
    genericCheckIfString(covers.list, { checkedKey: "list", checkedKeys })
    genericCheckIfString(covers.list@2x, { checkedKey: "list@2x", checkedKeys })
    genericCheckIfString(covers.slimcover, { checkedKey: "slimcover", checkedKeys })
    genericCheckIfString(covers.slimcover@2x, { checkedKey: "slimcover@2x", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(covers, checkedKeys, options)
}
