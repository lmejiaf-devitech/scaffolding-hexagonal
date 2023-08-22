/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/extensions */
import { ValidateDescriptionOfNewsNotEmpty, ValidateDescriptionOfNewsNotEmptyType } from '@application/usecases/ValidateDescriptionOfNewsNotEmpty';
import { ValidateTitleOfNewsNotEmpty, ValidateTitleOfNewsNotEmptyType } from '@application/usecases/ValidateTitleOfNewsNotEmpty';
import { IValidation } from '@commons/application/IValidation';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { CreatedNewsResponseDto } from '../dtos/CreateNewsDto';

@injectable()
export class ValidateCreateNewsRequestBodyMiddleware {
  private iValidateTitleOfNewsNotEmpty: IValidation<ValidateTitleOfNewsNotEmptyType>;

  private iValidateDescriptionOfNewsNotEmpty: IValidation<ValidateDescriptionOfNewsNotEmptyType>;

  constructor(
        @inject('ValidateTitleOfNewsNotEmpty') iValidateTitleOfNewsNotEmpty: IValidation<ValidateTitleOfNewsNotEmptyType>,
        @inject('ValidateDescriptionOfNewsNotEmpty') iValidateDescriptionOfNewsNotEmpty: IValidation<ValidateDescriptionOfNewsNotEmptyType>,
  ) {
    this.iValidateDescriptionOfNewsNotEmpty = iValidateDescriptionOfNewsNotEmpty;
    this.iValidateTitleOfNewsNotEmpty = iValidateTitleOfNewsNotEmpty;
  }

  execute = (request: Request, response: Response, nextFunction: NextFunction) => {
    console.log(this);
    const isValidDescription: boolean = this.iValidateDescriptionOfNewsNotEmpty.validate({
      description: request.body.description,
    });
    const isValidTitle: boolean = this.iValidateTitleOfNewsNotEmpty.validate({
      title: request.body.title,
    });
    const observations: string[] = [];
    if (!isValidDescription) {
      observations.push('La descripción no puede ser vacía o nula');
    }
    if (!isValidTitle) {
      observations.push('El titulo no puede ser vacío o nulo');
    }
    if (isValidDescription && isValidTitle) {
      nextFunction();
    } else {
      response.status(400).send({
        technicalCode    : 400,
        technicalMessage : 'El cuerpo de la solicitud posee algunas incosistencias',
        responseDate     : new Date(),
        observations,
      } as CreatedNewsResponseDto);
    }
  };
}
