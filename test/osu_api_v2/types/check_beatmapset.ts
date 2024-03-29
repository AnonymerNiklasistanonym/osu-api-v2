// Package imports
import { expect } from "chai"
// Local imports
import {
    BeatmapsetDescription,
    BeatmapsetGenre,
    BeatmapsetLanguage,
    BeatmapsetNominationsSummary,
    Covers,
    GameMode,
    RankStatusInt,
} from "../../../src"
import { checkBeatmapObject } from "./check_beatmap"
import { checkUserCompactObject } from "./check_user"
import { genericCheckObjectForUncheckedKeys } from "./check_generic"
// Type imports
import type {
    Beatmapset,
    BeatmapsetAvailability,
    BeatmapsetCompact,
    BeatmapsetHype,
} from "../../../src"
import { DefaultCheckResponseOptions } from "../../test_helper"

export const checkCoversObject = (
    covers: Readonly<Covers>,
): readonly string[] => {
    expect(covers).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("card")
    expect(covers.card).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("card@2x")
    expect(covers["card@2x"]).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("cover")
    expect(covers.cover).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("cover@2x")
    expect(covers["cover@2x"]).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("list")
    expect(covers.list).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("list@2x")
    expect(covers["list@2x"]).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("slimcover")
    expect(covers.slimcover).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("slimcover@2x")
    expect(covers["slimcover@2x"])
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    return genericCheckObjectForUncheckedKeys(covers, checkedKeys)
}

export const checkBeatmapsetAvailabilityObject = (
    beatmapsetAvailability: Readonly<BeatmapsetAvailability>,
): readonly string[] => {
    expect(beatmapsetAvailability).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("download_disabled")
    expect(beatmapsetAvailability.download_disabled).to.be.a("boolean")

    if (beatmapsetAvailability.more_information !== undefined) {
        if (beatmapsetAvailability.more_information !== null) {
            checkedKeys.push("more_information")
            expect(beatmapsetAvailability.more_information)
                .to.be.a("string")
                .with.a.lengthOf.greaterThan(0)
        } else {
            checkedKeys.push("more_information")
            expect(beatmapsetAvailability.more_information).to.be.null
        }
    }

    return genericCheckObjectForUncheckedKeys(
        beatmapsetAvailability,
        checkedKeys,
    )
}

export const checkBeatmapsetHypeObject = (
    beatmapsetHype: Readonly<BeatmapsetHype>,
): readonly string[] => {
    expect(beatmapsetHype).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (beatmapsetHype.current !== undefined) {
        checkedKeys.push("current")
        expect(beatmapsetHype.current).to.be.a("number").greaterThanOrEqual(0)
    }

    if (beatmapsetHype.required !== undefined) {
        checkedKeys.push("required")
        expect(beatmapsetHype.required).to.be.a("number").greaterThanOrEqual(0)
    }

    return genericCheckObjectForUncheckedKeys(beatmapsetHype, checkedKeys)
}

export const checkBeatmapsetNominationsSummaryObject = (
    beatmapsetNominationsSummary: Readonly<BeatmapsetNominationsSummary>,
): readonly string[] => {
    expect(beatmapsetNominationsSummary).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    if (beatmapsetNominationsSummary.current !== undefined) {
        checkedKeys.push("current")
        expect(beatmapsetNominationsSummary.current)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    if (beatmapsetNominationsSummary.required !== undefined) {
        checkedKeys.push("required")
        expect(beatmapsetNominationsSummary.required)
            .to.be.a("number")
            .greaterThanOrEqual(0)
    }

    return genericCheckObjectForUncheckedKeys(
        beatmapsetNominationsSummary,
        checkedKeys,
    )
}

export const checkBeatmapsetDescriptionObject = (
    beatmapsetDescription: Readonly<BeatmapsetDescription>,
): readonly string[] => {
    expect(beatmapsetDescription).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("description")
    expect(beatmapsetDescription.description)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    return genericCheckObjectForUncheckedKeys(
        beatmapsetDescription,
        checkedKeys,
    )
}

export const checkBeatmapsetGenreObject = (
    beatmapsetGenre: Readonly<BeatmapsetGenre>,
): readonly string[] => {
    expect(beatmapsetGenre).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("id")
    expect(beatmapsetGenre.id).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("name")
    expect(beatmapsetGenre.name)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    return genericCheckObjectForUncheckedKeys(beatmapsetGenre, checkedKeys)
}

export const checkBeatmapsetLanguageObject = (
    beatmapsetLanguage: Readonly<BeatmapsetLanguage>,
): readonly string[] => {
    expect(beatmapsetLanguage).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("id")
    expect(beatmapsetLanguage.id).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("name")
    expect(beatmapsetLanguage.name)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    return genericCheckObjectForUncheckedKeys(beatmapsetLanguage, checkedKeys)
}

export interface CheckBeatmapsetObjectOptions
    extends CheckBeatmapsetCompactObjectOptions {
    isNotARefreshToken?: boolean
}
export interface CheckBeatmapsetCompactObjectOptions
    extends DefaultCheckResponseOptions {
    gameMode?: GameMode
    id?: number
    rankStatus?: RankStatusInt
}

export const checkBeatmapsetCompactObject = (
    beatmapsetCompact: Readonly<BeatmapsetCompact>,
    options?: Readonly<CheckBeatmapsetCompactObjectOptions>,
): readonly string[] => {
    expect(beatmapsetCompact).to.be.an("object")

    // List of all keys that will be checked
    const checkedKeys: string[] = []

    checkedKeys.push("artist")
    expect(beatmapsetCompact.artist)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("artist_unicode")
    expect(beatmapsetCompact.artist_unicode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    if (beatmapsetCompact.beatmaps !== undefined) {
        checkedKeys.push("beatmaps")
        expect(beatmapsetCompact.beatmaps).to.be.an("array")
        for (const element of beatmapsetCompact.beatmaps) {
            checkBeatmapObject(element)
        }
    }

    if (beatmapsetCompact.converts !== undefined) {
        checkedKeys.push("converts")
        expect(beatmapsetCompact.converts).to.be.an("array")
        for (const element of beatmapsetCompact.converts) {
            checkBeatmapObject(element)
        }
    }

    checkedKeys.push("covers")
    checkCoversObject(beatmapsetCompact.covers)

    checkedKeys.push("creator")
    expect(beatmapsetCompact.creator)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    if (beatmapsetCompact.current_user_attributes !== undefined) {
        checkedKeys.push("current_user_attributes")
        expect.fail(
            `Unexpected type 'current_user_attributes': ${JSON.stringify(
                beatmapsetCompact.current_user_attributes,
            )}`,
        )
    }

    if (beatmapsetCompact.description !== undefined) {
        checkedKeys.push("description")
        checkBeatmapsetDescriptionObject(beatmapsetCompact.description)
    }

    if (beatmapsetCompact.discussions !== undefined) {
        checkedKeys.push("discussions")
        expect.fail(
            `Unexpected type 'discussions': ${JSON.stringify(
                beatmapsetCompact.discussions,
            )}`,
        )
    }

    if (beatmapsetCompact.events !== undefined) {
        checkedKeys.push("events")
        expect.fail(
            `Unexpected type 'events': ${JSON.stringify(
                beatmapsetCompact.events,
            )}`,
        )
    }

    checkedKeys.push("favourite_count")
    expect(beatmapsetCompact.favourite_count)
        .to.be.a("number")
        .greaterThanOrEqual(0)

    if (beatmapsetCompact.genre !== undefined) {
        checkedKeys.push("genre")
        checkBeatmapsetGenreObject(beatmapsetCompact.genre)
    }

    if (beatmapsetCompact.has_favourited !== undefined) {
        checkedKeys.push("has_favourited")
        expect(beatmapsetCompact.has_favourited).to.be.a("boolean")
    }

    if (beatmapsetCompact.hype !== null) {
        checkedKeys.push("hype")
        checkBeatmapsetHypeObject(beatmapsetCompact.hype)
    } else {
        checkedKeys.push("hype")
        expect(beatmapsetCompact.hype).to.be.null
    }

    checkedKeys.push("id")
    expect(beatmapsetCompact.id).to.be.a("number").greaterThanOrEqual(0)
    if (options?.id) {
        expect(beatmapsetCompact.id).to.equal(options?.id)
    }

    if (beatmapsetCompact.language !== undefined) {
        checkedKeys.push("language")
        checkBeatmapsetGenreObject(beatmapsetCompact.language)
    }

    if (beatmapsetCompact.nominations !== undefined) {
        checkedKeys.push("nominations")
        expect.fail(
            `Unexpected type 'nominations': ${JSON.stringify(
                beatmapsetCompact.nominations,
            )}`,
        )
    }

    checkedKeys.push("nsfw")
    expect(beatmapsetCompact.nsfw).to.be.a("boolean")

    checkedKeys.push("offset")
    expect(beatmapsetCompact.offset).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("play_count")
    expect(beatmapsetCompact.play_count).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("preview_url")
    expect(beatmapsetCompact.preview_url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    if (beatmapsetCompact.ratings !== undefined) {
        checkedKeys.push("ratings")
        expect(beatmapsetCompact.ratings).to.be.an("array")
        for (const element of beatmapsetCompact.ratings) {
            expect(element).to.be.a("number").greaterThanOrEqual(0)
        }
    }

    if (beatmapsetCompact.recent_favourites !== undefined) {
        checkedKeys.push("recent_favourites")
        expect(beatmapsetCompact.recent_favourites).to.be.an("array")
        for (const element of beatmapsetCompact.recent_favourites) {
            checkUserCompactObject(element)
        }
    }

    if (beatmapsetCompact.related_users !== undefined) {
        checkedKeys.push("related_users")
        expect.fail(
            `Unexpected type 'related_users': ${JSON.stringify(
                beatmapsetCompact.related_users,
            )}`,
        )
    }

    checkedKeys.push("spotlight")
    expect(beatmapsetCompact.spotlight).to.be.a("boolean")

    checkedKeys.push("source")
    expect(beatmapsetCompact.source)
        .to.be.a("string")
        .with.a.lengthOf.greaterThanOrEqual(0)

    checkedKeys.push("status")
    expect(beatmapsetCompact.status)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("title")
    expect(beatmapsetCompact.title)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    checkedKeys.push("title_unicode")
    expect(beatmapsetCompact.title_unicode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    if (beatmapsetCompact.track_id !== undefined) {
        if (beatmapsetCompact.track_id !== null) {
            checkedKeys.push("track_id")
            expect(beatmapsetCompact.track_id)
                .to.be.a("number")
                .greaterThanOrEqual(0)
        } else {
            checkedKeys.push("track_id")
            expect(beatmapsetCompact.track_id).to.be.null
        }
    }

    if (beatmapsetCompact.user !== undefined) {
        checkedKeys.push("user")
        checkUserCompactObject(beatmapsetCompact.user)
    }

    checkedKeys.push("user_id")
    expect(beatmapsetCompact.user_id).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("video")
    expect(beatmapsetCompact.video).to.be.a("boolean")

    return genericCheckObjectForUncheckedKeys(
        beatmapsetCompact,
        checkedKeys,
        options,
    )
}

export const checkBeatmapsetObject = (
    beatmapset: Readonly<Beatmapset>,
    options?: Readonly<CheckBeatmapsetObjectOptions>,
): readonly string[] => {
    expect(beatmapset).to.be.an("object")

    const alreadyCheckedKeys = checkBeatmapsetCompactObject(beatmapset, {
        ...options,
        doNotCheckForUncheckedKeys: true,
    })

    // Bad documentation
    //expect(beatmapset.has_favourited).to.not.be.undefined

    // List of all keys that will be checked
    const checkedKeys = [...alreadyCheckedKeys]

    checkedKeys.push("availability")
    checkBeatmapsetAvailabilityObject(beatmapset.availability)

    checkedKeys.push("bpm")
    expect(beatmapset.bpm).to.be.a("number").greaterThanOrEqual(0)

    checkedKeys.push("can_be_hyped")
    expect(beatmapset.can_be_hyped).to.be.a("boolean")

    checkedKeys.push("creator")
    expect(beatmapset.creator).to.be.a("string").with.a.lengthOf.greaterThan(0)

    checkedKeys.push("discussion_enabled")
    expect(beatmapset.discussion_enabled).to.be.a("boolean")

    checkedKeys.push("discussion_locked")
    expect(beatmapset.discussion_locked).to.be.a("boolean")

    // Bad documentation
    //checkedKeys.push("has_favourited")
    //expect(beatmapset.has_favourited).to.be.a("boolean")

    checkedKeys.push("is_scoreable")
    expect(beatmapset.is_scoreable).to.be.a("boolean")

    checkedKeys.push("last_updated")
    expect(beatmapset.last_updated)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)

    if (beatmapset.legacy_thread_url !== undefined) {
        checkedKeys.push("legacy_thread_url")
        expect(beatmapset.legacy_thread_url)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("nominations_summary")
    checkBeatmapsetNominationsSummaryObject(beatmapset.nominations_summary)

    if (beatmapset.ranked !== undefined) {
        checkedKeys.push("ranked")
        expect(Object.values(RankStatusInt)).includes(beatmapset.ranked)
    }
    if (options?.rankStatus) {
        expect(beatmapset.ranked).to.be.equal(options?.rankStatus)
    }

    if (beatmapset.ranked_date !== undefined) {
        if (beatmapset.ranked_date !== null) {
            checkedKeys.push("ranked_date")
            expect(beatmapset.ranked_date)
                .to.be.a("string")
                .with.a.lengthOf.greaterThan(0)
        } else {
            checkedKeys.push("ranked_date")
            expect(beatmapset.ranked_date).to.be.null
        }
    }

    checkedKeys.push("storyboard")
    expect(beatmapset.storyboard).to.be.a("boolean")

    if (beatmapset.submitted_date !== undefined) {
        checkedKeys.push("submitted_date")
        expect(beatmapset.submitted_date)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }

    checkedKeys.push("tags")
    expect(beatmapset.tags)
        .to.be.a("string")
        .with.a.lengthOf.greaterThanOrEqual(0)

    return genericCheckObjectForUncheckedKeys(beatmapset, checkedKeys, options)
}
