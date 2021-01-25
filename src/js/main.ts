import JSON5 from 'json5';
import generateData from './generateData';
import { copyText, dummyConfigJSON } from './utils';
import Toastify from './toastify';

// Form Submission
const form = document.querySelector('#convert-form');
form.addEventListener(
	'submit',
	(ev) => {
		ev.preventDefault();

		const outputContainer = document.querySelector('#output-container');
		const refOutput = document.querySelector('#ref-output');
		const envOutput = document.querySelector('#env-output');

		const jsonStr = (document.querySelector('#json-str') as HTMLTextAreaElement)
			.value;
		const prefix = (document.querySelector('#prefix') as HTMLInputElement)
			.value;

		try {
			const data = new generateData(jsonStr, prefix);

			envOutput.innerHTML = data.jsonHTML;
			refOutput.innerHTML = data.envHTML;

			outputContainer.classList.remove('is-hidden');
		} catch (err) {
			// Setting to any to ignore typescript warning beacause no types included in library
			const myToast: any = Toastify({
				text: `Please enter valid JSON! Don't edit or change config from firebase console just copy and paste it here.`,
				duration: 3000,
			});

			myToast.showToast();
		}
	},
	false
);

// Copy All Button Listeners
document.querySelector('#env-output-btn').addEventListener(
	'click',
	() => {
		copyText('#env-output');
		const myToast: any = Toastify({
			text: 'Env Output Copied!',
			duration: 3000,
		});

		myToast.showToast();
	},
	false
);

document.querySelector('#json-output-btn').addEventListener(
	'click',
	() => {
		copyText('#json-output');
		const myToast: any = Toastify({
			text: 'Reference Output Copied!',
			duration: 3000,
		});

		myToast.showToast();
	},
	false
);

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

		if (target.classList.contains('copy-button-elem')) {
			const txt = (target.closest('.copy-button') as HTMLButtonElement).dataset
				.copy;
			copyText(txt);

			const myToast: any = Toastify({
				text: 'Copied!',
				duration: 3000,
			});

			myToast.showToast();
		}
	},
	false
);

document.querySelector('#ref-output').addEventListener(
	'click',
	(ev) => {
		const target = ev.target as HTMLElement;

		if (target.classList.contains('copy-button-elem')) {
			const txt = (target.closest('.copy-button') as HTMLButtonElement).dataset
				.copy;
			copyText(txt);

			const myToast: any = Toastify({
				text: 'Copied!',
				duration: 3000,
			});

			myToast.showToast();
		}
	},
	false
);
