// Package imports
import { expect } from "chai"
// Local imports
import { checkBeatmapObject } from "./check_beatmap"
import { saveOsuResponseObjectAsFile } from "../../../helper.test"
// Type imports
import type {
    Beatmapset,
    BeatmapsetCompactAvailability,
    BeatmapsetCompactHype,
    BeatmapsetCompactNominationsSummary,
    Covers,
} from "../../../../src/index"

export const checkBeatmapsetAvailabilityObject = (
    beatmapsetAvailability: BeatmapsetCompactAvailability,
): void => {
    expect(beatmapsetAvailability).to.be.an("object")
    expect(beatmapsetAvailability.download_disabled).to.be.a("boolean")
    if (
        beatmapsetAvailability.more_information !== undefined &&
        beatmapsetAvailability.more_information != null
    ) {
        expect(beatmapsetAvailability.more_information)
            .to.be.a("string")
            .with.a.lengthOf.greaterThanOrEqual(0)
    }
}

export interface CheckBeatmapSetObjectOptions {
    checkBeatmapsetId?: number
}

export const checkBeatmapsetCoversObject = (beatmapsetcovers: Covers): void => {
    expect(beatmapsetcovers).to.be.an("object")
    expect(beatmapsetcovers.card)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers["card@2x"])
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers.cover)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers["cover@2x"])
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers.list)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers["list@2x"])
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers.slimcover)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapsetcovers["slimcover@2x"])
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
}

export const checkBeatmapsetHypeObject = (
    beatmapsetHype: BeatmapsetCompactHype,
): void => {
    expect(beatmapsetHype).to.be.an("object")
    if (beatmapsetHype.current !== undefined) {
        expect(beatmapsetHype.current).to.be.a("number")
    }
    if (beatmapsetHype.required !== undefined) {
        expect(beatmapsetHype.required).to.be.a("number")
    }
}

export const checkBeatmapsetNominationssummaryObject = (
    beatmapsetNominationssummary: BeatmapsetCompactNominationsSummary,
): void => {
    expect(beatmapsetNominationssummary).to.be.an("object")
    if (beatmapsetNominationssummary.current !== undefined) {
        expect(beatmapsetNominationssummary.current).to.be.a("number")
    }
    if (beatmapsetNominationssummary.required !== undefined) {
        expect(beatmapsetNominationssummary.required).to.be.a("number")
    }
}

export const checkBeatmapsetObject = async (
    beatmapset: Beatmapset,
    options: CheckBeatmapSetObjectOptions = {},
): Promise<void> => {
    await saveOsuResponseObjectAsFile(
        `beatmapset_${beatmapset?.id}`,
        beatmapset,
    )
    expect(beatmapset.artist).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmapset.artist_unicode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    checkBeatmapsetAvailabilityObject(beatmapset.availability)
    expect(beatmapset.bpm).to.be.a("number").greaterThan(0)
    if (beatmapset.beatmaps !== undefined) {
        expect(beatmapset.beatmaps).to.be.an("array")
        for (const beatmap of beatmapset.beatmaps) {
            await checkBeatmapObject(beatmap, {
                checkBeatmapsetId: options.checkBeatmapsetId,
            })
        }
    }
    if (beatmapset.converts !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'converts': ${JSON.stringify(
                beatmapset.converts,
            )}`,
        )
    }
    if (beatmapset.current_user_attributes !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'current_user_attributes': ${JSON.stringify(
                beatmapset.current_user_attributes,
            )}`,
        )
    }
    if (beatmapset.description !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'description': ${JSON.stringify(
                beatmapset.description,
            )}`,
        )
    }
    if (beatmapset.discussions !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'discussions': ${JSON.stringify(
                beatmapset.discussions,
            )}`,
        )
    }
    if (beatmapset.events !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'events': ${JSON.stringify(
                beatmapset.events,
            )}`,
        )
    }
    if (beatmapset.genre !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'genre': ${JSON.stringify(
                beatmapset.genre,
            )}`,
        )
    }
    if (beatmapset.language !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'language': ${JSON.stringify(
                beatmapset.language,
            )}`,
        )
    }
    if (beatmapset.nominations !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'nominations': ${JSON.stringify(
                beatmapset.nominations,
            )}`,
        )
    }
    if (beatmapset.ratings !== undefined) {
        expect(beatmapset.ratings).to.be.an("array")
        for (const beatmapRating of beatmapset.ratings) {
            expect(beatmapRating).to.be.a("number").greaterThanOrEqual(0)
        }
    }
    if (beatmapset.recent_favourites !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'recent_favourites': ${JSON.stringify(
                beatmapset.recent_favourites,
            )}`,
        )
    }
    if (beatmapset.related_users !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'related_users': ${JSON.stringify(
                beatmapset.related_users,
            )}`,
        )
    }
    if (beatmapset.user !== undefined) {
        // TODO: unknown
        throw Error(
            `Unexpected value for unknown property 'user': ${JSON.stringify(
                beatmapset.user,
            )}`,
        )
    }
    expect(beatmapset.can_be_hyped).to.be.a("boolean")
    checkBeatmapsetCoversObject(beatmapset.covers)
    expect(beatmapset.creator).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmapset.discussion_enabled).to.be.a("boolean")
    expect(beatmapset.discussion_locked).to.be.a("boolean")
    expect(beatmapset.favourite_count).to.be.a("number").greaterThanOrEqual(0)
    if (beatmapset.hype != null) {
        checkBeatmapsetHypeObject(beatmapset.hype)
    }
    expect(beatmapset.id).to.be.a("number").greaterThan(0)
    if (options.checkBeatmapsetId) {
        expect(beatmapset.id).to.be.equal(options.checkBeatmapsetId)
    }
    expect(beatmapset.is_scoreable).to.be.a("boolean")
    expect(beatmapset.last_updated)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    if (beatmapset.legacy_thread_url !== undefined) {
        expect(beatmapset.legacy_thread_url)
            .to.be.a("string")
            .with.a.lengthOf.greaterThan(0)
    }
    if (beatmapset.nominations_summary !== undefined) {
        checkBeatmapsetNominationssummaryObject(beatmapset.nominations_summary)
    }
    expect(beatmapset.nsfw).to.be.a("boolean")
    expect(beatmapset.play_count).to.be.a("number").greaterThanOrEqual(0)
    expect(beatmapset.preview_url)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapset.status).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmapset.title).to.be.a("string").with.a.lengthOf.greaterThan(0)
    expect(beatmapset.title_unicode)
        .to.be.a("string")
        .with.a.lengthOf.greaterThan(0)
    expect(beatmapset.user_id).to.be.a("number").greaterThan(0)
    expect(beatmapset.video).to.be.a("boolean")
}
