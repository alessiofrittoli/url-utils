/**
 * @jest-environment jsdom
 * @jest-environment-options { "url": "http://localhost:3000/pathname?query=value" }
 */

import { getCurrentLocationURL } from '@/getCurrentLocationUrl'


describe( 'getCurrentLocationURL', () => {

	it( 'returns parsed URL when window is defined', () => {

		expect( getCurrentLocationURL()?.toString() )
			.toBe( 'http://localhost:3000/pathname?query=value' )		

	} )

} )