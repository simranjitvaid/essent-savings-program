import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Account } from './models/accounts-model';

const accounts: Account [] = [];

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

app.post('/accounts', (request, response) => {
  try {
    if (request.body === undefined || request.body.id !== undefined || request.body.balance !== undefined || request.body.name === undefined) {
      response.status(400).send();
    } else {
      const tempAccount: Account = {
        id: uuidv4(),
        name: request.body.name,
        balance: 0,
      };
      accounts.push(tempAccount);
      response.json(tempAccount);
    }
  } catch (error) {
    response.status(500).send();
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

