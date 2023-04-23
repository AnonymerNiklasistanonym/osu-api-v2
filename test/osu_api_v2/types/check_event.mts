// Package imports
import { expect } from "chai"
// Local imports
import {
    EventBeatmapsetApproveApproval,
    EventType,
} from "../../../src/types/event.mjs"
import { GameMode } from "../../../src/types/game_mode.mjs"
import { genericCheckObjectForUncheckedKeys } from "./check_generic.mjs"
import { ScoreRank } from "../../../src/types/score.mjs"
// Type imports
import type {
    EventObjectAchievement,
    EventObjectBeatmap,
    EventObjectBeatmapset,
    EventObjectUser,
    Events,
} from "../../../src/types/event.mjs"

export const checkEventObjectAchievementObject = (
    eventObjectAchievement: Readonly<EventObjectAchievement>,
): void => {
    expect(eventObjectAchievement).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("description")
    expect(eventObjectAchievement.description)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("grouping")
    expect(eventObjectAchievement.grouping)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("icon_url")
    expect(eventObjectAchievement.icon_url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("id")
    expect(eventObjectAchievement.id).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("instructions")
    if (eventObjectAchievement.instructions != null) {
        expect(eventObjectAchievement.instructions)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    } else {
        expect(eventObjectAchievement.instructions).to.be.null
    }

    checkedKeys.push("mode")
    expect(eventObjectAchievement.mode).to.be.null

    checkedKeys.push("name")
    expect(eventObjectAchievement.name)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("ordering")
    expect(eventObjectAchievement.ordering)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("slug")
    expect(eventObjectAchievement.slug)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    genericCheckObjectForUncheckedKeys(eventObjectAchievement, checkedKeys)
}

export const checkEventObjectUserObject = (
    eventObjectUser: Readonly<EventObjectUser>,
): void => {
    expect(eventObjectUser).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (eventObjectUser.previousUsername !== undefined) {
        checkedKeys.push("previousUsername")
        expect(eventObjectUser.previousUsername)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("url")
    expect(eventObjectUser.url).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("username")
    expect(eventObjectUser.username)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    genericCheckObjectForUncheckedKeys(eventObjectUser, checkedKeys)
}

export const checkEventObjectBeatmapsetObject = (
    eventObjectBeatmapset: Readonly<EventObjectBeatmapset>,
): void => {
    expect(eventObjectBeatmapset).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("title")
    expect(eventObjectBeatmapset.title)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("url")
    expect(eventObjectBeatmapset.url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    genericCheckObjectForUncheckedKeys(eventObjectBeatmapset, checkedKeys)
}

export const checkEventObjectBeatmapObject = (
    eventObjectBeatmap: Readonly<EventObjectBeatmap>,
): void => {
    expect(eventObjectBeatmap).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("title")
    expect(eventObjectBeatmap.title)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("url")
    expect(eventObjectBeatmap.url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    genericCheckObjectForUncheckedKeys(eventObjectBeatmap, checkedKeys)
}

export const checkEventObjects = (events: Readonly<Events[]>): void => {
    expect(events).to.be.an("array")
    for (const element of events) {
        checkEventObject(element)
    }
}

export const checkEventObject = (
    event: Readonly<Events>,
): ReadonlyArray<string> => {
    expect(event).to.be.an("object")

    // List of all keys that will be checked
    const possiblyDeprecatedKeys = ["createdAt"]
    const checkedKeys = [...possiblyDeprecatedKeys]

    checkedKeys.push("created_at")
    expect(event.created_at).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("id")
    expect(event.id).to.be.a("number").greaterThan(0)

    checkedKeys.push("type")
    expect(Object.values(EventType)).includes(event.type)

    switch (event.type) {
        case EventType.ACHIEVEMENT:
            checkedKeys.push("achievement")
            checkEventObjectAchievementObject(event.achievement)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.BEATMAPSET_APPROVE:
            checkedKeys.push("approval")
            expect(Object.values(EventBeatmapsetApproveApproval)).includes(
                event.approval,
            )

            checkedKeys.push("beatmapset")
            checkEventObjectBeatmapsetObject(event.beatmapset)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.BEATMAPSET_DELETE:
            checkedKeys.push("beatmapset")
            checkEventObjectBeatmapsetObject(event.beatmapset)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.BEATMAPSET_REVIVE:
            checkedKeys.push("beatmapset")
            checkEventObjectBeatmapsetObject(event.beatmapset)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.BEATMAPSET_UPDATE:
            checkedKeys.push("beatmapset")
            checkEventObjectBeatmapsetObject(event.beatmapset)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.BEATMAPSET_UPLOAD:
            checkedKeys.push("beatmapset")
            checkEventObjectBeatmapsetObject(event.beatmapset)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.BEATMAP_PLAYCOUNT:
            checkedKeys.push("beatmap")
            checkEventObjectBeatmapObject(event.beatmap)

            checkedKeys.push("count")
            expect(event.count).to.be.a("number").greaterThanOrEqual(0)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.RANK:
            checkedKeys.push("beatmap")
            checkEventObjectBeatmapObject(event.beatmap)

            checkedKeys.push("mode")
            expect(Object.values(GameMode)).includes(event.mode)

            checkedKeys.push("scoreRank")
            expect(Object.values(ScoreRank)).includes(event.scoreRank)

            checkedKeys.push("rank")
            expect(event.rank).to.be.a("number").greaterThanOrEqual(0)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.RANK_LOST:
            checkedKeys.push("beatmap")
            checkEventObjectBeatmapObject(event.beatmap)

            checkedKeys.push("mode")
            expect(Object.values(GameMode)).includes(event.mode)

            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.USERNAME_CHANGE:
            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.USER_SUPPORT_AGAIN:
            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.USER_SUPPORT_FIRST:
            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
        case EventType.USER_SUPPORT_GIFT:
            checkedKeys.push("user")
            checkEventObjectUserObject(event.user)

            return genericCheckObjectForUncheckedKeys(event, checkedKeys)
    }
}
