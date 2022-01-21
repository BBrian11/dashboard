import { Auth } from "../models/Auth";
import GenericApiService from "./GenericApiService";


class AuthService extends GenericApiService {
    constructor() {
        super('auth');
    }

    async login(username, password) {
        const auth = new Auth();
        auth.auth_data = null;
        auth.login_type = "private";
        auth.login_name = username;
        auth.login_password = password;

        const results = await this.saveCustomEntity('login', auth);
        return results;
    }

}


export default AuthService;