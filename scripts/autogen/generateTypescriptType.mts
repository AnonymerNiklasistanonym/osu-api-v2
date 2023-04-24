// Relative imports
import {
    generateTypescriptEnum,
    generateTypescriptImports,
    generateTypescriptInterface,
    generateTypescriptType,
    generateTypescriptValue,
} from "./generateTypescriptCode.mjs"
import { genericStringSorter } from "./util.mjs"
// Type imports
import type {
    OsuApiV2InterfacePropertyType,
    OsuApiV2TypeGroup,
    OsuApiV2Types,
} from "./parseTypes.mjs"
import type { TypescriptImport } from "./generateTypescriptCode.mjs"

/**
 * @param type Interface type
 * @returns Interface type as a string
 */
const interfacePropertyTypeToString = (
    type: Readonly<OsuApiV2InterfacePropertyType>,
): string => {
    let str = type.fixed ?? type.original
    if (type.generic) {
        str += `<${type.generic}>`
    }
    if (type.array) {
        str += "[]"
    }
    return str
}

/**
 * @param types Interface property types
 * @returns Description strings that reflect updated types
 */
const getFixedTypeComment = (
    types: ReadonlyArray<OsuApiV2InterfacePropertyType>,
): string[] =>
    types.some((a) => a.fixed !== undefined)
        ? [
              `Updated types: ` +
                  types
                      .filter((a) => a.fixed !== undefined)
                      .map(
                          (a) =>
                              `${a.original} -> ${interfacePropertyTypeToString(
                                  a,
                              )}`,
                      )
                      .join(", "),
          ]
        : []

/**
 * @param type Any type
 * @param imports A list where all imports will be pushed too
 * @returns Convert any type to a string
 */
const typeToStrings = (
    type: Readonly<OsuApiV2Types>,
    imports: string[],
): string => {
    const descriptionContent: string[] = []
    if (type.description !== undefined) {
        descriptionContent.push(...type.description)
    }
    if (type.source !== undefined) {
        descriptionContent.push(`[Source](${type.source})`)
    }
    if ("properties" in type) {
        // TypeScript Interface
        imports.push(
            ...type.properties.flatMap((a) =>
                a.type.map((b) => b.fixed ?? b.original),
            ),
            ...type.properties.flatMap((a) =>
                a.type.map((b) => b.generic ?? "string"),
            ),
        )
        return generateTypescriptInterface(
            {
                description: descriptionContent,
                extends: type.extendsList,
                name: type.name,
                properties: type.properties.map((a) => ({
                    description: (a.description ?? []).concat(
                        getFixedTypeComment(a.type),
                    ),
                    key: a.key,
                    optional: a.optional,
                    type: a.type.map(interfacePropertyTypeToString),
                })),
            },
            { export: true },
        )
    } else if ("values" in type) {
        // TypeScript Enum
        return generateTypescriptEnum(
            {
                description: descriptionContent,
                name: type.name,
                values: type.values.map((a) => ({
                    description: a.description?.split("\n"),
                    key: a.key.replace(/\./g, "_"),
                    value:
                        typeof a.value === "number" ? a.value : `"${a.value}"`,
                })),
            },
            { export: true },
        )
    } else if ("value" in type) {
        // TypeScript Value
        return generateTypescriptValue(
            {
                description: descriptionContent,
                name: type.name,
                value: type.value,
            },
            { export: true },
        )
    }
    // TypeScript Type
    imports.push(
        ...type.type.map((b) => b.fixed ?? b.original),
        ...type.type.map((b) => b.generic ?? "string"),
    )
    return generateTypescriptType(
        {
            description: descriptionContent,
            name: type.name,
            types: type.type.map(interfacePropertyTypeToString),
        },
        { export: true },
    )
}

/**
 * @param type A type
 * @returns Return true if type is not a default type or a string
 */
const filterNonDefaultTypes = (type: string): boolean =>
    !(
        [
            "number",
            "float",
            "boolean",
            "string",
            "null",
            "object",
            "unknown",
            "T",
        ].includes(type) ||
        (type.startsWith('"') && type.endsWith('"'))
    )
/**
 * @param typeGroup The type group that should be converted to TypeScript code
 * @param imports A list of all available TypeScript imports
 * @param prefix A custom prefix of the content
 * @returns TypeScript type file (.d.mts) content
 */
export const generateTypescriptTypeString = (
    typeGroup: Readonly<OsuApiV2TypeGroup>,
    imports: TypescriptImport[],
    prefix = "",
): string => {
    const typeImportList: string[] = []
    const typeStrings = typeGroup.types
        .sort((a, b) => genericStringSorter(a.name, b.name))
        .map((a) => typeToStrings(a, typeImportList))
    const typeImports = typeImportList.filter((a) => filterNonDefaultTypes(a))
    for (const notFoundImport of typeImports.filter(
        (a) => !imports.map((b) => b.name).includes(a),
    )) {
        console.warn(`no import found (${typeGroup.name}:${notFoundImport})`)
    }
    const mappedImports = imports
        .filter((a) => typeImports.includes(a.name))
        .filter((a) => !typeGroup.types.flatMap((b) => b.name).includes(a.name))
    return (
        (prefix.length > 0 ? prefix + "\n" : "") +
        `// Types: ${typeGroup.types.map((a) => a.name).join(", ")}\n\n` +
        (mappedImports.length > 0
            ? generateTypescriptImports(mappedImports) + "\n"
            : "") +
        typeStrings.join("\n")
    )
}
