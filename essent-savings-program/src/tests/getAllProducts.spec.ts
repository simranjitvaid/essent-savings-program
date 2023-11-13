import supertest from 'supertest';
import { app } from '../main';

const api = supertest(app);

describe('GET /products api', () => {
  it('should get details of all existing products with success response', async () => {
    const response = await api.get('/products').set('simulated-day', 2);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('id', 'solar');
    expect(response.body[0]).toHaveProperty('title', 'Solar Panel');
    expect(response.body[0]).toHaveProperty('description', 'Super duper Essent solar panel');
    expect(response.body[0]).toHaveProperty('price', 750);
    expect(response.body[0]).toHaveProperty('stock', 10);
    expect(response.body[1]).toHaveProperty('id', 'insulation');
    expect(response.body[1]).toHaveProperty('title', 'Insulation');
    expect(response.body[1]).toHaveProperty('description', 'Cavity wall insulation');
    expect(response.body[1]).toHaveProperty('price', 2500);
    expect(response.body[1]).toHaveProperty('stock', 10);
    expect(response.body[2]).toHaveProperty('id', 'heatpump');
    expect(response.body[2]).toHaveProperty('title', 'Awesome Heatpump');
    expect(response.body[2]).toHaveProperty('description', 'Hybrid heat pump');
    expect(response.body[2]).toHaveProperty('price', 5000);
    expect(response.body[2]).toHaveProperty('stock', 3);
  });

  it('should return 400 if simulated-day is not sent in request', async () => {
    const response = await api.get('/products');

    expect(response.status).toBe(400);
  });
});
