import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let createSession: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a session with an authenticated user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to create a session with a non existing user', async () => {
    expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a session with a wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
