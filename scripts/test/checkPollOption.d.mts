// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { PollOption } from "../types/forumTopic.d.mjs"

export const checkPollOptionObject = (pollOption: Readonly<PollOption>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(pollOption).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(pollOption.id, { checkedKey: "id", checkedKeys })
    genericCheckIfObject(pollOption.text, { checkedKey: "text", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(pollOption.vote_count, { checkedKey: "vote_count", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(pollOption, checkedKeys, options)
}
