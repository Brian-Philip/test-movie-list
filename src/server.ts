import { App } from './app';
import { Initialize } from './infrastructure/database/main';
const port = 3000;

(async () => {
    await Initialize();
    App.listen(port, () => {
        console.log(`Server listening on (${port})`, new Date().toISOString());
    });
})();