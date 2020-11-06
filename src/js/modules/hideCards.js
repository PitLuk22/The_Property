const hideCards = (tilesSelector) => {
	const tiles = document.querySelector(tilesSelector);
	let count = 0;

	try {
		document.querySelector('.show-more').remove();
	} catch (e) { }

	[...tiles.children].forEach((elem, index) => {
		if (index >= 6) {
			elem.classList.add('hide');

			if (count === 0 && document.querySelector('.show-more') === null) {
				let div = document.createElement('div');
				div.classList.add('show-more');
				div.innerHTML = `
					<img class="show-more__img" src="img/plus-circle.svg" alt="more">
					<span class="show-more__span">Показать больше</span>
				`;
				tiles.after(div);
				count++;
			}
		}
	})
}
export default hideCards;
