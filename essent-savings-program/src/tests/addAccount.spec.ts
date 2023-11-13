import supertest from 'supertest';
import { app } from '../main';

const api = supertest(app);

describe('POST /accounts api', () => {
  it('should create a new account with success response', async () => {
    const request =  { name: 'Sim' };
    const response = await api.post('/accounts').send(request);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name', 'Sim');
    expect(response.body).toHaveProperty('balance', 0);
  });

  it('should return 400 if name is not sent in request', async () => {
    const request =  { };
    const response = await api.post('/accounts').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if id is sent in request', async () => {
    const request =  { id: '1', name: 'Sim' };
    const response = await api.post('/accounts').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if balance is sent in request', async () => {
    const request =  { name: 'Sim', balance: 0 };
    const response = await api.post('/accounts').send(request);

    expect(response.status).toBe(400);
  });
});
