// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Poll } from "../types/forumTopic.d.mjs"

export const checkPollObject = (poll: Readonly<Poll>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(poll).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfBoolean(poll.allow_vote_change, { checkedKey: "allow_vote_change", checkedKeys })
    genericCheckIfBoolean(poll.hide_incomplete_results, { checkedKey: "hide_incomplete_results", checkedKeys })
    genericCheckIfNumber(poll.max_votes, { checkedKey: "max_votes", checkedKeys })
    genericCheckIfArray(poll.options, { checkedKey: "options", checkedKeys, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfEnum(poll.started_at, Object.values(Timestamp), { checkedKey: "started_at", checkedKeys })
    genericCheckIfObject(poll.title, { checkedKey: "title", checkedKeys })
    genericCheckIfNumber(poll.total_vote_count, { checkedKey: "total_vote_count", checkedKeys })
    // Check optional keys
    genericCheckIfEnum(poll.ended_at, Object.values(Timestamp), { checkedKey: "ended_at", checkedKeys, orUndef: true })
    genericCheckIfEnum(poll.last_vote_at, Object.values(Timestamp), { checkedKey: "last_vote_at", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(poll, checkedKeys, options)
}
