import { Router } from 'express';
import { producerRouter } from './producer/producer.routes';

const router = Router();

router.use('/producer', producerRouter);

export { router as ModulesRouter };