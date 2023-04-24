// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ForumPost } from "../types/forumPost.d.mjs"

export const checkForumPostObject = (forumPost: Readonly<ForumPost>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(forumPost).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfEnum(forumPost.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfNumber(forumPost.forum_id, { checkedKey: "forum_id", checkedKeys })
    genericCheckIfNumber(forumPost.id, { checkedKey: "id", checkedKeys })
    genericCheckIfNumber(forumPost.topic_id, { checkedKey: "topic_id", checkedKeys })
    genericCheckIfNumber(forumPost.user_id, { checkedKey: "user_id", checkedKeys })
    // Check optional keys
    genericCheckIfEnum(forumPost.deleted_at, Object.values(Timestamp), { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    genericCheckIfEnum(forumPost.edited_at, Object.values(Timestamp), { checkedKey: "edited_at", checkedKeys, orUndef: true })
    genericCheckIfNumber(forumPost.edited_by_id, { checkedKey: "edited_by_id", checkedKeys, orUndef: true })
    genericCheckIfObject(forumPost.body, { checkedKey: "body", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(forumPost, checkedKeys, options)
}
