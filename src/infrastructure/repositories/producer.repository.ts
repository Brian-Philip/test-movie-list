import { DataSource, Repository } from "typeorm";
import { Producer } from "../entities/producer.entity";
import { ConditionalEnum } from "../enum/conditional.enum";

export class ProducerRepository {
    private readonly instanciaProducer: Repository<Producer>;

    constructor(appDataSource: DataSource) {
        this.instanciaProducer = appDataSource.getRepository(Producer);
    }

    async save(nmProducer: string): Promise<Producer> {
        let producer = await this.instanciaProducer.findOneBy({ nmProducer });
        if (!producer) {
            producer = this.instanciaProducer.create({ nmProducer });
        }
        await this.instanciaProducer.save(producer);
        return producer;
    }

    async getYearProducerWinner(): Promise<Producer[]> {
        return await this.instanciaProducer.createQueryBuilder('producer')
            .leftJoinAndSelect('producer.movies', 'movie')
            .where('movie.tpWinner = :tpWinner', { tpWinner: 'Y' })
            .select(['producer.nmProducer', 'movie.vlYear'])
            .orderBy('movie.vlYear', 'ASC')
            .getMany();
    }
}
