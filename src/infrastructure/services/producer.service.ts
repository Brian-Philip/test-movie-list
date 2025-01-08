import { DataSource } from "typeorm";
import { ProducerIntervalDto } from "../dtos/producer-interval.dto";
import { ProducerRepository } from "../repositories/producer.repository";
import { ResultDto } from "../dtos/result.dto";
import { Producer } from "../entities/producer.entity";

export class ProducerService {
    constructor(private readonly appDataSource: DataSource) { }

    async getIntervalWinners(): Promise<ResultDto> {
        const producerRepository = new ProducerRepository(this.appDataSource);
        const producers = await producerRepository.getYearProducerWinner();
        return await this.calculateInterval(producers);
    }

    private async calculateInterval(producers: Producer[]): Promise<ResultDto> {
        const intervals: ResultDto = { min: [], max: [] };

        producers.forEach((producer) => {
            const years = producer.movies.map((movie) => movie.vlYear).sort((a, b) => a - b);

            const producerIntervals: ProducerIntervalDto[] = [];
            for (let i = 1; i < years.length; i++) {
                producerIntervals.push({
                    producer: producer.nmProducer,
                    interval: years[i] - years[i - 1],
                    previousWin: years[i - 1],
                    followingWin: years[i],
                });
            }

            if (producerIntervals.length > 0) {
                const minInterval = producerIntervals.reduce(
                    (a, b) => (a.interval < b.interval ? a : b),
                    producerIntervals[0]
                );
                const maxInterval = producerIntervals.reduce(
                    (a, b) => (a.interval > b.interval ? a : b),
                    producerIntervals[0]
                );

                intervals.min.push(minInterval);
                intervals.max.push(maxInterval);
            }
        });
        //Encontra menor e maior
        const minIntervalValue = Math.min(...intervals.min.map((i: ProducerIntervalDto) => i.interval));
        const maxIntervalValue = Math.max(...intervals.max.map((i: ProducerIntervalDto) => i.interval));

        //Deixa somente os registros iguais ao maior e menor encontrado
        intervals.min = intervals.min.filter((i: ProducerIntervalDto) => i.interval === minIntervalValue);
        intervals.max = intervals.max.filter((i: ProducerIntervalDto) => i.interval === maxIntervalValue);
        return intervals;
    }
}