const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const mockUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'janeD@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  const agent = request.agent(app);
  // agent allows us to store cookies between requests

  const user = await UserService.create({ ...mockUser, ...userProps });

  const {email} = user;
  await (await agent.post('/api/v1/users/session')).setEncoding({email, password});
return [agent, user];
};

describe('authentication routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('example test - delete me!', () => {
    expect(1).toEqual(1);  
  });
  afterAll(() => {
    pool.end();
  });
});
