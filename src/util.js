const { exec } = require('child_process')

module.exports = {
	sh: cmd => new Promise((resolve, reject) => {
		exec(cmd, (err, stdout, stderr) => {
			if (err) reject(stderr)
			else resolve(stdout)
		})
	}),
	minifyCommand: fileName => `
		html-minifier -o output/min/${fileName} output/${fileName} \
		--collapse-whitespace \
		--remove-comments \
		--minify-css \
		--minify-js
	`,
}
