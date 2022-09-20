export interface UrlParameter {
    name: string
    value?: string | string[]
}

export const urlParameterGenerator = (
    urlParameters?: UrlParameter[],
): string => {
    const urlParametersFiltered = urlParameters?.filter(
        (param) => param.value !== undefined,
    )
    if (
        urlParametersFiltered === undefined ||
        urlParametersFiltered.length === 0
    ) {
        return ""
    }

    return urlParametersFiltered.reduce((prev, curr, currIndex) => {
        let delimiterToPrevious
        if (currIndex !== 0) {
            delimiterToPrevious = "&"
        } else {
            delimiterToPrevious = ""
        }
        const value = curr.value
        let valueStr
        if (value === undefined) {
            valueStr = "undefined"
        } else if (typeof value === "string") {
            valueStr = value
        } else {
            // TODO How to parse an array?
            valueStr = value.join(",")
        }
        return `${prev}${delimiterToPrevious}${curr.name}=${valueStr}`
    }, "?")
}
