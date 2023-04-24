// Package imports
import { expect } from "chai"
// Relative imports
import { CommentableMeta } from "../types/beatmapCompact.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { CommentBundle } from "../types/commentBundle.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCommentBundleObject = (commentBundle: Readonly<CommentBundle>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(commentBundle).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfArray(commentBundle.commentable_meta, { checkedKey: "commentable_meta", checkedKeys, elementCheckFunc: (a) => genericCheckIfEnum(a, Object.values(CommentableMeta), {  }) })
    genericCheckIfArray(commentBundle.comments, { checkedKey: "comments", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(commentBundle.cursor, { checkedKey: "cursor", checkedKeys })
    genericCheckIfBoolean(commentBundle.has_more, { checkedKey: "has_more", checkedKeys })
    genericCheckIfArray(commentBundle.included_comments, { checkedKey: "included_comments", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfString(commentBundle.sort, { checkedKey: "sort", checkedKeys })
    genericCheckIfBoolean(commentBundle.user_follow, { checkedKey: "user_follow", checkedKeys })
    genericCheckIfArray(commentBundle.user_votes, { checkedKey: "user_votes", checkedKeys, elementCheckFunc: (a) => genericCheckIfNumber(a, {  }) })
    genericCheckIfArray(commentBundle.users, { checkedKey: "users", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check optional keys
    genericCheckIfNumber(commentBundle.has_more_id, { checkedKey: "has_more_id", checkedKeys, orUndef: true })
    genericCheckIfArray(commentBundle.pinned_comments, { checkedKey: "pinned_comments", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfNumber(commentBundle.top_level_count, { checkedKey: "top_level_count", checkedKeys, orUndef: true })
    genericCheckIfNumber(commentBundle.total, { checkedKey: "total", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(commentBundle, checkedKeys, options)
}
