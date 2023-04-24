// Package imports
import { expect } from "chai"
// Relative imports
import { genericCheckIfNumber } from "./checkGeneric.mjs"
import { genericCheckIfString } from "./checkGeneric.mjs"
import { genericCheckObjectForUncheckedKeys } from "./checkGeneric.mjs"
// Type imports
import type { DefaultCheckResponseOptions } from "./checkGeneric.mjs"
import type { GithubUser } from "../types/githubUser.d.mjs"

export const checkGithubUserObject = (githubUser: Readonly<GithubUser>, options: Readonly<DefaultCheckResponseOptions> = {}) => {
    // Check if element is an object
    expect(githubUser).to.be.an("object")
    // List of all keys that will be checked
    const checkedKeys: string[] = []
    // Check required keys
    genericCheckIfString(githubUser.display_name, { checkedKey: "display_name", checkedKeys })
    // Check optional keys
    genericCheckIfString(githubUser.github_url, { checkedKey: "github_url", checkedKeys, orUndef: true })
    genericCheckIfNumber(githubUser.id, { checkedKey: "id", checkedKeys, orUndef: true })
    genericCheckIfString(githubUser.osu_username, { checkedKey: "osu_username", checkedKeys, orUndef: true })
    genericCheckIfNumber(githubUser.user_id, { checkedKey: "user_id", checkedKeys, orUndef: true })
    genericCheckIfString(githubUser.user_url, { checkedKey: "user_url", checkedKeys, orUndef: true })
    // Check object for unchecked keys
    return genericCheckObjectForUncheckedKeys(githubUser, checkedKeys, options)
}
