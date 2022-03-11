import express from 'express';
import "./database"
import { router } from './routes';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router)

app.listen(PORT, () => console.log('server running'))
