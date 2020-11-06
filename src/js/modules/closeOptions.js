const closeOptions = (titleSelector, showmoreSelector, hideActiveClass, showmoreActiveClass) => {
	const title = document.querySelectorAll(titleSelector),
		showmore = document.querySelector(showmoreSelector);

	// Hide every options elements
	title.forEach(elem => {
		elem.addEventListener('click', () => {
			elem.classList.toggle(hideActiveClass);
		})
	})

	// Hide some extra options
	showmore.addEventListener('click', () => {
		document.querySelectorAll(`.${showmoreActiveClass}`).forEach(elem => {
			elem.classList.remove(showmoreActiveClass);
		})
		showmore.remove();
	})

}
export default closeOptions;