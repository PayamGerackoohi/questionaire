function updateController() {
	disableButton(previousButtonEl, questionManager.isFirstQuestion)
	disableButton(nextButtonEl, questionManager.isLastQuestion)
}

function disableButton(buttonEl, condition) {
	if (condition)
		buttonEl.setAttribute('disabled', '')
	else
		buttonEl.removeAttribute('disabled')
}
