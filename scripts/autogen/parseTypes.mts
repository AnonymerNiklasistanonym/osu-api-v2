// Relative imports
import { pascalize } from "./util.mjs"
// Type imports
import type { HTMLSectionHeading, HTMLSectionTable } from "./parseHtml.mjs"

interface OsuApiV2TypeBase {
    description?: string[]
    name: string
    source?: string
}

export interface OsuApiV2Interface extends OsuApiV2TypeBase {
    extendsList?: string[]
    generic?: string
    properties: OsuApiV2InterfaceProperty[]
}

export interface OsuApiV2InterfacePropertyType {
    array?: boolean
    fixed?: string
    generic?: string
    original: string
}

export interface OsuApiV2InterfaceProperty {
    description?: string[]
    key: string
    optional?: boolean
    type: OsuApiV2InterfacePropertyType[]
}

export interface OsuApiV2Type extends OsuApiV2TypeBase {
    type: OsuApiV2InterfacePropertyType[]
}

export interface OsuApiV2Enum extends OsuApiV2TypeBase {
    values: OsuApiV2EnumValue[]
}

export interface OsuApiV2Value extends OsuApiV2TypeBase {
    value: number | string
}

export interface OsuApiV2EnumValue {
    description?: string
    key: string
    value: string | number
}

export type OsuApiV2Types =
    | OsuApiV2Interface
    | OsuApiV2Type
    | OsuApiV2Enum
    | OsuApiV2Value

export interface OsuApiV2TypeGroup {
    name: string
    types: OsuApiV2Types[]
}

interface FixTypeOptions {
    mapUnknownTypes?: ReadonlyMap<string, string>
}

const fixType = (
    type: string,
    options: Readonly<FixTypeOptions> = {},
): OsuApiV2InterfacePropertyType => {
    const typeObj: OsuApiV2InterfacePropertyType = {
        original: type,
    }
    if (type.endsWith("[]")) {
        typeObj.array = true
        typeObj.fixed = type.slice(0, -2)
    }
    const genericMatch = /(.+)<(.+)>/.exec(typeObj.fixed ?? typeObj.original)
    if (genericMatch) {
        typeObj.fixed = genericMatch[1]
        typeObj.generic = genericMatch[2]
    }
    if (/`[A-Z].+`/.test(typeObj.fixed ?? typeObj.original)) {
        const slicedType = (typeObj.fixed ?? typeObj.original).slice(1, -1)
        const fixedFixedType = options.mapUnknownTypes?.get(slicedType)
        typeObj.fixed = fixedFixedType ?? slicedType
    } else if (/`[a-z].+`/.test(typeObj.fixed ?? typeObj.original)) {
        const slicedType = (typeObj.fixed ?? typeObj.original).slice(1, -1)
        typeObj.fixed = `"${slicedType}"`
    } else {
        const fixedType = options.mapUnknownTypes?.get(
            typeObj.fixed ?? typeObj.original,
        )
        if (fixedType) {
            typeObj.fixed = fixedType
        }
    }
    if (typeObj.fixed !== undefined) {
        console.warn("Fixed type", type, "->", typeObj)
    } else {
        console.log("Leave type alone:", type, "(", typeObj, ")")
    }
    return typeObj
}

const fixValue = (value: string): string => {
    let newValue = value.trim()
    if (/`[A-Z].+`/.test(newValue)) {
        newValue = newValue.slice(1, -1)
    } else if (/`[a-z].+`/.test(newValue)) {
        newValue = newValue.slice(1, -1)
    }
    return newValue
}

const fixKey = (key: string): string => {
    let newValue = key
        .trim()
        .replace(/\s/g, "_")
        .replace(/\./g, "_")
        .toUpperCase()
    if (/`[A-Z].+`/.test(newValue)) {
        newValue = newValue.slice(1, -1)
    } else if (/`[a-z].+`/.test(newValue)) {
        newValue = newValue.slice(1, -1)
    }
    return newValue
}

interface HTMLTableToEnumValuesReturn {
    prefix?: string
    values: OsuApiV2EnumValue[]
}

const htmlTableToEnumValues = (
    htmlTableElement: HTMLSectionTable,
): HTMLTableToEnumValuesReturn[] | undefined => {
    const values: HTMLTableToEnumValuesReturn[] = []
    if (htmlTableElement.table.length === 0) {
        throw Error("Found table with no rows")
    }
    const firstRow = htmlTableElement.table[0]
    if (
        (firstRow.length >= 2 &&
            firstRow[0] === "Name" &&
            firstRow[1] === "Description") ||
        (firstRow.length >= 2 && firstRow[0] === "Type") ||
        (firstRow.length >= 1 && firstRow[0] === "Section")
    ) {
        values.push({ values: [] })
        for (const row of htmlTableElement.table.slice(1)) {
            if (
                firstRow.length >= 2 &&
                firstRow[0] === "Name" &&
                firstRow[1] === "Description"
            ) {
                values[0].values.push({
                    description: firstRow[1],
                    key: fixKey(row[0]),
                    value: fixValue(row[0].trim()),
                })
            } else if (firstRow.length >= 1 && firstRow[0] === "Section") {
                values[0].values.push({
                    key: fixKey(row[0]),
                    value: fixValue(row[0].trim()),
                })
            } else if (firstRow.length >= 2 && firstRow[0] === "Type") {
                values[0].values.push({
                    description:
                        row[1].trim().length > 0
                            ? firstRow[1] + ": " + row[1]
                            : "",
                    key: fixKey(row[0]),
                    value: fixValue(row[0].trim()),
                })
            } else {
                console.warn("Unknown table format [1]", htmlTableElement)
                return undefined
            }
        }
    } else if (
        firstRow.length == 2 &&
        firstRow[0] === "Integer" &&
        firstRow[1] === "String"
    ) {
        values.push(
            {
                prefix: "Integer",
                values: [],
            },
            {
                prefix: "String",
                values: [],
            },
        )
        for (const row of htmlTableElement.table.slice(1)) {
            values[0].values.push({
                key: fixKey(row[1]),
                value: parseInt(fixValue(row[0])),
            })
            values[1].values.push({
                description: `(${row[0]})`,
                key: fixKey(row[1]),
                value: fixValue(row[1]),
            })
        }
    } else {
        console.warn("Unknown table format [2]", htmlTableElement)
        return undefined
    }
    return values
}

interface HtmlTableToInterfacePropertiesReturn {
    ignorePropertyKeyList: string[]
    newInterfaces: OsuApiV2Interface[]
    properties: OsuApiV2InterfaceProperty[]
}

interface FixInterfacePropertyHelperOptions extends FixTypeOptions {
    fixInterfaceProperty?: GetTypeGroupsOptionsFixInterfaceProperty[]
}

const fixInterfacePropertyHelper = (
    interfaceName: string,
    property: Readonly<OsuApiV2InterfaceProperty>,
    options: Readonly<FixInterfacePropertyHelperOptions>,
): OsuApiV2InterfaceProperty => {
    const fixProperty = options.fixInterfaceProperty
        ?.find((a) => a.name === interfaceName)
        ?.propertyKeyFixFuncMap.get(property.key)
    if (fixProperty !== undefined) {
        const fixedProperty = fixProperty(property)
        fixedProperty.type.map((a) => fixType(a.original, options))
        console.warn("Fix property", property, "->", fixedProperty)
        return fixedProperty
    }
    return property
}

interface FixInterfaceHelperOptions extends FixInterfacePropertyHelperOptions {
    fixInterface?: GetTypeGroupsOptionsFixInterfaceName[]
}

const fixInterfaceHelper = (
    interfaceData: Readonly<OsuApiV2Interface>,
    options: Readonly<FixInterfaceHelperOptions>,
): OsuApiV2Interface => {
    const fixInterfaceName = options.fixInterface?.find(
        (a) => a.name === interfaceData.name,
    )
    if (fixInterfaceName) {
        const name = fixInterfaceName.newName(interfaceData.name)
        console.warn(
            "Fix interface",
            interfaceData.name,
            "->",
            name,
            "extends",
            fixInterfaceName.newExtends
                ? fixInterfaceName.newExtends(interfaceData.name)
                : [],
        )
        return {
            ...interfaceData,
            extendsList: [
                ...(interfaceData.extendsList ?? []),
                ...(fixInterfaceName.newExtends
                    ? fixInterfaceName.newExtends(interfaceData.name)
                    : []),
            ],
            name,
            properties: [
                ...interfaceData.properties,
                ...(fixInterfaceName.newProperties
                    ? fixInterfaceName.newProperties(interfaceData.name)
                    : []),
            ].map((a) => fixInterfacePropertyHelper(name, a, options)),
        }
    }
    return {
        ...interfaceData,
        properties: interfaceData.properties.map((a) =>
            fixInterfacePropertyHelper(interfaceData.name, a, options),
        ),
    }
}

interface HTMLTableToInterfacePropertiesOptions
    extends FixInterfaceHelperOptions,
        FixTypeOptions {
    ignorePropertyKeyList?: string[]
    /** If the table represents optional attributes */
    optional?: boolean
}

const htmlTableToInterfaceProperties = (
    htmlTableElement: HTMLSectionTable,
    interfaceName: string,
    options: HTMLTableToInterfacePropertiesOptions = {},
): HtmlTableToInterfacePropertiesReturn | undefined => {
    const properties: OsuApiV2InterfaceProperty[] = []
    const newInterfaces: OsuApiV2Interface[] = []
    if (htmlTableElement.table.length === 0) {
        throw Error("Found table with no rows")
    }
    const ignorePropertyKeyList: string[] = options.ignorePropertyKeyList ?? []
    const firstRow = htmlTableElement.table[0]
    for (const row of htmlTableElement.table.slice(1)) {
        if (firstRow.length === 1 && firstRow[0] === "Field") {
            properties.push({
                key: row[0],
                type: [{ original: "unknown" }],
            })
        } else if (
            firstRow.length >= 2 &&
            (firstRow[0] === "Field" || firstRow[0] === "Name") &&
            firstRow[1] === "Type"
        ) {
            const optional = row[1].endsWith("?")
            const type: OsuApiV2InterfacePropertyType[] = (
                optional ? row[1].slice(0, -1) : row[1]
            )
                .split("|")
                .map((a) => a.trim())
                .filter((a) => a.length > 0)
                .map((a) => a.split(" ").join(""))
                .map((original) => fixType(original, options))
            if (type.length === 0) {
                console.warn(
                    `no interface property type found (${interfaceName}:${row[0]})`,
                )
                type.push({ original: "unknown" })
            }
            const property: OsuApiV2InterfaceProperty = {
                key: row[0],
                optional: options.optional === true || optional,
                type,
            }
            if (
                firstRow.length >= 3 &&
                firstRow[2] === "Description" &&
                row.length >= 3 &&
                row[2].length > 0
            ) {
                property.description = [...row[2].split("\n")]
            }
            if (property.key.includes(".")) {
                // Create new type for e.g. "hype.current"
                const newKeyName = property.key.split(".")[0]
                const key = property.key.split(".")[1]
                const name = convertStringToTypeFormat(
                    `${interfaceName}${pascalize(
                        newKeyName.replace(/_/g, " "),
                    )}`,
                )
                newInterfaces.push(
                    fixInterfaceHelper(
                        {
                            name,
                            properties: [
                                {
                                    ...property,
                                    key,
                                },
                            ],
                        },
                        options,
                    ),
                )
                property.key = newKeyName
                property.type = [fixType(name, options)]
                if (ignorePropertyKeyList.includes(newKeyName)) {
                    continue
                }
                ignorePropertyKeyList.push(newKeyName)
            }
            properties.push(property)
        } else {
            return undefined
        }
    }
    return { ignorePropertyKeyList, newInterfaces, properties }
}

export const mergeNewInterfaces = (
    newInterfaces: ReadonlyArray<OsuApiV2Interface>,
    options: Readonly<FixTypeOptions> = {},
): OsuApiV2Interface[] => {
    const mergedInterfaces: OsuApiV2Interface[] = []
    for (const newInterface of newInterfaces) {
        const index = mergedInterfaces.findIndex(
            (a) => a.name === newInterface.name,
        )
        if (index !== -1) {
            mergedInterfaces[index].properties.push(
                ...fixInterfaceHelper(newInterface, options).properties,
            )
        } else {
            mergedInterfaces.push(fixInterfaceHelper(newInterface, options))
        }
    }
    return mergedInterfaces
}

export const mergeTypeGroups = (
    a: ReadonlyArray<OsuApiV2TypeGroup>,
    b: ReadonlyArray<OsuApiV2TypeGroup>,
): OsuApiV2TypeGroup[] => {
    const mergedTypeGroups = [...a]
    for (const typeGroup of b) {
        const existingTypeGroup = mergedTypeGroups.find(
            (a) => a.name === typeGroup.name,
        )
        if (existingTypeGroup) {
            existingTypeGroup.types.push(...typeGroup.types)
            console.warn(
                "Merged into type group",
                existingTypeGroup.name,
                "the types",
                typeGroup.types.map((a) => a.name),
                "=",
                existingTypeGroup.types.map((a) => a.name),
            )
        } else {
            mergedTypeGroups.push(typeGroup)
            console.warn(
                "Added new type group",
                typeGroup.name,
                "with the types",
                typeGroup.types.map((a) => a.name),
            )
        }
    }
    return mergedTypeGroups
}

export type GetTypesOptions = GetTypesOptionsGlobal
export interface GetTypesOptionsGlobal
    extends FixTypeOptions,
        FixInterfaceHelperOptions {
    fixHtmlSectionName?: GetTypeGroupsOptionsFixHtmlSectionName[]
    ignorePropertyKeys?: string[]
    ignoreSections?: string[]
    parentSectionNames?: string[]
}

export const getTypes = (
    htmlHeading: Readonly<HTMLSectionHeading>,
    options: Readonly<GetTypesOptions> = {},
): OsuApiV2Types[] => {
    const types: OsuApiV2Types[] = []
    let properties: OsuApiV2InterfaceProperty[] = []
    let values: OsuApiV2EnumValue[] = []
    let description: string[] = []
    let ignorePropertyKeyList: string[] = options.ignorePropertyKeys ?? []
    let optionalAttributes = false
    let headingExtra = ""

    const foundNewHeadingRoutine = () => {
        if (properties.length > 0) {
            const genericMatch = /(.+)<(.+)>/.exec(htmlHeading.name)
            const extendsList = [
                ...description.join(" ").matchAll(/extends\s+(\S+)\s/g),
            ].map((a) => a[1])
            let htmlHeadingName = htmlHeading.name
            const fixHtmlSectionName = options.fixHtmlSectionName?.find(
                (a) => a.name === htmlHeadingName,
            )
            if (fixHtmlSectionName) {
                console.warn(
                    "Fix html section",
                    htmlHeadingName,
                    options.parentSectionNames,
                    "->",
                    fixHtmlSectionName.newName(
                        genericMatch ? genericMatch[1] : htmlHeadingName,
                        options.parentSectionNames ?? [],
                    ),
                )
                htmlHeadingName = fixHtmlSectionName.newName(
                    genericMatch ? genericMatch[1] : htmlHeadingName,
                    options.parentSectionNames ?? [],
                )
            } else if (genericMatch != null) {
                htmlHeadingName = genericMatch[1]
            }
            const name = convertStringToTypeFormat(
                `${htmlHeadingName}${headingExtra}`,
            )
            types.push(
                fixInterfaceHelper(
                    {
                        description,
                        extendsList,
                        generic: genericMatch ? genericMatch[2] : undefined,
                        name,
                        properties,
                        source: htmlHeading.hyperlink,
                    },
                    options,
                ),
            )
        }
        if (values.length > 0) {
            types.push({
                description,
                name: convertStringToTypeFormat(
                    `${htmlHeading.name}${headingExtra}`,
                ),
                source: htmlHeading.hyperlink,
                values,
            } satisfies OsuApiV2Enum)
        }
        optionalAttributes = false
        headingExtra = ""
        description = []
        ignorePropertyKeyList = []
        values = []
        properties = []
    }

    for (const section of htmlHeading.content) {
        if (section.type === "text") {
            if (
                section.content.at(-1) === "Optional attributes:" ||
                section.content.at(-1) === "Optional attributes" ||
                section.content.at(-1) === "Following fields are optional." ||
                section.content.at(-1) === "Those fields are optional."
            ) {
                description.push(...section.content.slice(0, -1))
                optionalAttributes = true
            } else if (
                section.content.at(-1) === "Additional attributes:" ||
                section.content.at(-1) ===
                    "The following attributes are always included as well:"
            ) {
                description.push(...section.content.slice(0, -1))
                optionalAttributes = false
            } else if (section.content.at(-1) === "If object is available:") {
                description.push(...section.content)
                headingExtra = "Available"
            } else if (
                section.content.at(-1) ===
                "Otherwise if object has been deleted:"
            ) {
                foundNewHeadingRoutine()
                description.push(...section.content)
                headingExtra = "Deleted"
            } else {
                description.push(...section.content)
            }
            continue
        }
        if (section.type === "code") {
            description.push(
                "@example",
                "```" + (section.language ?? ""),
                ...section.code.split("\n"),
                "```",
            )
            continue
        }
        if (section.type === "table") {
            const tableData = htmlTableToInterfaceProperties(
                section,
                convertStringToTypeFormat(htmlHeading.name),
                {
                    ...options,
                    ignorePropertyKeyList,
                    optional: optionalAttributes,
                },
            )
            if (tableData) {
                ignorePropertyKeyList.push(
                    ...tableData.ignorePropertyKeyList.filter(
                        (a) => !ignorePropertyKeyList.includes(a),
                    ),
                )
                properties.push(...tableData.properties)
                types.push(
                    ...mergeNewInterfaces(tableData.newInterfaces, options),
                )
                optionalAttributes = false
                continue
            }
            const tableDataEnum = htmlTableToEnumValues(section)
            if (tableDataEnum) {
                for (const a of tableDataEnum) {
                    foundNewHeadingRoutine()
                    headingExtra += a.prefix ?? ""
                    values.push(...a.values)
                }
                continue
            }
            console.warn("Unknown table format", section)
        }
        if (section.type === "heading") {
            foundNewHeadingRoutine()
            const newTypes = getTypes(section, {
                ...options,
                parentSectionNames: [
                    ...(options.parentSectionNames ?? []),
                    htmlHeading.name,
                ],
            })
            if (options.ignoreSections?.includes(section.name)) {
                console.warn("Ignore section", section.name)
                continue
            }
            types.push(...newTypes)
            continue
        }
    }
    foundNewHeadingRoutine()
    return types
}

const convertStringToTypeFormat = (type: string): string =>
    type
        .split(/\s/)
        .map((b) => b.charAt(0).toUpperCase() + b.slice(1))
        .join("")

export interface GetTypeGroupsOptionsFixInterfaceProperty {
    name: string
    propertyKeyFixFuncMap: Map<
        string,
        (
            property: Readonly<OsuApiV2InterfaceProperty>,
        ) => OsuApiV2InterfaceProperty
    >
}
export interface GetTypeGroupsOptionsFixInterfaceName {
    name: string
    newExtends?: (name: string) => string[]
    newName: (name: string) => string
    newProperties?: (name: string) => OsuApiV2InterfaceProperty[]
}

export interface GetTypeGroupsOptionsFixHtmlSectionName {
    name: string
    newName: (name: string, parentNames: ReadonlyArray<string>) => string
}

export interface GetTypeGroupsOptions extends GetTypesOptionsGlobal {
    customTypeGroups?: OsuApiV2TypeGroup[]
}

export const getTypeGroups = (
    htmlSections: ReadonlyArray<HTMLSectionHeading>,
    options: Readonly<GetTypeGroupsOptions> = {},
): OsuApiV2TypeGroup[] => {
    const typeGroups: OsuApiV2TypeGroup[] = []

    for (const htmlSection of htmlSections) {
        if (
            htmlSection.content.length === 0 ||
            options.ignoreSections?.includes(htmlSection.name)
        ) {
            // Ignore empty/ignored sections
            continue
        }
        for (const section of htmlSection.content) {
            if (
                section.type !== "heading" ||
                options.ignoreSections?.includes(section.name)
            ) {
                // Ignore non-headings/ignored sections
                continue
            }
            typeGroups.push({
                name: convertStringToTypeFormat(section.name),
                types: getTypes(section, { ...options }),
            })
        }
    }
    return mergeTypeGroups(
        typeGroups.filter((a) => a.types.length > 0),
        options.customTypeGroups ?? [],
    )
}
