
export default class Card {
	constructor(name, price, image, metroName, metro, timing, extra, parentSelector, state) {
		this.name = name;
		this.price = +price;
		this.image = image;
		this.metroName = metroName;
		this.metro = metro;
		this.timing = timing;
		this.extra = extra;
		this.parentSelector = document.querySelector(parentSelector);
		this.state = state;
		this.extraCount = 0;
	}

	modifyPrice(price) {
		return price.toLocaleString();
	}

	checkMetro() {
		let metroValuesArr = [...this.state.metro].map(elem => elem.match(/\d+/g)).reduce((prev, elem) => [...prev, ...elem], []);
		let min = Math.min.apply(null, metroValuesArr);
		let max = Math.max.apply(null, metroValuesArr);

		if (this.metro >= min && this.metro <= max) {
			return true;
		} else {
			return false;
		}
	}

	checkPrice() {
		if (this.state.price[0] < this.price && this.state.price[1] > this.price) {
			return true;
		} else {
			return false;
		}
	}

	checkTiming() {
		switch (+this.state.timing) {
			case 0: // любой
				return true;
			case 2019: // сдан
				if (this.timing <= 2019) {
					return true;
				} else {
					return false;
				}
			case 2020: // в этом году
				if (this.timing === 2020) {
					return true;
				} else {
					return false;
				}
			case 2021: // в след году
				if (this.timing > 2020) {
					return true;
				} else {
					return false;
				}
		}
	}

	checkExtra() {
		if (this.state.extra.length === 0) {
			return true;
		} else {

			this.state.extra.forEach(item => {
				if (this.extra.includes(item)) {
					this.extraCount++;
				}
			})

			if (this.extraCount === this.state.extra.length) {
				return true;
			} else {
				return false;
			}
		}
	}

	render() {

		if (this.checkMetro() && this.checkTiming() && this.checkExtra() && this.checkPrice()) {

			let div = document.createElement('div');
			div.classList.add('col-4');

			div.innerHTML = `
			<div class="item">
				<div class="item__header">
					<div class="item__additional-info">
						<div class="item__class">Комфорт</div>
						<div class="item__credit">Рассрочка 12 мес.</div>
					</div>
					<img class="item__img" src="${this.image}" alt="building">
					<div class="item__price">
						<span class="item__price-numbers">${this.modifyPrice(+this.price)}</span>
						<span class="item__price-currency">руб</span>
					</div>
				</div>
				<div class="item__descr" data-extra="${this.extra}">
					<div class="item__title">${this.name}</div>
					<div class="item__timing">Срок сдачи до 4 кв. ${this.timing} г.</div>
					<div class="item__metro" data-metro="${this.metro}">
						<img class="item__img-small" src="img/Moscow_Metro 1.svg" alt="Metro">
						<span>${this.metroName}</span>
					</div>
					<div class="item__address">пр. Льва Толстого 180А</div>
				</div>
			</div>
			`;
			this.parentSelector.appendChild(div);

		}
	}
}