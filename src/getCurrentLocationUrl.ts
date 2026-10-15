import { Url } from '.'

/**
 * Get current Window Location URL.
 *
 * @returns The current Window Location URL, `undefined` if Window object is not defined.
 */
export const getCurrentLocationURL = (): URL | undefined => {
	try {
		return typeof window !== 'undefined' ? Url.parse(window.location) : undefined
	} catch {
		return undefined
	}
}
