import axios from 'axios';
import address from '../config/address';

const url = `${address.main}/adminpanel/gallery`;

/* eslint-disable */

class Photo{
    static getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const { data } = res;
                const date = data.data.forEach(el => {
                    let d = el.date.split('T');
                    if (d) el.date = d[0];
                });
                resolve(data.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static postData(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const status = this.validateData(data);
                if (status === 'OK') {
                    const formData = new FormData();
                    for (const key in data) {
                        formData.append(key, data[key]);
                    }
                    const res = await axios.post(url, formData, {
                        headers: { 'content-type': 'multipart/form-data' },
                    });
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
        return new Promise(async (resolve,reject) => {
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
            } catch(err) {
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

    static validateData(data) {
        if (data['img-name']) {
            if (data['img-name'].length < 1) return 'Wprowadź obrazek!';
        }
        if (data.title) {
            if (data.title.length < 1) return 'Wprowadź tytuł!';
        }
        if (data.description) {
            if (data.description.length < 1) return 'Wprowadź opis!';
        }
        if (data.date) {
            const reg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
            if (!data.date.match(reg)) return "Wprowadzono nieprawidłowy format daty!";
        }

        return 'OK';
    }
}

export default Photo;
