// This script creates example outputs for all files found in the directory
// 'cached-osu-api-responses'

// Package imports
import { promises as fsp } from "fs"
import path from "path"
// Type imports
import type {
    EndpointSearchUserResponse,
    Score,
    User,
    UserEndpointGet,
    UserEndpointMe,
} from "../src"

const cachedOsuApiResponsesDir = path.join(
    __dirname,
    "..",
    "cached-osu-api-responses",
)
const pagesDir = __dirname
const pagesDirExampleOutput = path.join(pagesDir, "example_output")

const trimmedLongDataString = (trimmedAttributes: string[]) => {
    if (trimmedAttributes.length === 0) {
        return ""
    }
    return `(trimmed long data attributes: ${trimmedAttributes
        .map((a) => `\`${a}\``)
        .join(", ")})\n\n`
}
const removedDeprecatedKeysString = (removedDeprecatedKeys: string[]) => {
    if (removedDeprecatedKeys.length === 0) {
        return ""
    }
    return `(removed deprecated keys: ${removedDeprecatedKeys
        .map((a) => `\`${a}\``)
        .join(", ")})\n\n`
}

const genericEndpointGenerator = async <ReturnType>(
    prefix: string,
    trimLongDataFunc: (input: ReturnType) => string[] = () => [],
    removeDeprecatedKeysFunc: (input: ReturnType) => string[] = () => [],
) => {
    const files = await fsp.readdir(cachedOsuApiResponsesDir)
    for (const file of files) {
        if (!file.startsWith(`${prefix}_`)) {
            continue
        }
        const fileName = file.substring(0, file.lastIndexOf("."))
        const filePath = path.join(cachedOsuApiResponsesDir, file)
        const fileDataRaw = await fsp.readFile(filePath)
        const fileData = JSON.parse(fileDataRaw.toString()) as ReturnType
        // Trim long content
        const trimmedLongData: string[] = trimLongDataFunc(fileData)
        const removedDeprecatedKeys: string[] =
            removeDeprecatedKeysFunc(fileData)
        const outputFileName = path.join(
            pagesDirExampleOutput,
            `${fileName}.md`,
        )
        await fsp.mkdir(pagesDirExampleOutput, { recursive: true })
        console.log(
            `created page example output '${prefix}': '${outputFileName}'`,
        )
        await fsp.writeFile(
            outputFileName,
            `${trimmedLongDataString(
                trimmedLongData,
            )}${removedDeprecatedKeysString(
                removedDeprecatedKeys,
            )}\`\`\`json\n${JSON.stringify(fileData, undefined, 4)}\n\`\`\`\n`,
        )
    }
}

const trimLongDataUser = (input: User) => {
    const trimmedLongDataAttributes: string[] = []
    if (input.page?.html !== undefined) {
        trimmedLongDataAttributes.push("page.html")
        input.page.html = input.page.html.substring(0, 20) + "..."
    }
    if (input.page?.raw !== undefined) {
        trimmedLongDataAttributes.push("page.raw")
        input.page.raw = input.page.raw.substring(0, 20) + "..."
    }
    if (input.replays_watched_counts !== undefined) {
        trimmedLongDataAttributes.push("replays_watched_counts")
        input.replays_watched_counts = input.replays_watched_counts.slice(0, 3)
    }
    if (input.monthly_playcounts !== undefined) {
        trimmedLongDataAttributes.push("monthly_playcounts")
        input.monthly_playcounts = input.monthly_playcounts.slice(0, 3)
    }
    if (input.user_achievements !== undefined) {
        trimmedLongDataAttributes.push("user_achievements")
        input.user_achievements = input.user_achievements.slice(0, 3)
    }
    if (input.rank_history?.data !== undefined) {
        trimmedLongDataAttributes.push("rank_history.data")
        input.rank_history.data = input.rank_history.data.slice(0, 3)
    }
    return trimmedLongDataAttributes
}

const removeDeprecatedKeysUser = (input: User) => {
    const removedDeprecatedKeys: string[] = []
    const deprecatedKeys = [
        "rankHistory",
        "cover_url",
        "ranked_and_approved_beatmapset_count",
        "unranked_beatmapset_count",
    ]
    for (const deprecatedKey of deprecatedKeys) {
        if (
            (input as unknown as Record<string, string | undefined>)[
                deprecatedKey
            ] !== undefined
        ) {
            removedDeprecatedKeys.push(deprecatedKey)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ;(input as unknown as Record<string, string | undefined>)[
                deprecatedKey
            ] = undefined
        }
    }
    return removedDeprecatedKeys
}

const usersGet = genericEndpointGenerator<UserEndpointGet>(
    "users_get",
    trimLongDataUser,
    removeDeprecatedKeysUser,
)

const usersMe = genericEndpointGenerator<UserEndpointMe>(
    "users_me",
    trimLongDataUser,
    removeDeprecatedKeysUser,
)

const usersScores = genericEndpointGenerator<Score[]>("users_scores")
const usersRecentActivity = genericEndpointGenerator<Score[]>(
    "users_recent_activity",
)
const searchUser = genericEndpointGenerator<EndpointSearchUserResponse>(
    "search_user",
    (input) => {
        const trimmedAttributes: string[] = []

        if (input.user.data.length > 3) {
            trimmedAttributes.push("user.data")
            input.user.data = input.user.data.slice(0, 3)
        }

        return trimmedAttributes
    },
)

Promise.all([
    searchUser,
    usersGet,
    usersMe,
    usersScores,
    usersRecentActivity,
]).catch(console.error)
