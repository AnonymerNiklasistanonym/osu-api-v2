// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { CommentableMetaDeleted } from "../types/commentableMeta.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkCommentableMetaDeletedObject = (commentableMetaDeleted: Readonly<CommentableMetaDeleted>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(commentableMetaDeleted).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(commentableMetaDeleted.title, { checkedKey: "title", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(commentableMetaDeleted, checkedKeys, options)
}
