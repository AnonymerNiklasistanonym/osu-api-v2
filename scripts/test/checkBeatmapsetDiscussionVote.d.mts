// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { BeatmapsetDiscussionVote } from "../types/beatmapsetDiscussionVote.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapsetDiscussionVoteObject = (beatmapsetDiscussionVote: Readonly<BeatmapsetDiscussionVote>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapsetDiscussionVote).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapsetDiscussionVote.beatmapset_discussion_id, { checkedKey: "beatmapset_discussion_id", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussionVote.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussionVote.id, { checkedKey: "id", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussionVote.score, { checkedKey: "score", checkedKeys })
    genericCheckIfEnum(beatmapsetDiscussionVote.updated_at, Object.values(Timestamp), { checkedKey: "updated_at", checkedKeys })
    genericCheckIfNumber(beatmapsetDiscussionVote.user_id, { checkedKey: "user_id", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapsetDiscussionVote, checkedKeys, options)
}
