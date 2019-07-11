const offersArray = [];

class Offer{
    constructor(name){
        this.name = name;
    }

    setData(logo, logoHeader, description, price){
        this.logo = logo;
        this.logoHeader = logoHeader;
        this.description = description;
        this.price = price;

        offersArray.push(this);
    }
}

const first = new Offer('jednorazowe');
const second = new Offer('wejscia');
const third = new Offer('miesieczny');

first.setData('1', 'Jednorazowe Wejście', 'Jednorazowe wejście na siłowinię', 20);
second.setData('10', 'Karnet 10 wejść', '10 wejść w ciągu miesiąca', 80);
third.setData('1msc', 'Karnet Miesięczny', 'Miesięczny wstęp na siłownię', 120);

export default { offersArray };