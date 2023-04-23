/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

// Package imports
import osuApiV2, { OAuthAuthorizeScope } from "osu-api-v2"
import { fileURLToPath } from "url"
import fs from "fs"
import http from "http"
import open from "open"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const secretOAuthCredentialsPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "osu_api_v2_oauth_refresh_token.secret.json",
)
interface OAuthRefreshTokenSecret {
    clientId: number
    clientSecret: string
    redirectUri: string
}
// MAKE SURE THAT YOU REGISTERED THE APPLICATION WITH THE URL
// "http://localhost:8888" because the server uses that one
const secretOAuthCredentials = JSON.parse(
    fs.readFileSync(secretOAuthCredentialsPath).toString(),
) as OAuthRefreshTokenSecret
console.log(secretOAuthCredentials)

const REDIRECT_URL = "http://localhost"
const REDIRECT_PORT = 8888

if (secretOAuthCredentials.redirectUri !== `${REDIRECT_URL}:${REDIRECT_PORT}`) {
    throw Error(
        `The only supported redirect URI by this server in this example is '${REDIRECT_URL}:${REDIRECT_PORT}' - be sure that you also registered it on the osu! website with this URL`,
    )
}

const OK_STATUS_CODE = 200
const FORBIDDEN_STATUS_CODE = 403

// Create server that will catch the browser redirect after a successful
// authorization and contains the code token
const server = http.createServer((req, res) => {
    console.log(
        `osu!api v2 redirect was detected ${JSON.stringify({
            host: req.headers.host,
            location: req.headers.location,
            method: req.method,
            referer: req.headers.referer,
            url: req.url,
        })}`,
    )
    if (req.url && req.headers.host) {
        if (req.url.endsWith("/")) {
            res.writeHead(OK_STATUS_CODE)
            res.end(
                "<html><body></body><script>window.location = window.location.href.replace('#', '?');</script></html>",
            )
        } else {
            const url = new URL(req.headers.host + req.url)
            const codeToken = url.searchParams.get("code")
            if (codeToken != null) {
                console.log(
                    "osu!api v2 redirect contained code token:",
                    codeToken,
                )
                osuApiV2.oauth
                    .authorizationCodeGrant(
                        secretOAuthCredentials.clientId,
                        secretOAuthCredentials.clientSecret,
                        secretOAuthCredentials.redirectUri,
                        codeToken,
                    )
                    .then((codeGrantAuthorization) => {
                        console.log(codeGrantAuthorization)
                        return codeGrantAuthorization
                    })
                    .then((codeGrantAuthorization) => {
                        // Tell user that the page can now be closed and clear the private tokens from the URL
                        const refreshToken =
                            codeGrantAuthorization.refresh_token
                        res.writeHead(OK_STATUS_CODE)
                        res.end(
                            `<html><style>.spoiler{
                  color: black;
                  background-color:black;
                }
                .spoiler:hover{
                  color: white;
                }</style><body><p>osu!api v2 connection was successful. You can now close this window.</p><br><p>For a permanent authentication you can copy the following refresh token:</p><br><p>Refresh Token: <span class="spoiler">${
                    refreshToken ? refreshToken : "ERROR"
                }</span></p></body><script>window.history.replaceState({}, document.title, "/");</script></html>`,
                        )
                        console.log("osu!api v2 connection was successful")
                    })
                    .catch((err) => {
                        res.writeHead(FORBIDDEN_STATUS_CODE)
                        res.end(
                            `<html><body>osu!api v2 connection was not successful: ${
                                (err as Error).message
                            }</body></html>`,
                        )
                    })
            } else {
                res.writeHead(FORBIDDEN_STATUS_CODE)
                res.end(
                    "<html><body>osu!api v2 connection was not successful: Code was not found!</body></html>",
                )
            }
        }
    } else {
        res.writeHead(FORBIDDEN_STATUS_CODE)
        res.end("Error")
    }
})
try {
    await new Promise<void>((resolve) => {
        server.listen(REDIRECT_PORT, undefined, () => {
            console.log("Server started")
            resolve()
        })
    })
    // Request code grant
    const authorizeUrl = osuApiV2.oauth.authorizeRedirectUrlGenerator(
        secretOAuthCredentials.clientId,
        secretOAuthCredentials.redirectUri,
        [OAuthAuthorizeScope.PUBLIC, OAuthAuthorizeScope.IDENTIFY],
    )
    await open(authorizeUrl)
} catch (err) {
    console.error(err)
}
