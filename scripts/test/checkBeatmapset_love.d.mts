// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Beatmapset_love } from "../types/notification.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBeatmapset_loveObject = (beatmapset_love: Readonly<Beatmapset_love>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(beatmapset_love).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(beatmapset_love.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfString(beatmapset_love.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(beatmapset_love.source_user_id, { checkedKey: "source_user_id", checkedKeys })
    genericCheckIfString(beatmapset_love.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(beatmapset_love.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfString(beatmapset_love.username, { checkedKey: "username", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(beatmapset_love, checkedKeys, options)
}
