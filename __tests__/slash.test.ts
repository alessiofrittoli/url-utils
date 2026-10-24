import {
	addLeadingCharacter,
	addTrailingCharacter,
	backToForwardSlashes,
	forwardToBackSlashes,
	removeLeadingCharacter,
	removeTrailingCharacter,
} from '@/slash'
import { addTrailingSlash, removeTrailingSlash } from '@/slash'
import { addLeadingSlash, removeLeadingSlash } from '@/slash'
import { describe, it, expect } from 'vitest'

describe('addLeadingCharacter', () => {
	it('adds the leading character if not present', () => {
		expect(addLeadingCharacter('test', '/')).toBe('/test')
		expect(addLeadingCharacter('abc', '0')).toBe('0abc')
	})

	it('does not add the character if already present', () => {
		expect(addLeadingCharacter('/test', '/')).toBe('/test')
		expect(addLeadingCharacter('0abc', '0')).toBe('0abc')
	})

	it('uses custom search regex if provided', () => {
		expect(addLeadingCharacter('test', '/', /^\/?/)).toBe('/test')
		expect(addLeadingCharacter('///test', '/', /^\/+/)).toBe('/test')
	})

	it('throws TypeError if input is not a string', () => {
		// @ts-expect-error negative testing
		expect(() => addLeadingCharacter(null, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => addLeadingCharacter(undefined, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => addLeadingCharacter(123, '/')).toThrow('Input must be a string.')
	})

	it('throws TypeError if input is too long', () => {
		const string = Array.from(Array(1001))
			.map(() => '0')
			.join('')
		expect(() => addLeadingCharacter(string, '/')).toThrow('Input too long.')
	})
})

describe('removeLeadingCharacter', () => {
	it('removes the leading character if present', () => {
		expect(removeLeadingCharacter('/test', '/')).toBe('test')
		expect(removeLeadingCharacter('000abc', '0')).toBe('abc')
	})

	it('does nothing if the character is not present', () => {
		expect(removeLeadingCharacter('test', '/')).toBe('test')
		expect(removeLeadingCharacter('abc', '0')).toBe('abc')
	})

	it('uses custom regex if provided', () => {
		expect(removeLeadingCharacter('///test', /^\/+/)).toBe('test')
		expect(removeLeadingCharacter('...abc', /^\.+/)).toBe('abc')
	})

	it('throws TypeError if input is not a string', () => {
		// @ts-expect-error negative testing
		expect(() => removeLeadingCharacter(null, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => removeLeadingCharacter(undefined, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => removeLeadingCharacter(123, '/')).toThrow('Input must be a string.')
	})

	it('throws TypeError if input is too long', () => {
		const string = Array.from(Array(1001))
			.map(() => '0')
			.join('')

		expect(() => removeLeadingCharacter(string, '/')).toThrow('Input too long.')
	})
})

describe('addTrailingCharacter', () => {
	it('adds the trailing character if not present', () => {
		expect(addTrailingCharacter('test', '/')).toBe('test/')
		expect(addTrailingCharacter('abc', '0')).toBe('abc0')
	})

	it('does not add the character if already present', () => {
		expect(addTrailingCharacter('test/', '/')).toBe('test/')
		expect(addTrailingCharacter('abc0', '0')).toBe('abc0')
	})

	it('uses custom search regex if provided', () => {
		expect(addTrailingCharacter('test', '/', /\/?$/)).toBe('test/')
		expect(addTrailingCharacter('test///', '/', /\/+$/)).toBe('test/')
	})

	it('throws TypeError if input is not a string', () => {
		// @ts-expect-error negative testing
		expect(() => addTrailingCharacter(null, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => addTrailingCharacter(undefined, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => addTrailingCharacter(123, '/')).toThrow('Input must be a string.')
	})

	it('throws TypeError if input is too long', () => {
		const string = Array.from(Array(1001))
			.map(() => '0')
			.join('')

		expect(() => addTrailingCharacter(string, '/')).toThrow('Input too long.')
	})
})

describe('removeTrailingCharacter', () => {
	it('removes the trailing character if present', () => {
		expect(removeTrailingCharacter('test/', '/')).toBe('test')
		expect(removeTrailingCharacter('abc000', '0')).toBe('abc00')
	})

	it('does nothing if the character is not present', () => {
		expect(removeTrailingCharacter('test', '/')).toBe('test')
		expect(removeTrailingCharacter('abc', '0')).toBe('abc')
	})

	it('uses custom regex if provided', () => {
		expect(removeTrailingCharacter('test///', /\/+$/)).toBe('test')
		expect(removeTrailingCharacter('abc...', /\.+$/)).toBe('abc')
	})

	it('throws TypeError if input is not a string', () => {
		// @ts-expect-error negative testing
		expect(() => removeTrailingCharacter(null, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => removeTrailingCharacter(undefined, '/')).toThrow('Input must be a string.')
		// @ts-expect-error negative testing
		expect(() => removeTrailingCharacter(123, '/')).toThrow('Input must be a string.')
	})

	it('throws TypeError if input is too long', () => {
		const string = Array.from(Array(1001))
			.map(() => '0')
			.join('')

		expect(() => removeTrailingCharacter(string, '/')).toThrow('Input too long.')
	})
})

describe('backToForwardSlashes', () => {
	it('converts back slashes to forward slashes', () => {
		expect(backToForwardSlashes('\\Some\\Path\\To\\filename.ts')).toBe('/Some/Path/To/filename.ts')
		expect(backToForwardSlashes('/Some/Path/To/filename.ts')).toBe('/Some/Path/To/filename.ts')
	})

	it('throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect(() => backToForwardSlashes(true)).toThrow('Input must be a string.')
	})
})

describe('forwardToBackSlashes', () => {
	it('converts forward slashes to back slashes', () => {
		expect(forwardToBackSlashes('/Some/Path/To/filename.ts')).toBe('\\Some\\Path\\To\\filename.ts')
		expect(forwardToBackSlashes('\\Some\\Path\\To\\filename.ts')).toBe('\\Some\\Path\\To\\filename.ts')
	})

	it('throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect(() => forwardToBackSlashes(true)).toThrow('Input must be a string.')
	})
})

describe('addLeadingSlash', () => {
	it('adds a leading slash to the given string', () => {
		expect(addLeadingSlash('some-string')).toBe('/some-string')
	})

	it('allows back leading slash', () => {
		expect(addLeadingSlash('some-string', '\\')).toBe('\\some-string')
	})

	it('replaces an existing leading slash', () => {
		expect(addLeadingSlash('/some-string')).toBe('/some-string')
		expect(addLeadingSlash('\\some-string')).toBe('/some-string')

		expect(addLeadingSlash('\\some-string', '\\')).toBe('\\some-string')
		expect(addLeadingSlash('/some-string', '\\')).toBe('\\some-string')
	})

	it('throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect(() => addLeadingSlash(true)).toThrow('Input must be a string.')
	})
})

describe('removeLeadingSlash', () => {
	it('removes a leading slash from the given string', () => {
		expect(removeLeadingSlash('/some-string')).toBe('some-string')
	})

	it('removes a leading back slash from the given string', () => {
		expect(removeLeadingSlash('\\some-string')).toBe('some-string')
	})

	it('throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect(() => removeLeadingSlash(true)).toThrow('Input must be a string.')
	})
})

describe('addTrailingSlash', () => {
	it('adds a trailing slash to the given string', () => {
		expect(addTrailingSlash('some-string')).toBe('some-string/')
	})

	it('allows back trailing slash', () => {
		expect(addTrailingSlash('some-string', '\\')).toBe('some-string\\')
	})

	it('replaces an existing trailing slash', () => {
		expect(addTrailingSlash('some-string/')).toBe('some-string/')
		expect(addTrailingSlash('some-string\\')).toBe('some-string/')

		expect(addTrailingSlash('some-string\\', '\\')).toBe('some-string\\')
		expect(addTrailingSlash('some-string/', '\\')).toBe('some-string\\')
	})

	it('throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect(() => addTrailingSlash(true)).toThrow('Input must be a string.')
	})
})

describe('removeTrailingSlash', () => {
	it('removes a trailing slash from the given string', () => {
		expect(removeTrailingSlash('some-string/')).toBe('some-string')
	})

	it('removes a trailing back slash from the given string', () => {
		expect(removeTrailingSlash('some-string\\')).toBe('some-string')
	})

	it('throws a TypeError if the given input is not type of string', () => {
		// @ts-expect-error negative testing
		expect(() => removeTrailingSlash(true)).toThrow('Input must be a string.')
	})
})
