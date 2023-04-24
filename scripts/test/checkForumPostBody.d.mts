// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ForumPostBody } from "../types/forumPost.d.mjs"

export const checkForumPostBodyObject = (forumPostBody: Readonly<ForumPostBody>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(forumPostBody).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check optional keys
    genericCheckIfString(forumPostBody.html, { checkedKey: "html", checkedKeys, orUndef: true })
    genericCheckIfString(forumPostBody.raw, { checkedKey: "raw", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(forumPostBody, checkedKeys, options)
}
