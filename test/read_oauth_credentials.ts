import { promises as fsp } from "fs"
import * as path from "path"

export interface OAuthCredentialsJson {
    osuOAuthClientId: number
    osuOAuthClientSecret: string
}

export interface OAuthCredentials {
    clientId: number
    clientSecret: string
}

export const defaultOauthCredentialsFilePath = path.join(
    __dirname,
    "..",
    "authentication.secret.json",
)

export const readOauthCredentials = async (
    filePath: string = defaultOauthCredentialsFilePath,
): Promise<OAuthCredentials> => {
    const oauthCredentialsFileContent = await fsp.readFile(filePath, {
        encoding: "utf8",
    })
    const oAuthCredentialsJson = JSON.parse(oauthCredentialsFileContent)
    return {
        clientId: oAuthCredentialsJson.osuOAuthClientId,
        clientSecret: oAuthCredentialsJson.osuOAuthClientSecret,
    }
}
