const request = require('supertest');
const app = require('../src/app');
const redisClient = require('../src/config/redis');

describe('API Endpoints', () => {
  beforeAll(async () => {
    await redisClient.connect();
  });

  afterAll(async () => {
    await redisClient.quit();
  });

  it('GET /api/posts (uncached)', async () => {
    const res = await request(app)
      .get('/api/posts/uncached');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/posts (cached)', async () => {
    const res = await request(app)
      .get('/api/posts');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});