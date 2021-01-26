export const dummyConfigJSON = {
	apiKey: '1afd8097-75fa-5a72-8403-66ee57014e3a',
	authDomain: 'http://wuvle.eg/wisolhel',
	projectId: 'tXHnZiUkPNBUmz1z0',
	storageBucket: 'http://zagu.es/zahejlop',
	messagingSenderId: '9397484',
	appId: '7311:4c91:411f:5ce7:6f76:f67e:37d2:a997',
};

export function copyText(txt) {
	const elem = document.createElement('textarea');
	const body = document.body;

	elem.style.opacity = '0.1';
	elem.value = txt;

	body.append(elem);
	elem.select();
	document.execCommand('copy');
	body.removeChild(elem);
}
