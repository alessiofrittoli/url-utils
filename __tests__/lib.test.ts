import { getCurrentLocationURL } from '@/lib'


describe( 'getCurrentLocationURL', () => {

	it( 'returns null if window is not defined', () => {

		expect( getCurrentLocationURL() )
			.toBeNull()

	} )


	it( 'returns null if URL parsing fails', () => {

		Object.defineProperty( global, 'window', {
			value		: { location: false },
			configurable: true,
			writable	: true,
		} )

		expect( getCurrentLocationURL() )
			.toBeNull()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		delete ( global as any ).window	

	} )

} )