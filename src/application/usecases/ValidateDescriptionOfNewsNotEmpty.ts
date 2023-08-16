import { IValidation } from "@commons/application/IValidation";
import { injectable } from "inversify";

@injectable()
export class ValidateDescriptionOfNewsNotEmpty implements IValidation<ValidateDescriptionOfNewsNotEmptyType> {
    validate(params: ValidateDescriptionOfNewsNotEmptyType): boolean {
        if (params.description != null && params.description.trim() != '') {
            return true;
        }
        return false;
    }

}

export type ValidateDescriptionOfNewsNotEmptyType = {
    description: string
}