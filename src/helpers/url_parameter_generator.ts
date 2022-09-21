export interface UrlParameter {
    name: string
    value?: string | readonly string[]
}

export const urlParameterGenerator = (
    urlParameters?: readonly UrlParameter[],
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
            // https://github.com/ppy/osu-web/issues/5832#issuecomment-605456962
            valueStr = value.join(" ")
        }
        return `${prev}${delimiterToPrevious}${curr.name}=${valueStr}`
    }, "?")
}
