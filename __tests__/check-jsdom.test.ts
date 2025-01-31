/**
 * @jest-environment jsdom
 * @jest-environment-options { "url": "http://localhost:3000/pathname" }
 */

import { isExternalUrl } from "@/check"

describe( 'isExternalUrl', () => {

	it( 'checks given URL with current Location URL in the client', () => {
		expect( isExternalUrl( new URL( 'https://externalurl.it' ), undefined ) )
			.toBe( true )
	} )

} )