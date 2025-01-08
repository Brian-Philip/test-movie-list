import { DataSource, Repository } from "typeorm";
import { Movie } from "../entities/movie.entity";
import { ConditionalEnum } from "../enum/conditional.enum";

export class MovieRepository {
    private readonly instanciaMovie: Repository<Movie>;

    constructor(appDataSource: DataSource) {
        this.instanciaMovie = appDataSource.getRepository(Movie);
    }

    async save(data: Movie): Promise<void> {
        let movie = await this.instanciaMovie.findOneBy({ nmMovie: data.nmMovie });
        if (!movie) {
            movie = this.instanciaMovie.create({
                nmMovie: data.nmMovie,
                vlYear: data.vlYear,
                tpWinner: data.tpWinner === "yes" ? ConditionalEnum.Y : ConditionalEnum.N,
                studios: data.studios,
                producers: data.producers,
            });
        }
        await this.instanciaMovie.save(movie);
    }

    async getAll(): Promise<Movie[]> {
        return await this.instanciaMovie.createQueryBuilder('a')
            .innerJoinAndSelect('a.studios', 's')
            .innerJoinAndSelect('a.producers', 'p')
            .getMany();
    }
}
