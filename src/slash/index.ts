/* eslint-disable no-useless-escape */

/**
 * Convert back slashes to forward slashes.
 * 
 * @param	s The string to process. 
 * @returns	The processed given string.
 */
export const backToForwardSlashes = ( s: string ) => s.replace( /\\/g, '/' )


/**
 * Convert forward slashes to back slashes.
 * 
 * @param	s The string to process. 
 * @returns	The processed given string.
 */
export const forwardToBackSlashes = ( s: string ) => s.replace( /\//g, '\\' )


/**
 * Add leading slash to a string.
 * 
 * @param	s		The string to process.
 * @param	slash	The slash to add ( back|forward ). Default: `/`.
 * 
 * @returns	The given string with leading slash.
 */
export const addLeadingSlash = ( s: string, slash: '/' | '\\' = '/' ) => s.replace( /^[\/|\\]?/, slash )


/**
 * Remove leading slash from a string.
 * 
 * @param	s	The string to process.
 * 
 * @returns	The given string without leading slash.
 */
export const removeLeadingSlash = ( s: string ) => s.replace( /^[\/|\\]+/, '' )


/**
 * Add trailing slash to a string.
 * 
 * @param	s		The string to process.
 * @param	slash	The slash to add ( back|forward ). Default: `/`.
 * 
 * @returns	The given string with trailing slash.
 */
export const addTrailingSlash = ( s: string, slash: '/' | '\\' = '/' ) => (
	s.replace( /[\/|\\]?$/, slash )
)


/**
 * Remove trailing slashes from a url string.
 * 
 * @param	s The string to process.
 * @returns	The given string without trailing slashes.
 */
export const removeTrailingSlash = ( s: string ) => s.replace( /[\/\\]+$/, '' )