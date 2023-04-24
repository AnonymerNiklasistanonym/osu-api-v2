// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfBoolean } from "./checkGeneric.mjs"
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { Notification } from "../types/notification.d.mjs"

export const checkNotificationObject = (notification: Readonly<Notification>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(notification).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfNumber(notification.id, { checkedKey: "id", checkedKeys })
    genericCheckIfString(notification.name, { checkedKey: "name", checkedKeys })
    genericCheckIfString(notification.created_at, { checkedKey: "created_at", checkedKeys })
    genericCheckIfString(notification.object_type, { checkedKey: "object_type", checkedKeys })
    genericCheckIfNumber(notification.object_id, { checkedKey: "object_id", checkedKeys })
    genericCheckIfBoolean(notification.is_read, { checkedKey: "is_read", checkedKeys })
    genericCheckIfObject(notification.details, { checkedKey: "details", checkedKeys })
    // Check optional keys
    genericCheckIfNumber(notification.source_user_id, { checkedKey: "source_user_id", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(notification, checkedKeys, options)
}
