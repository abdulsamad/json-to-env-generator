import type { convertedObjectType } from '../stores';

export const copyText = (txt: string) => {
	const elem = document.createElement('textarea');
	const body = document.body;

	elem.style.opacity = '0.1';
	elem.value = txt;

	body.append(elem);
	elem.select();
	document.execCommand('copy');
	body.removeChild(elem);
};

export const dummyConfigJSON = {
	apiKey: '1afd8097-75fa-5a72-8403-66ee57014e3a',
	authDomain: 'http://wuvle.eg/wisolhel',
	projectId: 'tXHnZiUkPNBUmz1z0',
	storageBucket: 'http://zagu.es/zahejlop',
	messagingSenderId: '9397484',
	appId: '7311:4c91:411f:5ce7:6f76:f67e:37d2:a997',
};

export const convertEnvToArray = (
	obj: object,
	prefix: string,
	depth = 0,
): convertedObjectType[] => {
	const collection: convertedObjectType[] = [];

	for (const key in obj) {
		const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
		const value = obj[key];

		if (typeof value === 'object') {
			const childStr = convertEnvToArray(
				value,
				`${prefix}${newKey}${depth + 1 > 0 ? '_' : ''}`,
				++depth,
			);
			collection.push(...childStr);
			continue;
		}

		collection.push({
			key: prefix + newKey,
			value: obj[key],
			depth,
		});
	}

	return collection;
};

export const convertToJavaScriptArray = (
	obj: object,
	prefix: string,
	depth = 0,
): convertedObjectType[] => {
	const collection: convertedObjectType[] = [];

	for (const key in obj) {
		const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
		const value = obj[key];

		if (typeof value === 'object') {
			const childStr = convertToJavaScriptArray(
				value,
				`${prefix}${newKey}${depth + 1 > 0 ? '_' : ''}`,
				++depth,
			);
			collection.push(...childStr);
			continue;
		}

		// ! Issue with svelte compiler process.env in string parses to ({}) in build (not dev mode)
		// console.log({ value: `process.env.` });

		collection.push({
			key,
			value: `${'process'}.${'env'}.${prefix}${newKey}`,
			depth,
		});
	}

	return collection;
};
