// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetBeatmapsetDiscussionVotesResponseFormat } from "../types/getBeatmapsetDiscussionVotes.d.mjs"

export const checkGetBeatmapsetDiscussionVotesResponseFormatObject = (getBeatmapsetDiscussionVotesResponseFormat: Readonly<GetBeatmapsetDiscussionVotesResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getBeatmapsetDiscussionVotesResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getBeatmapsetDiscussionVotesResponseFormat.cursor_string, { checkedKey: "cursor_string", checkedKeys })
    genericCheckIfObject(getBeatmapsetDiscussionVotesResponseFormat.discussions, { checkedKey: "discussions", checkedKeys })
    genericCheckIfObject(getBeatmapsetDiscussionVotesResponseFormat.users, { checkedKey: "users", checkedKeys })
    genericCheckIfArray(getBeatmapsetDiscussionVotesResponseFormat.votes, { checkedKey: "votes", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getBeatmapsetDiscussionVotesResponseFormat, checkedKeys, options)
}
