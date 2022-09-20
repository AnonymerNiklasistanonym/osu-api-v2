/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */

// Package imports
const fs = require("fs")
const osuApiV2 = require("osu-api-v2").default
const path = require("path")

const secretOAuthCredentialsPath = path.join(
    __dirname,
    "..",
    "..",
    "authentication.secret.json",
)
/** @type {{osuOAuthClientId: number;osuOAuthClientSecret: string}} */
const secretOAuthCredentials = JSON.parse(
    fs.readFileSync(secretOAuthCredentialsPath).toString(),
)
console.log(secretOAuthCredentials)

osuApiV2.oauth
    .clientCredentialsGrant(
        secretOAuthCredentials.osuOAuthClientId,
        secretOAuthCredentials.osuOAuthClientSecret,
    )
    .then((oauthAccessToken) => {
        console.log(oauthAccessToken)
    })
    .catch(console.error)
