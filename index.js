import express from 'express';
import bodyParser from 'body-parser';
import appRouter from './server/routes';
import path from 'path';

const app = express();
const port = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('MyDiary endpoints are hosted here!'));

app.use('/', appRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;