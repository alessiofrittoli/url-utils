import { Url } from '@/index'
import type { UrlObject } from 'url'

describe( 'Url.parse()', () => {

	const isClient = typeof window !== 'undefined'

	it( 'returns a new URL instance from url string', () => {
		const url		= 'http://localhost:3000/pathname/subpath?param=value'
		const parsedURL	= Url.parse( url )

		expect( parsedURL )
			.toBeInstanceOf( URL )

		expect( parsedURL.toString() )
			.toBe( url )
	} )


	it( 'returns a new URL instance from URL instance', () => {
		const url		= new URL( 'http://localhost:3000/pathname/subpath?param=value' )
		const parsedURL	= Url.parse( url )

		expect( parsedURL ).not.toBe( url )
		expect( parsedURL ).toEqual( url )
	} )


	it( 'returns a new URL instance from UrlObject', () => {
		const url: UrlObject = {
			protocol	: 'http:',
			host		: 'localhost:3000',
			pathname	: '/pathname',
		}
		const parsedURL	= Url.parse( url )

		expect( parsedURL.toString() ).toBe( 'http://localhost:3000/pathname' )
	} )


	it( 'early returns a new URL instance from a UrlObject if `href` is defined', () => {
		const url: UrlObject = {
			href: 'http://localhost:3000/pathname',
		}
		const parsedURL	= Url.parse( url )

		expect( parsedURL.toString() ).toBe( url.href! )
	} )


	it( 'properly handles fallback values not defined in a UrlObject', () => {
		const url: UrlObject = {
			port		: '3000',
			hostname	: 'localhost',
		}
		const parsedURL	= Url.parse( url )

		expect( parsedURL.protocol ).toBe( 'http:' )
		expect( parsedURL.host ).toBe( [ url.hostname, url.port ].filter( Boolean ).join( ':' ) )
		expect( parsedURL.pathname ).toBe( '/' )

		expect( Url.parse( {} ).hostname ).toBe( 'unresolved' )
	} )


	it( 'properly handles search params from a UrlObject', () => {
		expect( Url.parse( {
			search	: '?search_string_has=priority_on_urlobject_query',
			query	: {
				some_search: true,
			},
		} ).search ).toBe( '?search_string_has=priority_on_urlobject_query' )

		expect( Url.parse( {
			search: '?search=param'
		} ).search ).toBe( '?search=param' )

		expect( Url.parse( {
			query: {
				search: 'param',
			},
		} ).search ).toBe( '?search=param' )

		expect( Url.parse( {
			query: '?search=param'
		} ).search ).toBe( '?search=param' )
	} )


	it( 'properly handles hash strings from a UrlObject', () => {
		expect( Url.parse( {
			hash: 'someHashString'
		} ).hash ).toBe( '#someHashString' )

		expect( Url.parse( {
			hash: '#someHashString'
		} ).hash ).toBe( '#someHashString' )

		expect( Url.parse( {
			hash: '###someHashString'
		} ).hash ).toBe( '#someHashString' )
	} )


	it( 'properly handles auth params from a UrlObject', () => {
		const parsedURL = Url.parse( {
			auth: 'username:password'
		} )

		expect( parsedURL.username ).toBe( 'username' )
		expect( parsedURL.password ).toBe( 'password' )
	} )
	
	
	it( 'optionally removes URLSearchParams from a url string', () => {
		const parsedURL = Url.parse( 'http://localhost:3000/pathname?search=param', false )

		expect( parsedURL.searchParams.size ).toBe( ! isClient ? 0 : undefined )
		expect( parsedURL.toString() ).toBe( 'http://localhost:3000/pathname' )
	} )
	
	
	it( 'optionally removes URLSearchParams from a URL instance', () => {
		const parsedURL = Url.parse( new URL( 'http://localhost:3000/pathname?search=param' ), false )

		expect( parsedURL.searchParams.size ).toBe( ! isClient ? 0 : undefined )
		expect( parsedURL.toString() ).toBe( 'http://localhost:3000/pathname' )
	} )
	
	
	it( 'optionally removes URLSearchParams from a UrlObject', () => {
		const parsedURL = Url.parse( {
			host	: 'localhost:3000',
			pathname: 'pathname',
			query	: { search: 'param' },
		}, false )

		expect( parsedURL.searchParams.size ).toBe( ! isClient ? 0 : undefined )
		expect( parsedURL.toString() ).toBe( 'http://localhost:3000/pathname' )
	} )

} )


describe( 'Url.format()', () => {

	const urlString = 'http://username:password@localhost:3000/pathname?search=param#hashstring'
	
	it( 'formats the given url string', () => {
		expect( Url.format( urlString ) )
			.toBe( urlString )
	} )


	it( 'formats the given URL instance', () => {
		expect( Url.format( new URL( urlString ) ).toString() )
			.toBe( urlString )
	} )


	it( 'formats the given UrlObject', () => {
		expect( Url.format( {
			auth	: 'username:password',
			protocol: 'http:',
			host	: 'localhost:3000',
			pathname: '/pathname',
			query	: { search: 'param' },
			hash	: 'hashstring',
		} ) ).toBe( urlString )
	} )


	it( 'formats relative urls', () => {
		expect( Url.format( {
			pathname: '/pathname',
			query	: { search: 'param' },
			hash	: 'hashstring',
		} ) ).toBe( '/pathname?search=param#hashstring' )
	} )


	it( 'removes trailing slash', () => {
		expect( Url.format( Url.parse( '/' ) ) )
			.toBe( '/' )

		expect( Url.format( new URL( '/', 'http://localhost:3000' ) ) )
			.toBe( 'http://localhost:3000' )

		expect( Url.format( new URL( '/pathname', 'http://localhost:3000' ) ) )
			.toBe( 'http://localhost:3000/pathname' )

		expect( Url.format( new URL( '/pathname/', 'http://localhost:3000' ) ) )
			.toBe( 'http://localhost:3000/pathname' )

	} )

} )