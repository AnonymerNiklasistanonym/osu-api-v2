// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { NewsPost } from "../types/newsPost.d.mjs"

export const checkNewsPostObject = (newsPost: Readonly<NewsPost>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(newsPost).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(newsPost.author, { checkedKey: "author", checkedKeys })
    genericCheckIfString(newsPost.edit_url, { checkedKey: "edit_url", checkedKeys })
    genericCheckIfNumber(newsPost.id, { checkedKey: "id", checkedKeys })
    genericCheckIfEnum(newsPost.published_at, Object.values(Timestamp), { checkedKey: "published_at", checkedKeys })
    genericCheckIfString(newsPost.slug, { checkedKey: "slug", checkedKeys })
    genericCheckIfString(newsPost.title, { checkedKey: "title", checkedKeys })
    genericCheckIfEnum(newsPost.updated_at, Object.values(Timestamp), { checkedKey: "updated_at", checkedKeys })
    // Check optional keys
    genericCheckIfString(newsPost.first_image, { checkedKey: "first_image", checkedKeys, orUndef: true })
    genericCheckIfString(newsPost.content, { checkedKey: "content", checkedKeys, orUndef: true })
    genericCheckIfObject(newsPost.navigation, { checkedKey: "navigation", checkedKeys, orUndef: true })
    genericCheckIfString(newsPost.preview, { checkedKey: "preview", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(newsPost, checkedKeys, options)
}
