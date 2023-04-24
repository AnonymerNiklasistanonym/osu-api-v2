// Package imports
import { NodeType, parse } from "node-html-parser"
// Type imports
import type { HTMLElement } from "node-html-parser"

interface GetSectionData<DATA> {
    data: DATA
    nextTag: Readonly<HTMLElement>
}

interface HTMLSection {
    type: string
}

export interface HTMLSectionHeading extends HTMLSection {
    content: HTMLSections[]
    hyperlink?: string
    level: number
    name: string
    type: "heading"
}

export interface HTMLSectionText extends HTMLSection {
    content: string[]
    type: "text"
}

export interface HTMLSectionTable extends HTMLSection {
    table: string[][]
    type: "table"
}

export interface HTMLSectionList extends HTMLSection {
    list: string[]
    type: "list"
}

export interface HTMLSectionCode extends HTMLSection {
    code: string
    language?: string
    type: "code"
}

export type HTMLSections =
    | HTMLSectionText
    | HTMLSectionHeading
    | HTMLSectionTable
    | HTMLSectionList
    | HTMLSectionCode

const htmlGetText = (textElement: Readonly<HTMLElement>): string =>
    textElement.childNodes
        .map((a) =>
            a.nodeType === NodeType.TEXT_NODE ? a.text : `\`${a.text}\``,
        )
        .join("")

const htmlTableRowToStringList = (
    row: Readonly<HTMLElement>,
    tag = "td",
): string[] => row.querySelectorAll(tag).map(htmlGetText)

const getTableData = (
    table: Readonly<HTMLElement>,
): GetSectionData<HTMLSectionTable> => {
    const rows: string[][] = []
    const thead = table.querySelector("thead>tr")
    if (thead != null) {
        rows.push(htmlTableRowToStringList(thead, "th"))
    }
    for (const tbodyRow of table.querySelectorAll("tr")) {
        const tbodyRowData = htmlTableRowToStringList(tbodyRow)
        if (tbodyRowData.length > 0) {
            rows.push(tbodyRowData)
        }
    }
    return {
        data: { table: rows, type: "table" },
        nextTag: table.nextElementSibling,
    }
}

const getAttributeData = (
    table: Readonly<HTMLElement>,
): GetSectionData<HTMLSectionTable> => {
    console.log("found weird table [1]", table.outerHTML)
    let attributeHtml = parse(table.innerHTML)
    const name = attributeHtml.textContent
    attributeHtml = attributeHtml.nextElementSibling
    const type = attributeHtml != null ? attributeHtml.textContent : "ERROR"
    attributeHtml = attributeHtml?.nextElementSibling
    let description = ""
    while (attributeHtml != null) {
        description += htmlGetText(attributeHtml)
        attributeHtml = attributeHtml?.nextElementSibling
    }
    console.log("found weird table [2]", [name, type, description])
    return {
        data: { table: [[name, type, description]], type: "table" },
        nextTag: table.nextElementSibling,
    }
}

const getListData = (
    list: Readonly<HTMLElement>,
): GetSectionData<HTMLSectionList> => {
    const elements: string[] = []
    for (const element of list.querySelectorAll("li")) {
        elements.push(element.textContent)
    }
    return {
        data: { list: elements, type: "list" },
        nextTag: list.nextElementSibling,
    }
}

const getHeadingData = (
    heading: Readonly<HTMLElement>,
    url: string,
    level = 1,
    depth = 1,
): GetSectionData<HTMLSectionHeading> => {
    const content: HTMLSections[] = []
    let description: string[] = []

    const noDescriptionRoutine = () => {
        if (description.length > 0) {
            content.push({
                content: description.slice(0),
                type: "text",
            })
            description = []
        }
    }

    let element: Readonly<HTMLElement> = heading.nextElementSibling
    while (element != null) {
        const headingLevel = element.rawTagName.match(/h([0-9]+)/)
        if (headingLevel) {
            const headingLevelNum = parseInt(headingLevel[1])
            if (element.text.toLowerCase() === "optional attributes") {
                // If the heading says optional attributes are following downgrade
                // it to a text
                content.push({
                    content: ["Optional attributes"],
                    type: "text",
                })
                element = element.nextElementSibling
                continue
            }
            if (headingLevelNum <= level) {
                // If the heading is on the same level or a parent exit
                break
            }
            // Get the heading and it's content
            noDescriptionRoutine()
            const headingData = getHeadingData(
                element,
                url,
                headingLevelNum,
                depth + 1,
            )
            content.push(headingData.data)
            element = headingData.nextTag
            continue
        } else if (element.rawTagName === "table") {
            // Check if the current element is a table
            noDescriptionRoutine()
            const tableData = getTableData(element)
            content.push(tableData.data)
            element = tableData.nextTag
            continue
        } else if (element.rawTagName === "ul") {
            // Check if the current element is a list
            noDescriptionRoutine()
            const listData = getListData(element)
            content.push(listData.data)
            element = listData.nextTag
            continue
        } else if (element.rawTagName === "pre") {
            // Check if the current element is a code example
            noDescriptionRoutine()
            let language: string | undefined
            const code = parse(element.textContent)
                ?.getElementsByTagName("code")
                ?.at(0)
            if (code !== undefined) {
                // This hack makes it possible to extract the class language
                for (const className of code.classList.values()) {
                    const languagePrefix = "language-"
                    if (className.startsWith(languagePrefix)) {
                        language = className.replace(languagePrefix, "")
                    }
                }
            }
            content.push({
                code: code?.textContent ?? element.textContent,
                language,
                type: "code",
            })
        } else if (element.rawTagName === "div") {
            // Check if the current element is a table
            noDescriptionRoutine()
            const attributeData = getAttributeData(element)
            content.push(attributeData.data)
            element = element.nextElementSibling
            continue
        } else if (element.rawTagName === "p") {
            description.push(element.text)
        }
        element = element.nextElementSibling
    }
    return {
        data: {
            content,
            hyperlink: `${url}#${heading.text.replace(/ /g, "").toLowerCase()}`,
            level,
            name: heading.text,
            type: "heading",
        },
        nextTag: element,
    }
}

const getHtmlHeadings = (
    heading: Readonly<HTMLElement>,
    url: string,
): HTMLSectionHeading[] => {
    const headings: HTMLSectionHeading[] = []

    let element: Readonly<HTMLElement> = heading
    while (element != null) {
        const headingLevel = element.rawTagName.match(/h([0-9]+)/)
        if (headingLevel) {
            const headingData = getHeadingData(
                element,
                url,
                parseInt(headingLevel[1]),
            )
            headings.push(headingData.data)
            element = headingData.nextTag
            continue
        }
        element = element.nextElementSibling
    }
    return headings
}

export const parseHtmlToHeadingSections = (
    htmlRoot: Readonly<HTMLElement>,
    url: string,
): HTMLSectionHeading[] => {
    const headings: HTMLSectionHeading[] = []
    for (const topLevelHeading of htmlRoot.querySelectorAll("h1")) {
        headings.push(...getHtmlHeadings(topLevelHeading, url))
    }
    if (headings.length === 0) {
        throw Error("Found no headings!")
    }
    return headings
}
