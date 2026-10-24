import { Url, type UrlInput } from '@/index'

/**
 * Check whether the given string is an external URL or not.
 *
 * @param	url			The URL to check.
 * @param	location	( Optioanl ) The current url location. Default: `window.location` if available.
 * @returns	True if is an external URL, false otherwise.
 */
export const isExternalUrl = (url: UrlInput, location?: UrlInput): boolean => {
	let _location = location

	if (typeof window !== 'undefined') {
		_location ||= window.location
	}

	if (!_location) return false

	const _url = Url.format(Url.parse(url))
	const currentLocation = Url.parse(_location)

	// oxlint-disable-next-line no-useless-escape
	const match = _url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/)!

	if (
		typeof match[1] === 'string' &&
		match[1].length > 0 &&
		match[1].toLowerCase() !== currentLocation.protocol
	)
		return true

	if (
		typeof match[2] === 'string' &&
		match[2].length > 0 &&
		match[2].replace(
			new RegExp(':(' + { 'http:': 80, 'https:': 443 }[currentLocation.protocol] + ')?$'),
			'',
		) !== currentLocation.host
	)
		return true

	return false
}

/**
 * Check if the given URL is an absolute URL.
 *
 * @see		[StackOverflow Thread](https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative#answer-19709846)
 * @param	url The URL to check.
 *
 * @returns	True if is an absolute URL, false otherwise.
 */
export const isAbsoluteUrl = (url: UrlInput): boolean =>
	new RegExp('^(?:[a-z+]+:)?//', 'i').test(Url.format(Url.parse(url)))
