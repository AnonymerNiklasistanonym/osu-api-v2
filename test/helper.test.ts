// Package imports
import { describe, it } from "mocha"
import { expect } from "chai"
import { promises as fsp } from "fs"
import path from "path"
// Type imports
import {
    OsuApiV2Error,
    OsuApiV2ErrorCode,
    OsuApiV2WebRequestError,
} from "../src/helpers/custom_errors"
import { urlParameterGenerator } from "../src/helpers/url_parameter_generator"

/**
 * Helper method to timeout tests where a request takes more than a certain time per request on average.
 *
 * @param requests The number of expected requests being made by the test case.
 * @returns The maximum number of time this test case should take to run before timing it out.
 */
export const timeoutForRequestsInMs = (requests: number) => 2 * 1000 * requests

const cachedOsuApiResponses = path.join(
    __dirname,
    "..",
    "cached-osu-api-responses",
)

export const saveOsuResponseObjectAsFile = async (
    fileName: string,
    jsonObject: unknown,
): Promise<void> => {
    await fsp.mkdir(cachedOsuApiResponses, {
        recursive: true,
    })
    const outputFile = path.join(cachedOsuApiResponses, `${fileName}.json`)
    await fsp.writeFile(outputFile, JSON.stringify(jsonObject, undefined, 4), {
        encoding: "utf8",
    })
}

export const enum OsuApiV2WebRequestErrorType {
    NOT_FOUND,
    UNAUTHORIZED,
}

export const checkOsuApiV2WebRequestError = (
    error: OsuApiV2WebRequestError,
    errorType?: OsuApiV2WebRequestErrorType,
): void => {
    expect(error).to.be.an("Error")

    switch (errorType) {
        case OsuApiV2WebRequestErrorType.NOT_FOUND:
        case OsuApiV2WebRequestErrorType.UNAUTHORIZED:
            expect(error.statusCode).to.be.a("number")
            expect(error.statusText).to.be.a("string")
            break
        default:
            break
    }

    switch (errorType) {
        case OsuApiV2WebRequestErrorType.NOT_FOUND:
            expect(error.statusCode).equal(404)
            expect(error.statusText).equal("Not Found")
            break
        case OsuApiV2WebRequestErrorType.UNAUTHORIZED:
            expect(error.statusCode).equal(401)
            expect(error.statusText).equal("Unauthorized")
            break
        default:
            break
    }
}

export const checkOsuApiV2Error = (
    error: OsuApiV2Error | null,
    errorCode?: OsuApiV2ErrorCode,
): void => {
    expect(error).to.be.an("Error")
    if (error == null) {
        return
    }
    expect(error.code).to.be.a("string")
    expect(error.message).to.be.a("string")

    switch (errorCode) {
        case OsuApiV2ErrorCode.NOT_FOUND:
            expect(error.code).equal(OsuApiV2ErrorCode.NOT_FOUND)
            break
        default:
            break
    }
}

export const cacheResponse = async (
    prefix: string,
    name: string,
    jsonData: unknown,
): Promise<void> => {
    const outputFile = path.join(
        cachedOsuApiResponses,
        `${prefix}_${name}.json`,
    )
    await fsp.writeFile(outputFile, JSON.stringify(jsonData), {
        encoding: "utf8",
    })
}

describe("OsuApiV2WebRequestError", () => {
    it("should mask the authorization header", () => {
        const error = new OsuApiV2WebRequestError(
            "message",
            400,
            "text",
            "someUrl",
            "get",
            { authorization: "Bearer 098304982039482039482304829034820934" },
        )
        expect(error.headers?.authorization).equals("Bearer 098[redacted]")

        const errorNoAuth = new OsuApiV2WebRequestError(
            "message",
            400,
            "text",
            "someUrl",
            "get",
        )
        expect(errorNoAuth.headers?.authorization).to.be.undefined
    })
    it("should mask the client secret in body", () => {
        const error = new OsuApiV2WebRequestError(
            "message",
            400,
            "text",
            "someUrl",
            "get",
            undefined,
            {
                client_secret: "fjdsnfkdsfnksdfnskfns",
                test: "abc",
            },
        )
        expect(error.body).equals(
            JSON.stringify({
                client_secret: "fjdsnfkdsf[redacted]",
                test: "abc",
            }),
        )

        const errorNoClientSecret = new OsuApiV2WebRequestError(
            "message",
            400,
            "text",
            "someUrl",
            "get",
            undefined,
            {
                test: "abc",
            },
        )
        expect(errorNoClientSecret.body).equals(
            JSON.stringify({
                test: "abc",
            }),
        )

        const errorNoBody = new OsuApiV2WebRequestError(
            "message",
            400,
            "text",
            "someUrl",
            "get",
        )
        expect(errorNoBody.body).to.be.undefined
    })
})

describe("helper", () => {
    it("urlParameterGenerator", () => {
        const paramGeneratorEmpty = urlParameterGenerator()
        expect(paramGeneratorEmpty).to.equal("")

        const paramGeneratorEmptyArray = urlParameterGenerator([])
        expect(paramGeneratorEmptyArray).to.equal("")

        const paramGeneratorArrayWithUndefinedValues1 = urlParameterGenerator([
            { name: "a", value: undefined },
        ])
        expect(paramGeneratorArrayWithUndefinedValues1).to.equal("")

        const paramGeneratorArrayWithUndefinedValues2 = urlParameterGenerator([
            { name: "a" },
        ])
        expect(paramGeneratorArrayWithUndefinedValues2).to.equal("")

        const paramGeneratorArrayWithUndefinedValues3 = urlParameterGenerator([
            { name: "a", value: undefined },
            { name: "b", value: undefined },
        ])
        expect(paramGeneratorArrayWithUndefinedValues3).to.equal("")

        const paramGeneratorSingleString = urlParameterGenerator([
            { name: "a", value: "b" },
        ])
        expect(paramGeneratorSingleString).to.equal("?a=b")

        const paramGeneratorMultipleStrings = urlParameterGenerator([
            { name: "a", value: "b" },
            { name: "c", value: "d" },
        ])
        expect(paramGeneratorMultipleStrings).to.equal("?a=b&c=d")
    })
})
