const request = require('supertest');
const app = require('../../app');
const User = require('../../models/userModel');
const { sanitizeTestObject } = require('../../test/sanitizeObject');

beforeAll(() => User.remove({}));

describe('Users', () => {

  describe('Create', () => {
    test('Should create a user', async () => {
      const response = await request(app).post('/user').send(
        {
          username: 'test',
          password: 'test123',
          name: 'name',
        }
      );
      expect(response.status).toBe(201);
      expect(sanitizeTestObject(response.body)).toMatchSnapshot();
    });

    test('Should not create a user with the same username', async () => {
      const response = await request(app).post('/user').send(
        {
          username: 'test',
          password: 'test123',
          name: 'name',
        }
      );
      expect(response.status).toBe(500);
      expect(sanitizeTestObject(response.body)).toMatchSnapshot();
    });
    test('Should not create a without username', async () => {
      const response = await request(app).post('/user').send(
        {
          password: 'test123',
          name: 'name',
        }
      );
      expect(response.status).toBe(500);
      expect(sanitizeTestObject(response.body)).toMatchSnapshot();
    })
  });

  describe('Find', () => {
    test('Should find a user', async () => {
      const user = await User.create(        {
        username: 'test2',
        password: 'test123',
        name: 'name',
      });
      const response = await request(app).get(`/user/${user.username}`);
      expect(response.status).toBe(200);
      expect(sanitizeTestObject(response.body)).toMatchSnapshot();
    });
  })

});
