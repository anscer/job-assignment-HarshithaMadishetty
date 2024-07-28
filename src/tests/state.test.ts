import request from 'supertest';
import app from '../app'; // Express app

describe('State API', () => {
  it('should create a state', async () => {
    const response = await request(app)
      .post('/states')
      .send({
        name: 'Active',
        description: 'Robot is active',
        status: 'active',
        createdBy: 'user1'
      });
    expect(response.status).toBe(201);
  });

  // Add more tests for other endpoints
});
