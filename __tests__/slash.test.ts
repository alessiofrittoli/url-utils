import { backToForwardSlashes, forwardToBackSlashes } from '@/slash'
import { addLeadingSlash, removeLeadingSlash } from '@/slash'
import { addTrailingSlash, removeTrailingSlash } from '@/slash'


describe( 'backToForwardSlashes', () => {
	it( 'converts back slashes to forward slashes', () => {
		expect( backToForwardSlashes( '\\Some\\Path\\To\\filename.ts' ) )
			.toBe( '/Some/Path/To/filename.ts' )
		expect( backToForwardSlashes( '/Some/Path/To/filename.ts' ) )
			.toBe( '/Some/Path/To/filename.ts' )
	} )


	it( 'throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect( () => backToForwardSlashes( true ) ).toThrow( 'Input must be a string.' )
	} )

} )


describe( 'forwardToBackSlashes', () => {
	it( 'converts forward slashes to back slashes', () => {
		expect( forwardToBackSlashes( '/Some/Path/To/filename.ts' ) )
			.toBe( '\\Some\\Path\\To\\filename.ts' )
		expect( forwardToBackSlashes( '\\Some\\Path\\To\\filename.ts' ) )
			.toBe( '\\Some\\Path\\To\\filename.ts' )
	} )


	it( 'throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect( () => forwardToBackSlashes( true ) ).toThrow( 'Input must be a string.' )
	} )

} )


describe( 'addLeadingSlash', () => {
	it( 'adds a leading slash to the given string', () => {
		expect( addLeadingSlash( 'some-string' ) )
			.toBe( '/some-string' )
	} )


	it( 'allows back leading slash', () => {
		expect( addLeadingSlash( 'some-string', '\\' ) )
			.toBe( '\\some-string' )
	} )


	it( 'replaces an existing leading slash', () => {
		expect( addLeadingSlash( '/some-string' ) )
			.toBe( '/some-string' )
		expect( addLeadingSlash( '\\some-string' ) )
			.toBe( '/some-string' )

		expect( addLeadingSlash( '\\some-string', '\\' ) )
			.toBe( '\\some-string' )
		expect( addLeadingSlash( '/some-string', '\\' ) )
			.toBe( '\\some-string' )
	} )


	it( 'throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect( () => addLeadingSlash( true ) ).toThrow( 'Input must be a string.' )
	} )

} )


describe( 'removeLeadingSlash', () => {
	it( 'removes a leading slash from the given string', () => {
		expect( removeLeadingSlash( '/some-string' ) )
			.toBe( 'some-string' )
	} )

	it( 'removes a leading back slash from the given string', () => {
		expect( removeLeadingSlash( '\\some-string' ) )
			.toBe( 'some-string' )
	} )


	it( 'throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect( () => removeLeadingSlash( true ) ).toThrow( 'Input must be a string.' )
	} )

} )


describe( 'addTrailingSlash', () => {
	it( 'adds a trailing slash to the given string', () => {
		expect( addTrailingSlash( 'some-string' ) )
			.toBe( 'some-string/' )
	} )


	it( 'allows back trailing slash', () => {
		expect( addTrailingSlash( 'some-string', '\\' ) )
			.toBe( 'some-string\\' )
	} )


	it( 'replaces an existing trailing slash', () => {
		expect( addTrailingSlash( 'some-string/' ) )
			.toBe( 'some-string/' )
		expect( addTrailingSlash( 'some-string\\' ) )
			.toBe( 'some-string/' )

		expect( addTrailingSlash( 'some-string\\', '\\' ) )
			.toBe( 'some-string\\' )
		expect( addTrailingSlash( 'some-string/', '\\' ) )
			.toBe( 'some-string\\' )
	} )


	it( 'throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect( () => addTrailingSlash( true ) ).toThrow( 'Input must be a string.' )
	} )

} )


describe( 'removeTrailingSlash', () => {
	it( 'removes a trailing slash from the given string', () => {
		expect( removeTrailingSlash( 'some-string/' ) )
			.toBe( 'some-string' )
	} )

	it( 'removes a trailing back slash from the given string', () => {
		expect( removeTrailingSlash( 'some-string\\' ) )
			.toBe( 'some-string' )
	} )


	it( 'throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect( () => removeTrailingSlash( true ) ).toThrow( 'Input must be a string.' )
	} )

} )