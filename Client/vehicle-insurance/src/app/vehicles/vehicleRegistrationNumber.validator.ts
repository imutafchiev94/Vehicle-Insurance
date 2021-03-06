import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { catchError, map, Observable } from "rxjs";
import { Owner } from "../models/Owner";
import { VehicleService } from "../services/vehicle.service";


export class VehicleRegistrationNumberValidator {
    static createValidator(vehicleService: VehicleService):
    AsyncValidatorFn {
        return (control: AbstractControl):
        Observable<ValidationErrors> | null => {
            return vehicleService.isExists({ registrationNumber: control.value })
            .pipe(
                map((result: boolean) => {
                    console.log(result);
                return result ? null : {VehicleDoesntExists: true};
            }),catchError((err) => err)
        )}
    }
}