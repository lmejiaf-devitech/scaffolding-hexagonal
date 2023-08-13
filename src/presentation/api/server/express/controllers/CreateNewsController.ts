import { inject, injectable } from "inversify";
import { CreateNewsDto } from "../dtos/CreateNewsDto";
import { IMapper } from "@commons/IMapper";
import { News } from "@domain/entities/News";

@injectable()
export class CreateNewsController {

    private iMapperCreateNewsDtoToNewsDomain: IMapper<CreateNewsDto, News>;
    
    constructor(
        @inject("MapCreateNewsDtoToNewsDomain") iMapperCreateNewsDtoToNewsDomain: IMapper<CreateNewsDto, News>
    ) {
        this.iMapperCreateNewsDtoToNewsDomain = iMapperCreateNewsDtoToNewsDomain;
    }

    public execute(createNewDto: CreateNewsDto) {
        const news: News = this.iMapperCreateNewsDtoToNewsDomain.mapTo(createNewDto);

        //ejecutar casos de uso y reglas de validación
    }
}