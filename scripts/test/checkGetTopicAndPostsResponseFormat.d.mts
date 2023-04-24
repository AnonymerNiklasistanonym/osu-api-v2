// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
import { genericUnknownError } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetTopicAndPostsResponseFormat } from "../types/getTopicAndPosts.d.mjs"

export const checkGetTopicAndPostsResponseFormatObject = (getTopicAndPostsResponseFormat: Readonly<GetTopicAndPostsResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getTopicAndPostsResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getTopicAndPostsResponseFormat.cursor_string, { checkedKey: "cursor_string", checkedKeys })
    genericCheckIfArray(getTopicAndPostsResponseFormat.posts, { checkedKey: "posts", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericUnknownError(getTopicAndPostsResponseFormat.search, { checkedKey: "search", checkedKeys })
    genericCheckIfObject(getTopicAndPostsResponseFormat.topic, { checkedKey: "topic", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getTopicAndPostsResponseFormat, checkedKeys, options)
}
