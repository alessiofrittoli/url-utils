import type { UrlObject as NodeUrlObject } from 'url'
import { removeTrailingSlash } from './slash'

export type UrlObject = NodeUrlObject

/**
 * The Url parse/format accepted input.
 */
export type UrlInput = string | URL | Location | UrlObject


/**
 * A Url utility class for parsing and formatting URLs.
 */
export class Url
{
	/**
	 * Parse the given URL into a URL instance.
	 * 
	 * If no `host` has been provided, fallbacks to `unresolved`.
	 * 
	 * @param	url		The URL `string`, `URL` instance, `Location` instance or `UrlObject`.
	 * @param	params	Whether to keep search params or not. Default: `true`.
	 * 
	 * @returns	A new instance of URL.
	 */
	static parse( url: UrlInput, params: boolean = true )
	{
		if ( url instanceof URL || ( typeof Location !== 'undefined' && url instanceof Location ) ) {
			const newURL = new URL( url.toString() )
			if ( ! params ) newURL.search = ''
			return newURL
		}
		
		if ( typeof url === 'string' ) {
			const newURL = new URL( url, 'http://unresolved' )
			if ( ! params ) newURL.search = ''
			return newURL
		}
	
		if ( url.href ) return new URL( url.href )
	
		const protocol	= url.protocol || 'http:'
		const host		= url.host || [ url.hostname, url.port ].filter( Boolean ).join( ':' ) || 'unresolved'
		const pathname	= url.pathname || '/'
		const newURL	= new URL( pathname, [ protocol, host ].join( '//' ) )
		const queryInput= url.search || ( 'query' in url && url.query as Record<string, string> | undefined ) || ''
		newURL.search	= (
			params
				? new URLSearchParams( queryInput ).toString()
				: ''
		)
	
		if ( url.hash ) newURL.hash = url.hash.replace( /#/gi, '' )
		
		if ( 'auth' in url && url.auth ) {
			const [ username, password ] = url.auth.split( ':' )
			if ( username ) newURL.username = username
			if ( password ) newURL.password = password
		}
		
		return newURL
	}


	/**
	 * Format the given URL into a URL string.
	 * 
	 * `unresolved` hostname is automatically removed from output, returning a relative URL string.
	 * 
	 * @param	url		The URL `string`, `URL` instance, `Location` instance or `UrlObject` to format.
	 * @param	params	Whether to keep search params or not. Default: `true`.
	 * 
	 * @returns The URL string.
	 */
	static format( url: UrlInput, params: boolean = true )
	{
		const parsedURL = Url.parse( url, params )
		const result = (
			parsedURL.hostname === 'unresolved'
				? parsedURL.toString().replace( parsedURL.origin, '' )
				: parsedURL.toString()
		)

		return (
			result === '/'
				? result
				: removeTrailingSlash( result )
		)
	}
}