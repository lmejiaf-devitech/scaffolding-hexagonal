import { Container } from "inversify";
import { ContainerDI } from "./ContainerDI";
import { IContainerDI } from "./IContainerDI";

// definiendo container de dependencias
const containerDI: IContainerDI<Container> = new ContainerDI();
containerDI.registerDependencies();
export { containerDI };