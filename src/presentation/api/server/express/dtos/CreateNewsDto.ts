import { GeneralApiResponse, GeneralApiResponseError } from "@commons/presentation/GeneralApiResponse";

export type CreateNewsRequestDto = {
    title: string;
    description: string;
}
export type CreateNewsSuccessDto = GeneralApiResponse & {
    id: string;
    title: string;
    description: string;
    creationDate: Date;
}
export type CreateNewsFailedDto = GeneralApiResponse & GeneralApiResponseError;

export type CreatedNewsResponseDto = CreateNewsSuccessDto | CreateNewsFailedDto;
