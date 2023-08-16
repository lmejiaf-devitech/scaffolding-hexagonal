import { inject, injectable } from "inversify";
import { CreateNewsRequestDto, CreatedNewsResponseDto } from "../dtos/CreateNewsDto";

@injectable()
export class CreateNewsController {

    public execute(createNewDto: CreateNewsRequestDto): CreatedNewsResponseDto {



        return {
            id: '203050',
            title: createNewDto.title,
            description: createNewDto.description,
            technicalCode: 201,
            technicalMessage: 'Se ha creado correctamente la noticia',
            responseDate: new Date(),
            creationDate: new Date(),
        } as CreatedNewsResponseDto;
    }

}