import { Router } from "express";
import { User } from "../controllers/user.controller";

const user = new User();

const userRoute = () => {
  const router = Router();

  router.get('/', user.listall);

  router.get('/profile/:id', user.profile);

  router.post('/register', user.register);

  router.post('/signin', user.signin);

  router.put('/update/:id', user.update);

  router.delete('/delete/:id', user.delete);

  return router;
};

export { userRoute };
