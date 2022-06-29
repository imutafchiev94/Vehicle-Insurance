import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable } from "rxjs";
import { Owner } from "../models/Owner";
import { OwnerService } from "../services/owner.service";


export class OwnerEGNValidator {
    static createValidator(ownerService: OwnerService):
    AsyncValidatorFn {
        return (control: AbstractControl):
        Observable<ValidationErrors> | null => {
            return ownerService.isExists({ EGN: control.value })
            .pipe(
                map((result: boolean) => {
                return result ? null : {OwnerDoesntExists: true};
            }),catchError((err) => err)
        )}
    }
}