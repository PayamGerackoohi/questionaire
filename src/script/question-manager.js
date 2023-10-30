class QuestionManager {
	static Mode = Object.freeze({
		Card: 0,
		Summary: 1,
	})
	#card = makeCard(0)
	#summary = new SummarySection()
	#index = 0
	#maxIndex
	#questions
	#lock = false

	#mode = QuestionManager.Mode.Card
	#setMode(mode) {
		this.#mode = mode
		this.#card.updateMode(mode)
		this.#summary.updateMode(mode)
	}

	get length() { return this.#questions.length }

	get isFirstQuestion() { return this.#index === 0 }

	get isLastQuestion() { return this.#index === this.#maxIndex }

	#onUpdate
	#callOnUpdate() { this.#onUpdate && this.#onUpdate() }

	constructor(questions) {
		this.#questions = questions
		questions.forEach(question => question.onChange = () => { this.#updateSummary() })
		this.#maxIndex = questions.length
		this.#updateSummary()
		this.#update()
	}

	confirm() {
		if (this.#mode === QuestionManager.Mode.Summary)
			this.#summary.confirm()
	}

	setOnUpdate(onUpdate) {
		this.#onUpdate = onUpdate
	}

	getQuestionIndex() { return this.#index }

	previousQuestion() {
		this.#withLock(() => {
			const i = Math.max(0, this.#index - 1)
			if (this.#index !== i) {
				this.#index = i
				this.#update()
			}
		})
	}

	nextQuestion() {
		this.#withLock(() => {
			const i = Math.min(this.#maxIndex, this.#index + 1)
			if (this.#index !== i) {
				this.#index = i
				if (this.#index === this.#maxIndex)
					this.#showSummarySection()
				else
					this.#update()
			}
		})
	}

	selectOption(index) {
		this.#card.selectOption(index)
	}

	answer(questionIndex, optionIndex) { this.#questions[questionIndex].answer(optionIndex) }

	answerChecked(questionIndex, optionIndex, checked) {
		this.#questions[questionIndex].check(optionIndex, checked)
	}

	#updateSummary() {
		this.#summary.update(this.#questions.map(q => q.string()))
	}

	#withLock(action) {
		if (this.#lock)
			return
		this.#lock = true
		setTimeout(() => { this.#lock = false }, 10)
		action()
	}

	#update() {
		this.#setMode(QuestionManager.Mode.Card)
		this.#card.show(this.#index, this.#questions[this.#index])
		this.#callOnUpdate()
	}

	#showSummarySection() {
		this.#setMode(QuestionManager.Mode.Summary)
		this.#summary.show()
		this.#callOnUpdate()
	}
}

const questionManager = new QuestionManager(
	//# questions
)
