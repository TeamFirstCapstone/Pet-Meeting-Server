import dotenv from 'dotenv';
import { connectDatabase, sync } from './models';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

function startApplication() {
    connectDatabase();
    sync();
    app.listen(PORT, HOST, (error) => {
        if (!error) {
            console.log(`server is running on ${PORT}`)
        }
    })
}

startApplication();
