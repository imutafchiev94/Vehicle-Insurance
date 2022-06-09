import { from } from "rxjs";
import {Insurance} from './Insurance';

export interface Payment {
    _id: string;
    isPaid: boolean;
    amount: number;
    startDate: Date;
    endDate: Date;
    insurance: Insurance;
}