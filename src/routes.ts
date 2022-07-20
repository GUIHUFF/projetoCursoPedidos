import {Router, Request, Response} from 'express';

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';


const router = Router();

// ROTAS USER
router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.get('/my', isAuthenticated, new DetailUserController().handle);

// ROTAS CATEGORY
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/categorys', isAuthenticated, new ListCategoryController().handle);

export { router };