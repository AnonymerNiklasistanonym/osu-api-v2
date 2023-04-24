// This is an auto generated file

// Types: ChangelogEntry

// Type imports
import type { GithubUser } from "./githubUser.d.mjs"
import type { Timestamp } from "./timestamp.d.mjs"

/**
 * @example
 * ```json
 * {
 *   "id": null,
 *   "repository": null,
 *   "github_pull_request_id": null,
 *   "github_url": null,
 *   "url": "https://osu.ppy.sh/home/news/2021-05-20-spring-fanart-contest-results",
 *   "type": "fix",
 *   "category": "Misc",
 *   "title": "Spring is here!",
 *   "message_html": "New seasonal backgrounds ahoy! Amazing work by the artists.\n",
 *   "major": true,
 *   "created_at": "2021-05-20T10:56:49+00:00"
 * }
 * ```
 * The following are attributes which may be additionally included in responses. Relevant endpoints should list them if applicable.
 * [Source](https://osu.ppy.sh/docs/index.html#changelogentry)
 */
export interface ChangelogEntry {
    category: string
    /**
     * Updated types: `Timestamp` -> Timestamp
     */
    created_at?: Timestamp
    github_pull_request_id?: number
    github_url?: string
    /**
     * Updated types: `GithubUser` -> GithubUser
     */
    github_user?: GithubUser
    id?: number
    major: boolean
    message?: string
    message_html?: string
    repository?: string
    title?: string
    type: string
    url?: string
}
