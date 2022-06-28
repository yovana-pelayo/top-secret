const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

const mockUser = {
  first_name: 'Bill',
  last_name: 'Burr',
  email: 'bill@example.com',
  password: '123456',
};

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;

//   const agent = request.agent(app);
//   // agent allows us to store cookies between requests

//   const user = await UserService.create({ ...mockUser, ...userProps });
//   // creates a user sign in with//

//   const { email } = user;
//   await agent.post('/api/v1/users/session').send({ email, password });
//   return [agent, user];
// };
//sign in

describe('authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    console.log(res.body);
    const { first_name, last_name, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      first_name,
      last_name,
      email,
    });
  });
  afterAll(() => {
    pool.end();
  });
  // it('signs in an existing user', async () => {
  //   await request(app).post('/api/v1/users').send(mockUser);
  //   const res = await request(app)
  //     .post('/api/v1/users/sessions')
  //     .send({ email: 'janeD@example.com', password: '12345' });
  //   console.log(res.status);
  //   expect(res.status).toEqual(200);
  // });
});
