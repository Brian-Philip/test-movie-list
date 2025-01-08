import { DataSource } from "typeorm";
import { importAllCSV } from "../utils/csv.utils";
import { parseMovieData } from "../utils/format.utils";
import { StudioRepository } from "../repositories/studio.repository";
import { ProducerRepository } from "../repositories/producer.repository";
import path from 'path';
import { MovieRepository } from "../repositories/movie.repository";

const AppDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '../entities/*.ts')],
});

async function Initialize() {
    await AppDataSource.initialize();
    console.log('[DB] connected');
    await loadDatabase();
}

async function loadDatabase() {
    const dataImport = await importAllCSV('./data');
    const [studioRepository, producerRepository, movieRepository] = [
        new StudioRepository(AppDataSource), new ProducerRepository(AppDataSource), new MovieRepository(AppDataSource)]

    for (const movie of dataImport) {
        const { title, year, studios, producers, winner } = parseMovieData(movie);
        const studioEntities = await Promise.all(
            studios.map(async (studioName: string) => {
                return studioRepository.save(studioName);
            })
        );
        const producerEntities = await Promise.all(
            producers.map(async (producerName: string) => {
                return producerRepository.save(producerName);
            })
        );
        await movieRepository.save({
            cdMovie: 0,
            nmMovie: title,
            vlYear: year,
            producers: producerEntities,
            studios: studioEntities,
            tpWinner: winner
        })
    }
}

export { Initialize, AppDataSource }