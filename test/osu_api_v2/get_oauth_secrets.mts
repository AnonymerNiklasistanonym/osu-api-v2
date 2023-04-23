// Package imports
import { fileURLToPath } from "url"
import { promises as fs } from "fs"
import path from "path"
// Type imports
import type {
    OAuthAccessToken,
    OAuthAccessTokenWithRefreshTokenResponse,
} from "../../src/index.mjs"

export interface OAuthSecretClientCredentials {
    clientId: number
    clientSecret: string
}

export interface OAuthSecretRefreshToken extends OAuthSecretClientCredentials {
    old?: OAuthSecretRefreshToken[]
    redirectUri: string
    refreshToken: string
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const defaultOauthSecretsDir = path.join(__dirname, "..", "..")
const defaultOauthSecretClientCredentialsFilePath = path.join(
    defaultOauthSecretsDir,
    "osu_api_v2_oauth_client_credentials.secret.json",
)
const defaultOauthSecretRefreshTokenFilePath = path.join(
    defaultOauthSecretsDir,
    "osu_api_v2_oauth_refresh_token.secret.json",
)

export const invalidOAuthAccessToken: OAuthAccessToken = {
    access_token: "",
    token_type: "",
}

export const getOAuthSecretClientCredentials = async (
    filePath: string = defaultOauthSecretClientCredentialsFilePath,
): Promise<OAuthSecretClientCredentials> => {
    // If environment variables are found use their values instead
    const processEnvClientId = process.env.OSU_OAUTH_CLIENT_ID
    const processEnvClientSecret = process.env.OSU_OAUTH_CLIENT_SECRET
    if (
        processEnvClientId !== undefined &&
        !isNaN(Number(processEnvClientId)) &&
        processEnvClientSecret !== undefined &&
        processEnvClientSecret.length > 0
    ) {
        return {
            clientId: Number(processEnvClientId),
            clientSecret: processEnvClientSecret,
        }
    }
    // Else try to read them from the provided file path
    const oAuthSecretClientCredentialsContent = await fs.readFile(filePath, {
        encoding: "utf8",
    })
    return JSON.parse(
        oAuthSecretClientCredentialsContent.toString(),
    ) as OAuthSecretClientCredentials
}

export const getOAuthSecretRefreshToken = async (
    filePath: string = defaultOauthSecretRefreshTokenFilePath,
): Promise<OAuthSecretRefreshToken> => {
    // If environment variables are found use their values instead
    const processEnvClientId = process.env.OSU_OAUTH_CLIENT_ID
    const processEnvClientSecret = process.env.OSU_OAUTH_CLIENT_SECRET
    const processEnvRedirectUrl = process.env.OSU_OAUTH_REDIRECT_URL
    const processEnvRefreshToken = process.env.OSU_OAUTH_REFRESH_TOKEN
    if (
        processEnvClientId !== undefined &&
        !isNaN(Number(processEnvClientId)) &&
        processEnvClientSecret !== undefined &&
        processEnvClientSecret.length > 0 &&
        processEnvRedirectUrl !== undefined &&
        processEnvRedirectUrl.length > 0 &&
        processEnvRefreshToken !== undefined &&
        processEnvRefreshToken.length > 0
    ) {
        return {
            clientId: Number(processEnvClientId),
            clientSecret: processEnvClientSecret,
            redirectUri: processEnvRedirectUrl,
            refreshToken: processEnvRefreshToken,
        }
    }
    // Else try to read them from the provided file path
    const oAuthSecretRefreshTokenContent = await fs.readFile(filePath, {
        encoding: "utf8",
    })
    return JSON.parse(
        oAuthSecretRefreshTokenContent.toString(),
    ) as OAuthSecretRefreshToken
}

export const updateOAuthSecretRefreshToken = async (
    currentRefreshToken: OAuthSecretRefreshToken,
    newRefreshToken: OAuthAccessTokenWithRefreshTokenResponse,
    filePath: string = defaultOauthSecretRefreshTokenFilePath,
): Promise<void> => {
    const newRefreshTokenData: OAuthSecretRefreshToken = {
        ...currentRefreshToken,
        old: [
            {
                ...currentRefreshToken,
                old: undefined,
            },
            ...(currentRefreshToken.old !== undefined
                ? currentRefreshToken.old
                : []),
        ].slice(0, 5),
        refreshToken: newRefreshToken.refresh_token,
    }
    await fs.writeFile(
        filePath,
        JSON.stringify(newRefreshTokenData, undefined, 4),
        {
            encoding: "utf8",
        },
    )
}
