// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfArray } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { Build } from "../types/build.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkBuildObject = (build: Readonly<Build>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(build).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfEnum(build.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys })
    genericCheckIfString(build.display_version, { checkedKey: "display_version", checkedKeys })
    genericCheckIfNumber(build.id, { checkedKey: "id", checkedKeys })
    genericCheckIfNumber(build.users, { checkedKey: "users", checkedKeys })
    // Check optional keys
    genericCheckIfObject(build.update_stream, { checkedKey: "update_stream", checkedKeys, orUndef: true })
    genericCheckIfString(build.version, { checkedKey: "version", checkedKeys, orUndef: true })
    genericCheckIfArray(build.changelog_entries, { checkedKey: "changelog_entries", checkedKeys, orUndef: true, elementCheckFunc: (a) => genericCheckIfObject(a, {  }) })
    genericCheckIfObject(build.versions, { checkedKey: "versions", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(build, checkedKeys, options)
}
