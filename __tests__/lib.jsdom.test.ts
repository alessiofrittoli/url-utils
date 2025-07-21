/**
 * @jest-environment jsdom
 * @jest-environment-options { "url": "http://localhost:3000/pathname?query=value" }
 */

import { getCurrentLocationURL } from '@/lib'


describe( 'getCurrentLocationURL', () => {

	it( 'returns parsed URL when window is defined', () => {

		expect( getCurrentLocationURL()?.toString() )
			.toBe( 'http://localhost:3000/pathname?query=value' )		

	} )

} )