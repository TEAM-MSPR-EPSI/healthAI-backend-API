const assert = require('node:assert/strict');
const { afterEach, beforeEach, test } = require('node:test');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  clearResolvedModule,
  loadFresh,
  mockResolvedModule,
} = require('../helpers/module-mocks');

const userModulePath = require.resolve('../../models/User');
const authServicePath = require.resolve('../../services/auth.service');

let userMock;

function loadAuthService() {
  mockResolvedModule(userModulePath, userMock);
  return loadFresh(authServicePath);
}

beforeEach(() => {
  process.env.JWT_SECRET = 'test-secret';
});

afterEach(() => {
  clearResolvedModule(userModulePath);
  clearResolvedModule(authServicePath);
  delete process.env.JWT_SECRET;
});

test('register rejects weak passwords', async () => {
  userMock = {
    create: async () => {
      throw new Error('should not be called');
    },
  };

  const AuthService = loadAuthService();

  await assert.rejects(
    () => AuthService.register({ email: 'user@example.com', password: 'weak' }),
    /mot de passe/,
  );
});

test('register hashes the password before creating the user', async () => {
  let createdUser;
  userMock = {
    create: async (data) => {
      createdUser = data;
      return { ...data, user_id: 77 };
    },
  };

  const AuthService = loadAuthService();
  const result = await AuthService.register({
    email: 'user@example.com',
    password: 'Password!1',
  });

  assert.ok(createdUser.user_hashpwd);
  assert.notEqual(createdUser.user_hashpwd, 'Password!1');
  assert.equal(await bcrypt.compare('Password!1', createdUser.user_hashpwd), true);
  assert.equal(result.user_id, 77);
});

test('login returns a signed token for valid credentials', async () => {
  const hashedPassword = await bcrypt.hash('Password!1', 10);
  userMock = {
    create: async () => {
      throw new Error('should not be called');
    },
    findOne: async () => ({
      user_id: 12,
      user_role: 'company_admin',
      user_hashpwd: hashedPassword,
    }),
  };

  const AuthService = loadAuthService();
  const token = await AuthService.login({
    email: 'admin@example.com',
    password: 'Password!1',
  });

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  assert.equal(payload.id, 12);
  assert.equal(payload.role, 'company_admin');
});

test('login rejects invalid passwords', async () => {
  const hashedPassword = await bcrypt.hash('Password!1', 10);
  userMock = {
    findOne: async () => ({
      user_id: 12,
      user_role: 'company_admin',
      user_hashpwd: hashedPassword,
    }),
  };

  const AuthService = loadAuthService();

  await assert.rejects(
    () => AuthService.login({ email: 'admin@example.com', password: 'Wrong!1' }),
    /Invalid password/,
  );
});