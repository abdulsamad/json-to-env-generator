import JSON5 from 'json5';
import generateData from './generateData';
import { copyText, dummyConfigJSON } from './utils';

const form = document.querySelector('#convert-form');
form.addEventListener(
	'submit',
	(ev) => {
		ev.preventDefault();

		const notification = document.querySelector('#notification');
		const outputContainer = document.querySelector('#output-container');
		const refOutput = document.querySelector('#ref-output');
		const envOutput = document.querySelector('#env-output');

		const jsonStr = (document.querySelector('#json-str') as HTMLTextAreaElement).value;
		const prefix = (document.querySelector('#prefix') as HTMLInputElement).value;

		// Adding Class Just in Case
		notification.classList.add('is-hidden');

		try {
			const data = new generateData( jsonStr, prefix );

			envOutput.innerHTML = data.jsonHTML;
			refOutput.innerHTML = data.envHTML;

			outputContainer.classList.remove('is-hidden');
		} catch (err) {
			console.log(err);
			notification.classList.remove('is-hidden');
			setTimeout(() => notification.classList.add('is-hidden'), 3000);
		}
	},
	false
);

// Button Listeners
document
	.querySelector('#env-output-btn')
	.addEventListener('click', () => copyText('#env-output'), false);

document
	.querySelector('#json-output-btn')
	.addEventListener('click', () => copyText('#json-output'), false);

// Try Sample Button
document.querySelector('#try-sample-btn').addEventListener(
	'click',
	() => {
		const jsonStr = document.querySelector('#json-str');
		(<HTMLTextAreaElement>jsonStr).value = JSON5.stringify(dummyConfigJSON);
	},
	false
);

// Event Delegation
document.querySelector('#env-output').addEventListener(
	'click',
	(ev) => {
		const target = ev.target as HTMLElement;

		if (target.classList.contains('copy-button')) {
			console.log(ev.target);
		}
	},
	false
);

document.querySelector('#ref-output').addEventListener(
	'click',
	(ev) => {
		const target = ev.target as HTMLElement;

		if (target.classList.contains('copy-button')) {
			console.log(ev.target);
		}
	},
	false
);
