import { isAbsoluteUrl } from '@/check'
import { Url, type UrlInput } from '@/index'

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
 * Get URL domain name.
 * 
 * @param	url			The URL string or URL instance.
 * @param	subdomain	( Optional ) Whether to get the URL with subdomain or not. Default: `true`.
 * 
 * @returns	The URL domain name.
 */
export const getDomain = ( url: UrlInput, subdomain: boolean = true ) => {
	const formattedUrl = Url.format( Url.parse( url ) )
	if ( ! isAbsoluteUrl( formattedUrl ) ) return ''
	const host = new URL( formattedUrl ).host.replace( /www./gi, '' )

	return (
		subdomain
			? host.replace( /www./g, '' )!
			: host.replace( /www./g, '' )!.split( '.' ).at( -1 )
	)
}