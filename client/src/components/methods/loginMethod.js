import axios from 'axios';

const url = 'http://localhost:5000/login';

class LoginService {
    static getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url);
                const data = res.data;
                resolve(data.map(el => ({ ...el })));
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default { LoginService };
