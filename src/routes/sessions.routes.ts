import { Router } from 'express';
import CreateSessionService from '../services/CreateSessionService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSession = new CreateSessionService();

  const { user, token } = await createSession.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default usersRouter;