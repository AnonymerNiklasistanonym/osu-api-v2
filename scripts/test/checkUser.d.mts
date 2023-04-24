// Package imports
import { expect } from "chai"
// Relative imports
import { GameMode } from "../types/gameMode.d.mjs"
import { ProfilePage } from "../types/user.d.mjs"
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { User } from "../types/user.d.mjs"

export const checkUserObject = (user: Readonly<User>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(user).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(user.cover_url, { checkedKey: "cover_url", checkedKeys })
    genericCheckIfBoolean(user.has_supported, { checkedKey: "has_supported", checkedKeys })
    genericCheckIfEnum(user.join_date, Object.values(Timestamp), { checkedKey: "join_date", checkedKeys })
    genericCheckIfObject(user.kudosu, { checkedKey: "kudosu", checkedKeys })
    genericCheckIfNumber(user.max_blocks, { checkedKey: "max_blocks", checkedKeys })
    genericCheckIfNumber(user.max_friends, { checkedKey: "max_friends", checkedKeys })
    genericCheckIfEnum(user.playmode, Object.values(GameMode), { checkedKey: "playmode", checkedKeys })
    genericCheckIfObject(user.playstyle, { checkedKey: "playstyle", checkedKeys })
    genericCheckIfNumber(user.post_count, { checkedKey: "post_count", checkedKeys })
    genericCheckIfArray(user.profile_order, { checkedKey: "profile_order", checkedKeys, elementCheckFunc: (a) => genericCheckIfEnum(a, Object.values(ProfilePage), {  }) })
    // Check optional keys
    genericCheckIfString(user.discord, { checkedKey: "discord", checkedKeys, orUndef: true })
    genericCheckIfString(user.interests, { checkedKey: "interests", checkedKeys, orUndef: true })
    genericCheckIfString(user.location, { checkedKey: "location", checkedKeys, orUndef: true })
    genericCheckIfString(user.occupation, { checkedKey: "occupation", checkedKeys, orUndef: true })
    genericCheckIfString(user.title, { checkedKey: "title", checkedKeys, orUndef: true })
    genericCheckIfString(user.title_url, { checkedKey: "title_url", checkedKeys, orUndef: true })
    genericCheckIfString(user.twitter, { checkedKey: "twitter", checkedKeys, orUndef: true })
    genericCheckIfString(user.website, { checkedKey: "website", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(user, checkedKeys, options)
}
