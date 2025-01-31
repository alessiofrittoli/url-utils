# URL utils 🔗

Version 1.0.0

[![Coverage Status](https://coveralls.io/repos/github/alessiofrittoli/url-utils/badge.svg)](https://coveralls.io/github/alessiofrittoli/url-utils) [![Dependencies](https://img.shields.io/librariesio/release/npm/%40alessiofrittoli%2Furl-utils)](https://libraries.io/npm/%40alessiofrittoli%2Furl-utils)

## TypeScript URL utility library

### Table of Contents

- [Getting started](#getting-started)
- [API Reference](#api-reference)
  - [Url utility Class](#url-utility-class)
  - [Check functions](#check-functions)
  - [Parse functions](#parse-functions)
  - [Slash functions](#slash-functions)
- [Development](#development)
  - [ESLint](#eslint)
  - [Jest](#jest)
- [Contributing](#contributing)
- [Security](#security)
- [Credits](#made-with-)

---

### Getting started

Run the following command to start using `url-utils` in your projects:

```bash
npm i @alessiofrittoli/url-utils
```

or using `pnpm`

```bash
pnpm i @alessiofrittoli/url-utils
```

---

### API Reference

#### Url utility Class

The `Url` utility class provides methods for parsing and formatting URLs. It supports multiple input types, ensuring flexibility in handling URL manipulation.

##### Type Definitions

###### `UrlInput`

The Url parse/format accepted input.

| Type        | Description                                                            |
|-------------|------------------------------------------------------------------------|
| `string`    | A URL string.                                                          |
| `URL`       | An instance of the `URL` class.                                        |
| `Location`  | An instance of the `Location` class.                                   |
| `UrlObject` | An object containing URL properties, similar to `node:url` structures. |

---

##### Methods

###### `Url.parse()`

Parses a given URL input into a `URL` instance. If the `host` is not provided, it defaults to `unresolved`.

<details>

<summary>Parameters</summary>

| Parameter | Type       | Default | Description |
|-----------|------------|---------|-------------|
| `url`     | `UrlInput` | -       | The URL string, `URL` instance, `Location` instance or UrlObject to parse. |
| `params`  | `boolean`  | `true`  | Whether to keep search parameters or not. |

</details>

---

<details>

<summary>Returns</summary>

Type: `URL`

A new instance of `URL`.

</details>

---

###### `Url.format()`

Formats a given URL input into a URL string. If the `hostname` is `unresolved`, it returns a relative URL string.

<details>

<summary>Parameters</summary>

| Parameter | Type       | Default | Description |
|-----------|------------|---------|-------------|
| `url`     | `UrlInput` | -       | The URL string, `URL` instance, `Location` instance or UrlObject to format. |
| `params`  | `boolean`  | `true`  | Whether to keep search parameters or not. |

</details>

---

<details>

<summary>Returns</summary>

Type: `string`

The formatted URL string.

</details>

---

#### Check functions

##### Importing functions

```ts
import { ... } from '@alessiofrittoli/url-utils/check'
```

---

##### `isExternalUrl`

Determines if a given URL is external compared to a provided or default location.

<details>
<summary>Parameters</summary>

| Parameter  | Type            | Default | Description |
|------------|-----------------|---------|-------------|
| `url`      | `UrlInput` | - | A URL `string`, `URL` instance, `Location` instance or `UrlObject` representing the URL to be checked. |
| `location` | `UrlInput` | `window.location` | A URL `string`, `URL` instance, `Location` instance or `UrlObject` representing the current location. Defaults to `window.location` if available in the browser environment. |

</details>

---

<details>
<summary>Returns</summary>

Type: `boolean`

- `true` if the URL is external.
- `false` otherwise.

</details>

---

<details>
<summary>Example usage</summary>

```ts
// External URL check
const result1 = isExternalUrl( 'https://example.com', 'https://mywebsite.com' )
console.log( result1 ) // true

// Internal URL check
const result2 = isExternalUrl( '/about', 'https://mywebsite.com' )
console.log( result2 ) // false
```

</details>

---

##### `isAbsoluteUrl`

Checks if a given URL is absolute.

<details>
<summary>Parameters</summary>

| Parameter  | Type                         | Description |
|------------|------------------------------|-------------|
| `url`      | `UrlInput` | A URL `string`, `URL` instance, `Location` instance or `UrlObject` representing the URL to be checked. |

</details>

---

<details>
<summary>Returns</summary>

Type: `boolean`

- `true` if the URL is absolute.
- `false` otherwise.

</details>

---

<details>
<summary>Example usage</summary>

```ts
// Absolute URL check
const result1 = isAbsoluteUrl( 'https://example.com' )
console.log( result1 ) // true

// Relative URL check
const result2 = isAbsoluteUrl( '/about' )
console.log( result2 ) // false
```

</details>

---

#### Parse functions

##### Importing functions

```ts
import { ... } from '@alessiofrittoli/url-utils/parse'
```

---

##### `slugify`

Converts a given string into a URL-friendly slug.

<details>
<summary>Parameters</summary>

| Parameter   | Type      | Default | Description |
|-------------|-----------|---------|-------------|
| `text`      | `string`  | -       | A `string` to be converted into a slug. |
| `trim`      | `boolean` | `true`  | A `boolean` indicating whether to trim whitespace from both ends of the string. This options is pretty usefull when using `slugify` to transform user input while typing. |
| `keepSlash` | `boolean` | `false` | A `boolean` indicating whether to retain slashes (/) in the string. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` representing the slugified version of the input text.

</details>

---

<details>
<summary>Example usage</summary>

###### Basic usage

```ts
const slug = slugify( 'Hello World! Let\'s Code.' )
console.log( slug ) // Outputs: 'hello-world-lets-code'
```

###### Transforming user input

```ts
input.addEventListener( 'input', event => {
    const input = event.target
    // setting `trim` to false will allow the user to type whitespace characters that will be converted to hyphen characters, improving typing experience.
    input.value = slugify( input.value, false )
} )
```

</details>

---

##### `urlFromUrlObject`

Parses a `UrlObject`, `string`, or `URL` into a normalized URL string.

<details>
<summary>Parameters</summary>

| Parameter | Type                         | Default | Description |
|-----------|------------------------------|---------|-------------|
| `url`     | `string \| URL \| UrlObject` | -       | A `string`, `URL`, or `UrlObject` to be parsed. |
| `params`  | `boolean`                    | `true`  | A `boolean` indicating whether to include query parameters in the result. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` representing the normalized URL.

</details>

---

<details>
<summary>Example usage</summary>

###### Basic usage

```ts
const url: UrlObject = {
    protocol: 'http',
    hostname: 'localhost',
    port	: 3000,
    pathname: 'pathname',
    hash	: 'someDomElId',
    query	: {
        param: 'value',
    }
}

console.log( urlFromUrlObject( url ) )
// Outputs: 'http://localhost:3000/pathname?param=value#someDomElId'
```

###### Removing URL Search Params

```ts
const url: UrlObject = {
    protocol: 'http',
    hostname: 'localhost',
    port	: 3000,
    pathname: 'pathname',
    hash	: 'someDomElId',
    query	: {
        param: 'value',
    }
}

console.log( urlFromUrlObject( url, false ) )
// Outputs: 'http://localhost:3000/pathname#someDomElId'
```

</details>

---

##### `getDomain`

Extracts the domain name from a given URL.

<details>
<summary>Parameters</summary>

| Parameter   | Type       | Default | Description |
|-------------|------------|---------|-------------|
| `url`       | `UrlInput` | - | A URL `string`, `URL` instance, `Location` instance or `UrlObject` representing the URL. |
| `subdomain` | `boolean`  | `true`  | A `boolean` indicating whether to include subdomains in the result. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` representing the domain name.

</details>

---

<details>
<summary>Example usage</summary>

###### Basic usage

```ts
const domain = getDomain( 'https://www.sub.example.com/path' )
console.log( domain ) // 'sub.example.com'
```

###### Getting 1st level domain name

```ts
const domain = getDomain( 'https://www.sub.example.com/path', false )
console.log( domain ) // 'example.com'
```

</details>

---

#### Slash functions

##### Importing functions

```ts
import { ... } from '@alessiofrittoli/url-utils/slash'
```

---

##### `backToForwardSlashes`

Converts all backslashes (`\`) in a string to forward slashes (`/`).

<details>
<summary>Parameters</summary>

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `s`       | `string` | A `string` to process. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` with all backslashes replaced by forward slashes.

</details>

---

<details>
<summary>Example usage</summary>

```ts
console.log( backToForwardSlashes( 'path\\to\\file' ) ) // Outputs: 'path/to/file'
```

</details>

---

##### `forwardToBackSlashes`

Converts all forward slashes (`/`) in a string to backslashes (`\`).

<details>
<summary>Parameters</summary>

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `s`       | `string` | A `string` to process. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` with all forward slashes replaced by backslashes.

</details>

---

<details>
<summary>Example usage</summary>

```ts
console.log( forwardToBackSlashes( 'path/to/file' ) ) // Outputs: 'path\to\file'
```

</details>

---

##### `addLeadingSlash`

Adds a leading slash (`/` or `\`) to a `string` if it doesn’t already have one.

<details>
<summary>Parameters</summary>

| Parameter | Type     | Default | Description                            |
|-----------|----------|---------|----------------------------------------|
| `s`       | `string` | -       | A `string` to process.                 |
| `slash`   | `/ \| \` | `/`     | The type of slash to add (`/` or `\`). |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` with the specified leading slash.

</details>

---

<details>
<summary>Example usage</summary>

```ts
console.log( addLeadingSlash( 'path/to/file' ) ) // Outputs: '/path/to/file'
console.log( addLeadingSlash( 'path\\to\\file', '\\' ) ) // Outputs: '\path\to\file'
```

</details>

---

##### `removeLeadingSlash`

Removes any leading slashes (`/` or `\`) from a string.

<details>
<summary>Parameters</summary>

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `s`       | `string` | A `string` to process. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` without leading slashes.

</details>

---

<details>
<summary>Example usage</summary>

```ts
console.log( removeLeadingSlash( '/path/to/file' ) ) // Outputs: 'path/to/file'
console.log( removeLeadingSlash( '\\path\\to\\file' ) ) // Outputs: 'path\to\file'
```

</details>

---

##### `addTrailingSlash`

Adds a trailing slash (`/` or `\`) to a `string` if it doesn’t already have one.

<details>
<summary>Parameters</summary>

| Parameter | Type     | Default | Description                            |
|-----------|----------|---------|----------------------------------------|
| `s`       | `string` | -       | A `string` to process.                 |
| `slash`   | `/ \| \` | `/`     | The type of slash to add (`/` or `\`). |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` with the specified trailing slash.

</details>

---

<details>
<summary>Example usage</summary>

```ts
console.log( addTrailingSlash( 'path/to/file' ) ) // Outputs: 'path/to/file/'
console.log( addTrailingSlash( 'path\\to\\file', '\\' ) ) // Outputs: 'path\to\file\'
```

</details>

---

##### `removeTrailingSlash`

Removes any trailing slashes (`/` or `\`) from a string.

<details>
<summary>Parameters</summary>

| Parameter | Type     | Description            |
|-----------|----------|------------------------|
| `s`       | `string` | A `string` to process. |

</details>

---

<details>
<summary>Returns</summary>

Type: `string`

A `string` without trailing slashes.

</details>

---

<details>
<summary>Example usage</summary>

```ts
console.log( removeTrailingSlash( 'path/to/file/' ) ) // Outputs: 'path/to/file'
console.log( removeTrailingSlash( 'path\\to\\file\\' ) ) // Outputs: 'path\\to\\file'
```

</details>

---

### Development

#### Install depenendencies

```bash
npm install
```

or using `pnpm`

```bash
pnpm i
```

#### Build your source code

Run the following command to build code for distribution.

```bash
pnpm build
```

#### [ESLint](https://www.npmjs.com/package/eslint)

warnings / errors check.

```bash
pnpm lint
```

#### [Jest](https://npmjs.com/package/jest)

Run all the defined test suites by running the following:

```bash
# Run tests and watch file changes.
pnpm test:watch

# Run tests and watch file changes with jest-environment-jsdom.
pnpm test:jsdom

# Run tests in a CI environment.
pnpm test:ci

# Run tests in a CI environment with jest-environment-jsdom.
pnpm test:ci:jsdom
```

You can eventually run specific suits like so:

```bash
pnpm test:jest
pnpm test:jest:jsdom

test:check
test:check:jsdom

test:parse
test:parse:jsdom

test:slash
test:slash:jsdom
```

Run tests with coverage.

An HTTP server is then started to serve coverage files from `./coverage` folder.

⚠️ You may see a blank page the first time you run this command. Simply refresh the browser to see the updates.

```bash
test:coverage:serve
```

---

### Contributing

Contributions are truly welcome!\
Please refer to the [Contributing Doc](./CONTRIBUTING.md) for more information on how to start contributing to this project.

---

### Security

If you believe you have found a security vulnerability, we encourage you to **_responsibly disclose this and NOT open a public issue_**. We will investigate all legitimate reports. Email `security@alessiofrittoli.it` to disclose any security vulnerabilities.

### Made with ☕

<table style='display:flex;gap:20px;'>
  <tbody>
    <tr>
      <td>
        <img src='https://avatars.githubusercontent.com/u/35973186' style='width:60px;border-radius:50%;object-fit:contain;'>
      </td>
      <td>
        <table style='display:flex;gap:2px;flex-direction:column;'>
          <tbody>
            <tr>
              <td>
                <a href='https://github.com/alessiofrittoli' target='_blank' rel='noopener'>Alessio Frittoli</a>
              </td>
            </tr>
            <tr>
              <td>
                <small>
                  <a href='https://alessiofrittoli.it' target='_blank' rel='noopener'>https://alessiofrittoli.it</a> |
                  <a href='mailto:info@alessiofrittoli.it' target='_blank' rel='noopener'>info@alessiofrittoli.it</a>
                </small>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>