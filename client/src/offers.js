const offersArray = [];

class Offer {
    constructor(name) {
        this.name = name;
    }

    setData(logo, logoHeader, description, price) {
        this.logo = logo;
        this.logoHeader = logoHeader;
        this.description = description;
        this.price = price;

        offersArray.push(this);
    }
}

const a1 = new Offer('jednorazowe');
const a2 = new Offer('wejscia');
const a3 = new Offer('miesieczny');
const a4 = new Offer('3miesieczny');
const a5 = new Offer('polroczny');
const a6 = new Offer('roczny');

a1.setData('1', 'Jednorazowe Wejście', 'Jednorazowe wejście na siłowinię', 20);
a2.setData('10', 'Karnet 10 wejść', '10 wejść w ciągu miesiąca', 80);
a3.setData('1msc', 'Karnet OPEN Miesięczny', 'Miesięczny wstęp na siłownię', 120);
a4.setData('3msc', 'Karnet OPEN 3-Miesięczny', '3-Miesięczny wstęp na siłownię', 300);
a5.setData('6msc', 'Karnet OPEN Półroczny', 'Półroczny wstęp na siłownię', 500);
a6.setData('rok', 'Karnet OPEN Roczny', 'Roczny wstęp na siłownię', 900);

export default { offersArray };
