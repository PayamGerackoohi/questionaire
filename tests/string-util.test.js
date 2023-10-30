const { describe, expect, test } = require('@jest/globals')
const { replace, regex } = require("../src/string-util");

describe('string-util test suite', () => {
	describe('replace', () => {
		test.each([
			[undefined, undefined, undefined, 'The "text" is empty.'],
			['//# aaa', undefined, undefined, 'The "regex" is empty.'],
			['//# aaa', regex['//'], undefined, 'The "replacer" is empty.'],
		])('input: %s, regex: %o, replacer: %o, output: %s', (input, regex, replacer, output) =>
			expect(() => replace(input, regex, replacer)).toThrow(output)
		)
		test.each([
			['//# aaa', regex['//'], { aaa: 'AAA' }, 'AAA'],
			['/*# aaa */', regex['/*'], { aaa: 'AAA' }, 'AAA'],
			['<!--# aaa -->', regex['<!--'], { aaa: 'AAA' }, 'AAA'],
			[
				`
						//# aaa
											//# aaa
					//# aaa
				`,
				regex['//'], { aaa: 'AAA' }, `
AAA
AAA
AAA
				`,
			], [
				`
					aaa
					//# aaa
					/*# aaa */
					<!--# aaa -->
					bbb
					//# bbb
					/*# bbb */
					<!--# bbb -->
					ccc
					//# ccc
					/*# ccc */
					<!--# ccc -->
				`,
				regex.all, { aaa: 'AAA', bbb: 'BBB', ccc: 'CCC' },
				`
					aaa
AAA
AAA
AAA
					bbb
BBB
BBB
BBB
					ccc
CCC
CCC
CCC
				`,
			]
		])('input: %s, regex: %o, replacer: %o, output: %s', (input, regex, replacer, output) =>
			expect(replace(input, regex, replacer)).toBe(output)
		)
	})
})
