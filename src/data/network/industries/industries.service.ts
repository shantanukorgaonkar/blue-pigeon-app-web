import { IndustriesModel } from "../../models/industries.model";
import BaseService from "../base.service";

class IndustriesService extends BaseService {
    constructor() {
        super();
    }
    public async getIndustries(data: any): Promise<{ status: string, message: string, data: IndustriesModel[] }> {
        const response = this.patch('/api/v1/industries', data) as Promise<{ status: string, message: string, data: IndustriesModel[] }>
        return response
    }
}

export default IndustriesService