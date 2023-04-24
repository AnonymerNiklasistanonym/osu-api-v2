// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { ProfileBanner } from "../types/userCompact.d.mjs"

export const checkProfileBannerObject = (profileBanner: Readonly<ProfileBanner>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(profileBanner).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(profileBanner.id, { checkedKey: "id", checkedKeys })
    genericCheckIfNumber(profileBanner.tournament_id, { checkedKey: "tournament_id", checkedKeys })
    genericCheckIfString(profileBanner.image, { checkedKey: "image", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(profileBanner, checkedKeys, options)
}
