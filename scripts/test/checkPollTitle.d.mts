// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { PollTitle } from "../types/forumTopic.d.mjs"

export const checkPollTitleObject = (pollTitle: Readonly<PollTitle>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(pollTitle).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(pollTitle.bbcode, { checkedKey: "bbcode", checkedKeys })
    genericCheckIfString(pollTitle.html, { checkedKey: "html", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(pollTitle, checkedKeys, options)
}
