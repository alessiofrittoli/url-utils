/**
 * Mitigates `ReDoS`, `Regex injection` and Unintended behavior from unescaped metacharacters
 * when compositing a Regex with uncontrolled data.
 *
 * @param input The string to escape for use in a regular expression character set.
 * @returns The escaped string, safe for use inside a regular expression character set.
 *
 * ⚠️ this function comes from `@alessiofrittoli/web-util`
 */
const escapeRegExpCharSet = (input: string): string => input.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')

/**
 * Add leading character to a string.
 *
 * The given `input` won't be modified if it already contains the given `character`.
 *
 * @param	input		The string to process.
 * @param	character	The character to add.
 * @param	search		( Optional ) A custom search expression. Default `character`.
 *
 * @returns	The given string with leading character.
 */
export const addLeadingCharacter = (
	input: string,
	character: string,
	search: string | RegExp = character,
): string => {
	if (typeof input !== 'string') {
		throw new TypeError('Input must be a string.')
	}

	if (input.length > 1000) {
		throw new TypeError('Input too long.')
	}

	const regEx = search instanceof RegExp ? search : new RegExp(`^[${escapeRegExpCharSet(search)}]?`)

	return input.replace(regEx, character)
}

/**
 * Remove leading character from a string.
 *
 * @param	input		The string to process.
 * @param	character	The character to remove.
 *
 * @returns	The given string with leading character removed.
 */
export const removeLeadingCharacter = (input: string, character: string | RegExp): string => {
	if (typeof input !== 'string') {
		throw new TypeError('Input must be a string.')
	}

	if (input.length > 1000) {
		throw new TypeError('Input too long.')
	}

	const regEx =
		character instanceof RegExp ? character : new RegExp(`^[${escapeRegExpCharSet(character)}]+`)

	return input.replace(regEx, '')
}

/**
 * Add trailing character to a string.
 *
 * The given `input` won't be modified if it already contains the given `character`.
 *
 * @param	input		The string to process.
 * @param	character	The character to add.
 * @param	search		( Optional ) A custom search expression. Default `character`.
 *
 * @returns	The given string with trailing character.
 */
export const addTrailingCharacter = (
	input: string,
	character: string,
	search: string | RegExp = character,
): string => {
	if (typeof input !== 'string') {
		throw new TypeError('Input must be a string.')
	}

	if (input.length > 1000) {
		throw new TypeError('Input too long.')
	}

	const regEx = search instanceof RegExp ? search : new RegExp(`[${escapeRegExpCharSet(search)}]?$`)

	return input.replace(regEx, character)
}

/**
 * Remove trailing character from a string.
 *
 * @param	input		The string to process.
 * @param	character	The character to remove.
 *
 * @returns	The given string with trailing character removed.
 */
export const removeTrailingCharacter = (input: string, character: string | RegExp): string => {
	if (typeof input !== 'string') {
		throw new TypeError('Input must be a string.')
	}

	if (input.length > 1000) {
		throw new TypeError('Input too long.')
	}

	const regEx =
		character instanceof RegExp ? character : new RegExp(`[${escapeRegExpCharSet(character)}]?$`)

	return input.replace(regEx, '')
}

/**
 * Convert back slashes to forward slashes.
 *
 * @param	input The string to process.
 * @returns	The processed given string.
 */
export const backToForwardSlashes = (input: string): string => {
	if (typeof input !== 'string') throw new TypeError('Input must be a string.')

	return input.replace(/\\/g, '/')
}

/**
 * Convert forward slashes to back slashes.
 *
 * @param	input The string to process.
 * @returns	The processed given string.
 */
export const forwardToBackSlashes = (input: string): string => {
	if (typeof input !== 'string') throw new TypeError('Input must be a string.')

	return input.replace(/\//g, '\\')
}

/**
 * Add leading slash to a string.
 *
 * @param	input		The string to process.
 * @param	slash	The slash to add ( back|forward ). Default: `/`.
 *
 * @returns	The given string with leading slash.
 */
export const addLeadingSlash = (input: string, slash: '/' | '\\' = '/'): string =>
	addLeadingCharacter(input, slash, '\\/|\\\\')

/**
 * Remove leading slash from a string.
 *
 * @param input The string to process.
 * @returns	The given string without leading slash.
 */
// oxlint-disable-next-line no-useless-escape
export const removeLeadingSlash = (input: string): string => removeLeadingCharacter(input, '\/|\\\\')

/**
 * Add trailing slash to a string.
 *
 * @param	input	The string to process.
 * @param	slash	The slash to add ( back|forward ). Default: `/`.
 *
 * @returns	The given string with trailing slash.
 */
export const addTrailingSlash = (input: string, slash: '/' | '\\' = '/'): string =>
	// oxlint-disable-next-line no-useless-escape
	addTrailingCharacter(input, slash, '\/|\\\\')

/**
 * Remove trailing slashes from a url string.
 *
 * @param	input The string to process.
 * @returns	The given string without trailing slashes.
 */
// oxlint-disable-next-line no-useless-escape
export const removeTrailingSlash = (input: string): string => removeTrailingCharacter(input, '\/|\\\\')
