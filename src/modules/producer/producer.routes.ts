import { Request, Response, Router } from 'express';
import { ProducerModule } from './producer.module';

const router = Router();

router.get('/getIntervalWinners', async (_request: Request, response: Response) => {
    const result = await ProducerModule.Controller.getIntervalWinners()
    response.send(result)
});

export { router as producerRouter };