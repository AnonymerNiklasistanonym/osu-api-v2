// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventUser } from "../types/event.d.mjs"

export const checkEventUserObject = (eventUser: Readonly<EventUser>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventUser).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(eventUser.username, { checkedKey: "username", checkedKeys })
    genericCheckIfString(eventUser.url, { checkedKey: "url", checkedKeys })
    // Check optional keys
    genericCheckIfString(eventUser.previousUsername, { checkedKey: "previousUsername", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventUser, checkedKeys, options)
}
