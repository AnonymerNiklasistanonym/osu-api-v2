import type { OAuthAccessToken } from "../types/oauth_access_token"
import type { User } from "../types/user"

import { GameMode } from "../types/game_mode"
import { get } from "./get"

/**
 * Gets a user by their user ID
 */
export const id = async (
    oauthAccessToken: OAuthAccessToken,
    userId: number,
    mode?: GameMode,
): Promise<User> => {
    return get(oauthAccessToken, userId, mode)
}
