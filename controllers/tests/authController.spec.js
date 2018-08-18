const request = require('supertest');
const app = require('../../app');
const User = require('../../models/userModel');
const { sanitizeTestObject } = require('../../test/sanitizeObject');

beforeAll(() => User.remove({}));

describe('Authenticate', () => {
  test('should authenticate', async () => {
    await User.create({
      username: 'test3',
      password: 'test123',
      name: 'name',
    });

    const response = await request(app).post('/auth').send(
      {
        username: 'test3',
        password: 'test123',
      }
    );
    expect(response.status).toBe(200);
    expect(sanitizeTestObject(response.body, ['token'])).toMatchSnapshot();
  })
});
