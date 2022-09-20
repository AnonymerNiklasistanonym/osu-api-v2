// Package imports
import * as path from "path"
import { promises as fsp } from "fs"

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
    "..",
    "authentication.secret.json",
)

export const readOauthCredentials = async (
    filePath: string = defaultOauthCredentialsFilePath,
): Promise<OAuthCredentials> => {
    // If variables are found use their values instead
    if (
        process.env.OSU_OAUTH_CLIENT_ID !== undefined &&
        !isNaN(Number(process.env.OSU_OAUTH_CLIENT_ID)) &&
        process.env.OSU_OAUTH_CLIENT_SECRET !== undefined &&
        process.env.OSU_OAUTH_CLIENT_SECRET.length > 0
    ) {
        return {
            clientId: Number(process.env.OSU_OAUTH_CLIENT_ID),
            clientSecret: process.env.OSU_OAUTH_CLIENT_SECRET,
        }
    }
    const oauthCredentialsFileContent = await fsp.readFile(filePath, {
        encoding: "utf8",
    })
    const oAuthCredentialsJson = JSON.parse(
        oauthCredentialsFileContent,
    ) as OAuthCredentialsJson
    return {
        clientId: oAuthCredentialsJson.osuOAuthClientId,
        clientSecret: oAuthCredentialsJson.osuOAuthClientSecret,
    }
}
