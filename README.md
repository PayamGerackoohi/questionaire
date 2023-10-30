# Questionaire
Questionaire is a `Single Html App`, that generates a simple pdf containing a list of question-answer pairs out of a json input.

## Prerequisites
- [Node][node-url]
- Internet Browser :grinning:

Optional
- [html-minifer][html-minifer-url]
- [pnpm][pnpm-url]

## Steps
1. Define your data in `./input/data.json`
```json
{
	"title": "Sample Questionaire",
	"questions": [
		{
			"type": "single",
			"question": "Question 1",
			"options": [
				"Option 1",
				"Option 2",
				"Option 3"
			],
			"selected": 2
		},
		{
			"type": "multi",
			"question": "Question 2",
			"options": [
				{
					"option": "Option 1",
					"selected": true
				},
				{
					"option": "Option 2",
					"selected": false
				},
				{
					"option": "Option 3",
					"selected": true
				}
			]
		}
	]
}
```
2. Run the project in terminal
```shell
% pnpm start
```
In case of success, it prints:
```
Questionaire.html
Generated in ./output/
Minified in ./output/min/
```

3. Running `Questionaire.html` in `./output/min/` would be like this:

Question 1
![Q1](/docs/images/Q1.png)
Question 2
![Q2](/docs/images/Q2.png)
Result
![Result](/docs/images/Result.png)
Pdf
![Pdf](/docs/images/Pdf.png)

## Keyboard Shortcuts
| key    | Description                      |
| ------ | -------------------------------- |
| < \| , | Previous Question [if available] |
| > \| . | Next Question [if available]     |
| c \| C | Confirm [to print]               |
| 1~9    | Selecting Options                |

[node-url]: http://nodejs.org/
[pnpm-url]: https://pnpm.io
[html-minifer-url]: https://www.npmjs.com/package/html-minifier
