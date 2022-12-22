<script lang="ts">
	import { slide } from 'svelte/transition';
	import Toastify from 'toastify-js';

	import { envOutput, referenceOutput, type convertedObjectType } from '../stores';

	import { copyText } from '../utils';
	import ClipboardIcon from '../assets/clipboard.svg';

	const copyTextWithToast = (txt: string, toastMessage: string) => {
		copyText(txt);
		Toastify({
			text: toastMessage,
			duration: 2000,
			backgroundColor: 'linear-gradient(to right, #73a5ff, #88adf0)',
			gravity: 'bottom',
		}).showToast();
	};

	const copyAllEnv = (data: convertedObjectType[]) => {
		const env = data.reduce((acc, { key, value }) => `${acc}${key}=${value}\n`, '');
		copyTextWithToast(env, 'All Env Output Copied!');
	};

	const copyAllAsJavaScriptObj = (data: convertedObjectType[]) => {
		const json = data.reduce((acc, { key, value }) => `${acc}\t\t${key}: ${value},\n`, '');
		const str = `const config = {\n${json}}`;
		copyTextWithToast(str, 'All Reference Output Copied!');
	};
</script>

<section class="section output-container" transition:slide={{ duration: 300 }}>
	<div class="container">
		<div class="columns is-desktop">
			<div class="column is-half">
				<div class="card code-card">
					<header class="card-header has-background-primary">
						<p class="card-header-title has-text-white-bis">Env File</p>
					</header>
					<div class="card-content">
						<div class="content">
							<table class="table custom-table">
								<tbody>
									{#each $envOutput as { key, value }}
										<tr>
											<td class="is-relative">
												<div class="is-family-code code">
													<span class="key">{key}</span>
													<span>&#61;</span>
													<span class="value">{value}</span>
												</div>
												<button
													class="button is-primary is-small copy-button"
													on:click={() => copyTextWithToast(`${key}=${value}`, 'Copied')}
												>
													<span class="icon">
														<img class="is-16x16" src={ClipboardIcon} alt="Clipboard" />
													</span>
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
					<footer class="card-footer">
						<button
							class="card-footer-item button is-primary"
							on:click={() => copyAllEnv($envOutput)}
						>
							<span class="icon is-small">
								<img class="is-16x16" src={ClipboardIcon} alt="clipboard" />
							</span>
							<span>Copy All</span>
						</button>
					</footer>
				</div>
			</div>
			<div class="column is-half">
				<div class="card code-card">
					<header class="card-header has-background-primary">
						<p class="card-header-title has-text-white-bis">Reference</p>
					</header>
					<div class="card-content">
						<div class="content">
							<table class="table custom-table">
								<tbody>
									{#each $referenceOutput as { key, value }}
										<tr>
											<td class="is-relative">
												<div class="is-family-code code">
													<span class="key">{key}</span>
													<span>&#58;</span>
													<span class="value">{value}</span>
												</div>
												<button
													class="button is-primary is-small copy-button"
													on:click={() => copyTextWithToast(value, 'Copied')}
												>
													<span class="icon">
														<img class="is-16x16" src={ClipboardIcon} alt="clipboard" />
													</span>
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
					<footer class="card-footer">
						<button
							class="card-footer-item button is-primary"
							on:click={() => copyAllAsJavaScriptObj($referenceOutput)}
						>
							<span class="icon is-small">
								<img class="is-16x16" src={ClipboardIcon} alt="clipboard" />
							</span>
							<span>Copy All as JavaScript Object</span>
						</button>
					</footer>
				</div>
			</div>
		</div>
	</div>
</section>
