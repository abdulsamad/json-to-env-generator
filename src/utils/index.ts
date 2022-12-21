import Toastify from 'toastify-js';

import type { convertedObjectType } from '../stores';

export const copyText = (txt: string): boolean => {
	const elem = document.createElement('textarea');
	const body = document.body;

	elem.style.opacity = '0.1';
	elem.value = txt;

	body.append(elem);
	elem.select();
	document.execCommand('copy');
	body.removeChild(elem);
	return true;
};

export const dummyConfigJSON = {
	apiKey: '1afd8097-75fa-5a72-8403-66ee57014e3a',
	authDomain: 'http://wuvle.eg/wisolhel',
	projectId: 'tXHnZiUkPNBUmz1z0',
	storageBucket: 'http://zagu.es/zahejlop',
	messagingSenderId: '9397484',
	appId: '7311:4c91:411f:5ce7:6f76:f67e:37d2:a997',
};

export const convertEnvToArrray = (
	obj: object,
	prefix: string,
	depth = 0,
): convertedObjectType[] => {
	const collection: convertedObjectType[] = [];

	for (const key in obj) {
		const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
		const value = obj[key];

		if (typeof value === 'object') {
			const childStr = convertEnvToArrray(
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

export const convertToJavaScriptArr = (
	obj: object,
	prefix: string,
	depth = 0,
): convertedObjectType[] => {
	const collection: convertedObjectType[] = [];

	for (const key in obj) {
		const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter}`).toUpperCase();
		const value = obj[key];

		if (typeof value === 'object') {
			const childStr = convertToJavaScriptArr(
				value,
				`${prefix}${newKey}${depth + 1 > 0 ? '_' : ''}`,
				++depth,
			);
			collection.push(...childStr);
			continue;
		}

		collection.push({
			key,
			value: `process.env.${prefix}${newKey},`,
			depth,
		});
	}

	// str = `const config = {${str}}`;

	return collection;
};

interface IToast {
	text: string;
	duration?: number;
	gravity?: 'top' | 'bottom';
	close?: boolean;
	backgroundColor?: string;
}

export const Toast = ({
	text,
	duration = 2000,
	gravity = 'bottom',
	close,
	backgroundColor,
}: IToast) => {
	Toastify({
		text: text,
		duration: duration,
		gravity,
		backgroundColor,
		close,
		offset: {
			y: '5.5rem',
			x: '5.5rem',
		},
	}).showToast();
};
