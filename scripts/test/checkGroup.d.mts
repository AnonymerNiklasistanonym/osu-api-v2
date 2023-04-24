// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Group } from "../types/group.d.mjs"

export const checkGroupObject = (group: Readonly<Group>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(group).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfBoolean(group.has_listing, { checkedKey: "has_listing", checkedKeys })
    genericCheckIfBoolean(group.has_playmodes, { checkedKey: "has_playmodes", checkedKeys })
    genericCheckIfNumber(group.id, { checkedKey: "id", checkedKeys })
    genericCheckIfString(group.identifier, { checkedKey: "identifier", checkedKeys })
    genericCheckIfBoolean(group.is_probationary, { checkedKey: "is_probationary", checkedKeys })
    genericCheckIfString(group.name, { checkedKey: "name", checkedKeys })
    genericCheckIfString(group.short_name, { checkedKey: "short_name", checkedKeys })
    // Check optional keys
    genericCheckIfString(group.colour, { checkedKey: "colour", checkedKeys, orUndef: true })
    genericCheckIfObject(group.description, { checkedKey: "description", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(group, checkedKeys, options)
}
