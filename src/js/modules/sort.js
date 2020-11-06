import dataToClass from './dataToClass';
const sort = (state, applySelector, deleteSelector) => {
	const form = document.querySelector(applySelector),
		del = document.querySelector(deleteSelector);

	const metroItems = document.querySelectorAll('.metro__item');
	const priceItems = document.querySelectorAll('.price__input');
	const timingItems = document.querySelectorAll('.options__item-radio');
	const extraItems = document.querySelectorAll('.extra__checkbox');
	let tiles = document.querySelector('.tiles').children;

	const activeMetro = 'metro__item-active';

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		[...tiles].forEach(elem => elem.remove());
		dataToClass('http://localhost:3000/properties', state);
	})

	del.addEventListener('click', (event) => {
		event.preventDefault();

		// clear metro
		metroItems.forEach(elem => {
			elem.classList.remove(activeMetro);
		})
		metroItems[metroItems.length - 1].classList.add(activeMetro);

		// clear price
		priceItems.forEach(input => input.value = '');

		// clear timing 
		timingItems[0].checked = true

		// clear extra
		extraItems.forEach(elem => {
			elem.checked = false;
		})

		//Show all properties
		state = {
			'metro': ['0 - 1000'],
			'price': [3000000, 41300000],
			'timing': '0',
			'extra': []
		};

		[...tiles].forEach(elem => elem.remove());
		dataToClass('http://localhost:3000/properties', state);
	})

	// METRO active classes
	const metroChoose = [...metroItems].filter((elem, i) => i < metroItems.length - 1);
	const metroAny = metroItems[metroItems.length - 1];

	// Metro choose
	metroChoose.forEach(elem => {
		elem.addEventListener('click', () => {
			elem.classList.toggle(activeMetro);
			metroAny.classList.remove(activeMetro);
		})
	})

	// ANY
	metroAny.addEventListener('click', () => {
		metroAny.classList.toggle(activeMetro);
		deleteActiveMetro();
	})
	const deleteActiveMetro = () => {
		metroChoose.forEach(elem => {
			elem.classList.remove(activeMetro);
		})
	}
}
export default sort;