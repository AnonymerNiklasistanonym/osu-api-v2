# osu-api-v2

*UNOFFICIAL!*

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
  - [`osuApiV2.users`](#osuapiv2users)
    - [`osuApiV2.users.id()`](#osuapiv2usersid)
    - [`osuApiV2.users.recentActivity()`](#osuapiv2usersrecentactivity)
    - [`osuApiV2.users.scores()`](#osuapiv2usersscores)
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
const beatmap = await osuApiV2.beatmaps.lookup(
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

#### `osuApiV2.beatmaps.scores`

##### `osuApiV2.beatmaps.scores.users()`

```ts
const beatmapScoreOfUser = await osuApiV2.beatmaps.scores.users(
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

### `osuApiV2.users`

#### `osuApiV2.users.id()`

```ts
const user = await osuApiV2.users.id(
    oauthAccessToken,
    18508852,
)
```

```json
{
  avatar_url: 'https://a.ppy.sh/18508852?1645894068.jpeg',
  country_code: 'DE',
  default_group: 'default',
  id: 18508852,
  is_active: true,
  is_bot: false,
  is_deleted: false,
  is_online: false,
  is_supporter: true,
  last_visit: null,
  pm_friends_only: false,
  profile_colour: null,
  username: 'niklas616',
  cover_url: 'https://osu.ppy.sh/images/headers/profile-covers/c6.jpg',
  discord: null,
  has_supported: true,
  interests: 'you',
  join_date: '2020-09-14T06:21:20+00:00',
  kudosu: { total: 0, available: 0 },
  location: 'Baden-Württemberg',
  max_blocks: 100,
  max_friends: 500,
  occupation: 'making the world cute',
  playmode: 'osu',
  playstyle: [ 'mouse', 'keyboard' ],
  post_count: 0,
  profile_order: [
    'me',
    'recent_activity',
    'historical',
    'beatmaps',
    'top_ranks',
    'medals',
    'kudosu'
  ],
  title: null,
  title_url: null,
  twitter: null,
  website: null,
  country: { code: 'DE', name: 'Germany' },
  cover: {
    custom_url: 'https://assets.ppy.sh/user-profile-covers/18508852/3df97ae511407a7ee96204b2d602edb6b2bd1f5f94c5d9ee89d468c4aae4cab4.jpeg',
    url: 'https://osu.ppy.sh/images/headers/profile-covers/c6.jpg',
    id: '6'
  },
  account_history: [],
  active_tournament_banner: null,
  badges: [],
  beatmap_playcounts_count: 4898,
  comments_count: 5,
  favourite_beatmapset_count: 290,
  follower_count: 54,
  graveyard_beatmapset_count: 0,
  groups: [],
  loved_beatmapset_count: 0,
  mapping_follower_count: 2,
  monthly_playcounts: [
    { start_date: '2020-12-01', count: 655 },
    { start_date: '2021-01-01', count: 2237 },
    { start_date: '2021-02-01', count: 1668 },
    { start_date: '2021-03-01', count: 1581 },
    { start_date: '2021-04-01', count: 2149 },
    { start_date: '2021-05-01', count: 2150 },
    { start_date: '2021-06-01', count: 1458 },
    { start_date: '2021-07-01', count: 2728 },
    { start_date: '2021-08-01', count: 2275 },
    { start_date: '2021-09-01', count: 1151 },
    { start_date: '2021-10-01', count: 1113 },
    { start_date: '2021-11-01', count: 912 },
    { start_date: '2021-12-01', count: 2022 },
    { start_date: '2022-01-01', count: 3853 },
    { start_date: '2022-02-01', count: 2388 }
  ],
  page: {
    html: '<div class....',
    raw: '...'
  },
  pending_beatmapset_count: 0,
  previous_usernames: [],
  ranked_beatmapset_count: 0,
  replays_watched_counts: [
    { start_date: '2021-03-01', count: 1 },
    { start_date: '2021-05-01', count: 2 },
    { start_date: '2021-07-01', count: 3 },
    { start_date: '2021-08-01', count: 3 },
    { start_date: '2021-10-01', count: 1 },
    { start_date: '2021-12-01', count: 2 },
    { start_date: '2022-02-01', count: 2 }
  ],
  scores_best_count: 100,
  scores_first_count: 0,
  scores_pinned_count: 6,
  scores_recent_count: 0,
  statistics: {
    level: { current: 100, progress: 17 },
    global_rank: 185405,
    pp: 2871.9,
    ranked_score: 16110251737,
    hit_accuracy: 98.7294,
    play_count: 27931,
    play_time: 2132125,
    total_score: 44643804191,
    total_hits: 5537643,
    maximum_combo: 2860,
    replays_watched_by_others: 14,
    is_ranked: true,
    grade_counts: { ss: 73, ssh: 659, s: 1397, sh: 928, a: 475 },
    country_rank: 10160,
    rank: { country: 10160 }
  },
  support_level: 2,
  user_achievements: [
    { achieved_at: '2022-02-23T22:53:18+00:00', achievement_id: 60 },
    { achieved_at: '2022-01-26T18:35:56+00:00', achievement_id: 22 },
    { achieved_at: '2022-01-21T16:25:44+00:00', achievement_id: 134 },
    { achieved_at: '2020-12-17T21:07:37+00:00', achievement_id: 57 }
  ],
  rankHistory: {
    mode: 'osu',
    data: [
      186527, 186692, 186907, 187165, 187338, 187516, 187756,
      187422, 185809, 185997, 185365, 185597, 185809, 186045,
      186269, 186447, 186647, 186856, 186965, 187190, 187314,
      187560, 186361, 186534, 186755, 186909, 187081, 187289,
      186141, 186324, 186416, 186589, 186718, 186843, 186657,
      186767, 186324, 186409, 186565, 186756, 186922, 187135,
      187356, 185432, 185501, 185662, 184621, 184784, 184951,
      185069, 185214, 185281, 185411, 185154, 185233, 185043,
      185074, 185253, 185456, 185597, 184610, 184725, 184891,
      185092, 185201, 184652, 184793, 184966, 185108, 185302,
      185510, 185682, 185830, 185987, 186178, 186343, 186520,
      186594, 185536, 185685, 185843, 185043, 185134, 185274,
      184648, 184784, 184917, 185076, 185230, 185405
    ]
  },
  rank_history: {
    mode: 'osu',
    data: [
      186527, 186692, 186907, 187165, 187338, 187516, 187756,
      187422, 185809, 185997, 185365, 185597, 185809, 186045,
      186269, 186447, 186647, 186856, 186965, 187190, 187314,
      187560, 186361, 186534, 186755, 186909, 187081, 187289,
      186141, 186324, 186416, 186589, 186718, 186843, 186657,
      186767, 186324, 186409, 186565, 186756, 186922, 187135,
      187356, 185432, 185501, 185662, 184621, 184784, 184951,
      185069, 185214, 185281, 185411, 185154, 185233, 185043,
      185074, 185253, 185456, 185597, 184610, 184725, 184891,
      185092, 185201, 184652, 184793, 184966, 185108, 185302,
      185510, 185682, 185830, 185987, 186178, 186343, 186520,
      186594, 185536, 185685, 185843, 185043, 185134, 185274,
      184648, 184784, 184917, 185076, 185230, 185405
    ]
  },
  ranked_and_approved_beatmapset_count: 0,
  unranked_beatmapset_count: 0
}
```

#### `osuApiV2.users.scores()`

```ts
const recent2ScoresWithFails = await osuApiV2.users.scores(
    oauthAccessToken,
    9096716,
    ScoresType.Recent,
    GameMode.osu,
    2,
    0,
    true,
)
```

```json
[
  {
    "id": 19641312990,
    "user_id": 9096716,
    "accuracy": 0.9367816091954023,
    "mods": [ 'HD', 'NC' ],
    "score": 138805,
    "max_combo": 78,
    "passed": false,
    "perfect": false,
    "statistics": {
      "count_50": 0,
      "count_100": 1,
      "count_300": 54,
      "count_geki": 11,
      "count_katu": 1,
      "count_miss": 3
    },
    "rank": 'F',
    "created_at": '2022-03-04T05:02:09+00:00',
    "best_id": null,
    "pp": null,
    "mode": 'osu',
    "mode_int": 0,
    "replay": false,
    "current_user_attributes": { pin: null },
    "beatmap": {
      "beatmapset_id": 1244123,
      "difficulty_rating": 5.09,
      "id": 2587891,
      "mode": 'osu',
      "status": 'ranked',
      "total_length": 108,
      "user_id": 4378277,
      "version": "browiec's Extra",
      "accuracy": 8.6,
      "ar": 9,
      "bpm": 175.4,
      "convert": false,
      "count_circles": 252,
      "count_sliders": 142,
      "count_spinners": 1,
      "cs": 3,
      "deleted_at": null,
      "drain": 5.2,
      "hit_length": 107,
      "is_scoreable": true,
      "last_updated": '2020-08-27T22:27:03+00:00',
      "mode_int": 0,
      "passcount": 188761,
      "playcount": 1816723,
      "ranked": 1,
      "url": 'https://osu.ppy.sh/beatmaps/2587891',
      "checksum": '896ee6e6ecd52efa5d6624fbe2b2a1e1'
    },
    "beatmapset": {
      "artist": 'chano & 40mP',
      "artist_unicode": 'シャノ & 40mP',
      "covers": [Object],
      "creator": 'Log Off Now',
      "favourite_count": 809,
      "hype": null,
      "id": 1244123,
      "nsfw": false,
      "play_count": 5147556,
      "preview_url": '//b.ppy.sh/preview/1244123.mp3',
      "source": '',
      "status": 'ranked',
      "title": 'Natsukoi Hanabi (Sped Up Ver.)',
      "title_unicode": '夏恋花火 (Sped Up Ver.)',
      "track_id": null,
      "user_id": 4378277,
      "video": false
    },
    "user": {
      "avatar_url": 'https://a.ppy.sh/9096716?1645156821.png',
      "country_code": 'US',
      "default_group": 'default',
      "id": 9096716,
      "is_active": true,
      "is_bot": false,
      "is_deleted": false,
      "is_online": false,
      "is_supporter": true,
      "last_visit": null,
      "pm_friends_only": false,
      "profile_colour": null,
      "username": 'Ooi'
    }
  },
  {
    "id": 19641311692,
    "user_id": 9096716,
    "accuracy": 0.9617486338797814,
    "mods": [ 'HD', 'NC' ],
    "score": 147663,
    "max_combo": 80,
    "passed": false,
    "perfect": false,
    "statistics": {
      "count_50": 0,
      "count_100": 2,
      "count_300": 58,
      "count_geki": 14,
      "count_katu": 1,
      "count_miss": 1
    },
    "rank": 'F',
    "created_at": '2022-03-04T05:01:55+00:00',
    "best_id": null,
    "pp": null,
    "mode": 'osu',
    "mode_int": 0,
    "replay": false,
    "current_user_attributes": { "pin": null },
    "beatmap": {
      "beatmapset_id": 1244123,
      "difficulty_rating": 5.09,
      "id": 2587891,
      "mode": 'osu',
      "status": 'ranked',
      "total_length": 108,
      "user_id": 4378277,
      "version": "browiec's Extra",
      "accuracy": 8.6,
      "ar": 9,
      "bpm": 175.4,
      "convert": false,
      "count_circles": 252,
      "count_sliders": 142,
      "count_spinners": 1,
      "cs": 3,
      "deleted_at": null,
      "drain": 5.2,
      "hit_length": 107,
      "is_scoreable": true,
      "last_updated": '2020-08-27T22:27:03+00:00',
      "mode_int": 0,
      "passcount": 188761,
      "playcount": 1816723,
      "ranked": 1,
      "url": 'https://osu.ppy.sh/beatmaps/2587891',
      "checksum": '896ee6e6ecd52efa5d6624fbe2b2a1e1'
    },
    "beatmapset": {
      "artist": 'chano & 40mP',
      "artist_unicode": 'シャノ & 40mP',
      "covers": [Object],
      "creator": 'Log Off Now',
      "favourite_count": 809,
      "hype": null,
      "id": 1244123,
      "nsfw": false,
      "play_count": 5147556,
      "preview_url": '//b.ppy.sh/preview/1244123.mp3',
      "source": '',
      "status": 'ranked',
      "title": 'Natsukoi Hanabi (Sped Up Ver.)',
      "title_unicode": '夏恋花火 (Sped Up Ver.)',
      "track_id": null,
      "user_id": 4378277,
      "video": false
    },
    "user": {
      "avatar_url": 'https://a.ppy.sh/9096716?1645156821.png',
      "country_code": 'US',
      "default_group": 'default',
      "id": 9096716,
      "is_active": true,
      "is_bot": false,
      "is_deleted": false,
      "is_online": false,
      "is_supporter": true,
      "last_visit": null,
      "pm_friends_only": false,
      "profile_colour": null,
      "username": 'Ooi'
    }
  }
]
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
