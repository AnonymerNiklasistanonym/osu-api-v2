// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { MultiplayerScore } from "../types/multiplayerScore.d.mjs"

export const checkMultiplayerScoreObject = (multiplayerScore: Readonly<MultiplayerScore>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(multiplayerScore).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(multiplayerScore.`id`, { checkedKey: "`id`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`user_id`, { checkedKey: "`user_id`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`room_id`, { checkedKey: "`room_id`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`playlist_item_id`, { checkedKey: "`playlist_item_id`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`beatmap_id`, { checkedKey: "`beatmap_id`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`rank`, { checkedKey: "`rank`", checkedKeys, value: "rank" })
    genericCheckIfString(multiplayerScore.`total_score`, { checkedKey: "`total_score`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`accuracy`, { checkedKey: "`accuracy`", checkedKeys, value: "number" })
    genericCheckIfString(multiplayerScore.`max_combo`, { checkedKey: "`max_combo`", checkedKeys, value: "number" })
    genericCheckIfObject(multiplayerScore.`mods`, { checkedKey: "`mods`", checkedKeys })
    genericCheckIfObject(multiplayerScore.`statistics`, { checkedKey: "`statistics`", checkedKeys })
    genericCheckIfString(multiplayerScore.`passed`, { checkedKey: "`passed`", checkedKeys, value: "bool" })
    genericCheckIfString(multiplayerScore.`position`, { checkedKey: "`position`", checkedKeys, value: "number?" })
    genericCheckIfObject(multiplayerScore.`scores_around`, { checkedKey: "`scores_around`", checkedKeys })
    genericCheckIfObject(multiplayerScore.`user`, { checkedKey: "`user`", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(multiplayerScore, checkedKeys, options)
}
