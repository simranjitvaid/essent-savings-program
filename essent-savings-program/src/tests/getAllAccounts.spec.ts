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

describe('GET /accounts api', () => {
  it('should get details of all existing accounts with success response', async () => {
    const response = await api.get('/accounts').set('simulated-day', 2);

    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(accounts.length);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name', 'Sim');
    expect(response.body[0]).toHaveProperty('balance', 0);
    expect(response.body[1]).toHaveProperty('id');
    expect(response.body[1]).toHaveProperty('name', 'Sim1');
    expect(response.body[1]).toHaveProperty('balance', 0);
  });

  it('should return 400 if simulated-day is not sent in request', async () => {
    const response = await api.get('/accounts');

    expect(response.status).toBe(400);
  });
});
