// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Forum_topic_reply } from "../types/notification.d.mjs"

export const checkForum_topic_replyObject = (forum_topic_reply: Readonly<Forum_topic_reply>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(forum_topic_reply).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(forum_topic_reply.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(forum_topic_reply.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(forum_topic_reply.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(forum_topic_reply.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(forum_topic_reply.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfNumber(forum_topic_reply.post_id, { checkedKey: "post_id", checkedKeys })
    // Check optional keys
    genericCheckIfString(forum_topic_reply.username, { checkedKey: "username", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(forum_topic_reply, checkedKeys, options)
}
