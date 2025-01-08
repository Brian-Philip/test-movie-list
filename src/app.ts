import express from 'express';
import "reflect-metadata";
import { ModulesRouter } from './modules/modules.routes';

const app = express();

app.use(ModulesRouter);

export { 
    app as App
};