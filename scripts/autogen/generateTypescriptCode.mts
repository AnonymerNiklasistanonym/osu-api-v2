import { genericStringSorter, removeDuplicates } from "./util.mjs"

export interface GenerateVariableOptions {
    export?: boolean
}
export interface GenerateGeneralOptions {
    indent?: string
    indentLevel?: number
}

const defaultIndent = "    "

const generateIndent = (options?: GenerateGeneralOptions, depth = 0) =>
    (options?.indent ?? defaultIndent).repeat(
        (options?.indentLevel ?? 0) + depth,
    )

const generateGeneric = (generics?: ReadonlyArray<string>) =>
    generics && generics.length > 0 ? `<${generics.join(", ")}>` : ""

const generateExtends = (extendsArr?: ReadonlyArray<string>) =>
    extendsArr && extendsArr.length > 0
        ? ` extends ${extendsArr.join(", ")}`
        : ""

const generateTypescriptDescription = (
    description?: ReadonlyArray<string>,
    options?: GenerateGeneralOptions,
    depth = 0,
) =>
    description && description.filter((a) => a.trim().length > 0).length > 0
        ? `${generateIndent(options, depth)}/**\n${description
              .map((a) => `${generateIndent(options, depth)} * ${a}\n`)
              .join("")}${generateIndent(options, depth)} */\n`
        : ""

export interface TypescriptType {
    description?: ReadonlyArray<string>
    name: string
    types: ReadonlyArray<string>
}

export const generateTypescriptType = (
    typeData: TypescriptType,
    options?: GenerateVariableOptions & GenerateGeneralOptions,
) =>
    `${generateTypescriptDescription(typeData.description)}${
        options?.export ? "export " : ""
    }type ${typeData.name} = ${typeData.types.join(" | ")}\n`

export interface TypescriptEnumValue<T> {
    description?: ReadonlyArray<string>
    key: string
    value: T
}

export interface TypescriptEnum {
    description?: ReadonlyArray<string>
    name: string
    values: ReadonlyArray<TypescriptEnumValue<string | number>>
}

export const generateTypescriptEnum = (
    enumData: TypescriptEnum,
    options?: GenerateVariableOptions & GenerateGeneralOptions,
) =>
    `${generateTypescriptDescription(enumData.description)}${
        options?.export ? "export " : ""
    }enum ${enumData.name} {\n${[...enumData.values]
        .sort((a, b) => genericStringSorter(a.key, b.key))
        .map(
            (enumValue) =>
                `${generateTypescriptDescription(
                    enumValue.description,
                    options,
                    1,
                )}${generateIndent(options, 1)}${enumValue.key} = ${
                    enumValue.value
                },\n`,
        )
        .join("")}${generateIndent(options)}}\n`

export interface TypescriptValue {
    description?: ReadonlyArray<string>
    name: string
    value: string | number
}

export const generateTypescriptValue = (
    valueData: TypescriptValue,
    options?: GenerateVariableOptions & GenerateGeneralOptions,
) =>
    `${generateTypescriptDescription(valueData.description)}${
        options?.export ? "export " : ""
    }const ${valueData.name} = ${
        typeof valueData.value === "number"
            ? valueData.value
            : `"${valueData.value}"`
    }\n`

export interface TypescriptInterfaceProperty {
    description?: ReadonlyArray<string>
    key: string
    optional?: boolean
    type: string[]
}

export interface TypescriptInterface {
    description?: ReadonlyArray<string>
    extends?: ReadonlyArray<string>
    generic?: ReadonlyArray<string>
    name: string
    properties: ReadonlyArray<TypescriptInterfaceProperty>
}

export const generateTypescriptInterface = (
    interfaceData: TypescriptInterface,
    options?: GenerateVariableOptions & GenerateGeneralOptions,
) =>
    `${generateTypescriptDescription(interfaceData.description)}${
        options?.export ? "export " : ""
    }interface ${interfaceData.name}${generateGeneric(
        interfaceData.generic,
    )}${generateExtends(interfaceData.extends)} {\n${[
        ...interfaceData.properties,
    ]
        .sort((a, b) => genericStringSorter(a.key, b.key))
        .map(
            (interfaceProperty) =>
                `${generateTypescriptDescription(
                    interfaceProperty.description,
                    options,
                    1,
                )}${generateIndent(options, 1)}${
                    interfaceProperty.key.includes("@")
                        ? `"${interfaceProperty.key}"`
                        : interfaceProperty.key
                }${
                    interfaceProperty.optional ? "?" : ""
                }: ${interfaceProperty.type.join(" | ")}\n`,
        )
        .join("")}${generateIndent(options)}}\n`

export interface TypescriptImportBase {
    package?: boolean
    source: string
    type?: boolean
}

export interface TypescriptImport extends TypescriptImportBase {
    name: string
}

interface TypescriptImportMerged extends TypescriptImportBase {
    names: string[]
}

export const generateTypescriptImports = (
    importData: ReadonlyArray<TypescriptImport>,
): string => {
    const cleanedImportData = removeDuplicates(
        importData,
        (a, b) => a.name === b.name,
    ).sort((a, b) => genericStringSorter(a.name, b.name))
    const cleanedImportDataMerged: TypescriptImportMerged[] = []
    for (const typeImport of cleanedImportData) {
        const typeImportMergedIndex = cleanedImportDataMerged.findIndex(
            (a) =>
                a.names.includes(typeImport.name) &&
                a.package === typeImport.package &&
                a.source === typeImport.source &&
                a.type === typeImport.type,
        )
        if (typeImportMergedIndex !== -1) {
            cleanedImportDataMerged[typeImportMergedIndex].names.push(
                typeImport.name,
            )
        } else {
            cleanedImportDataMerged.push({
                ...typeImport,
                names: [typeImport.name],
            })
        }
    }
    // Merge imports from the same file
    const typeImports = cleanedImportDataMerged.filter((a) => a.type === true)
    const relativeImports = cleanedImportDataMerged.filter(
        (a) => a.type !== true && a.package !== true,
    )
    const packageImports = cleanedImportDataMerged.filter(
        (a) => a.type !== true && a.package === true,
    )
    return (
        (packageImports.length > 0
            ? "// Package imports\n" +
              packageImports
                  .map(
                      (a) =>
                          `import ${generateTypescriptObject(
                              a.names.map((a) => ({ name: a })),
                          )} from "${a.source}"\n`,
                  )
                  .join("")
            : "") +
        (relativeImports.length > 0
            ? "// Relative imports\n" +
              relativeImports
                  .map(
                      (a) =>
                          `import ${generateTypescriptObject(
                              a.names.map((a) => ({ name: a })),
                          )} from "${a.source}"\n`,
                  )
                  .join("")
            : "") +
        (typeImports.length > 0
            ? "// Type imports\n" +
              typeImports
                  .map(
                      (a) =>
                          `import type ${generateTypescriptObject(
                              a.names.map((a) => ({ name: a })),
                          )} from "${a.source}"\n`,
                  )
                  .join("")
            : "")
    )
}

export interface TypescriptFuncArgument {
    name: string
    optional?: boolean
    type: string[]
}

export interface TypescriptFuncCommand {
    commands: (string | TypescriptFuncCommand)[]
    scope: [string, string]
}

export interface TypescriptFunc {
    arguments: TypescriptFuncArgument[]
    commands: (string | TypescriptFuncCommand)[]
    description?: string[]
    name: string
}

const generateTypescriptFuncCommand = (
    funcCommand: Readonly<string | TypescriptFuncCommand>,
    options: GenerateGeneralOptions & GenerateVariableOptions = {},
    depth = 0,
): string =>
    typeof funcCommand === "string"
        ? `${generateIndent(options, depth)}${funcCommand}\n`
        : `${generateIndent(options, depth)}${
              funcCommand.scope[0]
          }\n${funcCommand.commands
              .map((a) => generateTypescriptFuncCommand(a, options, depth + 1))
              .join("")}${generateIndent(options, depth)}${
              funcCommand.scope[1]
          }\n`

export const generateTypescriptFunc = (
    func: Readonly<TypescriptFunc>,
    options: GenerateGeneralOptions & GenerateVariableOptions = {},
    depth = 0,
): string =>
    `${generateTypescriptDescription(
        func.description,
        options,
        depth,
    )}${generateIndent(options, depth)}${
        options.export ? "export " : ""
    }const ${func.name} = (${func.arguments
        .map((a) => `${a.name}${a.optional ? "?" : ""}: ${a.type.join(" | ")}`)
        .join(", ")}) => {\n${func.commands
        .map((a) => generateTypescriptFuncCommand(a, options, depth + 1))
        .join("")}${generateIndent(options, depth)}}\n`

export interface TypescriptObjectProperty {
    name: string
    value?: string
}

export const generateTypescriptObject = (
    properties: ReadonlyArray<TypescriptObjectProperty>,
): string =>
    "{ " +
    properties
        .map(
            (property) =>
                property.name +
                (property.value !== undefined ? `: ${property.value}` : ""),
        )
        .join(", ") +
    " }"
