// This is an auto generated file

// Types: GetNotificationsResponseFormat

/**
 * Returns an object containing Notification and other related attributes.
 * [Source](https://osu.ppy.sh/docs/index.html#responseformat)
 */
export interface GetNotificationsResponseFormat {
    has_more: booleanwhetherornottherearemorenotifications
    notification_endpoint: urltoconnecttowebsocketserver
    /**
     * Updated types: arrayof`Notification` -> rrayof`Notification
     */
    notifications: rrayof`Notification
    unread_count: totalunreadnotifications
}
