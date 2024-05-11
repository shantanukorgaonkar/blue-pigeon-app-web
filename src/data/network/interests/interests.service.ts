import { IndustriesModel } from "../../models/industries.model";
import { InterestsModel } from "../../models/interests.model";
import BaseService from "../base.service";

class InterestsService extends BaseService {
    constructor() {
        super();
    }
    public async getInterests(data: any): Promise<{ status: string, message: string, data: InterestsModel[] }> {
        const response = this.patch('/api/v1/interests', data) as Promise<{ status: string, message: string, data: InterestsModel[] }>
        return response
    }
}

export default InterestsService