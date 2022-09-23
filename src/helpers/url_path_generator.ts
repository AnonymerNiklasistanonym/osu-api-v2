export const urlPathGenerator = (
    ...path: readonly (string | number | undefined)[]
) =>
    path
        .filter((a) => a !== undefined)
        .map((a) => {
            if (a === undefined) {
                throw Error("This error is just for TypeScript")
            } else if (a === "number") {
                return `${a}`
            }
            return a
        })
        .join("/")
