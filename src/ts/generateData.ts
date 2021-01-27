import JSON5 from 'json5';
import ClipboardIcon from '../assets/clipboard-icon.svg';

class GenerateData {
	private str: object;
	private prefix: string;

	constructor(str: string, prefix: string) {
		try {
			const start = str.indexOf('{');
			const end = str.lastIndexOf('}') + 1;

			this.str = JSON5.parse(str.slice(start, end));
			this.prefix = prefix.toUpperCase();
		} catch (err) {
			throw new Error(err);
		}
	}

	get envStr() {
		let envLocalStr = '';
		const obj: any = this.str;
		const prefix = this.prefix;

		for (const key in obj) {
			const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
			envLocalStr += `${prefix}${newKey}=${obj[key]} \n`;
		}

		return envLocalStr;
	}

	get jsonStr() {
		let newJSONStr = '';

		const obj = this.str;
		const prefix = this.prefix;

		for (const key in obj) {
			const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
			newJSONStr += `${key}: process.env.${prefix}${newKey},`;
		}

		newJSONStr = `const config = {${newJSONStr}}`;

		return newJSONStr;
	}

	get envHTML() {
		const obj: any = this.str;
		const prefix = this.prefix;
		let html = '';

		// copy-button-elem class is used for event delegation
		for (const key in obj) {
			const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
			const htmlText = `<span class="key">${prefix}${newKey}</span>=<span class="value">${obj[key]}</span>`;
			const copyText = `${prefix}${newKey}=${obj[key]}`;

			html += `
			<tr>
				<td class="is-relative">
					<div class="is-family-code code">${htmlText}</div>
					<button data-copy="${copyText}" class="button is-primary is-small copy-button copy-button-elem">
						<span class="icon copy-button-elem">
							<img class="is-16x16 copy-button-elem" src="${ClipboardIcon}" alt="clipbaord icon" />
						</span>
					</button>
				</td>
			</tr>
			`;
		}

		return html;
	}

	get jsonHTML() {
		const obj = this.str;
		const prefix = this.prefix;
		let html = '';

		// copy-button-elem class is used for event delegation
		for (const key in obj) {
			const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
			const htmlText = `<span class="key">${key}</span>: <span class="value">process.env.${prefix}${newKey}</span>`;
			const copyText = `${key}: process.env.${prefix}${newKey}`;

			html += `
			<tr>
				<td class="is-relative">
					<div class="is-family-code code">${htmlText}</div>
					<button data-copy="${copyText}" class="button is-primary is-small copy-button copy-button-elem">
						<span class="icon copy-button-elem">
								<img class="is-16x16 copy-button-elem" src="${ClipboardIcon}" alt="clipbaord icon" />
						</span>
					</button>
				</td>
			</tr>
			`;
		}

		return html;
	}
}

export default GenerateData;
