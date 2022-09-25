// Package imports
import { describe, it, Suite } from "mocha"
// Local imports
import { checkOsuApiV2WebRequestError } from "./types/check_custom_errors"
import { OsuApiV2WebRequestError } from "../../src/helpers/custom_errors"

export const customErrorsTestSuite = (): Suite =>
    describe("custom errors", () => {
        describe("OsuApiV2WebRequestError", () => {
            it("should preserve the non private data", () => {
                const error = new OsuApiV2WebRequestError(
                    "message",
                    123,
                    "status",
                    "someUrl",
                    "get",
                    { abc: "def" },
                    { cde: "hij" },
                )
                checkOsuApiV2WebRequestError(error, {
                    body: JSON.stringify({ cde: "hij" }),
                    headers: { abc: "def" },
                    message: "message",
                    method: "get",
                    statusCode: 123,
                    statusText: "status",
                    url: "someUrl",
                })
                const error2 = new OsuApiV2WebRequestError(
                    "message2",
                    401,
                    "status2",
                    "someUrl2",
                    "post",
                    { abc: "def2" },
                    "bodystring",
                )
                checkOsuApiV2WebRequestError(error2, {
                    body: "bodystring",
                    headers: { abc: "def2" },
                    message: "message2",
                    method: "post",
                    statusCode: 401,
                    statusText: "status2",
                    url: "someUrl2",
                })
            })
            it("should mask the authorization header", () => {
                const error = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                    {
                        authorization:
                            "Bearer 098304982039482039482304829034820934",
                    },
                )
                checkOsuApiV2WebRequestError(error, {
                    authorizationHeader: "Bearer 098[redacted]",
                    message: "message",
                    method: "get",
                    statusCode: 400,
                    statusText: "text",
                    url: "someUrl",
                })
                const errorNoAuth = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                )
                checkOsuApiV2WebRequestError(errorNoAuth, {
                    message: "message",
                    method: "get",
                    noAuthorizationHeader: true,
                    statusCode: 400,
                    statusText: "text",
                    url: "someUrl",
                })
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
                checkOsuApiV2WebRequestError(error, {
                    body: JSON.stringify({
                        client_secret: "fjdsnfkdsf[redacted]",
                        test: "abc",
                    }),
                })
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
                checkOsuApiV2WebRequestError(errorNoClientSecret, {
                    body: JSON.stringify({
                        test: "abc",
                    }),
                })
                const errorNoBody = new OsuApiV2WebRequestError(
                    "message",
                    400,
                    "text",
                    "someUrl",
                    "get",
                )
                checkOsuApiV2WebRequestError(errorNoBody, {
                    noBody: true,
                })
            })
        })
    })
