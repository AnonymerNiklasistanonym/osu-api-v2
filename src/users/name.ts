import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { User } from "../types/user"

import { GameMode } from "../types/game_mode"
import { get } from "./get"

/**
 * Gets a user by their username
 */
export const name = async (
    oauthAccessToken: OAuthAccessToken,
    userName: string,
    mode?: GameMode,
): Promise<User> => {
    return get(oauthAccessToken, userName, mode)
}
