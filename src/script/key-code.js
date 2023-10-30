const oneKeyCode = 49
const nineKeyCode = 57

function onKeyPressed(event) {
	const keyCode = event.keyCode
	if (oneKeyCode <= keyCode && keyCode <= nineKeyCode) {
		questionManager.selectOption(keyCode - oneKeyCode)
		return
	}
	switch (event.key) {
		case ',':
		case '<':
			previousQuestion()
			break
		case '.':
		case '>':
			nextQuestion()
			break
		case 'C':
		case 'c':
			confirm()
			break
		default:
			break
	}
}
