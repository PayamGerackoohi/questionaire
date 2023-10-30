const fs = require('fs')
const { replace, regex } = require('./string-util')
const { Path } = require('./path-util')

function loadGenScript() {
	const [questionManager, title] = loadQuestionManager()
	return [
		replace(
			loadFile(Path.file.gen),
			regex['//'],
			{
				questionClasses: loadFile(Path.file.question),
				cards: loadFile(Path.file.card),
				summaryClass: loadFile(Path.file.summary),
				questionManager: questionManager,
				keyCodes: loadFile(Path.file.keyCodes),
				controller: loadFile(Path.file.controller),
			}
		),
		title,
	]
}

function loadQuestionManager() {
	const [questionData, title] = loadQuestionData()
	return [
		replace(
			loadFile(Path.file.questionManager),
			regex['//'],
			{
				questions: questionData,
			}
		),
		title,
	]
}

function loadQuestionData() {
	const questionData = JSON.parse(fs.readFileSync(Path.file.data))
	let questions = []
	for (let q of questionData.questions) {
		const options = JSON.stringify(q.options)
		switch (q.type) {
			case 'single':
				const selected = q.selected ? q.selected - 1 : undefined
				questions.push(`new SingleOptionQuestion("${q.question}",${options},${selected})`)
				break
			case 'multi':
				questions.push(`new MultiOptionQuestion("${q.question}",${options})`)
				break
			default:
				console.log(`Error @App::loadQuestionData: Invalid type<${q.type}>`)
				break
		}
	}
	return ['[' + questions.join(',') + ']', questionData.title]
}

function loadTemplate() {
	const [genScript, title] = loadGenScript()
	return replace(
		loadFile(Path.file.template),
		regex.all,
		{
			title,
			'style-card': loadFile(Path.file.style.card),
			'style-controller': loadFile(Path.file.style.controller),
			'style-general': loadFile(Path.file.style.general),
			'style-media': loadFile(Path.file.style.media),
			'style-status-bar': loadFile(Path.file.style.statusBar),
			'style-summary': loadFile(Path.file.style.summary),
			script: genScript,
		}
	)
}

function loadFile(path) {
	return String(fs.readFileSync(path))
}

module.exports = {
	makeApp: () => {
		fs.writeFileSync(Path.file.output, loadTemplate())
		console.log('Questionaire.html')
		console.log('Generated in ./output/')
	},
}
