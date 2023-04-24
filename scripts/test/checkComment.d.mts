// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Comment } from "../types/comment.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCommentObject = (comment: Readonly<Comment>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(comment).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(comment.commentable_id, { checkedKey: "commentable_id", checkedKeys })
    genericCheckIfString(comment.commentable_type, { checkedKey: "commentable_type", checkedKeys })
    genericCheckIfString(comment.created_at, { checkedKey: "created_at", checkedKeys })
    genericCheckIfNumber(comment.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(comment.pinned, { checkedKey: "pinned", checkedKeys })
    genericCheckIfNumber(comment.replies_count, { checkedKey: "replies_count", checkedKeys })
    genericCheckIfString(comment.updated_at, { checkedKey: "updated_at", checkedKeys })
    genericCheckIfNumber(comment.user_id, { checkedKey: "user_id", checkedKeys })
    genericCheckIfNumber(comment.votes_count, { checkedKey: "votes_count", checkedKeys })
    // Check optional keys
    genericCheckIfString(comment.deleted_at, { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    genericCheckIfString(comment.edited_at, { checkedKey: "edited_at", checkedKeys, orUndef: true })
    genericCheckIfNumber(comment.edited_by_id, { checkedKey: "edited_by_id", checkedKeys, orUndef: true })
    genericCheckIfString(comment.legacy_name, { checkedKey: "legacy_name", checkedKeys, orUndef: true })
    genericCheckIfString(comment.message, { checkedKey: "message", checkedKeys, orUndef: true })
    genericCheckIfString(comment.message_html, { checkedKey: "message_html", checkedKeys, orUndef: true })
    genericCheckIfNumber(comment.parent_id, { checkedKey: "parent_id", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(comment, checkedKeys, options)
}
