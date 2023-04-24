// Package imports
import { expect } from "chai"
// Relative imports
import { GameMode } from "../types/gameMode.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { EventTypeRankLost } from "../types/event.d.mjs"

export const checkEventTypeRankLostObject = (eventTypeRankLost: Readonly<EventTypeRankLost>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(eventTypeRankLost).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check extended keys
    checkedKeys.push(...checkEventObject(eventTypeRankLost, { ...options, ignoreUncheckedKeys: true }))
    // Check required keys
    genericCheckIfEnum(eventTypeRankLost.mode, Object.values(GameMode), { checkedKey: "mode", checkedKeys })
    genericCheckIfObject(eventTypeRankLost.beatmap, { checkedKey: "beatmap", checkedKeys })
    genericCheckIfObject(eventTypeRankLost.user, { checkedKey: "user", checkedKeys })
    genericCheckIfString(eventTypeRankLost.type, { checkedKey: "type", checkedKeys, value: "rankLost" })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(eventTypeRankLost, checkedKeys, options)
}
