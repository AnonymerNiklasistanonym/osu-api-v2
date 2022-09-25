// Package imports
import { expect } from "chai"
// Local imports
import { OsuApiV2ErrorCode } from "../../../src/helpers/custom_errors"
// Type imports
import type {
    OsuApiV2Error,
    OsuApiV2WebRequestError,
} from "../../../src/helpers/custom_errors"
import type { DefaultCheckResponseOptions } from "../../test_helper"

export interface CheckOsuApiV2WebRequestErrorOptions<
    HEADERS_TYPE = Record<string, string>,
> extends DefaultCheckResponseOptions {
    authorizationHeader?: string
    body?: string
    errorType?: OsuApiV2WebRequestExpectedErrorType
    headers?: HEADERS_TYPE
    message?: string
    method?: "post" | "get"
    noAuthorizationHeader?: boolean
    noBody?: boolean
    statusCode?: number
    statusText?: string
    url?: string
}

export const enum OsuApiV2WebRequestExpectedErrorType {
    NOT_FOUND,
    UNAUTHORIZED,
}

export const checkOsuApiV2WebRequestError = (
    error: OsuApiV2WebRequestError,
    options?: CheckOsuApiV2WebRequestErrorOptions,
): void => {
    expect(error).to.be.an("Error")

    if (options?.errorType !== undefined) {
        switch (options.errorType) {
            case OsuApiV2WebRequestExpectedErrorType.NOT_FOUND:
            case OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED:
                expect(error.statusCode).to.be.a("number")
                expect(error.statusText).to.be.a("string")
                break
        }

        switch (options.errorType) {
            case OsuApiV2WebRequestExpectedErrorType.NOT_FOUND:
                expect(error.statusCode).equal(404)
                expect(error.statusText).equal("Not Found")
                break
            case OsuApiV2WebRequestExpectedErrorType.UNAUTHORIZED:
                expect(error.statusCode).equal(401)
                expect(error.statusText).equal("Unauthorized")
                break
        }
    }

    if (options?.body !== undefined) {
        expect(error.body).to.be.equal(options.body)
    }

    expect(error.message).to.be.a("string")
    if (options?.message) {
        expect(error.message).equals(options.message)
    }

    expect(error.statusCode).to.be.a("number")
    if (options?.statusCode) {
        expect(error.statusCode).equals(options.statusCode)
    }

    expect(error.statusText).to.be.a("string")
    if (options?.statusText) {
        expect(error.statusText).equals(options.statusText)
    }

    expect(error.url).to.be.a("string")
    if (options?.url) {
        expect(error.url).equals(options.url)
    }

    expect(["post", "get"]).includes(error.method)
    if (options?.method) {
        expect(error.method).equals(options.method)
    }

    if (error.headers !== undefined) {
        expect(error.headers).to.be.a("object")
    }
    if (options?.headers !== undefined) {
        expect(error.headers).deep.equal(options.headers)
    }
    if (options?.authorizationHeader !== undefined) {
        expect(error.headers?.authorization).to.be.equal(
            options.authorizationHeader,
        )
    }

    if (options?.noAuthorizationHeader === true) {
        expect(error.headers?.authorization).to.be.undefined
    }

    if (options?.noBody === true) {
        expect(error.body).to.be.undefined
    }
}

export interface CheckOsuApiV2ErrorOptions extends DefaultCheckResponseOptions {
    errorCode?: OsuApiV2ErrorCode
}

export const checkOsuApiV2Error = (
    error: OsuApiV2Error | null,
    options?: CheckOsuApiV2ErrorOptions,
): void => {
    expect(error).to.be.an("Error")
    if (error == null) {
        return
    }
    expect(error.code).to.be.a("string")
    expect(error.message).to.be.a("string")

    if (options?.errorCode !== undefined) {
        switch (options.errorCode) {
            case OsuApiV2ErrorCode.NOT_FOUND:
                expect(error.code).equal(OsuApiV2ErrorCode.NOT_FOUND)
                break
            case OsuApiV2ErrorCode.UNEXPECTED_RETURN_TYPE:
                expect(error.code).equal(
                    OsuApiV2ErrorCode.UNEXPECTED_RETURN_TYPE,
                )
                break
        }
    }
}
