// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_reset_nominations } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_reset_nominationsObject = (beatmapset_reset_nominations: Readonly<Beatmapset_reset_nominations>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_reset_nominations).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_reset_nominations.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_reset_nominations.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_reset_nominations.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_reset_nominations.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_reset_nominations.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_reset_nominations.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_reset_nominations, checkedKeys, options)
}
