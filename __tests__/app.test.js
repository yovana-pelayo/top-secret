const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
// const UserService = require('../lib/services/UserService');

const mockUser = {
  title: 'Scary Story',
  description:
    'A bedtime story about a cannibal who tricked people into eating humans',
  created_at: ' 0000',
};

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;

//   const agent = request.agent(app);
//   // agent allows us to store cookies between requests

//   const user = await UserService.create({ ...mockUser, ...userProps });

//   const { email } = user;

//   await agent.post('/api/v1/users/session').send({ email, password });
//   return [agent, user];
// };

describe('authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    console.log(res.body);
    const { title, description, created_at } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      title,
      description,
      created_at,
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
