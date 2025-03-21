/**
 * @jest-environment jsdom
 * @jest-environment-options { "url": "http://localhost:3000/pathname" }
 */

import { isExternalUrlUnitTests } from './check'

isExternalUrlUnitTests()