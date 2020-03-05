const JSON5 = require('json5');

document.querySelector('#convert-form').addEventListener(
	'submit',
	function(ev) {
		ev.preventDefault();
		const jsonOutput = document.querySelector('#json-output');
		const envOutput = document.querySelector('#env-output');
		const outputContainer = document.querySelector('#output-container');
		const notification = document.querySelector('#notification');
		const jsonStr = document.querySelector('#json-str').value;
		notification.classList.add('is-hidden');

		try {
			let newJsonStr = '';
			let envLocalStr = '';
			const start = jsonStr.indexOf('{');
			const end = jsonStr.lastIndexOf('}') + 1;
			const obj = JSON5.parse(jsonStr.slice(start, end));

			for (const key in obj) {
				newJsonStr += `${key}: process.env.REACT_APP_${key.toUpperCase()}, \n`;

				typeof obj[key] === 'string'
					? (envLocalStr += `REACT_APP_${key.toUpperCase()} = "${obj[key]}" \n`)
					: (envLocalStr += `REACT_APP_${key.toUpperCase()} = ${obj[key]} \n`);
			}

			envOutput.innerHTML = envLocalStr;
			jsonOutput.innerHTML = newJsonStr;

			outputContainer.classList.remove('is-hidden');
		} catch (err) {
			console.log(err);
			notification.classList.remove('is-hidden');
			setTimeout(() => notification.classList.add('is-hidden'), 3000);
		}
	},
	false,
);

document.querySelector('#env-output-btn').addEventListener(
	'click',
	function(ev) {
		copyText('#env-output');
	},
	false,
);

document.querySelector('#json-output-btn').addEventListener(
	'click',
	function(ev) {
		copyText('#json-output');
	},
	false,
);

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const $navbarBurgers = Array.prototype.slice.call(
			document.querySelectorAll('.navbar-burger'),
			0,
		);
		if ($navbarBurgers.length > 0) {
			$navbarBurgers.forEach(el => {
				el.addEventListener('click', () => {
					const target = el.dataset.target;
					const $target = document.getElementById(target);
					el.classList.toggle('is-active');
					$target.classList.toggle('is-active');
				});
			});
		}
	},
	false,
);

function copyText(id) {
	document.querySelector(id).select();
	document.execCommand('copy');
}
