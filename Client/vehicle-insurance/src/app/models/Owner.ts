import {Vehicle} from './Vehicle';
import {Gender} from './enums/Gender';

export interface Owner {
    _id: string;
    firstName: string;
    middleName: string;
    surname: string;
    age: number;
    dateOfBirth: Date;
    gender: Gender;
    egn: string;
    vehicles: Array<Vehicle>;
}