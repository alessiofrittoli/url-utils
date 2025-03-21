/**
 * @jest-environment jsdom
 * @jest-environment-options { "url": "http://localhost:3000/pathname" }
 */

import { Url } from '@/index'

describe( 'Url.parse()', () => {
	it( 'returns a new URL instance from a Location instance', () => {
		const parsedURL	= Url.parse( window.location )

		expect( parsedURL )
			.toBeInstanceOf( URL )

		expect( parsedURL.toString() )
			.toBe( 'http://localhost:3000/pathname' )
	} )
} )