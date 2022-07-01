const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  first_name: 'Bill',
  last_name: 'Burr',
  email: 'bill2@example.com',
  password: '123456',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);
  // agent allows us to store cookies between requests

  const user = await UserService.create({ ...mockUser, ...userProps });
  // creates a user sign in with//

  const { email } = user;
  await agent.post('/api/v1/users/session').send({ email, password });
  return [agent, user];
};

describe('authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('creates a new user', async () => {
    const res = await request(app).post('/api/v1/users').send(mockUser);
    const { first_name, last_name, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      first_name,
      last_name,
      email,
    });
  });
  it('signs in an existing user', async () => {
    // const [agent, user] = await registerAndLogin();
    const agent = await request(app).post('/api/v1/users').send(mockUser);
    console.log(agent.body);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ email: mockUser.email, password: mockUser.password });
    //   .post('/api/v1/users/sessions')
    //   .send({ email: 'bill@example.com', password: '123456' });
    console.log('mockuser message', mockUser.email, mockUser.password);
    expect(res.status).toEqual(200);
  });

  it('DELETE /sessions deletes the user session', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
  });
  afterAll(() => {
    pool.end();
  });
});
