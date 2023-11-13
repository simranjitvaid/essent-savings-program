import supertest from 'supertest';
import { app } from '../main';
import { Account, accounts } from 'src/models/accounts-model';
import { Product, products } from 'src/models/products-model';

const api = supertest(app);
const account1: Account = {
  id: '1',
  name: 'Sim',
  transactions: [{ depositId: '1',
    amount: 1000,
    simulatedDay: 1,
    type: 'deposit' },
  {
    productId: 'solar',
    amount: -750,
    simulatedDay: 2,
    type: 'purchase',
  },
  { depositId: '2',
    amount: 1000,
    simulatedDay: 3,
    type: 'deposit' }],    
};

const account2: Account = {
  id: '2',
  name: 'Sim1',
  transactions: [],    
};

const product: Product = {
  id: 'tempProduct',
  title: 'Temp',
  description: 'Temp',
  stock: [ { stock: 0, simulatedDay: 0 }  ],
  price: 750,
};

beforeEach(async () => {
  accounts.push(account1);
  accounts.push(account2);
  products.push(product);
});

describe('POST /accounts/:accountId/purchases api', () => {  

  it('should return 409 if balance is less than price', async () => {
    const request =  { productId: 'solar' };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 3).send(request);

    expect(response.status).toBe(409);
  });

  it('should return 201 success response', async () => {
    const request =  { productId: 'solar' };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 4).send(request);

    expect(response.status).toBe(201);
  });

  it('should return 409 if product stock is not available', async () => {
    const request =  { productId: 'tempProduct' };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 4).send(request);

    expect(response.status).toBe(409);
  });

  it('should return 400 if simulated-day is less than last purchase day in request', async () => {
    const request =  { productId: 'solar' };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 0).send(request);

    expect(response.status).toBe(400);
  });

  it('should return 404 if account with Id is not present in accounts', async () => {
    const request =  { productId: 'solar' };
    const response = await api.post('/accounts/3/purchases').set('simulated-day', 2).send(request);

    expect(response.status).toBe(404);
  });

  it('should return 404 if product with productId is not present in products', async () => {
    const request =  { productId: 'solar123' };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 4).send(request);

    expect(response.status).toBe(404);
  });

  it('should return 400 if body is not sent in request', async () => {
    const request =  { };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 2).send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if simulated-day is not sent in request', async () => {
    const request =  { productId: 'solar' };
    const response = await api.post('/accounts/1/purchases').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if productId is not sent in request', async () => {
    const request =  { };
    const response = await api.post('/accounts/1/purchases').set('simulated-day', 2).send(request);

    expect(response.status).toBe(400);
  });
});
