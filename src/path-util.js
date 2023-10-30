const path = require('path')

class Dir {
	constructor(...paths) {
		this.dir = path.join(...paths)
	}
	join(...paths) {
		return new Dir(this.dir, ...paths)
	}
}

class Dirs {
	root = new Dir(__dirname, '..')
	input = this.root.join('input')
	output = this.root.join('output')
	script = this.root.join('src', 'script')
	view = this.root.join('src', 'view')
}

class Files {
	constructor(dir) {
		this.gen = dir.script.join('gen.js')
		this.question = dir.script.join('question.js')
		this.questionManager = dir.script.join('question-manager.js')
		this.keyCodes = dir.script.join('key-code.js')
		this.card = dir.script.join('card.js')
		this.summary = dir.script.join('summary.js')
		this.controller = dir.script.join('controller.js')
		this.data = dir.input.join('data.json')
		this.style = {
			card: dir.view.join('card.css'),
			controller: dir.view.join('controller.css'),
			general: dir.view.join('general.css'),
			media: dir.view.join('media.css'),
			statusBar: dir.view.join('status-bar.css'),
			summary: dir.view.join('summary.css'),
		}
		this.template = dir.view.join('template.html')
		this.output = dir.output.join('Questionaire.html')
	}
}

const dirs = new Dirs()
const files = new Files(dirs)

function flat(dirs) {
	let obj = {}
	for (let d in dirs)
		if ('dir' in dirs[d])
			obj[d] = dirs[d].dir
		else
			obj[d] = flat(dirs[d])
	return obj
}

module.exports = {
	Path: {
		dir: flat(dirs),
		file: flat(files),
	},
}
