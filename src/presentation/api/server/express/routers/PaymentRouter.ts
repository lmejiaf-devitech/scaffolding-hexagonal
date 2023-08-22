/* eslint-disable import/extensions */
import { containerDI } from '@commons/container';
import express, {
  Request, Response, Router, NextFunction,
} from 'express';
import { CreatePaymentController } from '../controllers/CreatePaymentController';
import { ValidateCreatePaymentRequestBodyMiddleware } from '../middlewares/ValidatePaymentRequestBodyMiddleware';

const paymentsRouter: Router = express.Router();

paymentsRouter.post('/create-payment', [ containerDI.getContainer().resolve(ValidateCreatePaymentRequestBodyMiddleware).execute ], async (request: Request, response: Response, nextFunction: NextFunction) => {
  console.log('LLEGO AL ROUTER');
  const createdNewsResponseDto: any = await containerDI.getContainer().resolve(CreatePaymentController).execute({
    identificadorMovimiento: request.body.identificadorMovimiento,
  });

  response.status(createdNewsResponseDto.technicalCode).send(createdNewsResponseDto);
});

export { paymentsRouter };
