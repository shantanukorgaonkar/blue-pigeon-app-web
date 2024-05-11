import { IndustriesModel } from "../../models/industries.model";
import BaseService from "../base.service";

class IndustriesService extends BaseService {
    constructor() {
        super();
    }
    public async getIndustries(): Promise<{ status: string, message: string, data: IndustriesModel[] }> {
        const response = this.get('/api/v1/industries') as Promise<{ status: string, message: string, data: IndustriesModel[] }>
        return response
    }
}

export default IndustriesService