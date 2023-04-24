// Relative imports
import {
    generateTypescriptFunc,
    generateTypescriptImports,
    generateTypescriptObject,
} from "./generateTypescriptCode.mjs"
import { camelize } from "./util.mjs"
// Type imports
import type {
    OsuApiV2Interface,
    OsuApiV2InterfaceProperty,
    OsuApiV2InterfacePropertyType,
    OsuApiV2Types,
} from "./parseTypes.mjs"
import type {
    TypescriptFuncCommand,
    TypescriptImport,
    TypescriptObjectProperty,
} from "./generateTypescriptCode.mjs"

const checkTypeString = (
    varName: string,
    types: ReadonlyArray<OsuApiV2InterfacePropertyType>,
    imports: TypescriptImport[],
    importMap: ReadonlyMap<string, ImportMapEntry>,
    notes: string[],
    maybeOptional?: boolean,
    checkedKey?: string,
): string => {
    const filteredType = types.filter((a) => (a.fixed ?? a.original) !== "null")
    if (filteredType.length !== 1) {
        return `// TODO Unable to handle multiple types (${varName} - ${types
            .map((a) => a.original)
            .join(",")})`
    }
    const type = filteredType[0].fixed ?? filteredType[0].original
    const options: TypescriptObjectProperty[] = []
    if (checkedKey !== undefined) {
        options.push(
            {
                name: "checkedKey",
                value: `"${checkedKey}"`,
            },
            {
                name: "checkedKeys",
            },
        )
    }
    if (maybeOptional) {
        options.push({
            name: "orUndef",
            value: "true",
        })
    }
    if (types.filter((a) => (a.fixed ?? a.original) === "null").length === 1) {
        options.push({
            name: "orNull",
            value: "true",
        })
    }
    let funcName = "genericCheckIf"
    if (filteredType[0].array) {
        funcName += "Array"
        imports.push({
            name: funcName,
            source: importMap.get(funcName)?.source ?? "Error",
            type: importMap.get(funcName)?.type === "type",
        })
        options.push({
            name: "elementCheckFunc",
            value: `(a) => ${checkTypeString(
                "a",
                [{ ...filteredType[0], array: false }],
                imports,
                importMap,
                notes,
                false,
                undefined,
            )}`,
        })
        return `${funcName}(${varName}, ${generateTypescriptObject(options)})`
    }
    if (type.startsWith('"') && type.endsWith('"')) {
        funcName += "String"
        imports.push({
            name: funcName,
            source: importMap.get(funcName)?.source ?? "Error",
            type: importMap.get(funcName)?.type === "type",
        })
        options.push({
            name: "value",
            value: type,
        })
        return `${funcName}(${varName}, ${generateTypescriptObject(options)})`
    }
    switch (type) {
        case "number":
            funcName += "Number"
            imports.push({
                name: funcName,
                source: importMap.get(funcName)?.source ?? "Error",
                type: importMap.get(funcName)?.type === "type",
            })
            break
        case "string":
            funcName += "String"
            imports.push({
                name: funcName,
                source: importMap.get(funcName)?.source ?? "Error",
                type: importMap.get(funcName)?.type === "type",
            })
            break
        case "boolean":
            funcName += "Boolean"
            imports.push({
                name: funcName,
                source: importMap.get(funcName)?.source ?? "Error",
                type: importMap.get(funcName)?.type === "type",
            })
            break
        case "unknown":
            funcName = "genericUnknownError"
            imports.push({
                name: funcName,
                source: importMap.get(funcName)?.source ?? "Error",
                type: importMap.get(funcName)?.type === "type",
            })
            break
        default:
            // eslint-disable-next-line no-case-declarations
            const foundTypeImport = importMap.get(type.replace(/\./g, ""))
            if (
                foundTypeImport === undefined ||
                foundTypeImport.type === "type"
            ) {
                funcName += "Object"
                imports.push({
                    name: funcName,
                    source: importMap.get(funcName)?.source ?? "Error",
                    type: importMap.get(funcName)?.type === "type",
                })
            } else if (foundTypeImport.type === "enum") {
                funcName += "Enum"
                imports.push(
                    {
                        name: funcName,
                        source: importMap.get(funcName)?.source ?? "Error",
                        type: importMap.get(funcName)?.type === "type",
                    },
                    {
                        name: type.replace(/\./g, ""),
                        source: foundTypeImport.source,
                        type: false,
                    },
                )
                return `${funcName}(${varName}, Object.values(${type.replace(
                    /\./g,
                    "",
                )}), ${generateTypescriptObject(options)})`
            } else {
                // TODO
            }
            break
    }
    return `${funcName}(${varName}, ${generateTypescriptObject(options)})`
}

const checkKeyString = (
    argName: string,
    property: Readonly<OsuApiV2InterfaceProperty>,
    imports: TypescriptImport[],
    importMap: ReadonlyMap<string, ImportMapEntry>,
): (string | TypescriptFuncCommand)[] => {
    const param = `${argName}.${property.key}`
    const notes: string[] = []
    const checkCommands: (string | TypescriptFuncCommand)[] = []
    checkCommands.push(
        checkTypeString(
            param,
            property.type,
            imports,
            importMap,
            notes,
            property.optional,
            property.key,
        ),
    )
    checkCommands.push(...notes)
    return checkCommands
}

const getCheckFuncName = (interfaceName: string) =>
    `check${interfaceName.replace(/\./g, "")}Object`

const generateCheckTypeInterface = (
    interfaceData: Readonly<OsuApiV2Interface>,
    importMap: ReadonlyMap<string, ImportMapEntry>,
) => {
    const imports: TypescriptImport[] = [
        {
            name: "DefaultCheckResponseOptions",
            source:
                importMap.get("DefaultCheckResponseOptions")?.source ?? "error",
            type: importMap.get("DefaultCheckResponseOptions")?.type === "type",
        },
        {
            name: "genericCheckObjectForUncheckedKeys",
            source:
                importMap.get("genericCheckObjectForUncheckedKeys")?.source ??
                "error",
            type:
                importMap.get("genericCheckObjectForUncheckedKeys")?.type ===
                "type",
        },
        {
            name: interfaceData.name,
            source: importMap.get(interfaceData.name)?.source ?? "error",
            type: importMap.get(interfaceData.name)?.type === "type",
        },
        {
            name: "expect",
            package: true,
            source: "chai",
        },
    ]
    const argName = camelize(interfaceData.name)
    const optionsName = "options"
    const commandsExtendedKeys =
        interfaceData.extendsList?.map((a) => {
            const checkFuncName = getCheckFuncName(a)
            const foundImport = importMap.get(checkFuncName)
            if (foundImport) {
                imports.push({
                    name: interfaceData.name,
                    source: foundImport.source,
                    type: foundImport.type === "type",
                })
            }
            return `checkedKeys.push(...${checkFuncName}(${argName}, { ...options, ignoreUncheckedKeys: true }))`
        }) ?? []
    const commandsRequiredKeys = interfaceData.properties
        .filter((a) => a.optional !== true)
        .flatMap((property) =>
            checkKeyString(argName, property, imports, importMap),
        )
    const commandsOptionalKeys = interfaceData.properties
        .filter((a) => a.optional === true)
        .flatMap((property) =>
            checkKeyString(argName, property, imports, importMap),
        )
    const commands: (string | TypescriptFuncCommand)[] = [
        "// Check if element is an object",
        `expect(${argName}).to.be.an("object")`,
        "// List of all keys that will be checked",
        "const checkedKeys: string[] = []",
        ...(commandsExtendedKeys.length > 0
            ? ["// Check extended keys", ...commandsExtendedKeys]
            : []),
        ...(commandsRequiredKeys.length > 0
            ? ["// Check required keys", ...commandsRequiredKeys]
            : []),
        ...(commandsOptionalKeys.length > 0
            ? ["// Check optional keys", ...commandsOptionalKeys]
            : []),
        "// Check object for unchecked keys",
        `return genericCheckObjectForUncheckedKeys(${argName}, checkedKeys, ${optionsName})`,
    ]
    let outputString = ""
    const checkFuncName = getCheckFuncName(interfaceData.name)
    outputString += generateTypescriptFunc(
        {
            arguments: [
                {
                    name: argName,
                    type: [`Readonly<${interfaceData.name}>`],
                },
                {
                    name: optionsName,
                    type: ["Readonly<DefaultCheckResponseOptions> = {}"],
                },
            ],
            commands,
            name: checkFuncName,
        },
        {
            export: true,
        },
    )
    const importString = generateTypescriptImports(
        imports.filter((a) => a.name !== checkFuncName),
    )
    if (importString.length > 0) {
        outputString = importString + "\n" + outputString
    }
    return outputString
}

export interface ImportMapEntry {
    source: string
    type: "enum" | "type" | "func"
}

export const generateTypescriptMochaTestString = (
    type: Readonly<OsuApiV2Types>,
    importMap: ReadonlyMap<string, ImportMapEntry>,
): string => {
    if ("properties" in type) {
        return generateCheckTypeInterface(type, importMap)
    }
    return (
        "TODO" + type.name + (importMap.get(type.name)?.source ?? "NOT FOUND!")
    )
}
