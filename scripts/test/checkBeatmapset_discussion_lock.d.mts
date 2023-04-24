// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_discussion_lock } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_discussion_lockObject = (beatmapset_discussion_lock: Readonly<Beatmapset_discussion_lock>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_discussion_lock).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_discussion_lock.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_lock.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_discussion_lock.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_lock.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_discussion_lock.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_discussion_lock.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_discussion_lock, checkedKeys, options)
}
