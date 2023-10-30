class Question {
	static Type = Object.freeze({
		SingleOptionQuestion: 1,
		MultiOptionQuestion: 2,
	})

	onChange
	_onChange() { this.onChange && this.onChange() }

	constructor(question, options, type) {
		this.question = question
		this.options = options
		this.type = type
	}
}

class SingleOptionQuestion extends Question {
	constructor(question, options, selected) {
		super(question, options, Question.Type.SingleOptionQuestion)
		this.selected = selected
	}

	answer(option) {
		if (this.selected !== option) {
			this.selected = option
			this._onChange()
		}
	}

	string() { return `${this.question}\n\n${this.options[this.selected] || '-'}` }
}

class MultiOptionQuestion extends Question {
	constructor(question, options) {
		super(question, options, Question.Type.MultiOptionQuestion)
	}

	check(optionIndex, checked) {
		const option = this.options[optionIndex]
		if (option.selected !== checked) {
			option.selected = checked
			this._onChange()
		}
	}

	string() {
		const answer = this.options.filter(o => o.selected).map(o => o.option)
		return `${this.question}\n\n${JSON.stringify(answer, null, 2)}`
	}
}
