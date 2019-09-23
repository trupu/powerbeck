import axios from 'axios';
import address from '../config/address';

const url = `${address.main}/adminpanel/offers`;

class Offer {
    static getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const { data } = res;
                let sorted = data.data;
                // sorting array of objects by price
                // eslint-disable-next-line
                sorted = sorted.sort((a, b) => a.price > b.price ? 1 : -1);
                resolve(sorted);
            } catch (err) {
                reject(err);
            }
        });
    }

    static postData(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const validation = this.validate(data);
                if (validation !== 'ok') {
                    const status = false;
                    const message = validation;
                    resolve({ status, message });
                } else {
                    const res = await axios.post(url, data);
                    resolve(res);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    static updateData(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const validation = this.validate(data);
                if (validation !== 'ok') {
                    const status = false;
                    const message = validation;
                    resolve({ status, message });
                } else {
                    const res = await axios.put(`${url}/${id}`, data);
                    resolve(res);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    static deleteData(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}/${id}`);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    }

    static validate(data) {
        const logomax = 4;
        const namemax = 40;
        const descmax = 100;
        if (data) {
            if (data.logo) {
                if (data.logo.length > logomax) return `Logo ma więcej niż ${logomax} znaków!`;
            }
            if (data.name) {
                if (data.name.length > namemax) return `Nazwa ma więcej niż ${namemax} znaków!`;
            }
            if (data.description) {
                if (data.description.length > descmax) return `Opis ma więcej niż ${descmax} znaków!`;
            }
            if (data.price) {
                if (isNaN(data.price)) return `Cena: '${data.price}' nie jest liczbą!`;
            }
            return 'ok';
        }
        return false;
    }
}

export default Offer;
