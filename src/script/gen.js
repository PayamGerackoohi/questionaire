'use strict'
const contentEl = document.getElementById('content')
const previousButtonEl = document.getElementById('previous-button')
const nextButtonEl = document.getElementById('next-button')
const statusBarBackEl = document.getElementById('status-bar-back')
const statusBarLabelEl = document.getElementById('status-bar-label')
const summaryEl = document.getElementById('summary')

//# questionClasses
//# cards
//# summaryClass
//# questionManager
questionManager.setOnUpdate(updatePage)
//# controller
//# keyCodes
updatePage()

function updatePage() {
	updateController()
	updateStatusBar(questionManager.getQuestionIndex())
}

function answer(questionIndex, optionIndex) { questionManager.answer(questionIndex, optionIndex) }

function answerChecked(questionIndex, optionIndex, checked) {
	questionManager.answerChecked(questionIndex, optionIndex, checked)
}

function previousQuestion() {
	questionManager.previousQuestion()
}

function nextQuestion() {
	questionManager.nextQuestion()
}

function updateStatusBar(questionIndex) {
	const total = questionManager.length
	statusBarBackEl.style.width = `${100 * questionIndex / total}%`
	statusBarLabelEl.textContent = `${questionIndex} / ${total}`
}

function visible(element, show) {
	if (show)
		element.removeAttribute('hide')
	else
		element.setAttribute('hide', '')
}

function confirm() {
	questionManager.confirm()
}
