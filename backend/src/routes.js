import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/Multer';

import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

import authMiddleware from './app/middlewares/Auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get('/deliverymen/:id/deliveries', DeliveryStatusController.index);
routes.put(
  '/deliverymen/:deliveryman_id/deliveries/:delivery_id',
  DeliveryStatusController.update
);

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

// CRUD DE ENTREGAS
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.destroy);

// ROTAS DE PROBLEMAS NA ENTREGA
routes.get('/problems', DeliveryProblemsController.index);
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.delete(
  '/problem/:id/cancel-delivery',
  DeliveryProblemsController.destroy
);

// ROTA DE UPLOAD
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
