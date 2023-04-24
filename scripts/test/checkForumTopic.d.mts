// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ForumTopic } from "../types/forumTopic.d.mjs"

export const checkForumTopicObject = (forumTopic: Readonly<ForumTopic>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(forumTopic).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfEnum(forumTopic.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfNumber(forumTopic.first_post_id, { checkedKey: "first_post_id", checkedKeys })
    genericCheckIfNumber(forumTopic.forum_id, { checkedKey: "forum_id", checkedKeys })
    genericCheckIfNumber(forumTopic.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(forumTopic.is_locked, { checkedKey: "is_locked", checkedKeys })
    genericCheckIfNumber(forumTopic.last_post_id, { checkedKey: "last_post_id", checkedKeys })
    genericCheckIfNumber(forumTopic.post_count, { checkedKey: "post_count", checkedKeys })
    genericCheckIfString(forumTopic.title, { checkedKey: "title", checkedKeys })
    // TODO Unable to handle multiple types (forumTopic.type - `normal`,`sticky`,`announcement`)
    genericCheckIfEnum(forumTopic.updated_at, Object.values(Timestamp), { checkedKey: "updated_at", checkedKeys })
    genericCheckIfNumber(forumTopic.user_id, { checkedKey: "user_id", checkedKeys })
    // Check optional keys
    genericCheckIfEnum(forumTopic.deleted_at, Object.values(Timestamp), { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    genericCheckIfObject(forumTopic.poll, { checkedKey: "poll", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(forumTopic, checkedKeys, options)
}
