// Package imports
import fetch from "node-fetch"
import { fileURLToPath } from "url"
import { promises as fs } from "fs"
import { parse } from "node-html-parser"
import path from "path"
// Relative imports
import { camelize, fsExists, pascalize } from "./autogen/util.mjs"
import { generateTypescriptMochaTestString } from "./autogen/generateTypescriptMochaTest.mjs"
import { generateTypescriptTypeString } from "./autogen/generateTypescriptType.mjs"
import { getTypeGroups } from "./autogen/parseTypes.mjs"
import { parseHtmlToHeadingSections } from "./autogen/parseHtml.mjs"
// Type imports
import type {
    OsuApiV2InterfaceProperty,
    OsuApiV2TypeGroup,
} from "./autogen/parseTypes.mjs"
import type { HTMLElement } from "node-html-parser"
import type { ImportMapEntry } from "./autogen/generateTypescriptMochaTest.mjs"
import type { TypescriptImport } from "./autogen/generateTypescriptCode.mjs"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const rootDir = path.join(__dirname, "..")
const scriptsDir = path.join(rootDir, "scripts")
const htmlCacheFile = path.join(scriptsDir, "cache.html")
const typeOutputDir = path.join(scriptsDir, "types")
const typeMochaTestOutputDir = path.join(scriptsDir, "test")

const baseUrl = "https://osu.ppy.sh"
const url = `${baseUrl}/docs/index.html`

const getHtmlContent = async (url: string): Promise<HTMLElement> => {
    if (!(await fsExists(htmlCacheFile))) {
        const res = await fetch(url)
        if (res.ok) {
            await fs.writeFile(htmlCacheFile, await res.text())
        }
    }
    const htmlCacheContent = await fs.readFile(htmlCacheFile)
    return parse(htmlCacheContent.toString())
}

const eventTypeHeadings = [
    "achievement",
    "beatmapPlaycount",
    "beatmapsetApprove",
    "beatmapsetDelete",
    "beatmapsetRevive",
    "beatmapsetUpdate",
    "beatmapsetUpload",
    "rank",
    "rankLost",
    "userSupportAgain",
    "userSupportFirst",
    "userSupportGift",
    "usernameChange",
]
const eventObjects = ["Beatmap", "Beatmapset", "User"]

const customTypeGroups: OsuApiV2TypeGroup[] = [
    {
        name: "Timestamp",
        types: [
            {
                description: [
                    "Timestamp string in ISO 8601 format.",
                    '@example "2020-01-01T00:00:00+00:00"',
                ],
                name: "Timestamp",
                type: [{ original: "string" }],
            },
        ],
    },
    {
        name: "ApiInfo",
        types: [
            {
                name: "baseUrl",
                value: baseUrl,
            },
            {
                name: "baseUrlApiV2",
                value: `${baseUrl}/api/v2`,
            },
        ],
    },
    {
        name: "BeatmapCompact",
        types: [
            {
                description: [
                    "Metadata of the object that a comment is attached to.",
                ],
                name: "CommentableMeta",
                source: "commentablemeta",
                type: [
                    { original: "CommentableMetaAvailable" },
                    { original: "CommentableMetaDeleted" },
                ],
            },
        ],
    },
    {
        name: "BeatmapsetCompact",
        types: [
            {
                name: "BeatmapsetCompactDescription",
                properties: [
                    {
                        key: "description",
                        type: [{ original: "string" }],
                    },
                ],
            },
            {
                name: "BeatmapsetCompactGenre",
                properties: [
                    {
                        key: "id",
                        type: [{ original: "number" }],
                    },
                    {
                        key: "name",
                        type: [{ original: "string" }],
                    },
                ],
            },
            {
                name: "BeatmapsetCompactLanguage",
                properties: [
                    {
                        key: "id",
                        type: [{ original: "number" }],
                    },
                    {
                        key: "name",
                        type: [{ original: "string" }],
                    },
                ],
            },
            {
                name: "BeatmapsetCompactNominations",
                properties: [
                    {
                        key: "current",
                        type: [{ original: "integer" }],
                    },
                    {
                        key: "required",
                        type: [{ original: "integer" }],
                    },
                ],
            },
        ],
    },
    {
        name: "UserCompact",
        types: [
            {
                name: "UserPlaystyle",
                values: ["keyboard", "mouse", "tablet", "touch"].map((a) => ({
                    key: a.toUpperCase(),
                    value: a,
                })),
            },
        ],
    },
    {
        name: "UserCompact",
        types: [
            {
                name: "UserCompactPage",
                properties: [
                    {
                        description: [
                            "The me page HTML content.",
                            "Is an empty string if the user has no page.",
                        ],
                        key: "html",
                        type: [{ original: "string" }],
                    },
                    {
                        description: [
                            "The me page raw text content.",
                            "Is an empty string if the user has no page.",
                        ],
                        key: "raw",
                        type: [{ original: "string" }],
                    },
                ],
            },
            {
                name: "UserCompactRankHistory",
                properties: [
                    {
                        key: "data",
                        type: [{ original: "integer[]" }],
                    },
                    {
                        key: "mode",
                        type: [{ original: "GameMode" }],
                    },
                ],
            },
            {
                name: "UserCompactReplaysWatchedCount",
                properties: [
                    {
                        key: "count",
                        type: [{ original: "integer" }],
                    },
                    {
                        key: "start_date",
                        type: [{ original: "Timestamp" }],
                    },
                ],
            },
            {
                name: "UserCompactAchievement",
                properties: [
                    {
                        key: "achieved_at",
                        type: [{ original: "Timestamp" }],
                    },
                    {
                        key: "achievement_id",
                        type: [{ original: "integer" }],
                    },
                ],
            },
        ],
    },
    {
        name: "Event",
        types: [
            {
                description: ["All Event types"],
                name: "EventType",
                type: eventTypeHeadings.map((a) => ({
                    original: `EventType${pascalize(a)}`,
                })),
            },
        ],
    },
    {
        name: "GameMod",
        types: [
            {
                description: ["Available game mods."],
                name: "GameMod",
                values: [
                    "AP",
                    "AT",
                    "CM",
                    "CP",
                    "DT",
                    "EZ",
                    "FI",
                    "FL",
                    "HD",
                    "HR",
                    "HT",
                    "MR",
                    "NC",
                    "NF",
                    "PF",
                    "RD",
                    "RL",
                    "SD",
                    "SO",
                    "SV2",
                    "TP",
                ].map((a) => ({ key: a.toUpperCase(), value: a })),
            },
        ],
    },
]

const createJsonFiles = true

try {
    const htmlRoot = await getHtmlContent(url)
    const headingSections = parseHtmlToHeadingSections(htmlRoot, url)
    const typeGroups: ReadonlyArray<OsuApiV2TypeGroup> = getTypeGroups(
        headingSections,
        {
            customTypeGroups,
            fixHtmlSectionName: [
                ...[
                    "Response Format",
                    "Query Parameters",
                    "Body Parameters",
                ].map((a) => ({
                    name: a,
                    newName: (
                        name: string,
                        parentNames: ReadonlyArray<string>,
                    ) => (parentNames.at(-1) ?? "") + name,
                })),
                ...eventObjects.map((a) => ({
                    name: a,
                    newName: (
                        name: string,
                        parentNames: ReadonlyArray<string>,
                    ) =>
                        parentNames.at(-1) === "Additional objects"
                            ? (parentNames.at(-2) ?? "") + name
                            : name,
                })),
                ...eventTypeHeadings.map((a) => ({
                    name: a,
                    newName: (
                        name: string,
                        parentNames: ReadonlyArray<string>,
                    ) =>
                        parentNames.at(-1) === "Available Types"
                            ? (parentNames.at(-2) ?? "") +
                              "Type" +
                              pascalize(name)
                            : name,
                })),
            ],
            fixInterface: [
                ...eventTypeHeadings.map((a) => ({
                    name: `EventType${pascalize(a)}`,
                    newExtends: () => ["Event"],
                    newName: (b: string) => b,
                    newProperties: (): OsuApiV2InterfaceProperty[] => [
                        {
                            key: "type",
                            type: [{ original: `"${a}"` }],
                        },
                    ],
                })),
            ],
            fixInterfaceProperty: [
                {
                    name: "Event",
                    propertyKeyFixFuncMap: new Map([
                        [
                            "type",
                            (property) => ({
                                ...property,
                                type: eventTypeHeadings.map((a) => ({
                                    original: `"${a}"`,
                                })),
                            }),
                        ],
                    ]),
                },
                {
                    name: "ScoreStatistics",
                    propertyKeyFixFuncMap: new Map(
                        [
                            "count_50",
                            "count_100",
                            "count_300",
                            "count_geki",
                            "count_katu",
                            "count_miss",
                        ].map((key) => [
                            key,
                            (property): OsuApiV2InterfaceProperty => ({
                                ...property,
                                type: [{ original: "integer" }],
                            }),
                        ]),
                    ),
                },
                {
                    name: "Score",
                    propertyKeyFixFuncMap: new Map([
                        [
                            "id",
                            (p) => ({ ...p, type: [{ original: "integer" }] }),
                        ],
                        [
                            "best_id",
                            (p) => ({
                                ...p,
                                type: [
                                    { original: "integer" },
                                    { original: "null" },
                                ],
                            }),
                        ],
                        [
                            "user_id",
                            (p) => ({ ...p, type: [{ original: "integer" }] }),
                        ],
                        [
                            "accuracy",
                            (p) => ({ ...p, type: [{ original: "number" }] }),
                        ],
                        [
                            "mods",
                            (p) => ({
                                ...p,
                                type: [{ original: "GameMod[]" }],
                            }),
                        ],
                        [
                            "score",
                            (p) => ({ ...p, type: [{ original: "integer" }] }),
                        ],
                        [
                            "max_combo",
                            (p) => ({ ...p, type: [{ original: "integer" }] }),
                        ],
                        [
                            "perfect",
                            (p) => ({ ...p, type: [{ original: "boolean" }] }),
                        ],
                    ]),
                },
                {
                    name: "Beatmapset",
                    propertyKeyFixFuncMap: new Map([
                        [
                            "has_favourited",
                            (property) => ({
                                ...property,
                                type: [{ original: "boolean" }],
                            }),
                        ],
                    ]),
                },
                {
                    name: "BeatmapsetCompact",
                    propertyKeyFixFuncMap: new Map([
                        [
                            "converts",
                            (property) => ({
                                ...property,
                                type: [{ original: "Beatmap[]" }],
                            }),
                        ],
                        [
                            "description",
                            (property) => ({
                                ...property,
                                type: [
                                    {
                                        original:
                                            "BeatmapsetCompactDescription",
                                    },
                                ],
                            }),
                        ],
                        [
                            "genre",
                            (property) => ({
                                ...property,
                                type: [{ original: "BeatmapsetCompactGenre" }],
                            }),
                        ],
                        [
                            "language",
                            (property) => ({
                                ...property,
                                type: [
                                    { original: "BeatmapsetCompactLanguage" },
                                ],
                            }),
                        ],
                        [
                            "nominations",
                            (property) => ({
                                ...property,
                                type: [
                                    {
                                        original:
                                            "BeatmapsetCompactNominations",
                                    },
                                ],
                            }),
                        ],
                        [
                            "ratings",
                            (property) => ({
                                ...property,
                                type: [{ original: "number[]" }],
                            }),
                        ],
                        [
                            "recent_favourites",
                            (property) => ({
                                ...property,
                                type: [{ original: "UserCompact[]" }],
                            }),
                        ],
                        [
                            "related_users",
                            (property) => ({
                                ...property,
                                type: [{ original: "UserCompact[]" }],
                            }),
                        ],
                        [
                            "user",
                            (property) => ({
                                ...property,
                                type: [{ original: "User" }],
                            }),
                        ],
                    ]),
                },
                {
                    name: "UserCompactCompact",
                    propertyKeyFixFuncMap: new Map([
                        [
                            "page",
                            (property) => ({
                                ...property,
                                type: [{ original: "UserCompactPage" }],
                            }),
                        ],
                        [
                            "pending_beatmapset_count",
                            (property) => ({
                                ...property,
                                type: [{ original: "integer" }],
                            }),
                        ],
                        [
                            "previous_usernames",
                            (property) => ({
                                ...property,
                                type: [{ original: "string[]" }],
                            }),
                        ],
                        [
                            "rank_history",
                            (property) => ({
                                ...property,
                                type: [{ original: "UserCompactRankHistory" }],
                            }),
                        ],
                        [
                            "ranked_beatmapset_count",
                            (property) => ({
                                ...property,
                                type: [{ original: "integer" }],
                            }),
                        ],
                        [
                            "replays_watched_counts",
                            (property) => ({
                                ...property,
                                type: [
                                    {
                                        original:
                                            "UserCompactReplaysWatchedCount[]",
                                    },
                                ],
                            }),
                        ],
                        [
                            "statistics",
                            (property) => ({
                                ...property,
                                type: [{ original: "Statistics" }],
                            }),
                        ],
                        [
                            "support_level",
                            (property) => ({
                                ...property,
                                type: [{ original: "integer" }],
                            }),
                        ],
                        [
                            "user_achievements",
                            (property) => ({
                                ...property,
                                type: [
                                    { original: "UserCompactAchievement[]" },
                                ],
                            }),
                        ],
                    ]),
                },
                {
                    name: "User",
                    propertyKeyFixFuncMap: new Map([
                        [
                            "playstyle",
                            (property) => ({
                                ...property,
                                type: [{ original: "UserPlaystyle[]" }],
                            }),
                        ],
                    ]),
                },
            ],
            ignoreSections: ["Wrappers", "Registering an OAuth application"],
            mapUnknownTypes: new Map<string, string>([
                ["float", "number"],
                ["integer", "number"],
                ["bool", "boolean"],
                ...eventObjects.map<[string, string]>((a) => [
                    `Event.${a}`,
                    `Event${a}`,
                ]),
            ]),
        },
    )
    for (const dir of [typeOutputDir, typeMochaTestOutputDir]) {
        await fs.rm(dir, { force: true, recursive: true })
        await fs.mkdir(dir, { recursive: true })
    }
    // For now add a file for the parsed HTML content
    if (createJsonFiles) {
        await fs.writeFile(
            path.join(typeOutputDir, "html.json"),
            JSON.stringify(headingSections, undefined, 4),
        )
        await fs.writeFile(
            path.join(typeOutputDir, "typegroups.json"),
            JSON.stringify(typeGroups, undefined, 4),
        )
    }
    // Create type files
    const importMap: Map<string, ImportMapEntry> = new Map()
    const imports: TypescriptImport[] = []
    for (const typeGroup of typeGroups) {
        const outputFileName = `${camelize(typeGroup.name)}.d.mjs`
        for (const type of typeGroup.types) {
            importMap.set(type.name, {
                source: ["..", "types", outputFileName].join(path.posix.sep),
                type: "properties" in type ? "type" : "enum",
            })
            imports.push({
                name: type.name,
                source: [".", outputFileName].join(path.posix.sep),
                type: true,
            })
        }
    }
    for (const typeGroup of typeGroups) {
        const outputFileName = `${camelize(typeGroup.name)}.d.mts`
        if (createJsonFiles) {
            await fs.writeFile(
                path.join(typeOutputDir, `${camelize(typeGroup.name)}.json`),
                JSON.stringify(typeGroup, undefined, 4),
            )
        }
        await fs.writeFile(
            path.join(typeOutputDir, outputFileName),
            generateTypescriptTypeString(
                typeGroup,
                imports,
                "// This is an auto generated file\n",
            ),
        )
        for (const type of typeGroup.types) {
            importMap.set(`check${type.name}`, {
                source: [".", `check${type.name}.mjs`].join(path.posix.sep),
                type: "properties" in type ? "type" : "enum",
            })
        }
    }
    await fs.copyFile(
        path.join(__dirname, "autogen", "checkGeneric.mts"),
        path.join(typeMochaTestOutputDir, "checkGeneric.mts"),
    )
    for (const testFunc of [
        "DefaultCheckResponseOptions",
        "DefaultCheckOptions",
        "DefaultCheckOptionsArray",
    ]) {
        importMap.set(testFunc, {
            source: [".", "checkGeneric.mjs"].join(path.posix.sep),
            type: "type",
        })
    }
    for (const testFunc of [
        "genericCheckObjectForUncheckedKeys",
        "genericCheckIfType",
        "genericCheckIfString",
        "genericCheckIfBoolean",
        "genericCheckIfNumber",
        "genericCheckIfArray",
        "genericCheckIfEnum",
        "genericCheckIfObject",
        "genericUnknownError",
    ]) {
        importMap.set(testFunc, {
            source: [".", "checkGeneric.mjs"].join(path.posix.sep),
            type: "func",
        })
    }
    for (const typeGroup of typeGroups) {
        for (const type of typeGroup.types) {
            if (createJsonFiles) {
                await fs.writeFile(
                    path.join(
                        typeMochaTestOutputDir,
                        `${camelize(type.name)}.json`,
                    ),
                    JSON.stringify(type, undefined, 4),
                )
            }
            await fs.writeFile(
                path.join(typeMochaTestOutputDir, `check${type.name}.d.mts`),
                generateTypescriptMochaTestString(type, importMap),
            )
        }
    }
} catch (err) {
    console.error(err)
}
