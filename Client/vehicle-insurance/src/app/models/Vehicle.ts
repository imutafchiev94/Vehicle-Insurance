import {Owner} from './Owner';
import { Insurance } from './Insurance';

export interface Vehicle {
    _id: string;
    brand: string;
    model: string;
    yearOfManufacture: number;
    registrationNumber: string;
    owner: Owner;
    insurance: Insurance;
}