/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-undef */

// Package imports
const fs = require("fs")
const path = require("path")

const secretOAuthCredentialsPath = path.join(
    __dirname,
    "..",
    "..",
    "osu_api_v2_oauth_client_credentials.secret.json",
)

try {
    /** @type {{clientId: number;clientSecret: string}} */
    const secretOAuthCredentials = JSON.parse(
        fs.readFileSync(secretOAuthCredentialsPath).toString(),
    )
    console.log(secretOAuthCredentials)

    import("osu-api-v2")
        .then((osuApiV2) =>
            osuApiV2.oauth.clientCredentialsGrant(
                secretOAuthCredentials.clientId,
                secretOAuthCredentials.clientSecret,
            ),
        )
        .then((oauthAccessToken) => {
            console.log(oauthAccessToken)
        })
        .catch(console.error)
} catch (err) {
    console.error(err)
}
