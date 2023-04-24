// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_discussion_post_new } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_discussion_post_newObject = (beatmapset_discussion_post_new: Readonly<Beatmapset_discussion_post_new>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_discussion_post_new).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_discussion_post_new.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_post_new.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_discussion_post_new.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_post_new.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_discussion_post_new.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfNumber(beatmapset_discussion_post_new.discussion_id, { checkedKey: "discussion_id", checkedKeys })
    genericCheckIfNumber(beatmapset_discussion_post_new.post_id, { checkedKey: "post_id", checkedKeys })
    genericCheckIfString(beatmapset_discussion_post_new.username, { checkedKey: "username", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(beatmapset_discussion_post_new.beatmap_id, { checkedKey: "beatmap_id", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_discussion_post_new, checkedKeys, options)
}
