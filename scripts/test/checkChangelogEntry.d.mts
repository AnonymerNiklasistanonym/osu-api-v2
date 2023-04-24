// Package imports
import { expect } from "chai"
// Relative imports
import { Timestamp } from "../types/timestamp.d.mjs"
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfEnum } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { ChangelogEntry } from "../types/changelogEntry.d.mjs"
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"

export const checkChangelogEntryObject = (changelogEntry: Readonly<ChangelogEntry>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(changelogEntry).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(changelogEntry.category, { checkedKey: "category", checkedKeys })
    genericCheckIfBoolean(changelogEntry.major, { checkedKey: "major", checkedKeys })
    genericCheckIfString(changelogEntry.type, { checkedKey: "type", checkedKeys })
    // Check optional keys
    genericCheckIfEnum(changelogEntry.created_at, Object.values(Timestamp), { checkedKey: "created_at", checkedKeys, orUndef: true })
    genericCheckIfNumber(changelogEntry.github_pull_request_id, { checkedKey: "github_pull_request_id", checkedKeys, orUndef: true })
    genericCheckIfString(changelogEntry.github_url, { checkedKey: "github_url", checkedKeys, orUndef: true })
    genericCheckIfNumber(changelogEntry.id, { checkedKey: "id", checkedKeys, orUndef: true })
    genericCheckIfString(changelogEntry.repository, { checkedKey: "repository", checkedKeys, orUndef: true })
    genericCheckIfString(changelogEntry.title, { checkedKey: "title", checkedKeys, orUndef: true })
    genericCheckIfString(changelogEntry.url, { checkedKey: "url", checkedKeys, orUndef: true })
    genericCheckIfObject(changelogEntry.github_user, { checkedKey: "github_user", checkedKeys, orUndef: true })
    genericCheckIfString(changelogEntry.message, { checkedKey: "message", checkedKeys, orUndef: true })
    genericCheckIfString(changelogEntry.message_html, { checkedKey: "message_html", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(changelogEntry, checkedKeys, options)
}
