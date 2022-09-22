# osu-api-v2

[![CI](https://github.com/AnonymerNiklasistanonym/osu-api-v2/actions/workflows/node.js.yml/badge.svg)](https://github.com/AnonymerNiklasistanonym/osu-api-v2/actions/workflows/node.js.yml)
[![NPM](https://nodei.co/npm/osu-api-v2.png?mini=tru)](https://npmjs.org/package/osu-api-v2)

*UNOFFICIAL!*

An easy way to use the [osu!api v2](https://osu.ppy.sh/docs/index.html).

**Attention: This is only a prototype that is currently aimed at providing beatmap information for another project and *NOT* a complete implementation of this api!**

ALSO: This package after version v0.0.18 makes use of a native `fetch` implementation which is for example provided by node [since version v17.5.0 experimentally](https://nodejs.org/en/blog/release/v17.5.0/).
If you use an older version or another environment be sure to include a package like [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch) that polyfills `fetch` if not existing.

**NPM package:** [`osu-api-v2`](https://www.npmjs.com/package/osu-api-v2)

**HTML documentation with examples and responses:** [GitHub pages](https://anonymerniklasistanonym.github.io/osu-api-v2/)

**GitHub repository:** [`osu-api-v2`](https://github.com/AnonymerNiklasistanonym/osu-api-v2)

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
  - [Test package](#test-package)
  - [Publish package](#publish-package)

## Getting started

### Acquire osu! OAuth credentials

To use the [osu!api v2](https://osu.ppy.sh/docs/index.html) you need to request a temporary OAuth access token that can be acquired with the following steps:

1. [Create an osu! account or log into an existing account](https://osu.ppy.sh)
2. Go to the [account settings](https://osu.ppy.sh/home/account/edit)
3. Scroll to the section called `OAuth`
4. Create a new OAuth service

Now having the OAuth credentials you have 2 possibilities to request a temporary OAuth access token:

1. Client Credentials

   By copying the *client ID* and *client secret* you can request a temporary OAuth access token:

   ```ts
   import osuApiV2 from "osu-api-v2"

   osuApiV2.oauth.clientCredentialsGrant(
       1234,          // Replace with your value
       "PLACEHOLDER", // Replace with your value
   ).then(oauthAccessToken => {
       console.log(oauthAccessToken)
   }).catch(console.error)
   ```

   ([Example](./examples/nodejs_typescript/index.ts))

2. Refresh Tokens

   By setting a *Application Callback URL* (*redirect URL*) and copying the *client ID* and *client secret* you can request a temporary OAuth access token with custom OAuth scopes.
   This is done by creating a special URL using these inputs and then opening this URL in the browser (or redirect the user to this URL):

   ```ts
   import osuApiV2, { OAuthAuthorizeScope } from "osu-api-v2"
   import open from "open"

   const authorizeUrl = osuApiV2.oauth.authorizeRedirectUrlGenerator(
       1234,                            // Replace with your value
       "PLACEHOLDER",                   // Replace with your value
       "https://your-redirect-url.com", // Replace with your value
       [OAuthAuthorizeScope.PUBLIC, OAuthAuthorizeScope.IDENTITY],
   )
   await open(authorizeUrl)
   ```

   The website that will open allows yourself or your user to login and manually click a button to accept access upon which the website will send a code to the redirect URL.
   On the server that receives this code you can then request a *refresh token*:

   ```ts
   import osuApiV2 from "osu-api-v2"

   const receivedCode = "PLACEHOLDER_CODE" // Replace with received value
   osuApiV2.oauth.authorizationCodeGrant(
      1234,                            // Replace with your value
      "PLACEHOLDER_CLIENT_SECRET",     // Replace with your value
      "https://your-redirect-url.com", // Replace with your value
      receivedCode,
   ).then((oauthAccessTokenWithRefreshToken) => {
       console.log(oauthAccessTokenWithRefreshToken)
   }).catch(console.error)
   ```

   After all of these steps you can now without repeating the previous steps request a temporary OAuth access token:

   ```ts
   import osuApiV2 from "osu-api-v2"

   osuApiV2.oauth.refreshTokenGrant(
       1234,                            // Replace with your value
       "PLACEHOLDER_CLIENT_SECRET",     // Replace with your value
       "https://your-redirect-url.com", // Replace with your value
       "PLACEHOLDER_REFRESH_TOKEN",     // Replace with your value
   ).then(oauthAccessTokenWithRefreshToken => {
       console.log(oauthAccessTokenWithRefreshToken)
   }).catch(console.error)
   ```

   You need to keep in mind that as soon as you request a temporary OAuth access token this way your current *refresh token* becomes useless.
   For the next time you want to request a temporary OAuth access token you need to use the new *refresh token* that is contained in the response next to the temporary OAuth access token.

   ([Example](./examples/nodejs_typescript_refresh_token/index.ts))

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
        "osu-api-v2": "^0.0.25"
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
        "osu-api-v2": "^0.0.25"
    },
    "devDependencies": {
        "typescript": "^4.8.3"
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

The tests can be separated in 3 different categories:

1. No osu!api v2 tests

   This means these tests can be ran without any extra information but only cover a small part of the library.

   ```sh
   npm run test:no-osu-api-v2
   ```

2. osu!api v2 tests using custom OAuth credentials but only with client credential grants

   To run these tests you need to provide either a file called `osu_api_v2_oauth_client_credentials.secret.json` that contains a valid *client ID* and *client secret* ([example file](./osu_api_v2_oauth_client_credentials.example.json)) or environment variables that contain this information (`OSU_OAUTH_CLIENT_ID`, `OSU_OAUTH_CLIENT_SECRET`).

   This means these tests will cover all endpoints that can be accessed via the public API scope.

   ```sh
   npm run test:no-refresh-token
   # Or to get the coverage
   npm run test:coverage-no-refresh-token
   ```

3. osu!api v2 tests using custom OAuth credentials with client credential grants and refresh token grants

   To run these tests you need to provide either a file called `osu_api_v2_oauth_refresh_token.secret.json` that contains a valid *client ID* and *client secret* ([example file](./osu_api_v2_oauth_refresh_token.example.json)) or environment variables that contain this information (`OSU_OAUTH_CLIENT_ID`, `OSU_OAUTH_CLIENT_SECRET`, `OSU_OAUTH_REDIRECT_URL`, `OSU_OAUTH_REFRESH_TOKEN`).
   Keep in mind that at the end of the tests the refresh token in `OSU_OAUTH_REFRESH_TOKEN` would be useless but the current refresh token will be in the file that was automatically created/updated during running the tests!

   This means these tests will cover all endpoints, even the ones only accessible to other API scopes (of course the success of these tests depends if you have the required API scopes enabled when initially requesting the refresh token code).

   ```sh
   npm run test
   # Or to get the coverage
   npm run test:coverage
   ```

#### Coverage

To see which parts (branches and functions) of the code are covered by the tests you can run:

```sh
npm run test:coverage
# or for a smaller subset that doesn't check non public scope API endpoints
npm run test:coverage-no-refresh-token
```

This does the same thing as running `npm run test`/`npm run test:no-refresh-token` but tracks the test coverage.

You can see the results either in the console or by opening the created `./coverage/index.html` file.

### Linting and Formatting

To format and lint the source code (and automatically fix fixable problems) run:

```sh
npm run lint:fix
npm run format:fix
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

### Test package

```sh
# Create package 'osu-api-v2-X.Y.Z.tgz'
npm pack
# Create a new project with a package.json and add the package as dependency
npm install "path/to/osu-api-v2-X.Y.Z.tgz"
```

### Publish package

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
# commit all changes so the git working directory is clean
npm version patch # or minor/majory
# Push the changes to github
git push
# If not automatically push the created tag(s)
git push --tags
# Now the workflow should be triggered too and automatically
# publish a new version of the package to npm
```
