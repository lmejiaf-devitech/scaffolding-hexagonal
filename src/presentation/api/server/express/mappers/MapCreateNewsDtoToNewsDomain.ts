import { CreateNewsDto } from "../dtos/CreateNewsDto";
import { IMapper } from "@commons/IMapper";
import { News } from "@domain/entities/News";
import { injectable } from "inversify";

@injectable()
export class MapCreateNewsDtoToNewsDomain implements IMapper<CreateNewsDto, News>{
    mapTo(params: CreateNewsDto): News {

        const news: News = new News();

        news.setCreationDate(params.getCreationDate());
        news.setDescription(params.getDescription());
        news.setTitle(params.getTitle());

        return news;
    }

}