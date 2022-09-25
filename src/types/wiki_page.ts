// Type imports
import type { LanguageLocaleTag } from "./language"

/**
 * Represents a wiki article.
 *
 * ([Source](https://osu.ppy.sh/docs/index.html#wikipage))
 */
export interface WikiPage {
    /** All available locales for the article. */
    available_locales: LanguageLocaleTag[]
    /** The layout type for the page. */
    layout: string
    /** All lowercase BCP 47 language tag. */
    locale: LanguageLocaleTag
    /** Markdown content. */
    markdown: string
    /** Path of the article. */
    path: string
    /** The article's subtitle. */
    subtitle?: string | null
    /** Associated tags for the article. */
    tags: (number | string)[]
    /** The article's title. */
    title: string
}
