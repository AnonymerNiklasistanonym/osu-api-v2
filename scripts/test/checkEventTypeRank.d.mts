// Package imports
import { expect } from "chai"
// Relative imports
import { GameMode } from "../types/gameMode.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeRank } from "../types/event.d.mjs"

export const checkEventTypeRankObject = (eventTypeRank: Readonly<EventTypeRank>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeRank).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeRank, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfString(eventTypeRank.scoreRank, { checkedKey: "scoreRank", checkedKeys })
    genericCheckIfNumber(eventTypeRank.rank, { checkedKey: "rank", checkedKeys })
    genericCheckIfEnum(eventTypeRank.mode, Object.values(GameMode), { checkedKey: "mode", checkedKeys })
    genericCheckIfObject(eventTypeRank.beatmap, { checkedKey: "beatmap", checkedKeys })
    genericCheckIfObject(eventTypeRank.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeRank.type, { checkedKey: "type", checkedKeys, value: "rank" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeRank, checkedKeys, options)
}
