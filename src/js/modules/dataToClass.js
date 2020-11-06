import Card from './cards';
import getResources from '../services/requests';
import hideCards from './hideCards';
import showCards from './showCards';

const dataToClass = (url, state) => {

	getResources(url)
		.then(data => {
			data.forEach(({ name, price, image, metroName, metro, timing, extra }) => {
				new Card(name, price, image, metroName, metro, timing, extra, '.tiles', state).render();
			})
		})
		.then(() => {
			hideCards('.tiles');
		})
		.catch(e => console.log(e))
		.finally(() => {
			showCards('.tiles', '.show-more');
		})


}
export default dataToClass;