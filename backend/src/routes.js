import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/Multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

import authMiddleware from './app/middlewares/Auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

// MIDDLEWARE DE AUTENTICAÇÃO
routes.use(authMiddleware);

// ROTAS DE RECEBEDORES
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

// CRUD ENTREGADORES
routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.destroy);

// ROTA DE UPLOAD
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
