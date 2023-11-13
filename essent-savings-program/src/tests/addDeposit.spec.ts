import supertest from 'supertest';
import { app } from '../main';
import { Account, accounts } from 'src/models/accounts-model';

const api = supertest(app);
const account1: Account = {
  id: '1',
  name: 'Sim',
  transactions: [{ depositId: '1',
    amount: 100,
    simulatedDay: 1,
    type: 'deposit' }],    
};

const account2: Account = {
  id: '2',
  name: 'Sim1',
  transactions: [],    
};

beforeEach(async () => {
  accounts.push(account1);
  accounts.push(account2);
});

describe('POST /accounts/:accountId/deposits api', () => {  
  it('should return details of deposit with success response', async () => {
    const request =  { amount: 250 };
    const response = await api.post('/accounts/1/deposits').set('simulated-day', 4).send(request);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Sim');
    expect(response.body).toHaveProperty('balance', 100);
  });

  it('should return 400 if simulated-day is less than last deposit day in request', async () => {
    const request =  { amount: 250 };
    const response = await api.post('/accounts/1/deposits').set('simulated-day', 0).send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if body is not sent in request', async () => {
    const request =  { };
    const response = await api.post('/accounts/1/deposits').set('simulated-day', 2).send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if simulated-day is not sent in request', async () => {
    const request =  { amount: 250 };
    const response = await api.post('/accounts/1/deposits').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if amount is not sent in request', async () => {
    const request =  { };
    const response = await api.post('/accounts/1/deposits').set('simulated-day', 2).send(request);

    expect(response.status).toBe(400);
  });

  it('should return 404 if account with Id is not present in accounts', async () => {
    const request =  { amount: 250 };
    const response = await api.post('/accounts/3/deposits').set('simulated-day', 2).send(request);

    expect(response.status).toBe(404);
  });
});
