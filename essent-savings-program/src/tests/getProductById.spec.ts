import supertest from 'supertest';
import { app } from '../main';

const api = supertest(app);

describe('GET /products/:productId api', () => {
  it('should get details of product with Id passed in request with success response', async () => {
    const response = await api.get('/products/solar').set('simulated-day', 2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'solar');
    expect(response.body).toHaveProperty('title', 'Solar Panel');
    expect(response.body).toHaveProperty('description', 'Super duper Essent solar panel');
    expect(response.body).toHaveProperty('price', 750);
    expect(response.body).toHaveProperty('stock', 10);
  });

  it('should get details of product with Id passed in request with success response', async () => {
    const response = await api.get('/products/heatpump').set('simulated-day', 2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'heatpump');
    expect(response.body).toHaveProperty('title', 'Awesome Heatpump');
    expect(response.body).toHaveProperty('description', 'Hybrid heat pump');
    expect(response.body).toHaveProperty('price', 5000);
    expect(response.body).toHaveProperty('stock', 3);
  });

  it('should return 400 if simulated-day is not sent in request', async () => {
    const response = await api.get('/products/solar');

    expect(response.status).toBe(400);
  });

  it('should return 404 if product with Id is not present in products', async () => {
    const response = await api.get('/products/abc').set('simulated-day', 2);

    expect(response.status).toBe(404);
  });
});
