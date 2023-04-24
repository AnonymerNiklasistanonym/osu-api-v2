// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { PollOptionText } from "../types/forumTopic.d.mjs"

export const checkPollOptionTextObject = (pollOptionText: Readonly<PollOptionText>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(pollOptionText).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(pollOptionText.bbcode, { checkedKey: "bbcode", checkedKeys })
    genericCheckIfString(pollOptionText.html, { checkedKey: "html", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(pollOptionText, checkedKeys, options)
}
