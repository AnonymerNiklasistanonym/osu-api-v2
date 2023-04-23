// This script creates example outputs for all files found in the directory
// 'cached-osu-api-responses'

// Package imports
import { fileURLToPath } from "url"
import { promises as fs } from "fs"
import path from "path"
// Local imports
import { userCompactObjectUndocumentedKeys } from "../test/osu_api_v2/types/check_user.mjs"
// Type imports
import type {
    Event,
    Score,
    SearchResult,
    User,
    UserEndpointGet,
    UserEndpointMe,
    UserEndpointSearchUser,
    WikiPage,
} from "../src/index.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
    return `(trimmed long data attributes: ${[...new Set(trimmedAttributes)]
        .sort()
        .map((a) => `\`${a}\``)
        .join(", ")})\n\n`
}
const removedDeprecatedKeysString = (removedDeprecatedKeys: string[]) => {
    if (removedDeprecatedKeys.length === 0) {
        return ""
    }
    return `(removed deprecated keys: ${[...new Set(removedDeprecatedKeys)]
        .sort()
        .map((a) => `\`${a}\``)
        .join(", ")})\n\n`
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const genericEndpointGenerator = async <ReturnType extends unknown>(
    prefix: string,
    trimLongDataFunc: (input: ReturnType) => string[] = () => [],
    removeDeprecatedKeysFunc: (input: ReturnType) => string[] = () => [],
) => {
    await fs.mkdir(cachedOsuApiResponsesDir, { recursive: true })
    const files = await fs.readdir(cachedOsuApiResponsesDir)
    for (const file of files) {
        if (!file.startsWith(`${prefix}_`)) {
            continue
        }
        const fileName = file.substring(0, file.lastIndexOf("."))
        const filePath = path.join(cachedOsuApiResponsesDir, file)
        const fileDataRaw = await fs.readFile(filePath)
        const fileData = JSON.parse(fileDataRaw.toString()) as ReturnType
        // Trim long content
        const trimmedLongData: string[] = trimLongDataFunc(fileData)
        const removedDeprecatedKeys: string[] =
            removeDeprecatedKeysFunc(fileData)
        const outputFileName = path.join(
            pagesDirExampleOutput,
            `${fileName}.md`,
        )
        await fs.mkdir(pagesDirExampleOutput, { recursive: true })
        console.log(
            `created page example output '${prefix}': '${outputFileName}'`,
        )
        await fs.writeFile(
            outputFileName,
            `${trimmedLongDataString(
                trimmedLongData,
            )}${removedDeprecatedKeysString(
                removedDeprecatedKeys,
            )}\`\`\`json\n${JSON.stringify(fileData, undefined, 4)}\n\`\`\`\n`,
        )
    }
}

const trimLongString = (longString: string): string => {
    return `${longString.substring(0, 30)}...`
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
const trimLongArray = <DATA_TYPE extends unknown>(longArray: DATA_TYPE[]) => {
    longArray.splice(3, longArray.length)
}

const trimLongDataUser = (input: User) => {
    const trimmedLongDataAttributes: string[] = []
    if (input.page?.html !== undefined) {
        trimmedLongDataAttributes.push("page.html")
        input.page.html = trimLongString(input.page.html)
    }
    if (input.page?.raw !== undefined) {
        trimmedLongDataAttributes.push("page.raw")
        input.page.raw = trimLongString(input.page.raw)
    }
    if (input.replays_watched_counts !== undefined) {
        trimmedLongDataAttributes.push("replays_watched_counts")
        trimLongArray(input.replays_watched_counts)
    }
    if (input.monthly_playcounts !== undefined) {
        trimmedLongDataAttributes.push("monthly_playcounts")
        trimLongArray(input.monthly_playcounts)
    }
    if (input.user_achievements !== undefined) {
        trimmedLongDataAttributes.push("user_achievements")
        trimLongArray(input.user_achievements)
    }
    if (input.rank_history?.data !== undefined) {
        trimmedLongDataAttributes.push("rank_history.data")
        trimLongArray(input.rank_history.data)
    }
    return trimmedLongDataAttributes
}

const removeDeprecatedKeysUser = (input: User) => {
    const removedDeprecatedKeys: string[] = []
    for (const deprecatedKey of userCompactObjectUndocumentedKeys) {
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
const usersRecentActivity = genericEndpointGenerator<Event[]>(
    "users_recent_activity",
    (input) => {
        const trimmedLongDataAttributes: string[] = []
        if (input.length > 3) {
            trimmedLongDataAttributes.push("[]")
            trimLongArray(input)
        }
        return trimmedLongDataAttributes
    },
)

const searchUser = genericEndpointGenerator<
    SearchResult<UserEndpointSearchUser>
>("search_user", (input) => {
    const trimmedLongDataAttributes: string[] = []

    if (input.data.length > 3) {
        trimmedLongDataAttributes.push("user.data")
        trimLongArray(input.data)
    }

    return trimmedLongDataAttributes
})

const searchWikiPage = genericEndpointGenerator<SearchResult<WikiPage>>(
    "search_wiki_page",
    (input) => {
        const trimmedLongDataAttributes: string[] = []

        for (const element of input.data) {
            if (element.available_locales.length > 3) {
                trimmedLongDataAttributes.push("data.available_locales")
                trimLongArray(element.available_locales)
            }
            if (element.markdown.length > 20) {
                trimmedLongDataAttributes.push("data.markdown")
                element.markdown = trimLongString(element.markdown)
            }
            if (element.tags.length > 3) {
                trimmedLongDataAttributes.push("data.tags")
                trimLongArray(element.tags)
            }
        }

        if (input.data.length > 3) {
            trimmedLongDataAttributes.push("data")
            trimLongArray(input.data)
        }

        return trimmedLongDataAttributes
    },
)

Promise.all([
    searchUser,
    usersGet,
    usersMe,
    usersScores,
    usersRecentActivity,
    searchWikiPage,
]).catch(console.error)
