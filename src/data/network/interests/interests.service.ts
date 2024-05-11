import { IndustriesModel } from "../../models/industries.model";
import { InterestsModel } from "../../models/interests.model";
import BaseService from "../base.service";

class InterestsService extends BaseService {
    constructor() {
        super();
    }
    public async getInterests(): Promise<{ status: string, message: string, data: InterestsModel[] }> {
        const response = this.get('/api/v1/interests') as Promise<{ status: string, message: string, data: InterestsModel[] }>
        return response
    }
}

export default InterestsService