
import sort from './modules/sort';
import closeOptions from './modules/closeOptions';
import bindState from './modules/bindState';
import dataToClass from './modules/dataToClass';
import price from './modules/price';

window.addEventListener('DOMContentLoaded', () => {
	'use strict';

	let state = {
		'metro': ['0 - 1000'],
		'price': [3000000, 41300000],
		'timing': '0',
		'extra': []
	}

	sort(state, '#sorting', '.btn__delete');

	bindState(state);

	dataToClass('http://localhost:3000/properties', state);

	closeOptions('.side-bar__title', '.side-bar__more', 'side-bar__title-active', 'extra__item-hide', '#sorting');

	price('.price__input', '.price');

})
