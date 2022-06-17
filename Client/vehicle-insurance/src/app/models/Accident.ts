import { Insurance } from "./Insurance";
import { Vehicle } from "./Vehicle";

export interface Accident {
    _id: string,
    vehicle: Vehicle,
    insurance: Insurance,
    driverFirstName: string,
    driverMiddleName: string,
    driverSurname: string,
    driverEGN: string,
    dateOfAccident: Date,
    imageUrl: string,
    description: string
}