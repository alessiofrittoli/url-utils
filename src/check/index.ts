import { urlFromUrlObject } from '@/parse'
import type { UrlObject } from 'url'

/**
 * Check whether the given string is an external URL or not.
 * 
 * @param	url			The URL to check.
 * @param	localtion	( Optioanl ) The current `Location`. Default: `window.location` if available.
 * @returns	True if is an external URL, false otherwise.
 */
export const isExternalUrl = (
	url			: string | URL | UrlObject,
	location?	: string | Location | URL | UrlObject,
) => {
	if ( typeof window !== 'undefined' ) {
		location ||= window.location
	}
	if ( ! location ) return false

	url = urlFromUrlObject( url )
	const currentLocation = new URL( urlFromUrlObject( location ) )

	// eslint-disable-next-line no-useless-escape
	const match = url.toString().match( /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/ )
	if ( ! match ) return false

	if (
		typeof match[ 1 ] === 'string' &&
		match[ 1 ].length > 0 &&
		match[ 1 ].toLowerCase() !== currentLocation.protocol
	) return true

	if (
		typeof match[ 2 ] === 'string' &&
		match[ 2 ].length > 0 &&
		match[ 2 ].replace(
			new RegExp( ':(' + { 'http:': 80, 'https:': 443 }[ currentLocation.protocol ] + ')?$' ), ''
		) !== currentLocation.host
	) return true

	return false
}


/**
 * Check if the given URL is an absolute URL.
 * 
 * @see		[StackOverflow Thread](https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative#answer-19709846)
 * @param	url The URL string to check.
 * 
 * @returns	True if is an absolute URL, false otherwise.
 */
export const isAbsoluteUrl = ( url: string | URL | UrlObject ) => (
	new RegExp( '^(?:[a-z+]+:)?//', 'i' )
		.test( urlFromUrlObject( url ) )
)