import supertest from 'supertest';
import { app } from '../main';
import { Account, accounts } from 'src/models/accounts-model';

const api = supertest(app);
const account1: Account = {
  id: '1',
  name: 'Sim',
  transactions: [],    
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

describe('GET /accounts/:accountId api', () => {
  it('should get details of account with Id passed in request with success response', async () => {
    const response = await api.get('/accounts/1').set('simulated-day', 2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Sim');
    expect(response.body).toHaveProperty('balance', 0);
  });

  it('should get details of account with Id passed in request with success response', async () => {
    const response = await api.get('/accounts/2').set('simulated-day', 2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Sim1');
    expect(response.body).toHaveProperty('balance', 0);
  });

  it('should return 400 if simulated-day is not sent in request', async () => {
    const response = await api.get('/accounts/1');

    expect(response.status).toBe(400);
  });

  it('should return 404 if account with Id is not present in accounts', async () => {
    const response = await api.get('/accounts/3').set('simulated-day', 2);

    expect(response.status).toBe(404);
  });
});
