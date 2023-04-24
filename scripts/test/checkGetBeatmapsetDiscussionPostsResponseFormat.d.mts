// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetBeatmapsetDiscussionPostsResponseFormat } from "../types/getBeatmapsetDiscussionPosts.d.mjs"

export const checkGetBeatmapsetDiscussionPostsResponseFormatObject = (getBeatmapsetDiscussionPostsResponseFormat: Readonly<GetBeatmapsetDiscussionPostsResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getBeatmapsetDiscussionPostsResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getBeatmapsetDiscussionPostsResponseFormat.beatmapsets, { checkedKey: "beatmapsets", checkedKeys })
    genericCheckIfObject(getBeatmapsetDiscussionPostsResponseFormat.cursor_string, { checkedKey: "cursor_string", checkedKeys })
    genericCheckIfArray(getBeatmapsetDiscussionPostsResponseFormat.posts, { checkedKey: "posts", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(getBeatmapsetDiscussionPostsResponseFormat.users, { checkedKey: "users", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getBeatmapsetDiscussionPostsResponseFormat, checkedKeys, options)
}
