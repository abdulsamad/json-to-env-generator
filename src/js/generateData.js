import JSON5 from 'json5';

class generateData {
	constructor({ str, prefix }) {
		try {
			const start = str.indexOf('{');
			const end = str.lastIndexOf('}') + 1;

			this.JSONStr = JSON5.parse(str.slice(start, end));
			this.prefixStr = prefix;
		} catch (err) {
			throw new Error(err);
		}
	}

	get jsonStr() {
		let newJsonStr = '';

		const obj = this.JSONStr;
		const prefixStr = this.prefixStr;

		for (const key in obj) {
			newJsonStr += `${key}: process.env.${prefixStr}${key.toUpperCase()}, \n`;
		}

		return newJsonStr;
	}

	get envStr() {
		let envLocalStr = '';

		const obj = this.JSONStr;
		const prefixStr = this.prefixStr;

		for (const key in obj) {
			envLocalStr += `${prefixStr}${key.toUpperCase()}=${obj[key]} \n`;
		}

		return envLocalStr;
	}

	get jsonHTML() {
		let html = '';

		const obj = this.JSONStr;
		const prefixStr = this.prefixStr;

		// copy-button class is used for event delegation
		for (const key in obj) {
			html += `
			<tr>
				<td>
					<code>${prefixStr}${key.toUpperCase()}=${obj[key]}</code>
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

		const obj = this.JSONStr;
		const prefixStr = this.prefixStr;

		// copy-button class is used for event delegation
		for (const key in obj) {
			html += `
			<tr>
				<td>
					<code class="content">${prefixStr}${key.toUpperCase()}=${obj[key]}</code>
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
