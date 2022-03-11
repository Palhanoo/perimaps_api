import express from 'express';
import "./database"
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router)

app.listen(3000, '0.0.0.0', () => console.log('server running'))
