const bindState = (state) => {
	const metroItems = document.querySelectorAll('.metro__item');
	const priceInputMin = document.querySelectorAll('.price__input-min');
	const priceInputMax = document.querySelectorAll('.price__input-max');
	const timingItems = document.querySelectorAll('.options__item-radio');
	const extraItems = document.querySelectorAll('.extra__checkbox');

	function bindModalState(event, items, prop) {
		items.forEach((elem, index) => {
			elem.addEventListener(event, function () {
				switch (elem.getAttribute('type')) {
					case null:
						// state[prop] = elem.textContent;
						state[prop] = [...items]
							.filter(item => item.classList.contains('metro__item-active'))
							.map(item => item.getAttribute('value'));
						break;
					case 'checkbox':
						state[prop] = [...items]
							.filter(item => item.checked === true)
							.map(item => item.id);
						break;
					case 'radio':
						state[prop] = elem.value;
						break;
					case 'text':
						let value = elem.value.replace(/\s/g, '');
						if (elem.classList.contains('price__input-min')) {
							state[prop][0] = +value;
						} else {
							state[prop][1] = +value;
						}
						break;
				}
				// console.log(state);

			});
		});
	}

	bindModalState('click', metroItems, 'metro');
	bindModalState('input', priceInputMin, 'price');
	bindModalState('input', priceInputMax, 'price');
	bindModalState('change', timingItems, 'timing');
	bindModalState('change', extraItems, 'extra');

}
export default bindState;