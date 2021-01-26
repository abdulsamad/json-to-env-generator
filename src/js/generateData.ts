import JSON5 from 'json5';
import ClipboardIcon from '../assets/clipboard-icon.svg';

class generateData {
	str: object;
	prefix: string;

	constructor(str: string, prefix: string) {
		try {
			const start = str.indexOf('{');
			const end = str.lastIndexOf('}') + 1;

			this.str = JSON5.parse(str.slice(start, end));
			this.prefix = prefix;
		} catch (err) {
			throw new Error(err);
		}
	}

	get envStr() {
		let envLocalStr = '';
		const obj = this.str;
		const prefix = this.prefix;

		for (const key in obj) {
			envLocalStr += `${prefix}${key.toUpperCase()}=${obj[key]} \n`;
		}

		return envLocalStr;
	}

	get jsonStr() {
		let newJSONStr = '';

		const obj = this.str;
		const prefix = this.prefix;

		for (const key in obj) {
			newJSONStr += `${key}: "process.env.${prefix}${key.toUpperCase()}",`;
		}

		newJSONStr = `const config = {${newJSONStr}}`;

		return newJSONStr;
	}

	get envHTML() {
		const obj = this.str;
		const prefix = this.prefix;
		let html = '';

		// copy-button-elem class is used for event delegation
		for (const key in obj) {
			// prettier-ignore
			const htmlText = `<span class="key">${prefix}${key.toUpperCase()}</span>=<span class="value">${obj[key]}</span>`;
			const copyText = `${prefix}${key.toUpperCase()}=${obj[key]}`;

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
			// prettier-ignore
			const htmlText = `<span class="key">${key}</span>: <span class="value">process.env.${prefix}${key.toUpperCase()}</span>`;
			const copyText = `${key}: process.env.${prefix}${key.toUpperCase()}`;

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

export default generateData;
