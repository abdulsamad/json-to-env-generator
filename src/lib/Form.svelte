<script lang="ts">
	import JSON5 from 'json5';
	import Toastify from 'toastify-js';

	import { showResult, prefix, currentCode, envOutput, referenceOutput, bundler } from '../stores';
	import {
		dummyConfigJSON,
		createIterableEnvFileData,
		createIterableEvnReferenceData,
	} from '../utils/index';

	let code: string;

	const handleSubmit = async () => {
		try {
			showResult.set(false);

			const start = code.indexOf('{');
			const end = code.lastIndexOf('}') + 1;
			const parsedJSON = JSON5.parse(code.slice(start, end));

			const envString = createIterableEnvFileData(parsedJSON, $prefix);
			const JSONString = createIterableEvnReferenceData(parsedJSON, {
				prefix: $prefix,
				bundler: $bundler,
			});

			currentCode.set(parsedJSON);
			envOutput.set(envString);
			referenceOutput.set(JSONString);

			showResult.set(true);
		} catch (err) {
			Toastify({
				text: `Please enter valid JSON config! Just copy and paste your config (for e.g: Firebase) directly here.`,
				duration: 5000,
				gravity: 'bottom',
				backgroundColor: 'linear-gradient(to right, #cb2d3e, #ef473a)',
			}).showToast();
		}
	};

	const fillSampleData = () => {
		code = JSON5.stringify(dummyConfigJSON, null, 2);
	};
</script>

<section class="section">
	<div class="container">
		<div class="card has-background-dark mt-5 p-2">
			<div class="card-content">
				<form on:submit|preventDefault={handleSubmit}>
					<div class="field mb-4">
						<label class="label has-text-white-bis mb-4" for="code">Code</label>
						<p class="control">
							<textarea
								class="textarea has-background-dark has-text-white-bis"
								id="code"
								placeholder="Enter or paste your config JSON here..."
								rows="10"
								bind:value={code}
								required
							/>
						</p>
					</div>
					<div class="field is-horizontal my-5">
						<div class="columns">
							<div class="column">
								<div class="columns">
									<div class="column is-one-fifth">
										<label
											class="label has-text-white-bis mt-2 mr-3"
											for="prefix"
											title="Environment variable prefix">Prefix</label
										>
									</div>
									<div class="column is-four-fifths">
										<div class="field-body">
											<div class="field">
												<p class="control">
													<input
														type="text"
														id="prefix"
														list="prefix-list"
														class="input has-background-dark has-text-white-bis is-uppercase"
														placeholder="Prefix for Env vars"
														autocomplete="off"
														bind:value={$prefix}
													/>
													<datalist id="prefix-list">
														<option value="NEXT_PUBLIC_" />
														<option value="GATSBY_" />
														<option value="REACT_APP_" />
													</datalist>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="column">
								<div class="columns">
									<div class="column is-one-fifth">
										<label
											class="label has-text-white-bis mt-2 mr-5"
											for="bundler"
											title="Environment variable reference prefix">Bundler</label
										>
									</div>
									<div class="column is-four-fifths">
										<div class="field-body">
											<div class="field">
												<div class="select ml-4">
													<select
														class="has-text-white-bis has-background-dark"
														id="bundler"
														bind:value={$bundler}
													>
														<option value="process.env">Webpack &#40;process.env&#41;</option>
														<option value="import.meta.env">Vite &#40;import.meta.env&#41;</option>
													</select>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="field mt-5 is-flex is-align-items-center">
						<button type="submit" class="button is-primary is-rounded">Convert</button>
						<button
							type="button"
							class="button is-primary is-outlined is-rounded is-small ml-3"
							on:click={() => {
								fillSampleData();
								handleSubmit();
							}}>Try Sample Data</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</section>
