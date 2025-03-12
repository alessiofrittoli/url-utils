import { getDomain, slugify } from '@/parse'


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