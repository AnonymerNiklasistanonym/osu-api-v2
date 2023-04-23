export const urlPathGenerator = (
    ...path: readonly (string | number | undefined)[]
) =>
    path
        .map((a) => {
            if (typeof a === "number") {
                return `${a}`
            }
            return a
        })
        .filter((a) => a !== undefined)
        .join("/")
