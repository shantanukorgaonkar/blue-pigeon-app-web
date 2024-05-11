import BaseService from "../base.service";

class UserAuthService extends BaseService {
    constructor() {
        super();
    }
    public async registerUser(data: any): Promise<{ status: string, message: string, data: { id: string, token: string } }> {
        const response = this.post('/api/v1/users/create', data) as Promise<{ status: string, message: string, data: { id: string, token: string } }>
        return response
    }

    public async loginUser(data: any): Promise<{ status: string, message: string, data: { id: string, token: string } }> {
        return this.post('/api/v1/users/login', data) as Promise<{ status: string, message: string, data: { id: string, token: string } }>
    }
}

export default UserAuthService