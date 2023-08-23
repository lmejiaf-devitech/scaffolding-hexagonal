/* eslint-disable no-unused-expressions */
/* eslint-disable import/extensions */
import { Container } from 'inversify';
import { ContainerDI } from './ContainerDI';
import { IContainerDI } from './IContainerDI';
import 'reflect-metadata';
// definiendo container de dependencias
const containerDI: IContainerDI<Container> = new ContainerDI();
containerDI.registerDependencies();

export { containerDI };
