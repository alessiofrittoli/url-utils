import {
	addLeadingCharacter,
	addTrailingCharacter,
	removeLeadingCharacter,
	removeTrailingCharacter,
} from '@alessiofrittoli/web-utils'

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
