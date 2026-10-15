import { getCurrentLocationURL } from '@/getCurrentLocationUrl'
import { describe, it, expect } from 'vitest'

describe('getCurrentLocationURL', () => {
	it('returns null if window is not defined', () => {
		expect(getCurrentLocationURL()).toBeUndefined()
	})

	it('returns null if URL parsing fails', () => {
		Object.defineProperty(global, 'window', {
			value: { location: false },
			configurable: true,
			writable: true,
		})

		expect(getCurrentLocationURL()).toBeUndefined()

		// oxlint-disable-next-line typescript/no-explicit-any
		delete (global as any).window
	})
})
