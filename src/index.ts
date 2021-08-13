export const Greeter = (name: string): string => `Hello ${name}`

import { beatmap } from "./beatmap/beatmap"
import { oauth } from "./oauth/oauth"

export default {
    beatmap,
    oauth,
}
