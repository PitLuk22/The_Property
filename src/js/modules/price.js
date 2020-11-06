const price = (ipnutSelector, priceSelector) => {
	const inputs = document.querySelectorAll(ipnutSelector);
	const priceBlock = document.querySelector(priceSelector);

	const changeColorPriceBlock = (event) => {
		inputs.forEach(input => input.addEventListener(event, () => {
			if (event === 'focus') {
				priceBlock.style.backgroundColor = '#fff';
			}
			if (event === 'blur') {
				priceBlock.style.backgroundColor = 'transparent';
				input.value === '0' ? input.value = '' : false;
			}
			if (event === 'input') {
				// No letters
				input.value = input.value.replace(/\D/g, '');
				// Mask
				let value = +input.value.replace(/\s/g, '');
				input.value = value.toLocaleString();
			}
		}));
	}

	changeColorPriceBlock('focus');
	changeColorPriceBlock('blur');
	changeColorPriceBlock('input');
}
export default price;