// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetDiscussionPost } from "../types/beatmapsetDiscussionPost.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetDiscussionPostObject = (beatmapsetDiscussionPost: Readonly<BeatmapsetDiscussionPost>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetDiscussionPost).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapsetDiscussionPost.beatmapset_discussion_id, { checkedKey: "beatmapset_discussion_id", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussionPost.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussionPost.id, { checkedKey: "id", checkedKeys })
    genericCheckIfString(beatmapsetDiscussionPost.message, { checkedKey: "message", checkedKeys })
    genericCheckIfBoolean(beatmapsetDiscussionPost.system, { checkedKey: "system", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussionPost.updated_at, Object.values(Timestamp), { checkedKey: "updated_at", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussionPost.user_id, { checkedKey: "user_id", checkedKeys })
    // Check optional keys
    genericCheckIfEnum(beatmapsetDiscussionPost.deleted_at, Object.values(Timestamp), { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapsetDiscussionPost.deleted_by_id, { checkedKey: "deleted_by_id", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapsetDiscussionPost.last_editor_id, { checkedKey: "last_editor_id", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetDiscussionPost, checkedKeys, options)
}
