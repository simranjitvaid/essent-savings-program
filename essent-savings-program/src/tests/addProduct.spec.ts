import supertest from 'supertest';
import { app } from '../main';

const api = supertest(app);

describe('POST /products api', () => {
  it('should add a new product with success response', async () => {
    const request =  { title: 'Solar System', description: 'Some nice description', price: 1000, stock: 5 };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('title', 'Solar System');
    expect(response.body).toHaveProperty('description', 'Some nice description');
    expect(response.body).toHaveProperty('price', 1000);
    expect(response.body).toHaveProperty('stock', 5);
  });

  it('should return 400 if body is not sent in request', async () => {
    const request =  { };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if id is sent in request', async () => {
    const request =  { id: '1', title: 'Solar System', description: 'Some nice description', price: 1000, stock: 5 };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if title is not sent in request', async () => {
    const request =  { description: 'Some nice description', price: 1000, stock: 5 };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if description is not sent in request', async () => {
    const request =  { title: 'Solar System', price: 1000, stock: 5 };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if price is not sent in request', async () => {
    const request =  { title: 'Solar System', description: 'Some nice description', stock: 5 };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(400);
  });

  it('should return 400 if stock is not sent in request', async () => {
    const request =  { title: 'Solar System', description: 'Some nice description', price: 1000 };
    const response = await api.post('/products').send(request);

    expect(response.status).toBe(400);
  });
});
