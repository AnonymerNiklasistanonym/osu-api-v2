// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_discussion_unlock } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_discussion_unlockObject = (beatmapset_discussion_unlock: Readonly<Beatmapset_discussion_unlock>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_discussion_unlock).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_discussion_unlock.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_unlock.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_discussion_unlock.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_unlock.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_discussion_unlock.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_discussion_unlock.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_discussion_unlock, checkedKeys, options)
}
