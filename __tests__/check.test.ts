/**
 * @jest-environment-options {"url": "http://localhost:3000/"}
 */
import { isAbsoluteUrl } from '@/check'
import { isExternalUrlUnitTests } from './check'

isExternalUrlUnitTests()


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