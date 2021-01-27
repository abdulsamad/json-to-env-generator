import JSON5 from 'json5';
import GenerateData from './generateData';
import { copyText, dummyConfigJSON } from './utils';
import Toastify from 'toastify-js';

// TODO: Error toast is not responsive

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
			const data = new GenerateData(jsonStr, prefix);

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
				Toastify({
					text: 'Env Output Copied!',
					duration: 2000,
					gravity: 'bottom',
					offset: {
						y: '5.5rem',
						x: '5.5rem',
					},
				}).showToast();
			};

			// Copy all JSON output
			jsonOutputBtn.onclick = () => {
				copyText(data.jsonStr);
				Toastify({
					text: 'Reference Output Copied!',
					duration: 2000,
					gravity: 'bottom',
					offset: {
						y: '5.5rem',
						x: '5.5rem',
					},
				}).showToast();
			};
		} catch (err) {
			// Setting to any to ignore typescript warning beacause no types included in library
			Toastify({
				text: `Please enter valid JSON config! Just copy and paste your config (for e.g: firebase) directly here. <br> <b>Note:</b> Nested JSON is not supported.`,
				duration: 4000,
				gravity: 'bottom',
				offset: {
					y: '5.5rem',
					x: '5.5rem',
				},
				backgroundColor: 'linear-gradient(to right, #cb2d3e, #ef473a)',
			}).showToast();
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
			// data-copy will be added dynamically
			const txt = (<any>target.closest('.copy-button')).dataset.copy;
			copyText(txt);

			Toastify({
				text: 'Copied!',
				duration: 2000,
				gravity: 'bottom',
				offset: {
					y: '5.5rem',
					x: '5.5rem',
				},
			}).showToast();
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
			// data-copy will be added dynamically
			const txt = (<any>target.closest('.copy-button')).dataset.copy;
			copyText(txt);

			Toastify({
				text: 'Copied!',
				duration: 2000,
				gravity: 'bottom',
				offset: {
					y: '5.5rem',
					x: '5.5rem',
				},
			}).showToast();
		}
	},
	false
);
