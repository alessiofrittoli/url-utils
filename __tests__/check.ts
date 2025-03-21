import { isExternalUrl } from '@/check'

export const isExternalUrlUnitTests = () => {

	const isClient		= typeof window !== 'undefined'
	const clientSuffix	= isClient ? ' in the client' : ''

	describe( 'isExternalUrl', () => {

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

}