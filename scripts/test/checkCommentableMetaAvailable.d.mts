// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { CommentableMetaAvailable } from "../types/commentableMeta.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCommentableMetaAvailableObject = (commentableMetaAvailable: Readonly<CommentableMetaAvailable>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(commentableMetaAvailable).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(commentableMetaAvailable.current_user_attributes, { checkedKey: "current_user_attributes", checkedKeys })
    genericCheckIfNumber(commentableMetaAvailable.id, { checkedKey: "id", checkedKeys })
    genericCheckIfString(commentableMetaAvailable.title, { checkedKey: "title", checkedKeys })
    genericCheckIfString(commentableMetaAvailable.type, { checkedKey: "type", checkedKeys })
    genericCheckIfString(commentableMetaAvailable.url, { checkedKey: "url", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(commentableMetaAvailable.owner_id, { checkedKey: "owner_id", checkedKeys, orUndef: true })
    genericCheckIfString(commentableMetaAvailable.owner_title, { checkedKey: "owner_title", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(commentableMetaAvailable, checkedKeys, options)
}
