import axios from 'axios';
import address from '../config/address';

const url = `${address.main}/adminpanel/coaches`;
const imageUrl = `${address.img}`;

class Coach {
    constructor(name) {
        this.name = name;
    }

    static getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const { data } = res;
                resolve(data.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static postData(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const formData = new FormData();
                for(let key in data) {
                    formData.append(key, data[key]);
                }
                const status = this.validateData(data);
                if (status === "OK") {
                    const res = await axios.post(url, formData, {
                        headers: { 'content-type': 'multipart/form-data'},
                    });
                    console.log(res);
                    resolve(res);
                } else {
                    resolve(status);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static updateData(id, data) {
        return new Promise( async (resolve, reject) => {
            console.log(data);
            try {
                const status = this.validateData(data);
                if (status === "OK") {
                    if (data['img']) {
                        const formData = new FormData();
                        for(let key in data) {
                            formData.append(key, data[key]);
                        }
                        const res = await axios.put(`${url}/${id}`, formData, {
                            headers: { 'content-type': 'multipart/form-data'},
                        });
                        console.log(res);
                        console.log('put');
                        resolve(res);
                    } else {
                        const res = await axios.patch(`${url}/${id}`, data);
                        console.log(res);
                        console.log('patch');
                        resolve(res);
                    }
                } else {
                    resolve(status);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    static deleteData(id) {
        return new Promise( async (resolve, reject) => {
            try{
                const res = await axios.delete(`${url}/${id}`);
                console.log(res);
                resolve(res);
            } catch(err) {
                reject(err);
            }
        });
    }

    static postFile(img) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(imageUrl, img);
                resolve(res);
            } catch(err) {
                reject(err);
            }
        });
    }

    static validateData(data) {
        if (data['img-name']) {
            if (data["img-name"].length < 1) return;
        }
        if (data['name']) {
            if (data['name'].length < 1) return "Wprowadź prawidłową nazwę!";
        }
        if (data['quotation']) {
            if (data['quotation'].length < 1) return "Wprowadź cytat!";
        }
        if (data['description']) {
            if (data['description'].length < 1) return "Wprowadź opis!";
        }
        if (data['about']) {
            if (data['about'].length < 1) return "Wprowadź informacje!"
        }
        return "OK";
    }
/*
    setInformation(url, description, quotation, about) {
        this.url = url;
        this.description = description;
        this.quotation = quotation;
        this.about = about;

        CoachesArray.push(this);
    }
*/
}
/*
const jennifer = new Coach('Jennifer Lawrence');
const michal = new Coach('Michal Karmowski');
const will = new Coach('Will Smith');

jennifer.setInformation('img/trener1.jpg', 'Trener Personalny', 'Cytat', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget turpis massa.');
michal.setInformation('img/trener2.jpg', 'Trener Personalny, Kulturysta', 'Co się z Tobą dzieje, skąd to zwątpienie?', 'eget ex sagittis tempor ut a nunc. Proin ullamcorper quam ut nisl tincidunt lacinia. Nulla mi ex, faucibus a quam et, congue lobortis enim. Fusce lobortis elit nulla, in rutrum est pellentesque ut. In in dapibus nulla.');
will.setInformation('img/trener3.jpg', 'Trener sztuk walki', 'Dostawiając codziennie jedną idealnie położoną cegłę, po jakimś czasie już masz cały, solidny mur', 'In hac habitasse platea dictumst. Vivamus sit amet sapien rutrum, sodales enim sit amet, tincidunt arcu. Duis placerat risus quam, eget pellentesque eros malesuada non.');
*/
export default Coach;
