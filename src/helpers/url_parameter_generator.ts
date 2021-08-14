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
        // TODO How to parse an array?
        return `${prev}${delimiterToPrevious}${curr.name}=${value}`
    }, "?")
}
