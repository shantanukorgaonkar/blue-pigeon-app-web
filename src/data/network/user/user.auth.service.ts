import BaseService from "../base.service";

class UserAuthService extends BaseService {
    constructor() {
        super();
    }
    public async registerUser(email: string, password: string, firstName: string, lastName: string): Promise<{ status: string, message: string, data: { id: string, token: string } }> {
        const response = this.post('/api/v1/users/register', { email, password, firstName, lastName }) as Promise<{ status: string, message: string, data: { id: string, token: string } }>
        return response
    }

    public async loginUser(email: string, password: string): Promise<{ status: string, message: string, data: { id: string, token: string } }> {
        return this.post('/api/v1/users/login', { email, password }) as Promise<{ status: string, message: string, data: { id: string, token: string } }>
    }
}

export default UserAuthService