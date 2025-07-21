import { Url } from '..'

/**
 * Get current Window Location URL.
 * 
 * @returns The current Window Location URL, `null` if Window object is not defined.
 */
export const getCurrentLocationURL = () => {
	try {
		return (
			typeof window !== 'undefined'
				? Url.parse( window.location )
				: null
		)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch ( error ) {
		return null
	}
}