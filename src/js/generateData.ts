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

	get jsonStr() {
		let newJsonStr = '';

		const obj = this.str;
		const prefix = this.prefix;

		for (const key in obj) {
			newJsonStr += `${key}: process.env.${prefix}${key.toUpperCase()}, \n`;
		}

		return newJsonStr;
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

	get envHTML() {
		const obj = this.str;
		const prefix = this.prefix;
		let html = '';

		// copy-button-elem class is used for event delegation
		for (const key in obj) {
			const copyText = `${prefix}${key.toUpperCase()}=${obj[key]}`;

			html += `
			<tr>
				<td>
					<code class="content">${copyText}</code>
				</td>
				<td>
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
			const copyText = `${prefix}${key.toUpperCase()}=${obj[key]}`;

			html += `
			<tr>
				<td>
					<code>${copyText}</code>
				</td>
				<td>
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
