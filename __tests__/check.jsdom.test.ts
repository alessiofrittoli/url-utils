/**
 * @vitest-environment jsdom
 * @vitest-environment-options { "url": "http://localhost:3000/pathname" }
 */
import { describe, it, expect } from 'vitest'
import { isExternalUrl } from '@/check'

describe('isExternalUrl', () => {
	it('returns true if the given URL is not the current location URL', () => {
		expect(isExternalUrl(new URL('https://externalurl.it'))).toBe(true)
	})
})
