// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfObject } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GetNotificationsResponseFormat } from "../types/getNotifications.d.mjs"

export const checkGetNotificationsResponseFormatObject = (getNotificationsResponseFormat: Readonly<GetNotificationsResponseFormat>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(getNotificationsResponseFormat).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfObject(getNotificationsResponseFormat.has_more, { checkedKey: "has_more", checkedKeys })
    genericCheckIfObject(getNotificationsResponseFormat.notifications, { checkedKey: "notifications", checkedKeys })
    genericCheckIfObject(getNotificationsResponseFormat.unread_count, { checkedKey: "unread_count", checkedKeys })
    genericCheckIfObject(getNotificationsResponseFormat.notification_endpoint, { checkedKey: "notification_endpoint", checkedKeys })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(getNotificationsResponseFormat, checkedKeys, options)
}
