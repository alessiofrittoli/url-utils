import { getDomain, slugify, urlFromUrlObject } from '@/parse'
import { UrlObject } from 'url'

describe( 'slugify', () => {

	it( 'removes special characters', () => {
		expect(
			slugify( 'Some string value with special characters: //@#!' )
		).toBe( 'some-string-value-with-special-characters-' )
	} )


	it( 'keeps slashes if needed', () => {
		expect(
			slugify( 'Some string value with special characters: //@#!', true, true )
		).toBe( 'some-string-value-with-special-characters-//' )
		expect(
			slugify( 'Some string value with special characters: \\@#!', true, true )
		).toBe( 'some-string-value-with-special-characters-\\' )
	} )


	it( 'trims whitespaces', () => {
		expect(
			slugify( ' Some string ' )
		).toBe( 'some-string' )
	} )


	it( 'skips whitespace trimming if needed', () => {
		expect(
			slugify( ' Some string ', false )
		).toBe( '-some-string-' )
	} )
} )


describe( 'urlFromUrlObject', () => {

	it( 'returns a URL string from URL string', () => {
		const url = 'http://localhost:3000/pathname/subpath?param=value'

		expect( urlFromUrlObject( url ) )
			.toBe( url )
		
	} )


	it( 'returns a URL string from relative URL string', () => {
		const url = '/pathname/subpath?param=value'

		expect( urlFromUrlObject( url ) )
			.toBe( url )
		
	} )


	it( 'removes URLSearchParams from URL string', () => {
		const pathname		= '/pathname/subpath'
		const baseUrl		= 'http://localhost:3000'
		const relativeUrl	= pathname + '?param=value'
		const absoluteUrl	= baseUrl + pathname + '?param=value'

		expect( urlFromUrlObject( relativeUrl, false ) )
			.toBe( pathname )

		expect( urlFromUrlObject( absoluteUrl, false ) )
			.toBe( baseUrl + pathname )
		
	} )


	it( 'returns a URL string from URL instance', () => {
		const url = new URL( 'pathname/subpath', 'http://localhost:3000/' )
		url.searchParams.append( 'param', 'value' )

		expect( urlFromUrlObject( url ) )
			.toBe( url.toString() )
	} )


	it( 'removes URLSearchParams from URL instance', () => {
		const url = new URL( 'pathname/subpath', 'http://localhost:3000/' )
		url.searchParams.append( 'param', 'value' )

		const urlCompare = new URL( url )
		urlCompare.search = new URLSearchParams().toString()

		expect( urlFromUrlObject( url, false ) )
			.toBe( urlCompare.toString() )
	} )


	it( 'returns a URL string from UrlObject', () => {
		const url: UrlObject = {
			protocol: 'http',
			host	: 'localhost:3000',
			hostname: 'localhost',
			port	: 3000,
			pathname: 'pathname/subpath',
			href	: 'http://localhost:3000/pathname/subpath?param=value#someDomElId',
			hash	: 'someDomElId',
			query	: {
				param: 'value',
			}
		}

		expect( urlFromUrlObject( url ) )
			.toBe( 'http://localhost:3000/pathname/subpath?param=value#someDomElId' )
		
	} )


	it( 'removes URLSearchParams from from UrlObject', () => {
		const url: UrlObject = {
			protocol: 'http',
			hostname: 'localhost',
			port	: 3000,
			pathname: 'pathname/subpath',
			query	: {
				param: 'value',
			}
		}

		expect( urlFromUrlObject( url, false ) )
			.toBe( 'http://localhost:3000/pathname/subpath' )
		
	} )	

} )


describe( 'getDomain', () => {

	it( 'returns the URL domain', () => {
		expect( getDomain( 'http://subdomain.localhost:3000' ) )
			.toBe( 'subdomain.localhost:3000' )
	} )


	it( 'returns the URL 1st level domain', () => {
		expect( getDomain( 'http://subdomain.localhost:3000', false ) )
			.toBe( 'localhost:3000' )
	} )


	it( 'ignores www', () => {
		expect( getDomain( 'http://www.localhost:3000' ) )
			.toBe( 'localhost:3000' )
	} )


	it( 'returns empty string from relative URLs', () => {
		expect( getDomain( '/some/relative/path' ) )
			.toBe( '' )
	} )

} )