/**
 * @jest-environment-options {"url": "http://localhost:3000/"}
 */
import { isAbsoluteUrl, isExternalUrl } from '@/check'

describe( 'isExternalUrl', () => {

	const isClient		= typeof window !== 'undefined'
	const clientSuffix	= isClient ? ' in the client' : ''
	
	it( 'returns false if no location has been provided', () => {
		expect( isExternalUrl( new URL( 'https://externalurl.it' ), undefined ) )
			.toBe( isClient )
	} )


	it( 'checks URL protocol' + clientSuffix, () => {
		const url1 = new URL( 'http://localhost:3000' )
		const url2 = new URL( 'https://localhost:3000' )

		expect(
			isExternalUrl( url1, url2 )
		).toBe( true )

	} )


	it( 'doesn\'t check URL pathname' + clientSuffix, () => {
		const url1 = new URL( 'http://localhost:3000/pathname' )
		const url2 = new URL( 'http://localhost:3000/different-pathname' )

		expect(
			isExternalUrl( url1, url2 )
		).toBe( false )

	} )


	it( 'checks URL port' + clientSuffix, () => {
		const url1 = new URL( 'http://localhost:3000' )
		const url2 = new URL( 'http://localhost:3000' )
		const url3 = new URL( 'http://localhost:3001' )

		expect(
			isExternalUrl( url1, url2 )
		).toBe( false )

		expect(
			isExternalUrl( url1, url3 )
		).toBe( true )
	} )


	it( 'checks URL validity' + clientSuffix, () => {
		expect(
			isExternalUrl( 'invalid url', new URL( 'http://localhost:3000' ) )
		).toBe( false )
	} )
	
} )


describe( 'isAbsoluteUrl', () => {

	it( 'supports relative URLs', () => {
		expect( isAbsoluteUrl( '/pathname' ) )
			.toBe( false )
	} )


	it( 'supports absolute URLs', () => {
		expect( isAbsoluteUrl( 'http://localhost:3000' ) )
			.toBe( true )
	} )


	it( 'supports URL instance', () => {
		expect( isAbsoluteUrl( new URL( 'http://localhost:3000' ) ) )
			.toBe( true )
	} )

} )