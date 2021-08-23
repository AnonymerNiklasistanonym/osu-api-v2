# osu-api-v2

An easy way to use the [osu!api v2](https://osu.ppy.sh/docs/index.html).

**Attention: This is only a prototype that is currently aimed at providing beatmap information for another project and *NOT* a complete implementation of this api!**

- [Getting started](#getting-started)
  - [Acquire osu! OAuth credentials](#acquire-osu-oauth-credentials)
  - [Use it in a Node.js project](#use-it-in-a-nodejs-project)
  - [Use it in a Typescript project](#use-it-in-a-typescript-project)
- [Endpoints](#endpoints)
  - [`osuApiV2.beatmaps`](#osuapiv2beatmaps)
    - [`osuApiV2.beatmaps.lookup()`](#osuapiv2beatmapslookup)
  - [`osuApiV2.beatmaps.scores`](#osuapiv2beatmapsscores)
    - [`osuApiV2.beatmaps.scores.users()`](#osuapiv2beatmapsscoresusers)
- [Testing and Linting](#testing-and-linting)
  - [Testing](#testing)
    - [Coverage](#coverage)
  - [Linting and Formatting](#linting-and-formatting)
- [Manage npm package](#manage-npm-package)
  - [Preview package content](#preview-package-content)
  - [Update/Publish package](#updatepublish-package)

## Getting started

### Acquire osu! OAuth credentials

You need to acquire a client ID and client secret to use the [osu!api v2](https://osu.ppy.sh/docs/index.html) which can be done in the following steps:

1. [Create an osu! account or log into an existing account](https://osu.ppy.sh)
2. Go to the [account settings](https://osu.ppy.sh/home/account/edit)
3. Scroll to the section called `OAuth`
4. Create a new OAuth service and copy the client ID and the client secret from there

### Use it in a Node.js project

`package.json`:

```json
{
    "name": "test-osu-api-v2-nodejs",
    "version": "1.0.0",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {
        "osu-api-v2": "^0.0.6"
    }
}
```

`index.js`:


```js
const osuApiV2 = require("osu-api-v2").default

// TODO: Replace the strings with your client ID and secret!
osuApiV2.oauth.clientCredentialsGrant(
    1234, // Your secret oauthCredentials.clientId
    "clientSecret", // Your secret oauthCredentials.clientSecret
).then(oauthAccessToken => {
    console.log(oauthAccessToken)
})
```

Run:

```sh
npm start
```

### Use it in a Typescript project

`package.json`:

```json
{
    "name": "test-osu-api-v2-typescript",
    "version": "1.0.0",
    "scripts": {
        "build": "tsc",
        "start": "node dist/index.js"
    },
    "dependencies": {
        "osu-api-v2": "^0.0.6"
    },
    "devDependencies": {
        "typescript": "^4.3.5"
    }
}
```

`tsconfig.json`:

```json
{
    "compilerOptions": {
        "module": "CommonJS",
        "outDir": "dist",
        "moduleResolution": "Node",
        "target": "ES6"
    },
    "exclude": [
      "dist",
      "node_modules"
    ]
}
```

`index.ts`:


```js
import osuApiV2 from "osu-api-v2"

// TODO: Replace the strings with your client ID and secret!
osuApiV2.oauth.clientCredentialsGrant(
    1234, // Your secret oauthCredentials.clientId
    "clientSecret", // Your secret oauthCredentials.clientSecret
).then(oauthAccessToken => {
    console.log(oauthAccessToken)
})
```

Run:

```sh
npm run build
npm start
```

## Endpoints

### `osuApiV2.beatmaps`

#### `osuApiV2.beatmaps.lookup()`

```ts
const beatmapRankedOsu = await osuApiV2.beatmaps.lookup(
    oauthAccessToken,
    112385,
)
```

```json
{
    "beatmapset_id": 34256,
    "difficulty_rating": 3.84,
    "id": 112385,
    "mode": "osu",
    "status": "loved",
    "total_length": 264,
    "user_id": 251395,
    "version": "Hard",
    "accuracy": 4,
    "ar": 8,
    "bpm": 176,
    "convert": false,
    "count_circles": 241,
    "count_sliders": 198,
    "count_spinners": 3,
    "cs": 4,
    "deleted_at": null,
    "drain": 5,
    "hit_length": 160,
    "is_scoreable": true,
    "last_updated": "2014-03-10T16:31:10+00:00",
    "mode_int": 0,
    "passcount": 252031,
    "playcount": 1214665,
    "ranked": 4,
    "url": "https://osu.ppy.sh/beatmaps/112385",
    "checksum": "820b55194a1d6415bed0c3ed1dd4d5b9",
    "beatmapset": {
        "artist": "Pendulum",
        "artist_unicode": "Pendulum",
        "covers": {
            "cover": "https://assets.ppy.sh/beatmaps/34256/covers/cover.jpg?1622048848",
            "cover@2x": "https://assets.ppy.sh/beatmaps/34256/covers/cover@2x.jpg?1622048848",
            "card": "https://assets.ppy.sh/beatmaps/34256/covers/card.jpg?1622048848",
            "card@2x": "https://assets.ppy.sh/beatmaps/34256/covers/card@2x.jpg?1622048848",
            "list": "https://assets.ppy.sh/beatmaps/34256/covers/list.jpg?1622048848",
            "list@2x": "https://assets.ppy.sh/beatmaps/34256/covers/list@2x.jpg?1622048848",
            "slimcover": "https://assets.ppy.sh/beatmaps/34256/covers/slimcover.jpg?1622048848",
            "slimcover@2x": "https://assets.ppy.sh/beatmaps/34256/covers/slimcover@2x.jpg?1622048848"
        },
        "creator": "Zapy",
        "favourite_count": 1874,
        "hype": null,
        "id": 34256,
        "nsfw": false,
        "play_count": 3010695,
        "preview_url": "//b.ppy.sh/preview/34256.mp3",
        "source": "",
        "status": "loved",
        "title": "Blood Sugar",
        "title_unicode": "Blood Sugar",
        "user_id": 251395,
        "video": false,
        "availability": {
            "download_disabled": false,
            "more_information": null
        },
        "bpm": 176,
        "can_be_hyped": false,
        "discussion_enabled": false,
        "discussion_locked": false,
        "is_scoreable": true,
        "last_updated": "2011-08-27T15:35:25+00:00",
        "legacy_thread_url": "https://osu.ppy.sh/community/forums/topics/58801",
        "nominations_summary": {
            "current": 0,
            "required": 2
        },
        "ranked": 4,
        "ranked_date": "2016-12-01T12:04:11+00:00",
        "storyboard": true,
        "submitted_date": "2011-07-31T16:36:52+00:00",
        "tags": "",
        "ratings": [
            0,
            35,
            20,
            42,
            45,
            50,
            66,
            108,
            203,
            354,
            2722
        ]
    },
    "failtimes": {
        "fail": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            20,
            228,
            51681,
            48968,
            13024,
            5782,
            15929,
            4971,
            2619,
            24236,
            31135,
            6281,
            13975,
            36503,
            57183,
            15408,
            5042,
            1077,
            2,
            0,
            0,
            427,
            4591,
            2977,
            2244,
            523,
            1321,
            1794,
            3485,
            7339,
            10818,
            15298,
            6860,
            3696,
            116,
            47,
            25,
            71,
            1261,
            16750,
            1625,
            539,
            283,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            55,
            20,
            20,
            49,
            28,
            95,
            136,
            404,
            2001,
            954,
            385,
            426,
            1831,
            3043,
            1816,
            1806,
            1033,
            70,
            132,
            226,
            393,
            447,
            257,
            2204,
            265,
            146
        ],
        "exit": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            9,
            0,
            239,
            10941,
            50974,
            41025,
            22485,
            8238,
            10727,
            35183,
            3095,
            10033,
            16907,
            12318,
            14798,
            40216,
            34780,
            9547,
            5834,
            32772,
            30244,
            7500,
            2229,
            686,
            3059,
            1737,
            2771,
            1754,
            3641,
            5936,
            4070,
            4509,
            7458,
            4027,
            6257,
            1854,
            10383,
            3523,
            1535,
            738,
            1552,
            4368,
            1371,
            464,
            11467,
            6570,
            2089,
            1096,
            740,
            506,
            392,
            340,
            367,
            371,
            206,
            119,
            71,
            150,
            203,
            259,
            790,
            816,
            739,
            863,
            577,
            1192,
            726,
            860,
            598,
            324,
            749,
            793,
            860,
            868,
            420,
            1481,
            896,
            879
        ]
    },
    "max_combo": 673
}
```

### `osuApiV2.beatmaps.scores`

#### `osuApiV2.beatmaps.scores.users()`


```ts
const beatmapUserScore2 = await osuApiV2.beatmaps.scores.users(
    oauthAccessToken,
    744305,
    18508852,
    GameMode.osu,
)
```

```json
{
    "position": 2212,
    "score": {
        "id": 3811424433,
        "user_id": 18508852,
        "accuracy": 0.9949494949494949,
        "mods": [
            "HD",
            "NC"
        ],
        "score": 720752,
        "max_combo": 179,
        "passed": true,
        "perfect": true,
        "statistics": {
            "count_50": 0,
            "count_100": 1,
            "count_300": 131,
            "count_geki": 24,
            "count_katu": 1,
            "count_miss": 0
        },
        "rank": "SH",
        "created_at": "2021-08-08T21:49:06+00:00",
        "best_id": 3811424433,
        "pp": 117.233,
        "mode": "osu",
        "mode_int": 0,
        "replay": false,
        "beatmap": {
            "beatmapset_id": 325112,
            "difficulty_rating": 2.95,
            "id": 744305,
            "mode": "osu",
            "status": "ranked",
            "total_length": 52,
            "user_id": 1103893,
            "version": "Railgun's Hard",
            "accuracy": 6.2,
            "ar": 6.5,
            "bpm": 115,
            "convert": false,
            "count_circles": 85,
            "count_sliders": 46,
            "count_spinners": 1,
            "cs": 4,
            "deleted_at": null,
            "drain": 5.8,
            "hit_length": 50,
            "is_scoreable": true,
            "last_updated": "2015-12-08T05:01:29+00:00",
            "mode_int": 0,
            "passcount": 916840,
            "playcount": 3788891,
            "ranked": 1,
            "url": "https://osu.ppy.sh/beatmaps/744305",
            "checksum": "435719c96997439e50f91ea3922ab322"
        },
        "user": {
            "avatar_url": "https://a.ppy.sh/18508852?1609057499.png",
            "country_code": "DE",
            "default_group": "default",
            "id": 18508852,
            "is_active": true,
            "is_bot": false,
            "is_deleted": false,
            "is_online": false,
            "is_supporter": true,
            "last_visit": null,
            "pm_friends_only": false,
            "profile_colour": null,
            "username": "niklas616",
            "country": {
                "code": "DE",
                "name": "Germany"
            },
            "cover": {
                "custom_url": null,
                "url": "https://osu.ppy.sh/images/headers/profile-covers/c6.jpg",
                "id": "6"
            }
        }
    }
}
```

## Testing and Linting

### Testing

To run the existing tests you need to create/provide a file `authentication.secret.json` that contains your OAuth client ID and secret.

`authentication.secret.json`:

```json
{
	"$schema": "./authentication.schema.json",
	"osuOAuthClientId": 1234,
	"osuOAuthClientSecret": "YourClientSecret"
}
```

Then you can run:


```sh
npm run test
```

Some test can be run without providing this information:


```sh
npm run test-without-osu-api-v2
```

#### Coverage

To see which parts (branches and functions) of the code are covered by the tests you can run:

```sh
npm run nyc
```

This does the same thing as running `npm run test` but tracks the test coverage.

You can see the results either in the console or by opening the created `./coverage/index.html` file.

### Linting and Formatting

To format and lint the source code (and automatically fix fixable problems) run:

```sh
npm run lint-fix
npm run format-fix
```

To only check if the source code fulfills the requirements run:

```sh
npm run lint
npm run format
```

## Manage npm package

### Preview package content

```sh
npm pack --dry-run
```

### Update/Publish package

```sh
# Login to your npm account
npm login
# [Optional]: Commit all changes to the git repository
git add -A && git commit
# [Optional]: Increase the patch version of the package
#             which automatically creates a new commit
npm version patch
# Push the new package
npm publish
```

In the github repository is also a [github workflow](.github/workflows/npm-publish.yml) that publishes the package when pushing a new tag:

```sh
# [...]
npm version patch
# Push the changes to github
git push
# If not automatically push the created tag(s)
git push --tags
# Now the workflow should be triggered too and automatically
# publish a new version of the package to npm
```
