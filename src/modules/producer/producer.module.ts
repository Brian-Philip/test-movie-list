import { ProducerControler as ImplementationProducerController } from './producer.controller'
import { ProducerService as ImplementationProducerService } from '../../infrastructure/services/producer.service'
import { AppDataSource } from '../../infrastructure/database/main'


const service = new ImplementationProducerService(AppDataSource)
const Controller = new ImplementationProducerController(service);

const ProducerModule = {
    service,
    Controller
}

export { ProducerModule }