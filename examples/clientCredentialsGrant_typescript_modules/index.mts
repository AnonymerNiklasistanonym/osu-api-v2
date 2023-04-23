/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

// Package imports
import { fileURLToPath } from "url"
import { promises as fs } from "fs"
import osuApiV2 from "osu-api-v2"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
    const secretOAuthCredentialsContent = await fs.readFile(
        secretOAuthCredentialsPath,
    )
    const secretOAuthCredentials = JSON.parse(
        secretOAuthCredentialsContent.toString(),
    ) as OAuthClientCredentialsSecret
    console.log(secretOAuthCredentials)

    const oauthAccessToken = await osuApiV2.oauth.clientCredentialsGrant(
        secretOAuthCredentials.clientId,
        secretOAuthCredentials.clientSecret,
    )
    console.log(oauthAccessToken)
} catch (err) {
    console.error(err)
}
