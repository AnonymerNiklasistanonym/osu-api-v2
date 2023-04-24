// Package imports
import { expect } from "chai"
// Relative imports
import { MessageType } from "../types/beatmapsetDiscussion.d.mjs"
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetDiscussion } from "../types/beatmapsetDiscussion.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetDiscussionObject = (beatmapsetDiscussion: Readonly<BeatmapsetDiscussion>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetDiscussion).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapsetDiscussion.beatmapset_id, { checkedKey: "beatmapset_id", checkedKeys })
    genericCheckIfBoolean(beatmapsetDiscussion.can_be_resolved, { checkedKey: "can_be_resolved", checkedKeys })
    genericCheckIfBoolean(beatmapsetDiscussion.can_grant_kudosu, { checkedKey: "can_grant_kudosu", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussion.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfObject(beatmapsetDiscussion.current_user_attributes, { checkedKey: "current_user_attributes", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussion.id, { checkedKey: "id", checkedKeys })
    genericCheckIfBoolean(beatmapsetDiscussion.kudosu_denied, { checkedKey: "kudosu_denied", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussion.last_post_at, Object.values(Timestamp), { checkedKey: "last_post_at", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussion.message_type, Object.values(MessageType), { checkedKey: "message_type", checkedKeys })
    genericCheckIfBoolean(beatmapsetDiscussion.resolved, { checkedKey: "resolved", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussion.updated_at, Object.values(Timestamp), { checkedKey: "updated_at", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussion.user_id, { checkedKey: "user_id", checkedKeys })
    // Check optional keys
    genericCheckIfObject(beatmapsetDiscussion.beatmap, { checkedKey: "beatmap", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapsetDiscussion.beatmap_id, { checkedKey: "beatmap_id", checkedKeys, orUndef: true })
    genericCheckIfObject(beatmapsetDiscussion.beatmapset, { checkedKey: "beatmapset", checkedKeys, orUndef: true })
    genericCheckIfEnum(beatmapsetDiscussion.deleted_at, Object.values(Timestamp), { checkedKey: "deleted_at", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapsetDiscussion.deleted_by_id, { checkedKey: "deleted_by_id", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapsetDiscussion.parent_id, { checkedKey: "parent_id", checkedKeys, orUndef: true })
    genericCheckIfArray(beatmapsetDiscussion.posts, { checkedKey: "posts", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(beatmapsetDiscussion.starting_post, { checkedKey: "starting_post", checkedKeys, orUndef: true })
    genericCheckIfNumber(beatmapsetDiscussion.timestamp, { checkedKey: "timestamp", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetDiscussion, checkedKeys, options)
}
