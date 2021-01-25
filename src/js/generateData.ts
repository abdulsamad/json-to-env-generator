import JSON5 from 'json5';

class generateData {
	str: object;
	prefix: string;

	constructor(str : string, prefix: string ) {
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

	get jsonHTML() {
		let html = '';

		const obj = this.str;
		const prefix = this.prefix;

		// copy-button class is used for event delegation
		for (const key in obj) {
			html += `
			<tr>
				<td>
					<code>${prefix}${key.toUpperCase()}=${obj[key]}</code>
				</td>
				<td>
					<button class="button copy-button">
						<i role="img" aria-label="Copy to Clipboard" class="icon is-small copy-button">
							📋
						</i>
					</button>
				</td>
			</tr>
			`;
		}

		return html;
	}

	get envHTML() {
		let html = '';

		const obj = this.str;
		const prefix = this.prefix;

		// copy-button class is used for event delegation
		for (const key in obj) {
			html += `
			<tr>
				<td>
					<code class="content">${prefix}${key.toUpperCase()}=${obj[key]}</code>
				</td>
				<td>
					<button class="button copy-button">
						<i role="img" aria-label="Copy to Clipboard" class="icon is-small copy-button">
							📋
						</i>
					</button>
				</td>
			</tr>
			`;
		}

		return html;
	}
}

export default generateData;
