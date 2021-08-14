# osu-api-v2

An easy way to use the [osu!api v2](https://osu.ppy.sh/docs/index.html).

## Getting started

### Acquire osu! OAuth credentials

You need to acquire a client ID and client secret to use the [osu!api v2](https://osu.ppy.sh/docs/index.html) which can be done in the following steps:

1. [Create an osu! account or log into an existing account](https://osu.ppy.sh)
2. Go to the [account settings](https://osu.ppy.sh/home/account/edit)
3. Scroll to the section called `OAuth`
4. Create a new OAuth service and copy the client ID and the client secret from there

## Use it in a Node.js project

`package.json`:

```json
{
    "name": "test-osu-api-v2-nodejs",
    "version": "1.0.0",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {
        "osu-api-v2": "^0.0.1"
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

## Use it in a Typescript project

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
        "osu-api-v2": "^0.0.1"
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
