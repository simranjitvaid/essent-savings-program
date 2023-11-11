import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Account, accounts, Deposit, Transaction } from './models/accounts-model';
import { getAccountById } from './lib/getAccountById';
import { addDepositToAccount } from './lib/addDepositToAccount';
import { calculateBalanceOnSimulatedDay } from './lib/calculateBalanceOnSimulatedDay';
import { getLastDeposit } from './lib/getLastDeposit';
import { getLastPurchase } from './lib/getLastPurchase';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT !== undefined ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());

app.use('*', (req, res, next) => {
  console.log(req.headers);
  next();
});

app.post('/accounts', (request, response) => {
  try {
    if (request.body === undefined || request.body.id !== undefined || request.body.balance !== undefined || request.body.name === undefined) {
      response.status(400).send();
    } else {
      const tempAccount: Account = {
        id: uuidv4(),
        name: request.body.name,
        transactions: [],
      };
      accounts.push(tempAccount); 
      const tempResponse = {
        'id': tempAccount.id,
        'name': tempAccount.name,
        'balance': 0,
      }; 
      response.json(tempResponse);
    }
  } catch (error) {
    response.status(500).send();
  }
});

app.get('/accounts', (request, response) => {
  if (request.get('simulated-day') !== undefined) {
    const tempResponse = accounts.map((account) => { return { 'id': account.id, 'name': account.name, 'balance': calculateBalanceOnSimulatedDay(account, Number(request.get('simulated-day'))) };});
    response.status(201).json(tempResponse);
  } else {
    response.status(400).send();
  }
});

app.get('/accounts/:accountId', (request, response) => {
  if (request.get('simulated-day') !== undefined) {
    const tempAccount:Account = getAccountById(request.params.accountId);
    if (tempAccount) {
      const tempResponse = {
        'id': tempAccount.id,
        'name': tempAccount.name,
        'balance': calculateBalanceOnSimulatedDay(tempAccount, Number(request.get('simulated-day'))),
      }; 
      response.json(tempResponse);
    } else {
      response.status(404).send();
    }
  } else {
    response.status(400).send();
  }
});

app.post('/accounts/:accountId/deposits', (request, response) => {
  try {
    if (request.body === undefined || request.body.amount === undefined || request.get('simulated-day') === undefined) {
      response.status(400).send();
    } else {
      const tempAccount: Account = getAccountById(request.params.accountId);
      if (tempAccount) {
        const lastDeposit: Transaction = getLastDeposit(tempAccount);
        if (lastDeposit !== undefined && lastDeposit.simulatedDay > Number(request.get('simulated-day'))) {
          response.status(400).send();
        } else {
          const tempDeposit: Deposit = {
            depositId: uuidv4(),
            amount: request.body.amount,
            simulatedDay: Number(request.get('simulated-day')),
            type: 'deposit',
          };
          const updatedAccount = addDepositToAccount(request.params.accountId, tempDeposit);
          const tempResponse = {
            'id': tempDeposit.depositId,
            'name': updatedAccount.name,
            'balance': calculateBalanceOnSimulatedDay(tempAccount, Number(request.get('simulated-day'))),
          };
          response.status(201).json(tempResponse);
        }
      } else {
        response.status(404).send();
      }
    }
  }   catch (error) {
    console.log(error);
    response.status(500).send();
  }
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

