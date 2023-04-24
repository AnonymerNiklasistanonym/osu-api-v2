// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Post } from "../types/kudosuHistory.d.mjs"

export const checkPostObject = (post: Readonly<Post>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(post).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(post.title, { checkedKey: "title", checkedKeys })
    // Check optional keys
    genericCheckIfString(post.url, { checkedKey: "url", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(post, checkedKeys, options)
}
