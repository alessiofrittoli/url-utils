/**
 * @vitest-environment jsdom
 * @vitest-environment-options { "url": "http://localhost:3000/pathname?query=value" }
 */
import { getCurrentLocationURL } from '@/getCurrentLocationUrl'
import { describe, it, expect } from 'vitest'

describe('getCurrentLocationURL', () => {
	it('returns parsed URL when window is defined', () => {
		expect(getCurrentLocationURL()?.toString()).toBe('http://localhost:3000/pathname?query=value')
	})
})
