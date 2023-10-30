class SummarySection {
	#data = []
	#isFirstPrint = true

	update(data) {
		this.#data = data
	}

	show() {
		this.clean()
		this.#makeTitle()
		this.#makeData()
		this.#makePrintSection()
	}

	updateMode(mode) {
		if (mode === QuestionManager.Mode.Summary)
			visible(summaryEl, true)
		else
			visible(summaryEl, false)
	}

	clean() {
		summaryEl.innerHTML = ''
	}

	confirm() {
		if (this.#isFirstPrint)
			this.#print()
	}

	#makeTitle() {
		summaryEl.appendChild(document.createElement('h3')).textContent = 'Well done. Please review and confirm your answers.'
	}

	#makeData() {
		this.#data.forEach(item => {
			const pEl = summaryEl.appendChild(document.createElement('p'))
			const dataEl = pEl.appendChild(document.createElement('pre'))
			dataEl.textContent = item
			dataEl.className = 'print'
		})
	}

	#makePrintSection() {
		const pEl = summaryEl.appendChild(document.createElement('p'))
		pEl.className = 'print-button-container'
		if (this.#isFirstPrint) {
			const printbuttonEl = pEl.appendChild(document.createElement('button'))
			printbuttonEl.onclick = () => this.#print()
			printbuttonEl.appendChild(document.createElement('p')).textContent = 'Confirm'
			const hintEl = printbuttonEl.appendChild(document.createElement('p'))
			hintEl.textContent = 'c'
			hintEl.className = 'hint'
		} else
			pEl.appendChild(document.createElement('p')).textContent = 'Please print the page (Ctrl + P | ⌘ + P).'
	}

	#print() {
		this.#isFirstPrint = false
		this.show()
		window.print()
	}
}
