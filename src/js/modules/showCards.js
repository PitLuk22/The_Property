const showCards = (tilesSelector, showSelector) => {
	const tiles = [...document.querySelector(tilesSelector).children];
	const show = document.querySelector(showSelector)
	try {
		show.addEventListener('click', () => {
			tiles.forEach(elem => elem.classList.remove('hide'));
			show.remove();
		});
	} catch (e) {

	}


}
export default showCards;