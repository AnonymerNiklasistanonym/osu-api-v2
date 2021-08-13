import { beatmap } from "./beatmap/beatmap"
import { oauth } from "./oauth/oauth"

const osuApiV2 = {
    beatmap,
    oauth,
}

// Typescript default export (import osuApiV2 from "osuApiV2")
// NodeJs: (const osuApiV2 = require("osuApiV2").default)
export default osuApiV2
// This is not working:
//// NodeJs compatibility (const osuApiV2 = require("osuApiV2"))
//module.exports = osuApiV2
