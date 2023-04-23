/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// Package imports
import fs from "fs"
import path from "path"

const secretOAuthCredentialsPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "osu_api_v2_oauth_client_credentials.secret.json",
)

interface OAuthClientCredentialsSecret {
    clientId: number
    clientSecret: string
}
try {
    const secretOAuthCredentials = JSON.parse(
        fs.readFileSync(secretOAuthCredentialsPath).toString(),
    ) as OAuthClientCredentialsSecret
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
