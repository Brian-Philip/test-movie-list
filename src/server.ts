import { App } from './app';
import { Initialize } from './infrastructure/database/main';
const port = 3000;

(async () => {

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    await Initialize()
    App.listen(port, () => {
        console.log(`Server listening on (${port})`, new Date().toISOString());
    });
})();