import axios from 'axios';
import address from '../config/address';

const url = `${address.main}/adminpanel/coaches`;
const imageUrl = `${address.img}`;

class Coach {
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
                for (const key in data) {
                    formData.append(key, data[key]);
                }
                const status = this.validateData(data);
                if (status === 'OK') {
                    const res = await axios.post(url, formData, {
                        headers: { 'content-type': 'multipart/form-data' },
                    });
                    resolve(res);
                } else {
                    resolve(status);
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    static updateData(id, data) {
        return new Promise(async (resolve, reject) => {
            try {
                const status = this.validateData(data);
                if (status === 'OK') {
                    if (data.img) {
                        const formData = new FormData();
                        for (const key in data) {
                            formData.append(key, data[key]);
                        }
                        const res = await axios.put(`${url}/${id}`, formData, {
                            headers: { 'content-type': 'multipart/form-data' },
                        });
                        resolve(res);
                    } else {
                        const res = await axios.patch(`${url}/${id}`, data);
                        resolve(res);
                    }
                } else {
                    resolve(status);
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

    static postFile(img) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(imageUrl, img);
                resolve(res);
            } catch (err) {
                reject(err);
            }
        });
    }

    static validateData(data) {
        if (data['img-name']) {
            if (data['img-name'].length < 1) return;
        }
        if (data.name) {
            if (data.name.length < 1) return 'Wprowadź prawidłową nazwę!';
        }
        if (data.quotation) {
            if (data.quotation.length < 1) return 'Wprowadź cytat!';
        }
        if (data.description) {
            if (data.description.length < 1) return 'Wprowadź opis!';
        }
        if (data.about) {
            if (data.about.length < 1) return 'Wprowadź informacje!';
        }
        return 'OK';
    }
}

export default Coach;
