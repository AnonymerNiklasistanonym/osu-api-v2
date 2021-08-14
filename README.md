# osu-api-v2

An easy way to use the [osu!api v2](https://osu.ppy.sh/docs/index.html).

**Attention: This is only a prototype that is currently aimed at providing beatmap information for another project and *NOT* a complete implementation of this api!**

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
        "osu-api-v2": "^0.0.3"
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
        "osu-api-v2": "^0.0.3"
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

### Linting and Formatting

To format and lint the source code (and automatically fix fixable problems) run:

```sh
npm run lint-fix
npm run prettify-fix
```

To only check if the source code fulfills the requirements run:

```sh
npm run lint
npm run prettify
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
