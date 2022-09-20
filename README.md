# osu-api-v2

*UNOFFICIAL!*

An easy way to use the [osu!api v2](https://osu.ppy.sh/docs/index.html).

**Attention: This is only a prototype that is currently aimed at providing beatmap information for another project and *NOT* a complete implementation of this api!**

ALSO: This package after version v0.0.18 makes use of a native `fetch` implementation which is for example provided by node [since version v17.5.0 experimentally](https://nodejs.org/en/blog/release/v17.5.0/).
If you use an older version or another environment be sure to include a package like [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch) that polyfills `fetch` if not existing.

**NPM package:** [`osu-api-v2`](https://www.npmjs.com/package/osu-api-v2)

**HTML documentation with examples and responses:** [GitHub pages](https://anonymerniklasistanonym.github.io/osu-api-v2/)

- [Getting started](#getting-started)
  - [Acquire osu! OAuth credentials](#acquire-osu-oauth-credentials)
  - [Use it in a Node.js project](#use-it-in-a-nodejs-project)
  - [Use it in a Typescript project](#use-it-in-a-typescript-project)
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

// TODO: Replace these variable with your client ID and secret!
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

Some test can be run without providing this information:

```sh
npm run test-without-osu-api-v2
```

#### Coverage

To see which parts (branches and functions) of the code are covered by the tests you can run:

```sh
npm run test:coverage
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
