class Card {
	#questionId = -1
	#cardId
	#cardEl

	constructor(id, cardEl) {
		this.#cardId = id
		this.#cardEl = cardEl
	}

	show(questionId, { question, options, type, selected }) {
		this.clean()
		this.#questionId = questionId
		this.#cardEl.appendChild(document.createElement('legend')).textContent = question
		switch (type) {
			case Question.Type.SingleOptionQuestion:
				this.#makeSingleOptionQuestion(questionId, options, selected)
				break;
			case Question.Type.MultiOptionQuestion:
				this.#makeMultiOptionQuestion(questionId, options)
				break;
			default:
				console.log(`Card::update: Invalid type: ${type}`)
				break;
		}
	}

	selectOption(index) {
		if (this.#questionId >= 0) {
			const inputId = `#${this.#questionLabelOf(this.#questionId)}-${index}`
			const inputEl = this.#cardEl.querySelector(inputId)
			if (inputEl)
				inputEl.click()
			else
				console.log(`input element with id ${inputId} not found.`)
		}
	}

	updateMode(mode) {
		if (mode === QuestionManager.Mode.Card)
			visible(contentEl, true)
		else
			visible(contentEl, false)
	}

	#makeSingleOptionQuestion(questionId, options, selected) {
		options.forEach((option, index) =>
			this.#makeSingleOption(questionId, index, option, selected)
		)
	}

	#makeSingleOption(questionId, optionId, option, selected) {
		const [questionLabel, optionLabel] = this.#labelsFor(questionId, optionId)
		const optionEl = this.#makeOptionContainer()
		const checked = optionId === selected
		this.#makeHint(optionEl, optionId)
		this.#makeInput('radio', optionEl, questionLabel, optionLabel, checked)
			.onchange = () => answer(questionId, optionId)
		this.#makeLabel(optionEl, optionLabel, option)
	}

	#makeMultiOptionQuestion(questionId, options) {
		options.forEach((option, index) =>
			this.#makeMultiOption(questionId, index, option)
		)
	}

	#makeMultiOption(questionId, optionId, { option, selected }) {
		const [questionLabel, optionLabel] = this.#labelsFor(questionId, optionId)
		const optionEl = this.#makeOptionContainer()
		this.#makeHint(optionEl, optionId)
		const inputEl = this.#makeInput('checkbox', optionEl, questionLabel, optionLabel, selected)
		inputEl.onclick = () => answerChecked(questionId, optionId, inputEl.checked)
		this.#makeLabel(optionEl, optionLabel, option)
	}

	#makeOptionContainer() {
		const optionEl = this.#cardEl.appendChild(document.createElement('div'))
		optionEl.className = 'option'
		return optionEl
	}

	#makeHint(optionEl, optionId) {
		const hintEl = optionEl.appendChild(document.createElement('span'))
		const index = optionId + 1
		if (index > 9) {
			hintEl.textContent = '(0)'
			hintEl.style.color = 'transparent'
		} else
			hintEl.textContent = `(${index})`
		hintEl.className = 'middle-hint'
	}

	#questionLabelOf(questionId) {
		return `q${questionId}`
	}

	#optionLabelOf(questionLabel, optionId) {
		return `${questionLabel}-${optionId}`
	}

	#labelsFor(questionId, optionId) {
		const questionLabel = this.#questionLabelOf(questionId)
		return [
			questionLabel,
			this.#optionLabelOf(questionLabel, optionId),
		]
	}

	#makeInput(type, optionEl, questionLabel, optionLabel, checked) {
		const inputEl = optionEl.appendChild(document.createElement('input'))
		inputEl.type = type
		inputEl.id = optionLabel
		inputEl.name = questionLabel
		if (checked) inputEl.setAttribute('checked', '')
		return inputEl
	}

	#makeLabel(optionEl, optionLabel, option) {
		const labelEl = optionEl.appendChild(document.createElement('label'))
		labelEl.setAttribute('for', optionLabel)
		labelEl.textContent = option
	}

	clean() {
		this.#cardEl.innerHTML = ''
	}
}

function makeCard(id) {
	const fieldsetEl = contentEl.appendChild(document.createElement('fieldset'))
	return new Card(id, fieldsetEl)
}
