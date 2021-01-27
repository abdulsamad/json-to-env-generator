import JSON5 from 'json5';
import generateData from './generateData';
import { copyText, dummyConfigJSON } from './utils';
import Toastify from './toastify';

// Form Submission

const form = document.querySelector('#convert-form') as HTMLFormElement;
form.addEventListener(
	'submit',
	(ev) => {
		ev.preventDefault();

		const outputContainer = document.querySelector('#output-container') as HTMLDivElement;
		const refOutput = document.querySelector('#ref-output') as HTMLDivElement;
		const envOutput = document.querySelector('#env-output') as HTMLDivElement;
		const envOutputBtn = document.querySelector('#env-output-btn') as HTMLButtonElement;
		const jsonOutputBtn = document.querySelector('#json-output-btn') as HTMLButtonElement;
		const submitter = (<any>ev).submitter;

		const jsonStr = (document.querySelector('#json-str') as HTMLTextAreaElement).value;
		const prefix = (document.querySelector('#prefix') as HTMLInputElement).value;

		// Animation reset
		outputContainer.classList.add('is-hidden');
		outputContainer.classList.remove('fade-in-down');

		try {
			const data = new generateData(jsonStr, prefix);

			submitter.classList.add('is-loading');

			envOutput.innerHTML = data.envHTML;
			refOutput.innerHTML = data.jsonHTML;

			// Delay in revealing from UX
			setTimeout(() => {
				outputContainer.classList.remove('is-hidden');
				outputContainer.classList.add('fade-in-down');
				submitter.classList.remove('is-loading');
			}, 1000);

			// Copy all env output
			envOutputBtn.onclick = () => {
				copyText(data.envStr);
				const myToast: any = Toastify({
					text: 'Env Output Copied!',
					duration: 3000,
				});

				myToast.showToast();
			};

			// Copy all JSON output
			jsonOutputBtn.onclick = () => {
				copyText(data.jsonStr);
				const myToast: any = Toastify({
					text: 'Reference Output Copied!',
					duration: 3000,
				});

				myToast.showToast();
			};
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

// Try Sample Button

const trySampleBtn = document.querySelector('#try-sample-btn') as HTMLButtonElement;
trySampleBtn.addEventListener(
	'click',
	() => {
		const jsonStr = document.querySelector('#json-str');
		(<HTMLTextAreaElement>jsonStr).value = JSON5.stringify(dummyConfigJSON);
	},
	false
);

// Event delegations for copying single items

const envOutput = document.querySelector('#env-output') as HTMLDivElement;
envOutput.addEventListener(
	'click',
	(ev) => {
		const target = ev.target as HTMLElement;

		if (target.classList.contains('copy-button-elem')) {
			const txt = (target.closest('.copy-button') as HTMLButtonElement).dataset.copy;
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

const refOutput = document.querySelector('#ref-output') as HTMLDivElement;
refOutput.addEventListener(
	'click',
	(ev) => {
		const target = ev.target as HTMLElement;

		if (target.classList.contains('copy-button-elem')) {
			const txt = (target.closest('.copy-button') as HTMLButtonElement).dataset.copy;
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
