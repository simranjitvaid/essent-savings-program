import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Account, accounts, Deposit } from './models/accounts-model';
import { getAccountById } from './lib/getAccountById';
import { addDepositToAccount } from './lib/addDepositToAccount';

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
        balance: [{
          amount: 0,
          day: 0,
        }],
        deposits: [],
      };
      accounts.push(tempAccount); 
      const tempResponse = {
        'id': tempAccount.id,
        'name': tempAccount.name,
        'balance': tempAccount.balance[0].amount,
      }; 
      response.json(tempResponse);
    }
  } catch (error) {
    response.status(500).send();
  }
});

app.get('/accounts', (request, response) => {
  //change to use get balance on simulated day function once made
  const tempResponse = accounts.map((account) => { return { 'id': account.id, 'name': account.name, 'balance': account.balance[account.balance.length - 1].amount };});
  response.status(201).json(tempResponse);
});

app.get('/accounts/:accountId', (request, response) => {
  const tempAccount:Account = getAccountById(request.params.accountId);
  if (tempAccount) {
    const tempResponse = {
      'id': tempAccount.id,
      'name': tempAccount.name,
      'balance': tempAccount.balance[tempAccount.balance.length - 1].amount, //change to use get balance on simulated day function once made
    }; 
    response.json(tempResponse);
  } else {
    response.status(404).send();
  }
});

app.post('/accounts/:accountId/deposits', (request, response) => {
  try {
    if (request.body === undefined || request.body.amount === undefined || request.get('simulated-day') === undefined) {
      response.status(400).send();
    } else {
      const tempAccount: Account = getAccountById(request.params.accountId);
      if (tempAccount) {
        if (tempAccount.deposits.length > 0 && tempAccount.deposits[tempAccount.deposits.length - 1].depositDay > Number(request.get('simulated-day'))) {
          response.status(400).send();
        } else {
          const tempDeposit: Deposit = {
            depositId: uuidv4(),
            amount: request.body.amount,
            depositDay: Number(request.get('simulated-day')),
          };
          const updatedAccount = addDepositToAccount(request.params.accountId, tempDeposit);
          const tempResponse = {
            'id': tempDeposit.depositId,
            'name': updatedAccount.name,
            'balance': updatedAccount.balance[tempAccount.balance.length - 2].amount,    //change to use get balance on simulated day function once made
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

