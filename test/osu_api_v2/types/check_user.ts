// Package imports
import { expect } from "chai"
// Local imports
import { GameMode, ProfilePage } from "../../../src"
import {
    GameModeVariant,
    Playstyle,
    UserCompact,
    UserEndpointSearchUser,
    UserGroup,
} from "../../../src/types/user"
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type {
    User,
    UserCompactCover,
    UserCompactKusodo,
    UserCompactPage,
    UserMonthlyPlaycount,
    UserRankHistory,
} from "../../../src"
import type {
    UserAchievement,
    UserBadge,
    UserEndpointGet,
    UserEndpointMe,
    UserGameModeVariant,
    UserReplaysWatchedCount,
    UserStatistics,
    UserStatisticsGradeCounts,
    UserStatisticsLevel,
    UserStatisticsRulesets,
} from "../../../src/types/user"
import type { DefaultCheckResponseOptions } from "../../test_helper"

export const checkUserCompactCoverObject = (
    userCompactCover: Readonly<UserCompactCover>,
): void => {
    expect(userCompactCover).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("id")
    if (userCompactCover.id !== null) {
        expect(userCompactCover.id)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    } else {
        expect(userCompactCover.id).to.be.null
    }

    checkedKeys.push("url")
    expect(userCompactCover.url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("custom_url")
    if (userCompactCover.custom_url !== null) {
        expect(userCompactCover.custom_url)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    } else {
        expect(userCompactCover.custom_url).to.be.null
    }

    genericCheckObjectForUncheckedKeys(userCompactCover, checkedKeys)
}

export const checkUserCompactKusodoObject = (
    userCompactKusodo: Readonly<UserCompactKusodo>,
): void => {
    expect(userCompactKusodo).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("available")
    expect(userCompactKusodo.available).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("total")
    expect(userCompactKusodo.total).to.be.a("number").greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(userCompactKusodo, checkedKeys)
}

export const checkUserCompactPageObject = (
    userCompactPage: Readonly<UserCompactPage>,
): void => {
    expect(userCompactPage).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("html")
    expect(userCompactPage.html)
        .to.be.a("string")
        .with.a.lengthOf.greaterThanOrEqual(0)

    checkedKeys.push("raw")
    expect(userCompactPage.raw)
        .to.be.a("string")
        .with.a.lengthOf.greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(userCompactPage, checkedKeys)
}

export const checkUserMonthlyPlaycountOrReplaysWatchedCountObject = (
    userMonthlyPlaycount: Readonly<
        UserMonthlyPlaycount | UserReplaysWatchedCount
    >,
): void => {
    expect(userMonthlyPlaycount).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("count")
    expect(userMonthlyPlaycount.count).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("start_date")
    expect(userMonthlyPlaycount.start_date)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    genericCheckObjectForUncheckedKeys(userMonthlyPlaycount, checkedKeys)
}

export const checkUserRankHistoryObject = (
    userRankHistory: Readonly<UserRankHistory>,
): void => {
    expect(userRankHistory).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("mode")
    expect(Object.values(GameMode)).includes(userRankHistory.mode)

    checkedKeys.push("data")
    expect(userRankHistory.data).to.be.an("array")
    for (const element of userRankHistory.data) {
        expect(element).to.be.a("number").greaterThanOrEqual(0)
    }

    genericCheckObjectForUncheckedKeys(userRankHistory, checkedKeys)
}

export const checkUserStatisticsLevelObject = (
    userStatisticsLevel: Readonly<UserStatisticsLevel>,
): void => {
    expect(userStatisticsLevel).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("current")
    expect(userStatisticsLevel.current).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("progress")
    expect(userStatisticsLevel.progress).to.be.a("number").greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(userStatisticsLevel, checkedKeys)
}

export const checkUserStatisticsObject = (
    userCompactStatistics: Readonly<UserStatistics>,
): void => {
    expect(userCompactStatistics).to.be.an("object")

    // List of all keys that will be checked
    const deprecatedKeys = ["rank"]
    const checkedKeys: string[] = [...deprecatedKeys]

    if (userCompactStatistics.country_rank !== undefined) {
        checkedKeys.push("country_rank")
        expect(userCompactStatistics.country_rank)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (userCompactStatistics.global_rank !== undefined) {
        checkedKeys.push("global_rank")
        expect(userCompactStatistics.global_rank)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    checkedKeys.push("grade_counts")
    checkUserCompactStatisticsGradeCountsObject(
        userCompactStatistics.grade_counts,
    )

    checkedKeys.push("hit_accuracy")
    expect(userCompactStatistics.hit_accuracy)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("is_ranked")
    expect(userCompactStatistics.is_ranked).to.be.a("boolean")

    checkedKeys.push("level")
    checkUserStatisticsLevelObject(userCompactStatistics.level)

    checkedKeys.push("maximum_combo")
    expect(userCompactStatistics.maximum_combo)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("play_count")
    expect(userCompactStatistics.play_count)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("play_time")
    expect(userCompactStatistics.play_time)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("pp")
    expect(userCompactStatistics.pp).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("ranked_score")
    expect(userCompactStatistics.ranked_score)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("replays_watched_by_others")
    expect(userCompactStatistics.replays_watched_by_others)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("total_hits")
    expect(userCompactStatistics.total_hits)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("total_score")
    expect(userCompactStatistics.total_score)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    if (userCompactStatistics.variants !== undefined) {
        checkedKeys.push("variants")
        expect(userCompactStatistics.variants).to.be.an("array")
        for (const element of userCompactStatistics.variants) {
            checkUserGameModeVariantObject(element)
        }
    }

    genericCheckObjectForUncheckedKeys(userCompactStatistics, checkedKeys)
}

export const checkUserStatisticsRulesetsObject = (
    userStatisticsRulesets: Readonly<UserStatisticsRulesets>,
): void => {
    expect(userStatisticsRulesets).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("fruits")
    checkUserStatisticsObject(userStatisticsRulesets.fruits)

    checkedKeys.push("mania")
    checkUserStatisticsObject(userStatisticsRulesets.mania)

    checkedKeys.push("osu")
    checkUserStatisticsObject(userStatisticsRulesets.osu)

    checkedKeys.push("taiko")
    checkUserStatisticsObject(userStatisticsRulesets.taiko)

    genericCheckObjectForUncheckedKeys(userStatisticsRulesets, checkedKeys)
}

export const checkUserGameModeVariantObject = (
    userGameModeVariant: Readonly<UserGameModeVariant>,
): void => {
    expect(userGameModeVariant).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (userGameModeVariant.country_rank !== null) {
        checkedKeys.push("country_rank")
        expect(userGameModeVariant.country_rank)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    } else {
        checkedKeys.push("country_rank")
        expect(userGameModeVariant.country_rank).to.be.null
    }

    if (userGameModeVariant.global_rank !== null) {
        checkedKeys.push("global_rank")
        expect(userGameModeVariant.global_rank)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    } else {
        checkedKeys.push("global_rank")
        expect(userGameModeVariant.global_rank).to.be.null
    }

    checkedKeys.push("pp")
    expect(userGameModeVariant.pp).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("mode")
    expect(Object.values(GameMode)).includes(userGameModeVariant.mode)

    checkedKeys.push("variant")
    expect(Object.values(GameModeVariant)).includes(userGameModeVariant.variant)

    genericCheckObjectForUncheckedKeys(userGameModeVariant, checkedKeys)
}

export const checkUserCompactStatisticsGradeCountsObject = (
    userCompactStatisticsGradeCounts: Readonly<UserStatisticsGradeCounts>,
): void => {
    expect(userCompactStatisticsGradeCounts).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("ss")
    expect(userCompactStatisticsGradeCounts.ss)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("ssh")
    expect(userCompactStatisticsGradeCounts.ssh)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("s")
    expect(userCompactStatisticsGradeCounts.s)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("sh")
    expect(userCompactStatisticsGradeCounts.sh)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    checkedKeys.push("a")
    expect(userCompactStatisticsGradeCounts.a)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(
        userCompactStatisticsGradeCounts,
        checkedKeys,
    )
}

export const checkUserAchievementObject = (
    userAchievement: Readonly<UserAchievement>,
): void => {
    expect(userAchievement).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("achieved_at")
    expect(userAchievement.achieved_at)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("achievement_id")
    expect(userAchievement.achievement_id)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    genericCheckObjectForUncheckedKeys(userAchievement, checkedKeys)
}

export const checkUserBadgeObject = (userBadge: Readonly<UserBadge>): void => {
    const objectInfo = () => `UserBadge: ${JSON.stringify(userBadge)}`
    expect(userBadge).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("awarded_at")
    expect(userBadge.awarded_at)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0, objectInfo())

    checkedKeys.push("description")
    expect(userBadge.description)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0, objectInfo())

    checkedKeys.push("image_url")
    expect(userBadge.image_url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0, objectInfo())

    checkedKeys.push("url")
    expect(userBadge.url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThanOrEqual(0, objectInfo())

    genericCheckObjectForUncheckedKeys(userBadge, checkedKeys)
}

export const checkUserGroupObject = (userGroup: Readonly<UserGroup>): void => {
    const objectInfo = () => `UserGroup: ${JSON.stringify(userGroup)}`
    expect(userGroup).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (userGroup.colour !== undefined) {
        checkedKeys.push("colour")
        expect(userGroup.colour)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0, objectInfo())
    }

    if (userGroup.description !== undefined) {
        checkedKeys.push("description")
        expect(userGroup.description).to.be.an("object")
        expect(userGroup.description.html)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0, objectInfo())
        expect(userGroup.description.markdown)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0, objectInfo())
    }

    checkedKeys.push("has_listing")
    expect(userGroup.has_listing).to.be.a("boolean")

    checkedKeys.push("has_playmodes")
    expect(userGroup.has_playmodes).to.be.a("boolean")
    if (userGroup.has_playmodes) {
        expect(userGroup.playmodes)
            .to.be.an("array")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("id")
    expect(userGroup.id).to.be.a("number").greaterThanOrEqual(0, objectInfo())

    checkedKeys.push("identifier")
    expect(userGroup.identifier)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0, objectInfo())

    checkedKeys.push("is_probationary")
    expect(userGroup.is_probationary).to.be.a("boolean")

    checkedKeys.push("name")
    expect(userGroup.name)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0, objectInfo())

    if (userGroup.has_playmodes !== undefined) {
        checkedKeys.push("playmodes")
        expect(userGroup.playmodes).to.be.an("array")
        if (Array.isArray(userGroup.playmodes)) {
            for (const element of userGroup.playmodes) {
                expect(Object.values(GameMode)).includes(element)
            }
            if (userGroup.playmodes.length > 0) {
                expect(userGroup.has_playmodes).to.be.equal(true)
            }
        }
    }

    checkedKeys.push("short_name")
    expect(userGroup.short_name)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0, objectInfo())

    genericCheckObjectForUncheckedKeys(userGroup, checkedKeys)
}

export const checkUserObjectEndpointGet = (
    user: Readonly<UserEndpointGet>,
): void => {
    expect(user.account_history).to.not.be.undefined
    expect(user.active_tournament_banner).to.not.be.undefined
    expect(user.badges).to.not.be.undefined
    expect(user.beatmap_playcounts_count).to.not.be.undefined
    expect(user.comments_count).to.not.be.undefined
    expect(user.discord).to.not.be.undefined
    expect(user.favourite_beatmapset_count).to.not.be.undefined
    expect(user.follower_count).to.not.be.undefined
    expect(user.graveyard_beatmapset_count).to.not.be.undefined
    expect(user.groups).to.not.be.undefined
    expect(user.guest_beatmapset_count).to.not.be.undefined
    expect(user.interests).to.not.be.undefined
    expect(user.last_visit).to.not.be.undefined
    expect(user.location).to.not.be.undefined
    expect(user.loved_beatmapset_count).to.not.be.undefined
    expect(user.mapping_follower_count).to.not.be.undefined
    expect(user.monthly_playcounts).to.not.be.undefined
    expect(user.occupation).to.not.be.undefined
    expect(user.page).to.not.be.undefined
    expect(user.pending_beatmapset_count).to.not.be.undefined
    expect(user.previous_usernames).to.not.be.undefined
    expect(user.profile_colour).to.not.be.undefined
    expect(user.rank_history).to.not.be.undefined
    expect(user.ranked_beatmapset_count).to.not.be.undefined
    expect(user.replays_watched_counts).to.not.be.undefined
    expect(user.scores_best_count).to.not.be.undefined
    expect(user.scores_first_count).to.not.be.undefined
    expect(user.scores_pinned_count).to.not.be.undefined
    expect(user.scores_recent_count).to.not.be.undefined
    expect(user.statistics).to.not.be.undefined
    expect(user.support_level).to.not.be.undefined
    expect(user.title).to.not.be.undefined
    expect(user.title_url).to.not.be.undefined
    expect(user.twitter).to.not.be.undefined
    expect(user.user_achievements).to.not.be.undefined
    expect(user.website).to.not.be.undefined
}

export const checkUserCompactObjectEndpointSearchUser = (
    user: Readonly<UserEndpointSearchUser>,
): void => {
    expect(user.last_visit).to.not.be.undefined
    expect(user.profile_colour).to.not.be.undefined
}

export const checkUserObjectEndpointMe = (
    user: Readonly<UserEndpointMe>,
): void => {
    checkUserObjectEndpointGet(user)

    expect(user.is_restricted).to.not.be.undefined
    expect(user.statistics_rulesets).to.not.be.undefined
}

export enum CheckUserObjectEndpointUsers {
    GET = "GET",
    ME = "ME",
}

export enum CheckUserObjectEndpointSearch {
    USER = "USER",
}

export interface CheckUserObjectOptions extends CheckUserCompactObjectOptions {
    endpointUsers?: CheckUserObjectEndpointUsers
    playmode?: GameMode
}

export interface CheckUserCompactObjectOptions
    extends DefaultCheckResponseOptions {
    endpointSearch?: CheckUserObjectEndpointSearch
    hasIsRestricted?: boolean
    noPage?: boolean
    noSupporter?: boolean
    restricted?: boolean
    statisticsGameMode?: GameMode
    userId?: number
    userName?: string
}

export const checkUserObject = (
    user: Readonly<User>,
    options?: Readonly<CheckUserObjectOptions>,
): readonly string[] => {
    expect(user).to.be.an("object")

    const alreadyCheckedKeys = checkUserCompactObject(user, {
        ...options,
        doNotCheckForUncheckedKeys: true,
    })

    expect(user.country).to.not.be.undefined
    expect(user.cover).to.not.be.undefined

    // List of all keys that will be checked
    const checkedKeys = [...alreadyCheckedKeys]

    if (user.discord !== null) {
        checkedKeys.push("discord")
        expect(user.discord).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("discord")
        expect(user.discord).to.be.null
    }

    checkedKeys.push("has_supported")
    expect(user.has_supported).to.be.a("boolean")

    if (user.interests !== null) {
        checkedKeys.push("interests")
        expect(user.interests).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("interests")
        expect(user.interests).to.be.null
    }

    checkedKeys.push("join_date")
    expect(user.join_date).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("kudosu")
    checkUserCompactKusodoObject(user.kudosu)

    if (user.location !== null) {
        checkedKeys.push("location")
        expect(user.location).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("location")
        expect(user.location).to.be.null
    }

    checkedKeys.push("max_blocks")
    expect(user.max_blocks).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("max_friends")
    expect(user.max_friends).to.be.a("number").greaterThanOrEqual(0)

    if (user.occupation !== null) {
        checkedKeys.push("occupation")
        expect(user.occupation).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("occupation")
        expect(user.occupation).to.be.null
    }

    checkedKeys.push("playmode")
    expect(Object.values(GameMode)).includes(user.playmode)
    if (options?.playmode) {
        expect(user.playmode).equals(options.playmode)
    }

    if (user.playstyle !== null) {
        checkedKeys.push("playstyle")
        expect(user.playstyle).to.be.an("array")
        for (const element of user.playstyle) {
            expect(Object.values(Playstyle)).includes(element)
        }
    } else {
        checkedKeys.push("playstyle")
        expect(user.playstyle).to.be.null
    }

    checkedKeys.push("post_count")
    expect(user.post_count).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("profile_order")
    expect(user.profile_order).to.be.a("array")
    for (const element of user.profile_order) {
        expect(Object.values(ProfilePage)).includes(element)
    }

    if (user.title !== null) {
        checkedKeys.push("title")
        expect(user.title).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("title")
        expect(user.title).to.be.null
    }

    if (user.title_url !== null) {
        checkedKeys.push("title_url")
        expect(user.title_url).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("title_url")
        expect(user.title_url).to.be.null
    }

    if (user.twitter !== null) {
        checkedKeys.push("twitter")
        expect(user.twitter).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("twitter")
        expect(user.twitter).to.be.null
    }

    if (user.variants !== undefined) {
        checkedKeys.push("variants")
        expect(user.variants).to.be.an("array")
        for (const element of user.variants) {
            checkUserGameModeVariantObject(element)
        }
    }

    if (user.website !== null) {
        checkedKeys.push("website")
        expect(user.website).to.be.a("string").with.a.lengthOf.greaterThan(0)
    } else {
        checkedKeys.push("website")
        expect(user.website).to.be.null
    }

    if (options?.endpointUsers) {
        switch (options.endpointUsers) {
            case CheckUserObjectEndpointUsers.GET:
                checkUserObjectEndpointGet(user as UserEndpointGet)
                break
            case CheckUserObjectEndpointUsers.ME:
                checkUserObjectEndpointMe(user as UserEndpointMe)
                break
        }
    }

    return genericCheckObjectForUncheckedKeys(user, checkedKeys, options)
}

export const checkUserCompactObject = (
    user: Readonly<UserCompact>,
    options?: Readonly<CheckUserCompactObjectOptions>,
): readonly string[] => {
    expect(user).to.be.an("object")

    // List of all keys that will be checked
    const deprecatedKeys = [
        "rankHistory",
        "cover_url",
        "ranked_and_approved_beatmapset_count",
        "unranked_beatmapset_count",
    ]
    const checkedKeys = [...deprecatedKeys]

    if (user.account_history !== undefined) {
        checkedKeys.push("account_history")
        expect(user.account_history).to.be.an("array")
        for (const element of user.account_history) {
            expect.fail(
                `Found undocumented type 'account_history'[]: '${JSON.stringify(
                    element,
                )}'`,
            )
        }
    }

    if (user.active_tournament_banner !== undefined) {
        if (user.active_tournament_banner !== null) {
            checkedKeys.push("active_tournament_banner")
            expect.fail(
                `Found undocumented type 'active_tournament_banner': '${JSON.stringify(
                    user.active_tournament_banner,
                )}'`,
            )
        } else {
            checkedKeys.push("active_tournament_banner")
            expect(user.active_tournament_banner).to.be.null
        }
    }

    checkedKeys.push("avatar_url")
    expect(user.avatar_url).to.be.a("string").with.a.lengthOf.greaterThan(0)

    if (user.badges !== undefined) {
        checkedKeys.push("badges")
        expect(user.badges).to.be.an("array")
        for (const element of user.badges) {
            checkUserBadgeObject(element)
        }
    }

    if (user.beatmap_playcounts_count !== undefined) {
        checkedKeys.push("beatmap_playcounts_count")
        expect(user.beatmap_playcounts_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (user.blocks !== undefined) {
        checkedKeys.push("blocks")
        expect.fail(
            `Found undocumented type 'blocks': '${JSON.stringify(
                user.blocks,
            )}'`,
        )
    }

    if (user.comments_count !== undefined) {
        checkedKeys.push("comments_count")
        expect(user.comments_count).to.be.a("number").greaterThanOrEqual(0)
    }

    if (user.country !== undefined) {
        checkedKeys.push("comments_count")
        checkedKeys.push("country")
        expect(user.country).to.be.an("object")
        expect(user.country.code)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
        expect(user.country.name)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("country_code")
    expect(user.country_code).to.be.a("string").with.a.lengthOf.greaterThan(0)

    if (user.cover !== undefined) {
        checkedKeys.push("cover")
        checkUserCompactCoverObject(user.cover)
    }

    checkedKeys.push("default_group")
    expect(user.default_group).to.be.a("string").with.a.lengthOf.greaterThan(0)

    if (user.favourite_beatmapset_count !== undefined) {
        checkedKeys.push("favourite_beatmapset_count")
        expect(user.favourite_beatmapset_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (user.follower_count !== undefined) {
        checkedKeys.push("follower_count")
        expect(user.follower_count).to.be.a("number").greaterThanOrEqual(0)
    }

    if (user.friends !== undefined) {
        checkedKeys.push("friends")
        expect.fail(
            `Found undocumented type 'friends': '${JSON.stringify(
                user.friends,
            )}'`,
        )
    }

    if (user.graveyard_beatmapset_count !== undefined) {
        checkedKeys.push("graveyard_beatmapset_count")
        expect(user.graveyard_beatmapset_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (user.groups !== undefined) {
        checkedKeys.push("groups")
        expect(user.groups).to.be.an("array")
        for (const element of user.groups) {
            checkUserGroupObject(element)
        }
    }

    if (user.guest_beatmapset_count !== undefined) {
        checkedKeys.push("guest_beatmapset_count")
        expect(user.guest_beatmapset_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    checkedKeys.push("id")
    expect(user.id).to.be.a("number").greaterThanOrEqual(0)
    if (options?.userId) {
        expect(user.id).to.equal(options?.userId, "userId does not match")
    }

    checkedKeys.push("is_active")
    expect(user.is_active).to.be.a("boolean")

    checkedKeys.push("is_bot")
    expect(user.is_bot).to.be.a("boolean")

    checkedKeys.push("is_deleted")
    expect(user.is_deleted).to.be.a("boolean")

    checkedKeys.push("is_online")
    expect(user.is_online).to.be.a("boolean")

    if (user.is_restricted !== undefined) {
        checkedKeys.push("is_restricted")
        expect(user.is_restricted).to.be.a("boolean")
    }
    if (options?.hasIsRestricted) {
        expect(user.is_restricted).to.be.a("boolean")
    }
    if (options?.restricted) {
        expect(user.is_restricted).to.equal(options?.restricted)
    }

    checkedKeys.push("is_supporter")
    expect(user.is_supporter).to.be.a("boolean")
    if (options?.noSupporter) {
        expect(user.is_supporter).to.be.equal(false)
    }

    if (user.last_visit !== undefined) {
        if (user.last_visit !== null) {
            checkedKeys.push("last_visit")
            expect(user.last_visit)
                .to.be.a("string")
                .with.a.lengthOf.greaterThan(0)
        } else {
            checkedKeys.push("last_visit")
            expect(user.last_visit).to.be.null
        }
    }

    if (user.loved_beatmapset_count !== undefined) {
        checkedKeys.push("loved_beatmapset_count")
        expect(user.loved_beatmapset_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (user.mapping_follower_count !== undefined) {
        checkedKeys.push("mapping_follower_count")
        expect(user.mapping_follower_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (user.monthly_playcounts !== undefined) {
        checkedKeys.push("monthly_playcounts")
        expect(user.monthly_playcounts).to.be.an("array")
        for (const element of user.monthly_playcounts) {
            checkUserMonthlyPlaycountOrReplaysWatchedCountObject(element)
        }
    }

    if (user.page !== undefined) {
        checkedKeys.push("page")
        checkUserCompactPageObject(user.page)
    }
    if (options?.noPage) {
        expect(user.page).to.be.not.undefined
        expect(user.page?.html).to.be.equal("")
        expect(user.page?.raw).to.be.equal("")
    }

    if (user.pending_beatmapset_count !== undefined) {
        checkedKeys.push("pending_beatmapset_count")
        expect(user.pending_beatmapset_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    checkedKeys.push("pm_friends_only")
    expect(user.pm_friends_only).to.be.a("boolean")

    if (user.previous_usernames !== undefined) {
        checkedKeys.push("previous_usernames")
        expect(user.previous_usernames).to.be.an("array")
        for (const element of user.previous_usernames) {
            expect(element).to.be.a("string").with.a.lengthOf.greaterThan(0)
        }
    }

    if (user.profile_colour !== undefined) {
        if (user.profile_colour !== null) {
            checkedKeys.push("profile_colour")
            expect(user.profile_colour)
                .to.be.a("string")
                .with.a.lengthOf.greaterThan(0)
        } else {
            checkedKeys.push("profile_colour")
            expect(user.profile_colour).to.be.null
        }
    }

    if (user.rank_history !== undefined) {
        checkedKeys.push("rank_history")
        checkUserRankHistoryObject(user.rank_history)
    }
    if (options?.statisticsGameMode) {
        expect(user.rank_history?.mode).to.equal(
            options?.statisticsGameMode,
            "rank history mode does not match",
        )
    }

    if (user.ranked_beatmapset_count !== undefined) {
        checkedKeys.push("ranked_beatmapset_count")
        expect(user.ranked_beatmapset_count)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (user.replays_watched_counts !== undefined) {
        checkedKeys.push("replays_watched_counts")
        expect(user.replays_watched_counts).to.be.an("array")
        for (const element of user.replays_watched_counts) {
            checkUserMonthlyPlaycountOrReplaysWatchedCountObject(element)
        }
    }

    if (user.scores_best_count !== undefined) {
        checkedKeys.push("scores_best_count")
        expect(user.scores_best_count).to.be.a("number").greaterThanOrEqual(0)
    }

    if (user.scores_first_count !== undefined) {
        checkedKeys.push("scores_first_count")
        expect(user.scores_first_count).to.be.a("number").greaterThanOrEqual(0)
    }

    if (user.scores_pinned_count !== undefined) {
        checkedKeys.push("scores_pinned_count")
        expect(user.scores_pinned_count).to.be.a("number").greaterThanOrEqual(0)
    }

    if (user.scores_recent_count !== undefined) {
        checkedKeys.push("scores_recent_count")
        expect(user.scores_recent_count).to.be.a("number").greaterThanOrEqual(0)
    }

    if (user.statistics !== undefined) {
        checkedKeys.push("statistics")
        checkUserStatisticsObject(user.statistics)
    }

    if (user.statistics_rulesets !== undefined) {
        checkedKeys.push("statistics_rulesets")
        checkUserStatisticsRulesetsObject(user.statistics_rulesets)
    }

    if (user.support_level !== undefined) {
        checkedKeys.push("support_level")
        expect(user.support_level).to.be.a("number").greaterThanOrEqual(0)
    }

    checkedKeys.push("username")
    expect(user.username).to.be.a("string").with.a.lengthOf.greaterThan(0)
    if (options?.userName) {
        expect(user.username).to.equal(
            options?.userName,
            "userName does not match",
        )
    }

    if (user.user_achievements !== undefined) {
        checkedKeys.push("user_achievements")
        expect(user.user_achievements).to.be.an("array")
        for (const element of user.user_achievements) {
            checkUserAchievementObject(element)
        }
    }

    if (user.user_preferences !== undefined) {
        checkedKeys.push("user_preferences")
        expect.fail(
            `Found undocumented type 'user_preferences': '${JSON.stringify(
                user.user_preferences,
            )}'`,
        )
    }

    if (options?.endpointSearch) {
        switch (options.endpointSearch) {
            case CheckUserObjectEndpointSearch.USER:
                checkUserCompactObjectEndpointSearchUser(
                    user as UserEndpointSearchUser,
                )
                break
        }
    }

    return genericCheckObjectForUncheckedKeys(user, checkedKeys, options)
}
