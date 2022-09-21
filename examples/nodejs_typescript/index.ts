/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// Package imports
import fs from "fs"
import osuApiV2 from "osu-api-v2"
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
const secretOAuthCredentials = JSON.parse(
    fs.readFileSync(secretOAuthCredentialsPath).toString(),
) as OAuthClientCredentialsSecret
console.log(secretOAuthCredentials)

osuApiV2.oauth
    .clientCredentialsGrant(
        secretOAuthCredentials.clientId,
        secretOAuthCredentials.clientSecret,
    )
    .then((oauthAccessToken) => {
        console.log(oauthAccessToken)
    })
    .catch(console.error)
