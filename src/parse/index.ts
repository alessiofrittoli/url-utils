import type { UrlObject } from 'url'

/**
 * Slugify text for URL usage.
 * 
 * @param	text			The string to slugify.
 * @param	trim			( Optional ) Whether to remove whitespace from both sides of a string. Default: `false`.
 * @param	keepSlashes	( Optional ) Whether to keep special characters. Default: `false`.
 * 
 * @returns	The slugifed string.
 */
export const slugify = (
	text		: string,
	trim		: boolean = true,
	keepSlashes	: boolean = false,
) => {
	text = (
		text
			.toString()					// Cast to string ( optional )
			.normalize( 'NFKD' )		// The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
			.toLowerCase()				// Convert the string to lowercase letters
	)
	if ( trim ) text = text.trim() // Remove whitespace from both sides of a string (optional)
	
	return (
		text
			.replace( /\s+/g, '-' )		// Replace spaces with -
			// eslint-disable-next-line no-useless-escape
			.replace( ! keepSlashes ? /[^\w\-]+/g : /[^\w\\\/\-]+/g, '' ) // Remove all non-word chars
			// eslint-disable-next-line no-useless-escape
			.replace( /\-\-+/g, '-' )	// Replace multiple - with single -
	)
}


/**
 * Get parsed url from UrlObject.
 * 
 * @param	url		The url string, UrlObject or URL instance.
 * @param	params	Whether to get URLSearchParams or not.
 * 
 * @returns	The parsed url.
 */
export const urlFromUrlObject = (
	url		: string | URL | UrlObject,
	params	: boolean = true
): string => {
	
	if ( url instanceof URL || typeof url === 'string' ) {
		const _url = new URL( url, 'https://resolve' )

		if ( ! params ) _url.search = ''
		if ( _url.hostname === 'resolve' ) {
			return (
				_url
					.toString()
					.replace( _url.origin, '' )
			) || '/'
		}
		return _url.toString()
	}

	const _url = new URL( 'https://resolve' )
	
	if ( url.protocol ) _url.protocol = url.protocol
	if ( url.host ) _url.host = url.host
	if ( url.hostname ) _url.hostname = url.hostname
	if ( url.pathname ) _url.pathname = url.pathname
	if ( url.hash ) _url.hash = url.hash
	if ( url.href ) _url.href = url.href
	if ( url.port ) _url.port = url.port.toString()

	_url.search = (
		url.search || ( url.query ? new URLSearchParams( url.query as Record<string, string> ) : '' ).toString() || ''
	)

	return urlFromUrlObject( _url, params )
}


/**
 * Get URL domain name.
 * 
 * @param	url			The URL string or URL instance.
 * @param	subdomain	( Optional ) Whether to get the URL with subdomain or not. Default: `true`.
 * 
 * @returns	The URL domain name.
 */
export const getDomain = ( url: string | URL, subdomain: boolean = true ) => {

	url = url.toString()
	url = url.replace( /(https?:\/\/)?(www.)?/i, '' )

	if ( ! subdomain ) {
		url = url.split( '.' ).at( -1 )!
	}
	
	if ( url.indexOf( '/' ) !== -1 ) {
		return url.split( '/' )[ 0 ]!
	}

	return url

}