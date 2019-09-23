import axios from 'axios';
import address from '../../config/address';

const url = `${address.main}/login`;

class LoginService {
    static getData() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url);
                const { data } = res;
                resolve(data.map(el => ({ ...el })));
            } catch (err) {
                reject(err);
            }
        });
    }
}

export default { LoginService };
