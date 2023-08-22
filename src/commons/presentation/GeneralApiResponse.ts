export type GeneralApiResponse = {

    technicalCode: number;
    technicalMessage: string;
    responseDate: Date;

}

export type GeneralApiResponseError = {
    observations: string[]
}
