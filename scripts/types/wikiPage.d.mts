// This is an auto generated file

// Types: WikiPage

/**
 * @example
 * ```json
 * {
 *     "available_locales": ["en", "id", "ja", "pt-br"],
 *     "layout": "markdown_page",
 *     "locale": "en",
 *     "markdown": "# osu! (game mode)\n\n![Gameplay of osu!](/wiki/shared/Interface_osu.jpg \"osu! Interface\")\n\nMarkdownMarkdownTruncated",
 *     "path": "Game_Modes/osu!",
 *     "subtitle": "Game Modes",
 *     "tags": ["tap", "circles"],
 *     "title": "osu! (game mode)"
 * }
 * ```
 * Represents a wiki article
 * [Source](https://osu.ppy.sh/docs/index.html#wikipage)
 */
export interface WikiPage {
    /**
     * All available locales for the article.
     * Updated types: string[] -> string[]
     */
    available_locales: string[]
    /**
     * The layout type for the page.
     */
    layout: string
    /**
     * All lowercase BCP 47 language tag.
     */
    locale: string
    /**
     * Markdown content.
     */
    markdown: string
    /**
     * Path of the article.
     */
    path: string
    /**
     * The article's subtitle.
     */
    subtitle?: string
    /**
     * Associated tags for the article.
     * Updated types: string[] -> string[]
     */
    tags: string[]
    /**
     * The article's title.
     */
    title: string
}
