// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_remove_from_loved } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_remove_from_lovedObject = (beatmapset_remove_from_loved: Readonly<Beatmapset_remove_from_loved>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_remove_from_loved).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_remove_from_loved.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_remove_from_loved.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_remove_from_loved.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_remove_from_loved.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_remove_from_loved.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_remove_from_loved.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_remove_from_loved, checkedKeys, options)
}
