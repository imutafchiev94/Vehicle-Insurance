import { from } from "rxjs";
import {Owner} from './Owner';
import {Vehicle} from './Vehicle';
import {Payment} from './Payment';
import {CountOfPayments} from './enums/CountOfPayments';

export interface Insurance {
    _id: string;
    startDate: Date;
    endDate: Date;
    vehicleOwner: Owner,
    vehicle: Vehicle,
    imageUrl: string,
    totalAmount: number;
    dueAmount: number;
    countOfPayments: CountOfPayments;
    payments: Array<Payment>;
    isInvalid: boolean;
}