import { ProducerService } from "../../infrastructure/services/producer.service";

export class ProducerControler {
    constructor(private readonly producerService: ProducerService) { }

    async getIntervalWinners(): Promise<any> {
        return await this.producerService.getIntervalWinners();
    }
}