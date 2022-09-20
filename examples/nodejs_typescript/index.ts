// Package imports
import fs from "fs"
import osuApiV2 from "osu-api-v2"
import path from "path"

const secretOAuthCredentialsPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "authentication.secret.json",
)
interface SecretOAuthCredentials {
    osuOAuthClientId: number
    osuOAuthClientSecret: string
}
const secretOAuthCredentials = JSON.parse(
    fs.readFileSync(secretOAuthCredentialsPath).toString(),
) as SecretOAuthCredentials
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
