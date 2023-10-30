const fs = require('fs')
const { makeApp } = require("./src/App");
const { sh, minifyCommand } = require("./src/util");


sh('mkdir -p output output/min')
	.catch(e => {
		console.error(`Error: ${e}`)
		for (let dir of ['output', 'output/min'])
			fs.mkdirSync(dir, { recursive: true })
	})
	.then(_ => makeApp())
	.then(_ => sh(minifyCommand('Questionaire.html')))
	.then(_ => console.log('Minified in ./output/min/'))
	.catch(console.error)
