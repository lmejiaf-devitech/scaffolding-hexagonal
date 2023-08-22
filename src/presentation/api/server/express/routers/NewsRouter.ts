/* eslint-disable import/extensions */
import { containerDI } from '@commons/container';
import express, {
  Request, Response, Router, NextFunction,
} from 'express';
import { CreateNewsController } from '../controllers/CreateNewsController';
import { CreatedNewsResponseDto } from '../dtos/CreateNewsDto';
import { ValidateCreateNewsRequestBodyMiddleware } from '../middlewares/ValidateCreateNewsRequestBodyMiddleware';

const newsRouterV1: Router = express.Router();

newsRouterV1.post('/create-news', [ containerDI.getContainer().resolve(ValidateCreateNewsRequestBodyMiddleware).execute ], (request: Request, response: Response, nextFunction: NextFunction) => {
  const createdNewsResponseDto: CreatedNewsResponseDto = containerDI.getContainer().resolve(CreateNewsController).execute({
    title       : request.body.title,
    description : request.body.description,
  });

  response.status(createdNewsResponseDto.technicalCode).send(createdNewsResponseDto);
});

newsRouterV1.get('/read-news', (request: Request, response: Response, nextFunction: NextFunction) => {
  console.log(request.body);
});

newsRouterV1.put('/update-news', (request: Request, response: Response, nextFunction: NextFunction) => {
  console.log(request.body);
});

newsRouterV1.delete('/delete-news', (request: Request, response: Response, nextFunction: NextFunction) => {
  console.log(request.body);
});

// const newsRouterV2: Router = express.Router();
// const newsRouterV3: Router = express.Router();
// const newsRouterVN: Router = express.Router();

export { newsRouterV1 };
