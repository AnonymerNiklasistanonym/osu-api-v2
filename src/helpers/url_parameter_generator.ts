type UrlParameterValue = number | string
type UrlParameterValues = UrlParameterValue | readonly UrlParameterValue[]

export interface UrlParameter {
    name: string
    value?: UrlParameterValues
}

export interface UrlParameterFiltered extends UrlParameter {
    value: UrlParameterValues
}

export const urlParameterGenerator = (
    urlParameters?: readonly UrlParameter[],
): string => {
    const urlParametersFiltered = urlParameters?.filter(
        (param) => param.value !== undefined,
    ) as UrlParameterFiltered[] | undefined
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
        if (typeof value === "string") {
            valueStr = value
        } else if (typeof value === "number") {
            valueStr = `${value}`
        } else {
            // https://github.com/ppy/osu-web/issues/5832#issuecomment-605456962
            valueStr = value.join(" ")
        }
        return `${prev}${delimiterToPrevious}${curr.name}=${valueStr}`
    }, "?")
}
