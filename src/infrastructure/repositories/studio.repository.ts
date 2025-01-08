import { DataSource, Repository } from "typeorm";
import { Studio } from "../entities/studio.entity";

export class StudioRepository {
    private readonly instanciaStudio: Repository<Studio>;

    constructor(appDataSource: DataSource) {
        this.instanciaStudio = appDataSource.getRepository(Studio);
    }

    async save(nmStudio: string): Promise<Studio> {
        let studio = await this.instanciaStudio.findOneBy({ nmStudio });
        if (!studio) {
            studio = this.instanciaStudio.create({ nmStudio });
        }
        await this.instanciaStudio.save(studio);
        return studio;
    }
}
