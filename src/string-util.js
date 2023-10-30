module.exports = {
	replace: (text, regex, replacer) => {
		const error = text ? regex ? replacer ? undefined : 'replacer' : 'regex' : 'text'
		if (error)
			throw new Error(`The "${error}" is empty.`)
		return text.replace(regex, (m, ...p) => {
			const group = p.slice(0, p.length - 2).find(g => g)
			if (group in replacer) return replacer[group]
			else return m
		})
	},
	regex: {
		'//': /[ \t]*\/\/# (.+)/g,
		'/*': /[ \t]*\/\*# (.+) \*\//g,
		'<!--': /[ \t]*<!--# (.+) -->/g,
		'/* | <!--': /[ \t]*\/\*# (.+) \*\/|[ \t]*<!--# (.+) -->/g,
		'// | /*': /[ \t]*\/\/# (.+)|[ \t]*\/\*# (.+) \*\//g,
		all: /[ \t]*\/\/# (.+)|[ \t]*\/\*# (.+) \*\/|[ \t]*<!--# (.+) -->/g,
	}
}
